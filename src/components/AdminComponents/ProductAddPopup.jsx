import React, { useState } from "react";
import { baseApiURLForAdmin } from "../../../config/api";
import { POST } from "../../../config/postFunction";

const ProductAddPopup = ({
  setLoadingProgress,
  setIsProductPopupOpen,
  isProductPopupOpen,
  productInfo,
  setProductInfo,
  initialProductInfo,
  products,
  setProducts,
}) => {
  const handleChange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const createProduct = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("__token");
    if (!token) {
      return;
    }
    try {
      if (
        !(
          productInfo.productName &&
          productInfo.productDescription &&
          productInfo.price &&
          productInfo.discount &&
          productInfo.productImage &&
          productInfo.catagories !== "" &&
          productInfo.productUniqueId
        )
      ) {
        alert("give all the data properly");
        return;
      }
      setLoadingProgress(30);
      POST(
        `${baseApiURLForAdmin}/createnewproduct?adminapikey=${token}`,
        productInfo
      )
        .then((data) => {
          setLoadingProgress(70);
          if (data.status == 201) {
            setProducts([...products, data.product]);
            setProductInfo(initialProductInfo);
            setIsProductPopupOpen(false);
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setLoadingProgress(100);
    }
  };

  return (
    <>
      <div
        id="crud-modal"
        tabindex="-1"
        aria-hidden="true"
        class={`fixed ${
          isProductPopupOpen
            ? "pointer-events-auto"
            : "hidden pointer-events-none"
        } top-0 left-0 right-0 bottom-0 z-50 bg-[rgba(0,0,0,0.4)] flex items-center justify-center`}
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 class="text-lg font-semibold text-gray-900">
                Create New Product
              </h3>
              <button
                onClick={() => {
                  setIsProductPopupOpen(false);
                }}
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={createProduct} class="p-4 md:p-5">
              <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="col-span-2">
                  <label
                    for="productName"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type product name"
                    required={true}
                    value={productInfo.productName}
                    onChange={handleChange}
                  />
                </div>
                <div class="col-span-2">
                  <label
                    for="productImage"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Product Image
                  </label>
                  <input
                    type="text"
                    name="productImage"
                    id="productImage"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Product image"
                    required={true}
                    value={productInfo.productImage}
                    onChange={handleChange}
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="price"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="$2999"
                    required={true}
                    value={productInfo.price}
                    onChange={handleChange}
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="catagories"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Category
                  </label>
                  <select
                    name="catagories"
                    id="catagories"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    value={productInfo.catagories}
                    onChange={handleChange}
                  >
                    <option selected value="">
                      Select category
                    </option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="discount"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Discount
                  </label>
                  <input
                    type="number"
                    name="discount"
                    id="discount"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="60"
                    required={true}
                    value={productInfo.discount}
                    onChange={handleChange}
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="productUniqueId"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Product Unique Id
                  </label>
                  <input
                    type="text"
                    name="productUniqueId"
                    id="productUniqueId"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="6023XA"
                    required={true}
                    value={productInfo.productUniqueId}
                    onChange={handleChange}
                  />
                </div>
                <div class="col-span-2">
                  <label
                    for="productDescription"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Product Description
                  </label>
                  <textarea
                    id="productDescription"
                    name="productDescription"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write product description here"
                    value={productInfo.productDescription}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                class="flex items-center gap-2 py-3 px-4 text-sm font-Karla bg-zinc-900 text-white rounded-md transition hover:bg-zinc-600"
              >
                <svg
                  class="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Add new product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAddPopup;
