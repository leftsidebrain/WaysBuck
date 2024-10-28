import React from "react";
import { useForm } from "react-hook-form";
export interface data {
  email: string;
  password: string;
}

export default function useLoginHooks() {
  return useForm<data>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
}
