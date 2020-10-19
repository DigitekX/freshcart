import deleteCart from 'app/carts/mutations/deleteCart'
import getCarts from 'app/carts/queries/getCarts'
import { useCurrentUser } from 'app/hooks/useCurrentUser'
import createOrderDetail from 'app/orderDetails/mutations/createOrderDetail'
import createOrder from 'app/orders/mutations/createOrder'
import updateOrder from 'app/orders/mutations/updateOrder'
import { BlitzPage, Link, Router, useMutation, useQuery, useSession } from 'blitz'
import React, { Suspense } from 'react'

export const CartList = () => {
  const user = useCurrentUser()
 
  let amount:number = 0
  
  const [{carts}, {mutate}] =  useQuery(getCarts, {where: {userId: user?.id}, include:{product:true}})
  const [createOrderMutation] = useMutation(createOrder)
  const [createOrderDetailMutation] = useMutation(createOrderDetail)
  const [updateOrderMutation] = useMutation(updateOrder)
  const [deleteCartMutation] = useMutation(deleteCart)
  
  carts.length > 0 && carts.forEach(cart => amount += cart.productPrice )
  
  let orderDetails = []
  let deleted = []
  let i:number = 0

  const handleClick = async() => {

    try {
      const order = await createOrderMutation({
        data: {
          user: {connect: {id: user?.id}},
          totalPrice: amount
        }
      })

      console.log(order)
      oDetails(order)

    } catch (error) {
        console.log(error)      
    }
  }

  const oDetails = async(order) => {
      try {
        
      for(i; i<carts.length; i++){
        orderDetails[i] = await createOrderDetailMutation({
          data: {
            order: {connect: {id: order.id}},
            goodsId: carts[i].productId,
            productPrice: carts[i].productPrice,
            quantity: carts[i].quantity
          }
        })
      }
      console.log(orderDetails)

      const updated = await updateOrderMutation({
        where: {id: order.id},
        data: {orderStatus: "PENDING"}
      })

      console.log(updated)
      let j = 0
      carts.forEach(async(cart) => {
        deleted[j] = await deleteCartMutation({
          where: {id: cart.id}
        })
        j++     
      })
      Router.push('/products')
    } catch (error) {
        console.log(error)
    }
  }

  const removeFromCart = async(cart) => {
      const removed = await deleteCartMutation({
        where: {id: cart.id}
      })
      window.location.reload()
  }

  return (
    <div>
      {carts.length === 0 ? (
        <>
          <h3>Your cart is empty</h3>
          <Link href='/products'>
            <button>
             <h4>Go to products</h4>
            </button>
          </Link>
        </>
      ) : (
        <div>

            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {carts.map(cart => (
                  <tr key={cart.id}>
                    <td>{cart.product.name}</td>
                    <td>{cart.quantity}</td>
                    <td>{cart.productPrice}</td>
                    <td>
                      <button onClick={() => removeFromCart(cart)}>Remove from cart</button>
                    </td>
                  </tr>
                
                ))}
              </tbody>
            </table>
          <br/>
          <br/>
          <button onClick={handleClick}>Place Order</button>
        </div>
    )}
    </div>
  )
}
  
const Orders:BlitzPage = () => {
  

  return (
    <div>
      <h1>Welcome to Orders</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <CartList/>
      </Suspense>
    </div>
  )
}

export default Orders
