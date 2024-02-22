import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";

import Homepage from "./pages/Homepage";
import Message from "./pages/Message";
import NameList from "./pages/NameList";
import AddProduct from "./pages/AddProduct";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LogOut from "./pages/LogOut";
import PrivateComponent from "./component/PrivateComponent";
import Product from "./component/Product";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/form" element={<AddProduct />} />
            <Route path="/product" element={<NameList />} />
            <Route path="/product/:id" element={<Product />} />

            <Route path="/message" element={<Message />} />
            <Route path="/loginout" element={<LogOut />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
