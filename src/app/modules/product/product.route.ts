import express from 'express'
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSpecificProduct,
  updateProduct,
} from './product.controller'

const router = express.Router()
router.post('/products', createProduct)
router.get('/products', getProducts)
router.get('/products/:productId', getSpecificProduct)
router.put('/products/:productId', updateProduct)
router.delete('/products/:productId', deleteProduct)

export const ProductRoutes = router
