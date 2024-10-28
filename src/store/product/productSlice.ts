import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getProductById } from "./thunk";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}
interface Topping {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface dataCart {
  productCart: Product;
  toping: Topping[];
  totalPrice: number;
  quantity: number;
}

interface ProductState {
  products: Product[];
  product: Product | null;
  cart: dataCart[];
}

const initialState: ProductState = {
  products: [],
  product: null,
  cart: [],
};

const productSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    removeFromCart: (state, action) => {
      state.cart.splice(action.payload, 1);
    },
    resetCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers(builder) {
    // GET PRODUCTS
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.products = [];
    });

    //END GET PRODUCTS

    // GET PRODUCTBYID
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.product = action.payload;
    });

    builder.addCase(getProductById.rejected, (state) => {
      state.product = {} as Product;
    });

    //END GET PRODUCTBYID
  },
});

export const { addToCart, removeFromCart, resetCart } = productSlice.actions;

export default productSlice.reducer;
