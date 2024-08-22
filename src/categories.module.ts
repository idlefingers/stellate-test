import { Module } from '@nestjs/common';
import { CategoriesResolver } from './categories.resolver';

@Module({
  providers: [CategoriesResolver],
})
export class CategoriesModule {}
