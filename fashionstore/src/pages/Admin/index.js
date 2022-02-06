import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  deleteProductStart,
  fetchProductsStart,
} from "../../redux/Products/products.actions";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import Modal from "../../components/Modal";
import Button from "../../forms/Button";
import PageNavButton from "../../components/PageNavButton";
import { CKEditor } from "ckeditor4-react";
import WithAdminAuth from "../../hoc/withAdminAuth";
import AdminLayout from "../../layouts/AdminLayout";
const mapState = ({ productsData }) => ({
  products: productsData.products,
  currentPage: productsData.currentPage,
});

const Admin = (props) => {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  const { data, next, prev } = products;
  const { currentPage } = useSelector(mapState);
  const [page, setPage] = useState(currentPage);
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("M");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");

  const toggleModal = () => {
    setHideModal(!hideModal);
  };

  const configModal = {
    hideModal,
    toggleModal,
  };
  const resetForm = () => {
    setHideModal(true);
    setProductCategory("M");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDescription("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productDescription,
        pageNav: page,
      })
    );

    resetForm();
  };

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType: null, pageNav: page }));
  }, [page]);
  const handlePage = (diff) => {
    if (diff === "next" && next) setPage(page + 1);
    if (diff === "prev" && prev) setPage(page - 1);

    dispatch(
      fetchProductsStart({
        filterType: null,
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
    <WithAdminAuth>
      <AdminLayout>
        <div className="admin">
          <div className="callToActions">
            <ul>
              <li>
                <Button>
                  <span onClick={() => toggleModal()}> Add a product </span>
                </Button>
              </li>
            </ul>
          </div>

          <Modal {...configModal}>
            <div className="addNewProductForm">
              <form onSubmit={handleSubmit}>
                <h2>Add new product</h2>

                <FormSelect
                  label="Category"
                  options={[
                    {
                      value: "M",
                      name: "Mens",
                    },
                    {
                      value: "W",
                      name: "Womens",
                    },
                  ]}
                  handleChange={(e) => setProductCategory(e.target.value)}
                />

                <FormInput
                  label="Name"
                  type="text"
                  value={productName}
                  handleChange={(e) => setProductName(e.target.value)}
                />

                <FormInput
                  label="Main image URL"
                  type="url"
                  value={productThumbnail}
                  handleChange={(e) => setProductThumbnail(e.target.value)}
                />

                <FormInput
                  label="Price"
                  type="number"
                  min="0.00"
                  max="10000.00"
                  step="0.01"
                  value={productPrice}
                  handleChange={(e) => setProductPrice(e.target.value)}
                />
                <CKEditor
                  onChange={(evt) =>
                    setProductDescription(evt.editor.getData())
                  }
                />
                <br />

                <Button type="submit">Add product</Button>
              </form>
            </div>
          </Modal>

          <div className="manageProducts">
            <table border="0" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <th>
                    <h1>Manage Products</h1>
                  </th>
                </tr>
                <tr>
                  <td>
                    <table
                      className="results"
                      border="0"
                      cellPadding="10"
                      cellSpacing="0"
                    >
                      <tbody>
                        {Array.isArray(data) &&
                          data.length > 0 &&
                          data.map((product, index) => {
                            const { sku, name, price, image, category } =
                              product;
                            return (
                              <tr>
                                <td>
                                  <img
                                    className="thumb"
                                    src={process.env.REACT_APP_BASE_URL + image}
                                    alt="pic"
                                  />
                                </td>
                                <td>{category}</td>
                                <td>{name}</td>
                                <td>${price}</td>
                                <td>sku:{sku}</td>
                                <td>
                                  <Button>
                                    <span
                                      onClick={() =>
                                        dispatch(
                                          deleteProductStart({
                                            sku: sku,
                                            pageNav: page,
                                          })
                                        )
                                      }
                                    >
                                      Delete
                                    </span>
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <PageNavButton {...configPageNavButton} />
          </div>
        </div>
      </AdminLayout>
    </WithAdminAuth>
  );
};

export default Admin;
