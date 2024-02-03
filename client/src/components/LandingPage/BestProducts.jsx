import { Link } from "react-router-dom";
import { Button } from "../../widgets/Button";
import { ProductCard } from "../../widgets/ProductCard";
import { Title } from "../../widgets/Title";

import PropTypes from "prop-types";

export const BestProducts = ({ productsList }) => {
  return (
    <div className="flex flex-col items-center gap-12 p-8" id="best-selling">
      <Title
        title="أفضل المبيعات"
        sub_title="انضموا إلى الأناقة مع اختيارنا الدقيق من أحدث وأكثر الأنماط مبيعًا بعناية"
      />
      {productsList.length > 0 ? (
        <div className="flex justify-around items-center gap-12 flex-wrap">
          {productsList.slice(0, 3).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <h3 className="text-lg ">لا يوجد أفضل المبيعات</h3>
      )}

      <Link to="/shop">
        <Button text="المزيد" icon="fas fa-plus" />
      </Link>
    </div>
  );
};

BestProducts.propTypes = {
  productsList: PropTypes.array,
};
