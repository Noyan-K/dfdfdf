import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { DocumentTypeEnum } from '@prisma/client';
import { Order } from './models/order.model';
import { DocumentService } from '../document/document.service';
import { UpdateOrderInput } from './dto/update-order.input';
import { Document } from '../document/models/document.model';
import { CreateOrderInput } from './dto/create-order.input';

const pdf = require('pdf-creator-node');

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly documentService: DocumentService,
    private readonly config: ConfigService,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    return this.prismaService.order.create({ data: createOrderInput });
  }

  findAll(take?: number, skip?: number): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { Document: true },
      take,
      skip,
    });
  }

  findOne(id: number): Promise<Order | null> {
    return this.prismaService.order.findFirst({
      where: { id },
      include: {
        Document: true,
        OrderSize: {
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
    updateOrderInput: UpdateOrderInput,
  ): Promise<Order | null> {
    await this.prismaService.order.update({
      where: { id },
      data: updateOrderInput,
    });
    return this.findOne(id);
  }

  remove(id: number): Promise<Order> {
    return this.prismaService.order.delete({ where: { id } });
  }

  async generatePdf(id: number): Promise<Document> {
    const order = await this.prismaService.order.findFirst({
      where: { id },
      include: {
        OrderSize: { include: { Size: true } },
        Product: {
          include: {
            Parent: { include: { Parent: { include: { Parent: true } } } },
          },
        },
      },
    });

    if (!order) throw new NotFoundException();

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
        html, data: order, path: pth, type: '',
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
