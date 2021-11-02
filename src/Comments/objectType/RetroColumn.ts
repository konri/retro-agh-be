import { Field, Float, ID, ObjectType } from 'type-graphql'
import { Comment } from './Comment'

@ObjectType()
export class RetroColumn {
  @Field(() => ID)
  id: string

  @Field(() => String)
  title: string

  @Field(() => String)
  color: string

  @Field(() => [Comment])
  comments: Array<Comment>

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
