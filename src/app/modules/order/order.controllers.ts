import { Request, Response } from 'express'
import { createOrderIntoDB, getOrderIntoDB } from './order.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await createOrderIntoDB(req.body)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

// get orders

const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await getOrderIntoDB(req.query.email as string)

    if (req.query.email) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order not found',
      error: error,
    })
  }
}

export { createOrder, getOrders }
