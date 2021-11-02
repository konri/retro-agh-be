import { Field, Float, ID, Int, ObjectType } from 'type-graphql'
import { RetroColumn } from './RetroColumn'

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: number

  @Field(() => String)
  name: string

  @Field(() => String)
  text: string

  @Field(() => RetroColumn)
  column: RetroColumn

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
