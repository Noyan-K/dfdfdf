import { SetMetadata } from '@nestjs/common';

import { RolesEnum } from '@prisma/client';

export const hasRoles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
