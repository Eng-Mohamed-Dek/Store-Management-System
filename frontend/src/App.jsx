import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/create" element={<ProductForm />} />
        <Route path="/edit/:id" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
