import { RolesEnum } from '@prisma/client';

export interface Payload {
  email: string;
  sub: number;
  name?: string | null;
  roles: RolesEnum[];
}
