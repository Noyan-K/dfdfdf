import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ValidatedUser } from '../../auth/interfaces/validatedUser.interface';

export const currentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): ValidatedUser => {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
    },
);
