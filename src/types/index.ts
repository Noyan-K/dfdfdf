import { registerEnumType } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';

import { DocumentTypeEnum, Prisma, RolesEnum } from '@prisma/client';

// import { CartTypeEnum, WatchListTypeEnum } from './cart.type';
import { SortByEnum } from './sort.type';

@Injectable()
export class Types {}

// registerEnumType(CartTypeEnum, {
//   name: 'CartTypeEnum',
// });

// registerEnumType(WatchListTypeEnum, {
//   name: 'WatchListTypeEnum',
// });

registerEnumType(DocumentTypeEnum, {
  name: 'DocumentTypeEnum',
});

registerEnumType(RolesEnum, {
  name: 'RolesEnum',
});

registerEnumType(Prisma.SortOrder, {
  name: 'SortOrder',
});

registerEnumType(SortByEnum, {
  name: 'SortByEnum',
});

registerEnumType(Prisma.QueryMode, {
  name: 'SearchMode',
});
