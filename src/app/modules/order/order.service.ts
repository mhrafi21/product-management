import { Order } from "./order.interface";
import { OrderModel } from "./order.model"

const createOrderIntoDB = async(orderItem: Order) => {
    const result = await OrderModel.create(orderItem);
    return result;  
}

// get orders

const getOrderIntoDB = async(email: string) => {

    if(!email){
        const result = await OrderModel.find({});
        return result;
    }else{
        const result = await OrderModel.find({email});
        return result;
    }
}

export {
    createOrderIntoDB,
    getOrderIntoDB
}