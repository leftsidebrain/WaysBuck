import { useForm } from "react-hook-form";

export interface IOrders {
  name: string;
  email: string;
  phone: string;
  posCode: string;
  address: string;
  payment?: File | null | undefined;
}

export const useOrdersHooks = () => {
  return useForm<IOrders>({
    defaultValues: {
      address: "",
      email: "",
      name: "",
      phone: "",
      posCode: "",
    },
  });
};
