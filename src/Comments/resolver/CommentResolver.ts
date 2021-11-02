import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, Resolver, Root } from 'type-graphql'
import { Context } from '../../shared/interface/Context'
import { Comment } from '../objectType/Comment'
import { RetroColumn } from '../objectType/RetroColumn'

@InputType()
class CommentInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  text: string

  @Field(() => String)
  columnId: string
}

@Resolver(Comment)
export class CommentResolver {
  @FieldResolver(() => RetroColumn)
  column(@Root() comment: Comment, @Ctx() ctx: Context) {
    return ctx.prisma.comment
      .findOne({
        where: { id: comment.id },
      })
      .column()
  }

  @Mutation(() => Comment)
  createComment(@Arg('data') commentInput: CommentInput, @Ctx() ctx: Context) {
    return ctx.prisma.comment.create({
      data: {
        name: commentInput.name,
        text: commentInput.text,
        column: { connect: { id: commentInput!.columnId } },
      },
    })
  }
}
