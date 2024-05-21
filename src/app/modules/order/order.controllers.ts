import { Request, Response } from 'express'
import { getOrderIntoDB } from './order.service'
import { orderJoiSchema } from './order.validation'
import { ProductModel } from '../product/product.model'
import { OrderModel } from './order.model'

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

    const orderProduct = await ProductModel.findById(req.body?.productId);

    if (!orderProduct)
      return res.status(500).json({
        success: false,
        message: 'Order not found!',
      })

    if (req.body.quantity > orderProduct?.inventory?.quantity) {
      return res.status(500).json({
        success: false,
        message: 'Insufficient quantity available in inventory!',
      })
    }

    if (req.body.quantity === 0) {
      await ProductModel.findOneAndUpdate(
        { _id: req.body.productId },
        { $set: { 'inventory.inStock': false } },
        {
          new: true,
        },
      )
    } else {
      await ProductModel.findOneAndUpdate(
        { _id: req.body.productId },
        { $set: { 'inventory.inStock': true } },
        {
          new: true,
        },
      )
    }

    const newQuantity = orderProduct.inventory.quantity - req.body.quantity

    await ProductModel.findOneAndUpdate(
      { _id: req.body.productId },
      { $set: { 'inventory.quantity': newQuantity } },
      {
        new: true,
      },
    )

    const result = await OrderModel.create(req.body)
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
