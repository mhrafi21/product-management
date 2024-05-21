import { OrderModel } from './order.model'

// const createOrderIntoDB = async (orderItem: Order) => {
//   const orderProduct = await ProductModel.findById(orderItem?.productId)

//   if (!orderProduct) return { success: false, message: 'Order not found' }

//   if (orderItem.quantity > orderProduct?.inventory?.quantity) {
//     return {
//       success: false,
//       message: 'Insufficient quantity available in inventory',
//     }
//   }

//   if (orderItem.quantity === 0) {
//     await ProductModel.findOneAndUpdate(
//       { _id: orderItem.productId },
//       { $set: { 'inventory.inStock': false } },
//       {
//         new: true,
//       },
//     )
//   } else {
//     await ProductModel.findOneAndUpdate(
//       { _id: orderItem.productId },
//       { $set: { 'inventory.inStock': true } },
//       {
//         new: true,
//       },
//     )
//   }

//   const newQuantity = orderProduct.inventory.quantity - orderItem.quantity

//   await ProductModel.findOneAndUpdate(
//     { _id: orderItem.productId },
//     { $set: { 'inventory.quantity': newQuantity } },
//     {
//       new: true,
//     },
//   )

//   const result = await OrderModel.create(orderItem)
//   return result
// }

// get orders

const getOrderIntoDB = async (email: string) => {
  if (!email) {
    const result = await OrderModel.find({})
    return result
  } else {
    const result = await OrderModel.find({ email: email })
    return result
  }
}

export {  getOrderIntoDB }
