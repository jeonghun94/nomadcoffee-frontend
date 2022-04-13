import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const location = useLocation();

  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>CoffeeShop Add</h1>
    </div>
  );
};

export default Shop;
