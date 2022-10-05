import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';
import { CoreModule, RolesGuard } from './core';
import { HealthModule } from './health/health.module';
import { SharedModule } from './shared';

@Module({
  imports: [RouterModule.register(appRoutes), CoreModule, SharedModule, HealthModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
