import { Routes } from '@nestjs/core';
import { UserModule } from './user';
import { AuthModule } from './auth';

export const appRoutes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'users',
    module: UserModule,
  },
];
