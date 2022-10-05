import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';
import { AuthModule, JwtAuthGuard } from './auth';
import { CoreModule, RolesGuard } from './core';
import { HealthModule } from './health/health.module';
import { SharedModule } from './shared';
import { UserModule } from './user';

@Module({
  imports: [RouterModule.register(appRoutes), CoreModule, SharedModule, AuthModule, UserModule, HealthModule],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
