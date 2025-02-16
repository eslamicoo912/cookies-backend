export type ProductType = {
  name: string;
  description: string;
  image: string;
  mainPrice?: number;
  prices?: {
    boxOfthree: number;
    boxOfsix: number;
    boxOftwelve: number;
  };
  category: string;
};
