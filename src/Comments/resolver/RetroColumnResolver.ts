import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root } from 'type-graphql'
import { Context } from '../../shared/interface/Context'
import { RetroColumn } from '../objectType/RetroColumn'
import { Comment } from '../objectType/Comment'

@InputType()
class ColumnInput {
  @Field(() => String)
  title: string

  @Field(() => String)
  color: string
}

@InputType()
class ChangeInput {
  @Field(() => String)
  id: string

  @Field(() => String)
  value: string
}

@Resolver(RetroColumn)
export class RetroColumnResolver {
  @FieldResolver(() => [Comment])
  async comments(@Root() column: RetroColumn, @Ctx() ctx: Context) {
    return ctx.prisma.comment.findMany({
      where: {
        columnId: column.id,
      },
    })
  }

  @Mutation(() => RetroColumn)
  createColumn(@Arg('data') columnInput: ColumnInput, @Ctx() ctx: Context) {
    return ctx.prisma.column.create({
      data: {
        ...columnInput,
      },
    })
  }

  @Mutation(() => RetroColumn)
  setTitle(@Arg('data') changeInput: ChangeInput, @Ctx() ctx: Context) {
    return ctx.prisma.column.update({
      data: {
        title: changeInput.value,
      },
      where: {
        id: changeInput.id,
      },
    })
  }

  @Mutation(() => RetroColumn)
  setColor(@Arg('data') changeInput: ChangeInput, @Ctx() ctx: Context) {
    return ctx.prisma.column.update({
      data: {
        color: changeInput.value,
      },
      where: {
        id: changeInput.id,
      },
    })
  }

  @Query(() => [RetroColumn])
  getColumns(@Ctx() ctx: Context) {
    return ctx.prisma.column.findMany()
  }
}
