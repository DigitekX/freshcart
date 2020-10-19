import { Ctx } from "blitz"
import db, { FindManyCartArgs } from "db"

type GetCartsInput = Pick<FindManyCartArgs, "where" | "orderBy" | "skip" | "take" | "include">

export default async function getCarts(
  { where, orderBy, skip = 0, take, include }: GetCartsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const carts = await db.cart.findMany({
    where,
    orderBy,
    take,
    skip,
    include
  })

  const count = await db.cart.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    carts,
    nextPage,
    hasMore,
    count,
  }
}
