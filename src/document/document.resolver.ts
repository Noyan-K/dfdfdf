import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DocumentService } from './document.service';
import { Document } from './models/document.model';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';
import { GqlJwtAuthGuard } from '../auth/guards/gql-jwt-auth.guard';

@Resolver(() => Document)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Document)
  createDocument(
    @Args('createDocumentInput') createDocumentInput: CreateDocumentInput,
  ): Promise<Document> {
    return this.documentService.create(createDocumentInput);
  }

  @Query(() => [Document], { name: 'documents' })
  findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<Document[]> {
    return this.documentService.findAll(take, skip);
  }

  @Query(() => Document, { name: 'document' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Document | null> {
    return this.documentService.findOne(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Document)
  updateDocument(
    @Args('updateDocumentInput') updateDocumentInput: UpdateDocumentInput,
  ): Promise<Document | null> {
    return this.documentService.update(
      updateDocumentInput.id,
      updateDocumentInput,
    );
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Document)
  removeDocument(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Document> {
    return this.documentService.remove(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [Document], { name: 'getDocuments', nullable: true })
  getDocuments(
    @Args('id', { type: () => [Int] }) id: number[],
  ): Promise<Document[] | Document | null> {
    return this.documentService.getDocument(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [Document], { name: 'getDocument', nullable: true })
  getDocument(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Document[] | Document | null> {
    return this.documentService.getDocument(id);
  }
}
