import OrderModel from "../database/models/order.model.js";
import { CartItemType, OrderType } from "../types/order.type.js";
import { asyncHandeller } from "../utils/errorHandling.js";
import { Request, Response } from "express";
import paginationFunction from "../utils/pagination.js";

export const createOrder = asyncHandeller(
  async (req: Request, res: Response) => {
    const { cartItems, customerData } = req.body;

    if (!cartItems || !customerData)
      return res.status(400).json({ message: "Missing required fields" });

    if (customerData.status !== "active")
      return res.status(400).json({ message: "User is inactive" });

    // calculate the total price
    const totalPrice = cartItems.reduce(
      (total: number, item: CartItemType) => total + item.price,
      0
    );

    const newOrder = await OrderModel.create({
      customerData,
      totalPrice,
      cartItems,
    });

    await newOrder.save();

    return res.status(201).json({ message: "Order created", data: newOrder });
  }
);

export const getAllOrders = asyncHandeller(
  async (req: Request, res: Response) => {
    const { user } = req;
    // if (user.role !== "Admin")
    //   return res.status(401).json({ message: "Unauthorized" });

    const orders: OrderType[] | null = (await OrderModel.find().sort(
      "-createdAt"
    )) as unknown as OrderType[];

    if (!orders.length)
      return res.status(404).json({ message: "No orders found" });

    return res.status(200).json({ message: "success", data: orders });
  }
);

export const getOneOrder = asyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const order: OrderType | null = await OrderModel.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json({ message: "success", data: order });
  }
);

export const getMyOrders = asyncHandeller(
  async (req: Request, res: Response) => {
    const { user } = req;
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found, Make sure user is authenticated" });
    const { limit, skip } = paginationFunction(req.query);
    const { sort } = req.query;
    const orders: OrderType[] | null = (await OrderModel.find({
      customerData: user._id,
    })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean()) as unknown as OrderType[];
    if (!orders.length)
      return res.status(404).json({ message: "No orders found" });
    return res.status(200).json({ message: "success", data: orders });
  }
);

export const updateOrderStatus = asyncHandeller(
  async (req: Request, res: Response) => {
    const { user } = req;
    // if (user.role !== "Admin")
    //   return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const { status } = req.body;

    const order: OrderType | null = await OrderModel.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (["pending", "paid", "canceled", "done"].includes(status))
      order.status = status;
    else return res.status(400).json({ message: "Invalid status" });

    const updatedOrder = await order.save();

    return res
      .status(200)
      .json({ message: "Order updated", data: updatedOrder });
  }
);

export const deleteOrder = asyncHandeller(
  async (req: Request, res: Response) => {
    const { user } = req;
    // if (user.role !== "Admin")
    //   return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;

    const order: OrderType | null = await OrderModel.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    return res.status(200).json({ message: "Order deleted" });
  }
);
