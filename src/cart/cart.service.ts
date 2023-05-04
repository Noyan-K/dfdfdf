import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { DocumentTypeEnum } from '@prisma/client';
import { Cart } from './models/cart.model';
import { DocumentService } from '../document/document.service';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { Document } from '../document/models/document.model';

const pdf = require('pdf-creator-node');

@Injectable()
export class CartService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly documentService: DocumentService,
    private readonly config: ConfigService,
  ) {}

  async create(createCartInput: CreateCartInput): Promise<Cart> {
    return this.prismaService.cart.create({ data: createCartInput });
  }

  findAll(contact_id: number, take?: number, skip?: number): Promise<Cart[]> {
    return this.prismaService.cart.findMany({
      where: { contact_id },
      take,
      skip,
    });
  }

  findOne(id: number): Promise<Cart | null> {
    return this.prismaService.cart.findFirst({
      where: { id },
      include: {
        CartSize: {
          where: {
            deleted_at: { equals: null },
          },
          include: {
            Size: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateCartInput: UpdateCartInput,
  ): Promise<Cart | null> {
    await this.prismaService.cart.update({
      where: { id },
      data: updateCartInput,
    });
    return this.findOne(id);
  }

  remove(id: number): Promise<Cart> {
    return this.prismaService.cart.delete({ where: { id } });
  }

  async generatePdf(id: number): Promise<Document> {
    const cart = await this.prismaService.cart.findFirst({
      where: { id },
      include: {
        Contact: true,
        CartSize: { include: { Size: true } },
        Category: {
          include: {
            Parent: { include: { Parent: { include: { Parent: true } } } },
          },
        },
      },
    });

    if (!cart) throw new NotFoundException();

    const staticPath = this.config.get('STATIC_PATH');
    const templatesPath = this.config.get('TEMPLATES_PATH');
    const destination = path.join(__dirname, '..', staticPath, 'pdf');
    const fileName = `${uuidv4()}.pdf`;
    const pth = path.join(destination, fileName);

    this.documentService.createFolderIfDoesNotExist(destination);

    const html = fs
      .readFileSync(path.join(templatesPath, 'pdf', 'pdf-template.html'))
      .toString();

    await pdf.create(
      {
        html, data: cart, path: pth, type: '',
      },
      {
        format: 'A4',
        orientation: 'portrait',
        border: '9.906mm',
        header: {
          height: '15mm',
          /* html */
          contents: `
            <style>
                body, html {
                    padding: 0px;
                    margin: 0px;
                }
            </style>
            <div>
                <span style="font-family: 'Noto Serif Display'; font-style: normal; font-weight: 500; font-size: 4.064mm; line-height: 5.5503mm; letter-spacing: -0.02em; color: #8C8B89;">FABRIKA</span>
                <div style="display: inline-block; position: absolute; right: 0; top: 0;">
                    <span style="font-family: 'Jost Light'; font-style: normal; font-weight: 200; font-size: 3.0479mm; line-height: 5.5033mm; letter-spacing: -0.02em; color: #8C8B89;">Техническое задание на пошив</span>
                    <span style="margin-left: 5.4186mm; font-family: 'Jost'; font-style: normal; font-weight: 400; font-size: 3.0479mm; line-height: 5.5033mm; letter-spacing: -0.02em; color: #131B23; text-align: right;">{{page}}/{{pages}}</span>
                </div>
            </div>
            `,
        },
      },
    );

    return this.prismaService.document.create({
      data: {
        url: `pdf/${fileName}`,
        type: DocumentTypeEnum.FILE,
        name: fileName,
      },
    });
  }
}
