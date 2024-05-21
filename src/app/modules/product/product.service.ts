import { Product } from './product.interface'
import { ProductModel } from './product.model'

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product)
  return result
}

const getProductIntoDB = async (searchTerm: string) => {
  console.log(searchTerm);
  if (!searchTerm) {
    const result = await ProductModel.find({})
    return result
  } else {
    const result = await ProductModel.find({
      $or: [
        { category: new RegExp(searchTerm, 'i') },
        { description: new RegExp(searchTerm, 'i') },
        { name: new RegExp(searchTerm, 'i') },
      ],
    })
    return result;
  }
}

const getSpecificProductIntoDB = async (productId: string) => {
  const result = await ProductModel.findById(productId)
  return result
}

const updateSpecificProductIntoDB = async (
  productId: string,
  updateData: Product,
) => {
  const result = await ProductModel.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteSpecificProductIntoDB = async (productId: string) => {
  const result = ProductModel.findByIdAndDelete(productId)
  return result
}


export {
  createProductIntoDB,
  getProductIntoDB,
  getSpecificProductIntoDB,
  updateSpecificProductIntoDB,
  deleteSpecificProductIntoDB,
}
