import { Request, Response } from 'express'
import {
  createProductIntoDB,
  deleteSpecificProductIntoDB,
  getProductIntoDB,
  getSpecificProductIntoDB,
  updateSpecificProductIntoDB,
} from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await createProductIntoDB(req.body)
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
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

// get products and search products
const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await getProductIntoDB(req.query.searchTerm as string)
    if (!req.query.searchTerm) {
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      })
    } else {
      res.status(200).json({
        success: true,
        message: `Products matching search term '${req.query.searchTerm}' fetched successfully!`,
        data: result,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

// get product by id
const getSpecificProduct = async (req: Request, res: Response) => {
  try {
    const result = await getSpecificProductIntoDB(req.params.productId)
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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

// update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const result = await updateSpecificProductIntoDB(
      req.params.productId,
      req.body,
    )
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
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

// delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await deleteSpecificProductIntoDB(req.params.productId)
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
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

// create new order



export {
  createProduct,
  getProducts,
  getSpecificProduct,
  updateProduct,
  deleteProduct,

}
