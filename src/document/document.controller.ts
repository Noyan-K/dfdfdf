import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common/decorators';
import { DocumentService } from './document.service';
import { Document } from './models/document.model';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-file')
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Document> {
    return this.documentService.uploadFile(file);
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Post('upload-files')
  uploadFiles(
    @UploadedFiles() files: [Express.Multer.File],
  ): Promise<Document[]> {
    return this.documentService.uploadFiles(files);
  }
}
