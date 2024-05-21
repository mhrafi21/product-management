import express from "express";
import { createOrder, getOrders } from "./order.controllers";

const router = express.Router()

router.post("/orders", createOrder);
router.get("/orders", getOrders)

export const OrderRoutes = router