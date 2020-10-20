import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstProductArgs } from "db"

type GetProductInput = Pick<FindFirstProductArgs, "where">

export default async function getProduct({ where }: GetProductInput, ) {

  const product = await db.product.findFirst({ where })

  if (!product) throw new NotFoundError()

  return product
}
