import cors from "cors";
import express from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { products } from "./data.js";

const app = express();
const port = Number(process.env.PORT ?? 4001);

const checkoutSchema = z.object({
  customerName: z.string().min(1),
  email: z.string().email(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive()
      })
    )
    .min(1)
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3005"
  })
);
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.get("/api/products", (request, response) => {
  const flavor = request.query.flavor?.toString();

  if (!flavor || flavor === "all") {
    response.json(products);
    return;
  }

  response.json(products.filter((product) => product.flavor === flavor));
});

app.get("/api/products/featured", (_request, response) => {
  response.json(products.filter((product) => product.isFeatured));
});

app.post("/api/checkout", (request, response) => {
  const parsedCheckout = checkoutSchema.safeParse(request.body);

  if (!parsedCheckout.success) {
    response.status(400).json({ message: "Invalid checkout payload" });
    return;
  }

  const orderItems = parsedCheckout.data.items.map((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);

    if (!product) {
      throw new Error(`Unknown product: ${item.productId}`);
    }

    if (item.quantity > product.stock) {
      throw new Error(`${product.name} is out of stock`);
    }

    return {
      product,
      quantity: item.quantity
    };
  });

  const subtotal = orderItems.reduce((total, item) => total + item.product.price, 0);

  orderItems.map((item) => {
    item.product.stock -= 1;
    return item.product;
  });

  response.status(201).json({
    id: randomUUID(),
    customerName: parsedCheckout.data.customerName,
    email: parsedCheckout.data.email,
    items: orderItems.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price
    })),
    subtotal,
    tax: Number((subtotal * 0.0825).toFixed(2)),
    total: Number((subtotal * 1.0825).toFixed(2))
  });
});

app.use(
  (
    error: Error,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    response.status(400).json({ message: error.message });
  }
);

app.listen(port, () => {
  console.log(`Cookie API listening on http://localhost:${port}`);
});
