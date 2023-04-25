import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '@prisma/client';

export const HasRoles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
