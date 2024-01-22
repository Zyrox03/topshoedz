import { Link } from "react-router-dom";
import { Button } from "../../widgets/Button";
import { ProductCard } from "../../widgets/ProductCard";
import { Title } from "../../widgets/Title";
import PropTypes from "prop-types";

export const ProductsSection = ({ productsList }) => {
  return (
    <div className="flex flex-col items-center gap-12 p-8">
      <Title
        title="Nos Produits"
        sub_title="Rejoignez la tendance avec notre sélection soigneusement choisie des styles les plus vendus."
      />
      <div className="flex justify-around items-center gap-12 flex-wrap">
        {productsList.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Link to="/shop">
        <Button text="Plus" icon="fas fa-plus" />
      </Link>{" "}
    </div>
  );
};

ProductsSection.propTypes = {
  productsList: PropTypes.array,
};
