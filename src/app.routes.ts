import { Routes } from '@nestjs/core';
import { CityModule } from './city/city.module';
import { CountryModule } from './country/country.module';
import { FeaturesModule } from './features/features.module';
import { StateModule } from './state/state.module';
import { CompanyModule } from './company/company.module';

export const appRoutes: Routes = [
  {
    path: 'features',
    module: FeaturesModule,
  },
  {
    path: 'country',
    module: CountryModule,
  },
  {
    path: 'state',
    module: StateModule,
  },
  {
    path: 'city',
    module: CityModule,
  },
  {
    path: 'company',
    module: CompanyModule,
  },
];
