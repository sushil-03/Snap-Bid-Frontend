import ProductStepper from "@/components/molecules/ProductStepper";
import React, { useState } from "react";
import ProductSellDetail from "@/components/molecules/ProductSellDetail";
import ProductBiddingDetail from "@/components/molecules/ProductBiddingDetail";
import ProductSellerDetail from "@/components/molecules/ProductSellerDetail";
import { Dayjs } from "dayjs";
import { ProductType, ProductImageType } from "@/endpoints/product";
import { useCreateProduct } from "@/hooks/mutation/useAddProduct";
import Loader from "@/components/molecules/Loader";
import { useSelectedUser } from "@/hooks/state/useAppState";
import { toast } from "react-toastify";

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
  startingDate: "",
  endingDate: "",
  startingTime: "",
  endingTime: "",
  paymentInfo: "POS on Delivery",
  shippingInfo: "self",
};

const index = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [user] = useSelectedUser();
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

  const { mutate: proposeCreateProduct, isLoading } = useCreateProduct();
  const handleSubmit = () => {
    if (user.name === "") {
      toast.error("Please login to continue");
      return;
    } else {
      console.log("user", user);
    }
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
  if (isLoading) return <Loader />;
  return (
    <div className="w-full h-full min-h-screen mt-32">
      <div className="flex flex-col w-full gap-2 p-4 px-2 pb-16 m-6 mx-auto mt-24 bg-gray-100 sm:px-10 xl:w-4/6 rounded-xl shadow-3xl">
        <ProductStepper activeStep={activeStep} />
        {renderComponent(activeStep)}
      </div>
    </div>
  );
};

export default index;
