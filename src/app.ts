
import cors from "cors";
import express, {Application,Request, Response} from "express"
import { ProductRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";

const app: Application = express();
// parser

app.use(express.json())
app.use(cors())

// application routes

app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);

app.get("/", async(req: Request, res: Response) => {
    res.send("The server is running")
})

export default app;
