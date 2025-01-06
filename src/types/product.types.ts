export type ProductType = {
  name: string;
  description: string;
  image: string;
  prices: {
    boxOfthree: number;
    boxOfsix: number;
    boxOftwelve: number;
  };
  category: string;
};
