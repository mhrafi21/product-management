import { OrderModel } from './order.model'


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
