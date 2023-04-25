import { BadRequestException, Injectable } from '@nestjs/common';
import { DocumentTypeEnum } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Document } from './models/document.model';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';

@Injectable()
export class DocumentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  create(createDocumentInput: CreateDocumentInput): Promise<Document> {
    const { ...createDocument } = createDocumentInput;

    return this.prisma.document.create({
      data: createDocument,
    });
  }

  async findAll(take?: number, skip?: number): Promise<Document[]> {
    return this.prisma.document.findMany({ take, skip });
  }

  findOne(id: number): Promise<Document | null> {
    return this.prisma.document.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateDocumentInput: UpdateDocumentInput,
  ): Promise<Document | null> {
    await this.prisma.document.update({
      where: { id },
      data: {
        ...updateDocumentInput,
      },
    });

    return this.prisma.document.findFirst({ where: { id } });
  }

  remove(id: number): Promise<Document> {
    return this.prisma.document.delete({ where: { id } });
  }

  getDocument(id: number[] | number): Promise<Document[] | Document | null> {
    if (typeof id === 'number') return this.findOne(id);
    return this.prisma.document.findMany({ where: { id: { in: id } } });
  }

  async uploadFile(file: Express.Multer.File): Promise<Document> {
    const fileName = `${uuidv4()}${extname(file.originalname)}`;

    const validationResult = this.validateFile(file);

    this.createFolderIfDoesNotExist(validationResult.destination);

    fs.writeFileSync(
      `${validationResult.destination}/${fileName}`,
      file.buffer,
    );

    return this.create({
      name: fileName,
      type: validationResult.documentType,
      url: `img/${fileName}`,
    });
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<Document[]> {
    interface Data {
      name: string;
      type: DocumentTypeEnum;
      url: string;
    }

    const validationResult = this.validateFile(files[0]);
    this.createFolderIfDoesNotExist(validationResult.destination);

    const dataArr: Data[] = await files.map(
      (file: Express.Multer.File): Data => {
        const fileName = `${uuidv4()}${extname(file.originalname)}`;
        fs.writeFileSync(
          `${validationResult.destination}/${fileName}`,
          file.buffer,
        );

        return {
          name: fileName,
          type: validationResult.documentType,
          url: `img/${fileName}`,
        };
      },
    );

    return this.prisma.$transaction(
      dataArr.map((data) => this.prisma.document.create({ data })),
    );
  }

  createFolderIfDoesNotExist(destination: string): void {
    const doesFolderExist = fs.existsSync(destination);

    if (!doesFolderExist) {
      try {
        fs.mkdirSync(destination, { recursive: true });
      } catch (error) {
        throw new BadRequestException(error);
      }
    }
  }

  validateFile(file: Express.Multer.File): {
    documentType: DocumentTypeEnum;
    destination: string;
  } {
    let documentType: DocumentTypeEnum;
    let destination: string;

    if (file.mimetype.match(/\/(jpg|jpeg|png)$/) && file.size < 1024 ** 2) {
      documentType = 'IMAGE';
      destination = `${this.configService.get('STATIC_PATH')}/img`;
    } else {
      throw new BadRequestException('Provide a valid file type');
    }

    return {
      documentType,
      destination,
    };
  }
}
