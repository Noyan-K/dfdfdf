import { RolesEnum } from '@prisma/client';

export interface ValidatedUser {
  email: string;
  id: number;
  name?: string | null;
  roles: RolesEnum[];
}
