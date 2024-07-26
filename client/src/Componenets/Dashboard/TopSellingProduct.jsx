import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topSellingProduct } from "../../Action/DashboardAction";

const TopSellingProduct = () => {
  const dispatch = useDispatch();
  const topSellingProducts = useSelector(
    (state) => state.dashboardReducer?.topSellingProducts
  );
  useEffect(() => {
    dispatch(topSellingProduct());
  }, []);

  return (
    <div className="">
      <div>
        <h1 className="font-bold p-5 text-2xl">Top Selling Products</h1>
      </div>
      <div className="flex flex-col">
        {topSellingProducts.map((product) => (
          <div
            key={product.productname}
            className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-sm"
          >
            <img
              src={product.imageUrl}
              alt={product.productname}
              width={64}
              height={64}
              className="rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium">{product.productname}</h3>
              <p className="text-sm text-muted-foreground">
                {product.totalQuantity} orders
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProduct;
