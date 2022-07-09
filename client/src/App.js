import MainLayout from "./components/layout/MainLayout";
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage'
import ProductDetails from "./pages/ProductDetails";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="products/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
