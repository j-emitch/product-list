import ProductList from "./components/ProductList";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
      <ProductList />
    </div>
  );
}
