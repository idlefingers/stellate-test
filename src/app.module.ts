import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CategoriesModule } from './categories.module';
import { SignedRequestGuard } from './stellate-signature-validator.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    CategoriesModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: SignedRequestGuard }],
})
export class AppModule {}
