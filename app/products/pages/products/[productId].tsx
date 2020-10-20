import React, { Suspense, useState } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation, useSession } from "blitz"
import getProduct from "app/products/queries/getProduct"
import deleteProduct from "app/products/mutations/deleteProduct"
import createCart from "app/carts/mutations/createCart"
import { useCurrentUser } from "app/hooks/useCurrentUser"

export const Product =  () => {
  const user =  useCurrentUser()
  const userId = useSession().userId
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [product] = useQuery(getProduct, { where: { id: productId } })
  const[quantity, setQuantity] = useState(product.minQuantity)
  const [createCartMutation] = useMutation(createCart)
  
  const handleClick = async(quantity:number) => {
    
    try {
      const cart = await createCartMutation({data : {
        
        user: {connect: {id: userId}},
        product: {connect: {id: product.id}},
        quantity: quantity,
        productPrice: product.price * quantity,
      }}, {})
  
      console.log(cart)
      
    } catch (error) {
      alert('Product Already added to cart')
    }

  }

  return (
    <div>
      <h1>Product {product.id}</h1>
      <pre>{JSON.stringify(product, null, 2)}</pre>

      {useSession().roles[0] ==='admin' &&(
        <div>
          <Link href="/products/[productId]/edit" as={`/products/${product.id}/edit`}>
            <a>Edit</a>
          </Link>

          <button
            type="button"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteProduct({ where: { id: product.id } })
                router.push("/products")
              }
            }}
          >
          Delete
          </button>

        </div>
      )}
      {user?.verified===true && (
        <div>

          <button 
          disabled={quantity <= product.minQuantity && true}
          onClick={() => setQuantity(quantity - 0.25)}
          >
            -
          </button>
          {quantity}
          <button
          onClick={() => setQuantity(quantity + 0.25)}
          disabled={quantity >= 10 && true}
          >
            +
          </button>
          <button onClick={() => handleClick(quantity)}>Add to Cart</button>
          <br/>
          <button onClick={() => router.push('/orders')}>
            My Cart
          </button>
        </div>
      )}
    </div>
  )
}

const ShowProductPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/products">
          <a>Products</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Product />
      </Suspense>

      
    </div>
  )
}

ShowProductPage.getLayout = (page) => <Layout title={"Product"}>{page}</Layout>

export default ShowProductPage
