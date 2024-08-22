import { Field, ID, ObjectType, Resolver, Query, Args } from '@nestjs/graphql';

@ObjectType()
class Category {
  @Field(() => ID)
  id: string;
}

@Resolver()
export class CategoriesResolver {
  @Query(() => [Category])
  public async categories(
    @Args('onlyRoots', { type: () => Boolean, nullable: true })
    onlyRoots?: boolean,
  ): Promise<Category[]> {
    return [{ id: '123' }];
  }
}
