import { useForm } from "react-hook-form";

export interface IToping {
  name: string;
  price: number | "";
  image?: File | null;
}
export const useTopingHooks = () => {
  return useForm<IToping>({
    defaultValues: {
      name: "",
      price: "",
      image: null,
    },
  });
};
