import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GET } from "../../../config/getFunction";
import { baseApiURL, baseApiURLForAdmin } from "../../../config/api";
import { Input, Button } from "../../components";
import { POST } from "../../../config/postFunction";

const Product = ({ setLoadingProgress }) => {
  const { id } = useParams();
  const location = useLocation();
  const [pathname, setPathName] = useState(location.pathname);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [imagePopup, setImagePopup] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [mainImage, setMainImage] = useState({
    id: null,
    image: null,
  });
  const [btnType, setBtnType] = useState("UPLOAD");

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  const getProduct = async () => {
    try {
      if (!id) {
        return;
      }
      console.log(id);
      GET(`${baseApiURL}/product?id=${id}`)
        .then((data) => {
          if (data.status == 200) {
            console.log(data);
            setCurrentProduct(data.product[0]);
            setMainImage({ id: 0, image: data.product[0].productImage });
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
    }
  };

  const createNewProductImage = async (e) => {
    try {
      let token = localStorage.getItem("__token");
      if (!token) {
        alert("you are unauthorized");
        return;
      }
      if (!currentProduct) return;
      POST(
        `${baseApiURLForAdmin}/createproductimage?adminapikey=${token}&productId=${currentProduct._id}`,
        { productImage: newImageUrl }
      )
        .then((product) => {
          console.log(product);
          if (product.status == 201) {
            setCurrentProduct(product.product);
            setMainImage({
              id: 0,
              image:
                product.product.productImages[
                  product.product.productImages.length - 1
                ].image,
            });
            alert("image uploaded");
            setNewImageUrl("");
            setImagePopup(false);
          } else {
            alert(product.message);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const editBtnFunction = () => {
    setBtnType("EDIT");
    setImagePopup(true);
    setNewImageUrl(mainImage.image);
  };

  const editShowCaseImage = (e) => {
    try {
      let token = localStorage.getItem("__token");
      if (!token) {
        alert("unauth");
        return;
      }

      if (!currentProduct) return;

      let apiURL;
      let data;
      if (currentProduct.productImage == mainImage.image && mainImage.id == 0) {
        apiURL = `${baseApiURLForAdmin}/changeproductmainimage?adminapikey=${token}&productId=${currentProduct._id}`;
        data = {
          productImage: newImageUrl,
        };

        // for main image updation
        POST(apiURL, data)
          .then((product) => {
            console.log(product);
            if (product.status == 201) {
              setImagePopup(false);
              setCurrentProduct(product.product);
              setMainImage({
                id: 0,
                image: newImageUrl,
              });
              alert(product.message);
              setNewImageUrl("");
            } else {
              alert(product.message);
            }
          })
          .catch((err) => {
            console.log(err);
            alert(err.message);
          });
      } else {
        console.log(mainImage);
        apiURL = `${baseApiURLForAdmin}/changeproductimages?adminapikey=${token}&productId=${currentProduct._id}`;
        data = {
          productImage: newImageUrl,
          id: mainImage.id,
        };

        // for edit image updation
        POST(apiURL, data)
          .then((product) => {
            console.log(product);
            if (product.status == 201) {
              setImagePopup(false);
              setCurrentProduct(product.product);
              setMainImage({
                ...mainImage,
                image: newImageUrl,
              });
              alert(product.message);
              setNewImageUrl("");
            } else {
              alert(product.message);
            }
          })
          .catch((err) => {
            console.log(err);
            alert(err.message);
          });
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const performAction = async (e) => {
    e.preventDefault();
    if (newImageUrl == null || newImageUrl == "") {
      alert("please give us the product image");
      return;
    }
    if (btnType == "UPLOAD") {
      createNewProductImage();
      setBtnType("UPLOAD");
    } else {
      editShowCaseImage();
      setBtnType("UPLOAD");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  function isVideo(filename) {
    const videoExtensions = [
      ".mp4",
      ".avi",
      ".mov",
      ".mkv",
      ".wmv",
      ".flv",
      ".webm",
    ];
    const ext = filename.slice(filename.lastIndexOf("."));

    return videoExtensions.includes(ext);
  }

  return (
    <>
      {/* image add popup */}
      <div
        className={`fixed ${
          imagePopup ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] z-50`}
      >
        <form
          className="w-[300px] h-auto px-4 py-3 bg-white rounded-md"
          onSubmit={performAction}
        >
          <div className="flex items-center justify-end">
            <div
              onClick={() => {
                setNewImageUrl("");
                setBtnType("UPLOAD");
                setImagePopup(false);
              }}
              className="flex-center p-2 text-xl hover:bg-zinc-300 transition rounded-md cursor-pointer"
            >
              <ion-icon name="close-outline"></ion-icon>
            </div>
          </div>
          <Input
            id="productImage"
            Label="ProductImage"
            Type="text"
            PlaceHolder="Past Image Link Here"
            ContainerStyles="w-full mt-2"
            InputStyles="w-full font-Karla"
            Value={newImageUrl}
            handleChange={(e) => {
              setNewImageUrl(e.target.value);
            }}
          />
          <Button
            type="submit"
            Text={btnType == "UPLOAD" ? "Upload Image" : "Edit Image"}
            styles="w-full font-Karla text-sm mt-6 rounded-md"
          />
        </form>
      </div>
      {/* image add popup ends  */}

      <section className="admin__product my-8">
        <div className="container mx-auto px-4 sm:px-0">
          <div className="page__header mb-6 flex items-center bg-blue-300 shadow-md w-max py-3 px-4 rounded-md">
            <div className="flex-center text-sm">
              <ion-icon name="home-outline"></ion-icon>
            </div>
            <p className="font-Karla capitalize text-sm">
              {pathname}/{currentProduct && currentProduct.productName}
            </p>
            <div className="flex-center text-sm">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="product__images w-1/2">
              {/* main image  */}
              <div
                className={`product__image__main relative w-full h-[350px] flex items-center justify-center rounded-md`}
              >
                <div
                  onClick={editBtnFunction}
                  className="absolute right-2 cursor-pointer top-2 text-white py-3 px-4 rounded-md bg-[rgba(0,0,0,0.8)] flex items-center justify-center"
                >
                  <ion-icon name="create-outline"></ion-icon>
                </div>
                <div className="absolute right-[9%] cursor-pointer top-2 text-white py-3 px-4 rounded-md bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
                  <ion-icon name="trash-outline"></ion-icon>
                </div>
                <div
                  onClick={() => {
                    setImagePopup(true);
                  }}
                  className="absolute right-[17%] cursor-pointer top-2 text-white py-3 px-4 rounded-md bg-[rgba(0,0,0,0.8)] flex items-center justify-center"
                >
                  <ion-icon name="add-circle-outline"></ion-icon>
                </div>
                {currentProduct &&
                  mainImage &&
                  (isVideo(mainImage.image) ? (
                    <video
                      muted={true}
                      autoPlay={true}
                      loop={true}
                      className="w-full h-full -z-10 object-contain object-center"
                    >
                      <source src={mainImage.image}></source>
                    </video>
                  ) : (
                    <img
                      src={mainImage.image}
                      alt="image"
                      className="w-full h-full object-contain object-center transition"
                    />
                  ))}
              </div>
              {/* main image  */}
              <div className="product__images__others flex items-center gap-3 my-4 overflow-auto">
                {currentProduct && (
                  <div
                    className={`others ${
                      mainImage &&
                      mainImage.image == currentProduct.productImage
                        ? "border-2 border-zinc-900"
                        : ""
                    } w-[60px] h-[60px] rounded-md flex-shrink-0`}
                    onClick={() => {
                      setMainImage({
                        id: 0,
                        image: currentProduct.productImage,
                      });
                    }}
                  >
                    <img
                      className="w-full h-full object-cover object-center"
                      src={currentProduct.productImage}
                      alt="imageone"
                    />
                  </div>
                )}
                {currentProduct && currentProduct.productImages.length > 0 ? (
                  currentProduct.productImages.map((item, key) => {
                    return (
                      <div
                        key={item.id}
                        className={`others w-[60px] h-[60px] rounded-md flex-shrink-0 ${
                          mainImage && mainImage.image == item.image
                            ? "border-2 border-zinc-900"
                            : ""
                        }`}
                        onClick={() => {
                          setMainImage({ id: item.id, image: item.image });
                        }}
                      >
                        {isVideo(item.image) ? (
                          <video
                            className="w-full h-full object-cover object-center"
                            muted={true}
                          >
                            <source src={item.image}></source>
                          </video>
                        ) : (
                          <img
                            className="w-full h-full object-cover object-center"
                            src={item.image}
                            alt="imageone"
                          />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="others w-[60px] h-[60px] bg-zinc-600 rounded-md flex-shrink-0"></div>
                )}
              </div>
            </div>
            {/* right side  */}
            <div className="product__details w-1/2">
              <div className="product__title">
                <h1 className="font-Karla font-semibold leading-7 text-2xl">
                  {" "}
                  {currentProduct && currentProduct.productName}
                </h1>
              </div>
              <div className="product__description mt-4 font-Karla text-sm">
                {currentProduct && currentProduct.productDescription}
              </div>
              <div className="product__rating my-3 flex items-center gap-2">
                <div className="rating bg-blue-600 w-max py-1 px-2 text-xs rounded-md text-white font-Karla">
                  4.2
                </div>
                <p className="font-Karla text-sm">386 rating & 200 reviews</p>
              </div>
              <div className="product__price my-4 flex items-center gap-2">
                <h1 className="font-Karla font-semibold text-3xl">
                  {currentProduct && currentProduct.price}
                </h1>
                <p className="text-gray-400 font-Karla line-through">3999</p>
                <p className="font-Karla text-blue-500 font-semibold text-xl">
                  {currentProduct && currentProduct.discount}% off
                </p>
              </div>
              <div className="product__edit__btn flex items-center gap-3">
                <button
                  type="button"
                  className="flex items-center py-3 px-4 text-sm font-Karla gap-2 bg-blue-600 cursor-pointer hover:bg-blue-400 transition text-white rounded-md shadow-lg hover:shadow-none"
                >
                  <ion-icon name="create-outline"></ion-icon>
                  Edit Product Details
                </button>
                <button
                  type="button"
                  className="flex items-center py-3 px-4 text-sm font-Karla gap-2 bg-zinc-900 transition hover:bg-zinc-500  text-white rounded-md shadow-lg hover:shadow-none"
                >
                  <ion-icon name="trash-outline"></ion-icon>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
