import { useForm } from "react-hook-form";

interface IProduct {
  name: string;
  price: number | "";
  image?: File | null;
}

export const useAddProductHooks = () => {
  return useForm<IProduct>({
    defaultValues: {
      name: "",
      price: "",
      image: null,
    },
  });
};
