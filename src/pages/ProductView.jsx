//core modules
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";

//other modules
import axios from "axios";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcnui/ui/breadcrumb";

import { Button } from "@/shadcnui/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcnui/ui/dialog";
import { Input } from "@/shadcnui/ui/input";
import { Label } from "@/shadcnui/ui/label";

import { Skeleton } from "@/shadcnui/ui/skeleton";

import { Separator } from "@/shadcnui/ui/separator";
import { Badge } from "@/shadcnui/ui/badge";
import Spacer from "@/shadcnui/ui/Spacer";
import { toast } from "sonner";

import ImageSlider from "../components/ProductView/ImageSlider";
import truncateText from "@/Helper/TextSpliter";

const ProductView = ({ setLoadingProgress }) => {
  const { id, text } = useParams();

  // slider work ========================================>
  const swiperRef = useRef(null);
  const [currentSlide, setcurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // page slide to top =======================================
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  useEffect(() => {
    scrollToTop();
  }, []);

  // =========getting the product from server=====

  const [product, setProduct] = useState(null);
  // null ===> loading
  // true ==> true
  // false ==> false
  const getProduct = async () => {
    setLoadingProgress(30);
    try {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/product?id=${id}`)
        .then((res) => {
          let { data } = res;
          setProduct(data.product);
        })
        .catch((err) => {
          setProduct(false);
          alert(err.message);
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      alert(err.message);
      setProduct(false);
    } finally {
      setLoadingProgress(100);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  // ============== Order =================
  const [dataForOrder, setDataForOrder] = useState({
    purpose: "",
    date: "",
    des: "",
  });

  const handleDataChange = (e) => {
    setDataForOrder({ ...dataForOrder, [e.target.name]: e.target.value });
  };

  const orderNowUsingWht = () => {
    let { purpose, date, des } = dataForOrder;
    if (purpose == "" || !purpose) {
      alert("Please Provide Purpose");
      return;
    }
    if (date == "" || !date) {
      alert("Please Provide us Date");
      return;
    }

    if (!product) return;

    const message = `Hello, I am interested in buying *${
      product.name
    }* which has *_${product.description}*_

*Purpose :* ${purpose}.
*Expect To Be Delivered :* ${date}.
${des ? `*Description :* ${des}` : "Not specified"}`;

    console.log(message);

    const encodedMessage = encodeURIComponent(message);
    console.log(encodedMessage);
    const url = "https://wa.me/9609096095" + "?text=" + encodedMessage;
    window.open(url, "_blank");
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {product == null ? (
        <>
          <div className="product__description my-24">
            <div className="container mx-auto px-4">
              <div className="main__product_view flex gap-0 lg:gap-12">
                <div className="w-1/2 product__image__container">
                  <Skeleton className="w-2/3 max-w-[400px] h-[20px] rounded-full bg-zinc-800" />
                  <Skeleton className="h-[400px] w-full mt-5 bg-zinc-800" />
                </div>
                <div className="w-1/2 product__description__container">
                  <Skeleton className="bg-zinc-800 mt-12 w-full h-4" />
                  <Skeleton className="bg-zinc-800 mt-2 w-2/3 h-4" />
                  <Skeleton className="bg-zinc-800 mt-8 w-28 h-8" />

                  <Skeleton className="bg-zinc-800 mt-12 w-full h-4" />
                  <Skeleton className="bg-zinc-800 mt-2 w-full h-4" />
                  <Skeleton className="bg-zinc-800 mt-2 w-2/3 h-4" />
                  <Skeleton className="bg-zinc-800 mt-2 w-1/2 h-4" />

                  <div className="flex items-center gap-4 mt-8">
                    <Skeleton className="bg-zinc-800 mt-2 w-2/3 h-12" />
                    <Skeleton className="bg-zinc-800 mt-2 w-2/3 h-12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : product ? (
        <section
          id="product__description"
          className="product__description my-24"
        >
          <div className="container mx-auto px-4">
            <div className="flex main__product_view items-start lg:gap-12">
              <div className="product__image__container w-1/2">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink>{text}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {windowWidth <= 375
                          ? truncateText(product.name, 18)
                          : product.name}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="mt-8 flex image__slider__wrapper gap-5">
                  <div className="image__slider__images overflow-auto flex flex-col gap-2 custom-scrollbar px-2">
                    <div
                      className={`image ${
                        currentSlide == 0
                          ? "border-2 border-zinc-900 relative bg-musk"
                          : ""
                      } cursor-pointer bg-zinc-800`}
                      onClick={() => {
                        swiperRef.current.swiper.slideTo(0);
                      }}
                    >
                      <img
                        className="w-full h-full object-cover object-center blur"
                        src={product.productImage}
                        onLoad={(e) => {
                          e.target.classList.add("loaded");
                        }}
                        loading="lazy"
                        alt=""
                      />
                    </div>

                    {product.productImages.map((item, key) => {
                      return (
                        <>
                          <div
                            className={`image cursor-pointer ${
                              key + 1 == currentSlide
                                ? "border-2 border-zinc-900 relative bg-musk"
                                : ""
                            } bg-zinc-800`}
                            onClick={() => {
                              swiperRef.current.swiper.slideTo(key + 1);
                            }}
                          >
                            <img
                              className="w-full h-full object-cover object-center blur"
                              src={item}
                              onLoad={(e) => {
                                e.target.classList.add("loaded");
                              }}
                              loading="lazy"
                              alt=""
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <ImageSlider
                    swiperRef={swiperRef}
                    setcurrentSlide={setcurrentSlide}
                    Images={[product.productImage, ...product.productImages]}
                  />
                </div>
              </div>
              <div className="product__description__container  py-12 w-1/2">
                <div className="flex items-center justify-between mb-3">
                  <div className="">
                    <h1 className="font-Karla font-bold text-3xl">
                      {product.name}
                    </h1>
                    <p className="font-Karla font-semibold text-gray-500 text-sm pl-1 flex items-center">
                      {product.sold} ratings{" "}
                      <span className="mx-2 block w-2 h-2 bg-gray-500 rounded-full"></span>{" "}
                      {product.reviews.length} reviews
                    </p>
                  </div>
                  <div className="flex-center text-6xl text-gray-400">
                    <ion-icon name="heart-circle-outline"></ion-icon>
                  </div>
                </div>
                <Separator />
                <p className="flex gap-1 items-center text-blue-600 font-Karla text-2xl font-bold my-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="blue"
                  >
                    <path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z" />
                  </svg>
                  <span>{product.discount}</span>
                  <Spacer space="2" />
                  <span className="text-base text-gray-400 font-normal line-through">
                    {product.price}
                  </span>
                  <Spacer space="4" />
                  <Badge
                    variant="destructive"
                    className="bg-blue-500 font-Karla"
                  >
                    Special Price
                  </Badge>
                </p>

                <div className="flex shopping_btn items-center mt-10 gap-4">
                  <Button className="bg-red-500 cart_btn w-[240px] py-7 text-lg">
                    <div className="flex-center text-xl mr-3">
                      <ion-icon name="cart-outline"></ion-icon>
                    </div>
                    <span>Add to Cart</span>
                  </Button>
                  {/* whatsapp button with dialog  */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-green-700 wht_btn w-[240px] py-7 text-lg">
                        <div className="flex-center text-xl mr-3">
                          <ion-icon name="logo-whatsapp"></ion-icon>
                        </div>
                        <span>Buy Now</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[450px] w-full">
                      <DialogHeader>
                        <DialogTitle className="font-Karla">
                          Tell Us More
                        </DialogTitle>
                        <DialogDescription className="font-Karla">
                          We would love to know more to provide you the best
                          service.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-6 items-center gap-4">
                          <Label htmlFor="purpose" className="text-left">
                            Purpose
                          </Label>
                          <Input
                            id="purpose"
                            name="purpose"
                            value={dataForOrder.purpose}
                            onChange={handleDataChange}
                            className="col-span-6 sm:col-span-5"
                            placeholder="ex. Birthday,anniversary,etc."
                          />
                        </div>
                        <div className="grid grid-cols-8 items-center gap-2">
                          <Label
                            htmlFor="date"
                            className="text-left col-span-8 sm:col-span-2"
                          >
                            Delivery Date
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            name="date"
                            value={dataForOrder.date}
                            onChange={handleDataChange}
                            placeholder="delivery date"
                            className="col-span-8 sm:col-span-6"
                          />
                        </div>
                        <div className="grid grid-cols-8 items-center gap-3">
                          <Label
                            htmlFor="des"
                            className="text-left col-span-8 sm:col-span-2"
                          >
                            Description
                          </Label>
                          <Input
                            id="des"
                            type="text"
                            name="des"
                            value={dataForOrder.des}
                            onChange={handleDataChange}
                            placeholder="Description"
                            className="col-span-8 sm:col-span-6"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={orderNowUsingWht} type="submit">
                          Message Now
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* whatsapp button with dialog ends */}

                  {/* <Button className="bg-green-700 wht_btn w-[240px] py-7 text-lg">
                    <div className="flex-center text-xl mr-3">
                      <ion-icon name="logo-whatsapp"></ion-icon>
                    </div>
                    <span>Buy Now</span>
                  </Button> */}
                </div>

                <h3 className="mt-12 font-Karla font-semibold text-lg">
                  Product Info
                </h3>

                <div
                  className="mt-3 description_container"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />

                {/* <h3 className="mt-12 font-Karla font-semibold text-lg">
                  Delivery
                </h3>

                <p className="mt-3 font-Karla">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  laboriosam dolorum, id ad non autem ratione adipisci quisquam
                  illum pariatur, accusamus dicta ducimus?
                </p> */}

                {/* <Tabs defaultValue="account" className="w-full mt-8">
                  <TabsList className="flex bg-blue-600 py-6 items-center justify-around">
                    <TabsTrigger
                      className="text-gray-200 rounded-md"
                      value="description"
                    >
                      Description
                    </TabsTrigger>
                    <TabsTrigger
                      className="text-gray-200 rounded-md"
                      value="ProductInfo"
                    >
                      Product Info
                    </TabsTrigger>
                    <TabsTrigger
                      className="text-gray-200 rounded-md"
                      value="delivery"
                    >
                      Delivery
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="description">
                    <div className=" py-3 px-4"></div>
                  </TabsContent>
                  <TabsContent value="ProductInfo">
                    <div className="py-3 px-4">
                      <div className="section_tab">
                        <h3>SKU:</h3>
                        <p>JVS1285567</p>
                      </div>
                      <div className="section_tab">
                        <h3>Constituents</h3>
                        <ul>
                          <li>Care Guide</li>
                          <li>Medium Cylindrical White Box</li>
                          <li>Flowers</li>
                        </ul>
                      </div>
                      <div className="section_tab">
                        <h3>Specifications</h3>
                        <ul>
                          <li>Care Guide</li>
                          <li>
                            Medium Cylindrical White Box
                            <ul>
                              <li>Size: 8 X 7.5 Inches</li>
                            </ul>
                          </li>
                          <li>
                            Flowers
                            <ul>
                              <li>No. of Stems: 31</li>
                              <li>
                                Type of Flowers: Roses, Carnations, Peony Dried,
                                Moti Stick, Pine Bud
                              </li>
                              <li>Colour of Flower: Assorted</li>
                            </ul>
                          </li>
                          <li>Country of Origin: India</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="delivery">
                    <div className="py-3 px-4">
                      <div className="section_tab">
                        <h3> Delivery Info</h3>
                        <ul>
                          <li>
                            {" "}
                            Delivered product might vary slightly from the image
                            shown.
                          </li>
                          <li>
                            {" "}
                            This product is perishable therefore delivery will be
                            attempted only once.
                          </li>
                          <li>
                            The delivery cannot be redirected to any other
                            address.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs> */}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Navigate to="/page-not-found" />
      )}
    </>
  );
};

export default ProductView;
