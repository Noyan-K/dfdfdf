import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/models/user.model';
import { ConfigService } from '@nestjs/config';
import { SupplierService } from 'src/supplier/supplier.service';
import { RolesService } from 'src/roles/roles.service';
import { RolesEnum } from '@prisma/client';
import { UserRoleModel } from 'src/roles/models/user-role';
import { UserService } from 'src/user/user.service';
import { TokensInterface } from './interfaces/tokens.interface';
import { RegistrationDto } from './dto/registration.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RolesService,
    private readonly supplierService: SupplierService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  // async registration(
  //   registrationDto: RegistrationDto,
  // ): Promise<TokensInterface> {
    // const doesEmailExist = await this.prismaService.user.findFirst({ where: { email: registrationDto.email } });

    // if (doesEmailExist) {
    //   throw new BadRequestException(`Email:${registrationDto.email} already exists.`);
    // }

    // const supplier = await this.supplierService.create({
    //   name: registrationDto.name,
    // });
    // const newUser = await this.userService.create({
    //   ...registrationDto,
    //   supplier_id: supplier.id,
    // });

    // const newUsersRole = await this.rolesService.createUserRole({
    //   user_id: newUser.id,
    //   role_name: RolesEnum.USER,
    // });

    // const payload = {
    //   email: newUser?.email,
    //   sub: newUser?.id,
    //   name: newUser?.name,
    //   roles: newUsersRole ? [RolesEnum.USER] : [],
    // };

    // return this.generateTokens(payload);
  // }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user?.password) {
      throw new BadRequestException();
    }

    const passwordMatches = user
      ? await bcrypt.compare(pass, user.password)
      : false;

    if (user && passwordMatches) {
      const userRoles = await this.rolesService.findAllUserRole(
        user.id,
        0,
        undefined,
      );
      const { password, ...result } = user;

      return {
        ...result,
        roles: userRoles,
      };
    }

    return null;
  }

  async login(
    user: Omit<User, 'password'> | undefined,
  ): Promise<TokensInterface> {
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const receivedUsersRoles = await this.rolesService.findAllUserRole(
      user.id,
      0,
      undefined,
    );
    const payload = {
      email: user?.email,
      sub: user?.id,
      name: user?.name,
      roles: receivedUsersRoles
        ? receivedUsersRoles.map((role: UserRoleModel) => role.role_name)
        : [],
    };

    return this.generateTokens(payload);
  }

  async refresh(userId: number): Promise<TokensInterface> {
    const receivedUser: User | null = await this.userService.findOne(userId);
    const receivedUsersRoles = await this.rolesService.findAllUserRole(
      userId,
      0,
      undefined,
    );

    if (!receivedUser) {
      throw new ForbiddenException('User not found');
    }

    return this.generateTokens({
      email: receivedUser.email,
      sub: receivedUser.id,
      name: receivedUser?.name,
      roles: receivedUsersRoles
        ? receivedUsersRoles.map((role: UserRoleModel) => role.role_name)
        : [],
    });
  }

  private async generateTokens(payload: {
    email: string;
    sub: number;
    name: string | null;
    roles: string[];
  }): Promise<TokensInterface> {
    const [accessToken, refreshToken]: [string, string] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: '60m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
