export type CartItemType = {
  cookieId: string;
  quantity: number;
  price: number;
};

export type OrderType = {
  _id?: string;
  orderedAt: Date;
  cartItems: CartItemType[];
  totalPrice: number;
  status: "pending" | "paid" | "canceled" | "done";
  save?(): Promise<void>;
  remove?(): Promise<void>;
  sort?(): (sort:string) => void;
};
