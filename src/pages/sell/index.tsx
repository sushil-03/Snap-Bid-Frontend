import ProductStepper from "@/components/molecules/ProductStepper";
import React, { useState } from "react";
import ProductSellDetail from "@/components/molecules/ProductSellDetail";
import ProductBiddingDetail from "@/components/molecules/ProductBiddingDetail";
import ProductSellerDetail from "@/components/molecules/ProductSellerDetail";
import { Dayjs } from "dayjs";
import { ProductType, ProductImageType } from "@/endpoints/product";
import { useCreateProduct } from "@/hooks/mutation/useAddProduct";

const initialValues: ProductType = {
  brand: "tesla",
  title: "carrrrrrr",
  description: "this is description",
  images: [],
  category: "Other",
  owner: "3rd",
  condition: "Old",
  location: "Dehradun",
  startingBid: 2000,
  // startingDate:new Date(),
  // endingDate: new Date(),
  // startingTime: new Date(),
  // endingTime: new Date(),
  startingDate: "",
  endingDate: "",
  startingTime: "",
  endingTime: "",
  paymentInfo: "Online",

  shippingInfo: "self",
};

const index = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  // images
  const [product, setProduct] = useState<ProductType>(initialValues);

  const handleChange = (value: string | Dayjs | Date, name: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (image: ProductImageType) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, image],
    }));
  };

  console.log("___PRODUCT", product);
  const { mutate: proposeCreateProduct, isLoading } = useCreateProduct();
  const handleSubmit = () => {
    console.log("_____MY PRODUCT", product);
    console.log("_____MY TEST", product.startingTime);
    // product.startingTime = product.startingTime.toISOString();
    console.log("Test __", product.startingDate);

    proposeCreateProduct(product, {
      onSuccess(result) {
        console.log("Evevrthing went right ", result);
      },
      onError(error) {
        console.log("SOmething went wrong ", error);
      },
    });
  };
  const renderComponent = (activeStep: number) => {
    if (activeStep == 0) {
      return (
        <ProductSellDetail
          product={product}
          handleImageChange={handleImageChange}
          setActiveStep={setActiveStep}
          handleChange={handleChange}
        />
      );
    } else if (activeStep == 1) {
      return (
        <ProductBiddingDetail
          product={product}
          setActiveStep={setActiveStep}
          handleChange={handleChange}
        />
      );
    }
    return (
      <ProductSellerDetail
        product={product}
        setActiveStep={setActiveStep}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );
  };

  return (
    <div className="w-full h-full min-h-screen mt-32">
      <div className="flex flex-col w-full gap-2 p-4 px-2 pb-16 m-6 mx-auto mt-24 sm:px-10 xl:w-4/6 bg-stone-100 rounded-xl shadow-3xl">
        <ProductStepper activeStep={activeStep} />
        {renderComponent(activeStep)}
      </div>
    </div>
  );
};

export default index;
