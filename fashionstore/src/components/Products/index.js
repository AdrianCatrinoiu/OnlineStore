import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.scss";
import FormSelect from "../../forms/FormSelect";
import PageNavButton from "../PageNavButton";
import Product from "../Product";

const mapState = ({ productsData }) => ({
  products: productsData.products,
  currentPage: productsData.currentPage,
});

const ProductResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);
  const { data, next, prev } = products;
  const { currentPage } = useSelector(mapState);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType, pageNav: page }));
  }, [filterType, page]);

  if (!Array.isArray(data)) return null;

  if (products.length < 1) {
    return (
      <div className="products">
        <h1>No search results!</h1>
      </div>
    );
  }

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    setPage(1);
    navigate(`/search/${nextFilter}`);
  };

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Mens",
        value: "M",
      },
      {
        name: "Womens",
        value: "W",
      },
    ],
    handleChange: handleFilter,
  };

  const handlePage = (diff) => {
    if (diff === "next" && next) setPage(page + 1);
    if (diff === "prev" && prev) setPage(page - 1);

    dispatch(
      fetchProductsStart({
        filterType,
        pageNav: page,
      })
    );
  };
  const configPageNavButton = {
    prev,
    next,
    handlePage,
    page,
  };
  return (
    <div className="products">
      <h1>Browse products</h1>
      <FormSelect {...configFilters} />
      <div className="productResults">
        {data.map((product, pos) => {
          const { sku, name, price, image } = product;
          if (!image || !name || typeof price === "undefined") return null;
          const configProduct = {
            name,
            price,
            image,
            ...product,
          };
          return <Product key={pos} {...configProduct} />;
        })}
      </div>
      <PageNavButton {...configPageNavButton} />
    </div>
  );
};

export default ProductResults;
