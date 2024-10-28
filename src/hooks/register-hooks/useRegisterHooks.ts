import React from "react";
import { useForm } from "react-hook-form";

export interface IRgister {
  name: string;
  email: string;
  password: string;
}

export default function useRegisterHooks() {
  return useForm<IRgister>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
}
