import Header from "./commponents/Header";
import Index from "./pages/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailProduct from "./pages/product/DetailProduct";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import PrivateRutes from "./commponents/PrivateRutes";
import Transaction from "./pages/admin/Transaction";
import { store } from "./store/store";
import { Provider } from "react-redux";
import AddProduct from "./pages/admin/AddProduct";
import AddToping from "./pages/admin/AddToping";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route element={<PrivateRutes />}>
            <Route path="/detail-product/:id" element={<DetailProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/add-toping" element={<AddToping />} />
            <Route path="/transaction" element={<Transaction />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
