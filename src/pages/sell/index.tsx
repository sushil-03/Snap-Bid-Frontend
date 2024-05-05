import ProductStepper from "@/components/molecules/ProductStepper";
import React, { useState } from "react";
import ProductSellDetail from "@/components/molecules/ProductSellDetail";
import ProductBiddingDetail from "@/components/molecules/ProductBiddingDetail";
import ProductSellerDetail from "@/components/molecules/ProductSellerDetail";
import { Dayjs } from "dayjs";
import { ProductType, ProductImageType } from "@/endpoints/product";
import { useCreateProduct } from "@/hooks/mutation/useAddProduct";
import Loader from "@/components/molecules/Loader";
import toast from "react-hot-toast";

import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useSelectedUser } from "@/hooks/state/useAppState";

// const initialValues: ProductType = {
//   brand: "tesla",
//   title: "carrrrrrr",
//   description: "this is description",
//   timeToPay: 30,
//   images: [],
//   bidIncrement: 0,
//   enable_email: false,
//   category: "Others",
//   owner: "3rd",
//   condition: "Old",
//   startingBid: 2000,
//   startingDate: "",
//   endingDate: "",
//   startingTime: "",
//   endingTime: "",
//   paymentOption: "online",
//   shippingInfo: "self",
//   starting: new Date(),
//   ending: new Date(),
//   addressFrom: {
//     state: "",
//     city: "",
//     country: "",
//     pincode: "",
//   },
// };
const initialValues: ProductType = {
  brand: "",
  title: "",
  description: "",
  images: [],
  timeToPay: 30,
  category: "Others",
  owner: "1st",
  condition: "New",
  startingBid: 0,
  startingDate: "",
  endingDate: "",
  startingTime: "",
  endingTime: "",
  paymentOption: "online",
  shippingInfo: "self",
  starting: new Date(),
  ending: new Date(),
  addressFrom: {
    state: "",
    city: "",
    country: "",
    pincode: "",
  },
  bidIncrement: 0,
  enable_email: false,
};

const combineDateTime = (time: Date, date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Extract the time components from the reference time
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Create a new date by combining the extracted date and time components
  const newDate = new Date(year, month, day, hours, minutes, seconds);
  return newDate;
};
const index = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [user] = useSelectedUser();
  // images
  const [product, setProduct] = useState<ProductType>(initialValues);

  const handleChange = (
    value: string | Dayjs | Date | Boolean,
    name: string
  ) => {
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
    product.starting = combineDateTime(
      new Date(product.startingTime),
      new Date(product.startingDate)
    );
    product.starting.setSeconds(0);

    product.ending = combineDateTime(
      new Date(product.endingTime),
      new Date(product.endingDate)
    );
    product.ending.setSeconds(0);
    console.log("____PRODUCT", product);
    Object.values(product).every((value) => {
      if (value === "") {
        toast.error("Please fill all the fields");
        return false;
      }
      return true;
    });
    if (product.images.length <= 0) {
      toast.error("Please upload atleast 1  image");
      return;
    } else if (
      Date.parse(new Date(product.starting).toISOString()) <
      Date.parse(new Date().toISOString())
    ) {
      toast.error("Starting time should be greater than current time");
      return;
    } else if (
      new Date(product.ending).getTime() < new Date(product.starting).getTime()
    ) {
      toast.error("Ending time should be greater than starting time");
      return;
    } else if (user.selectedAddress === -1) {
      toast.error("Address not selected");
      return;
    }
    const selectedAddress = user.address[user.selectedAddress];
    product.addressFrom = {
      city: selectedAddress.city,
      country: selectedAddress.country,
      state: selectedAddress.state,
      pincode: selectedAddress.pincode,
    };

    console.log("product", product);

    proposeCreateProduct(product, {
      onSuccess(result) {
        console.log("Evevrthing went right ", result);
        queryClient.invalidateQueries(["products", ""]);
        router.push("/explore");
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
          // images={images}
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
    <div className="w-full h-full min-h-screen mt-16 sm:mt-20 md:mt-32">
      <div className="flex flex-col w-full gap-2 p-4 px-0 pb-8 m-6 mx-auto mt-24 bg-gray-100 border-2 border-red-500 md:pb-16 sm:px-2 md:px-10 xl:w-4/6 rounded-xl shadow-3xl">
        <ProductStepper activeStep={activeStep} />
        {renderComponent(activeStep)}
      </div>
    </div>
  );
};

export default index;
