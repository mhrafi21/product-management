import { Request, Response } from 'express'
import { createOrderIntoDB, getOrderIntoDB } from './order.service'
import { Order } from './order.interface'
import { orderJoiSchema } from './order.validation'

const createOrder = async (req: Request, res: Response) => {
  try {
    const { error } = orderJoiSchema.validate(req.body)

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'field can not be empty',
        error: error.details[0].message,
      })
    }

    const result = await createOrderIntoDB(req.body as Order)

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

// get orders by email

const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await getOrderIntoDB(req.query.email as string)

    if (req.query.email) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
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
