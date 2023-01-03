import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';
import { CityModule } from './city/city.module';
import { CoreModule, RolesGuard } from './core';
import { CountryModule } from './country/country.module';
import { FeaturesModule } from './features/features.module';
import { HealthModule } from './health/health.module';
import { SharedModule } from './shared';
import { StateModule } from './state/state.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RouterModule.register(appRoutes),
    CoreModule,
    SharedModule,
    HealthModule,
    FeaturesModule,
    CountryModule,
    StateModule,
    CityModule,
    CompanyModule,
    UserModule,
  ],
  controllers: [],
  // providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
