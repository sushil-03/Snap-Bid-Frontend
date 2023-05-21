import ProductStepper from "@/components/molecules/ProductStepper";
import React, { useState } from "react";
import ProductSellDetail from "@/components/molecules/ProductSellDetail";
import ProductBiddingDetail from "@/components/molecules/ProductBiddingDetail";
import ProductSellerDetail from "@/components/molecules/ProductSellerDetail";
import { categories } from "@/utils/constant";

export type ProductType = {
  brand?: string;
  title?: string;
  description?: string;
  images?: {
    id: string;
    filename: string;
    filetype: string;
    fileimage: string;
    datetime: string;
    filesize: string;
  }[];
  category?:
    | "Car"
    | "Properties"
    | "Mobile"
    | "Bike"
    | "Electronic & Appliances"
    | "Furniture"
    | "Fashion"
    | "Art"
    | "bike"
    | "other";
  owner?: "1st" | "2nd" | "3rd";
  condition?: "Antique" | "New" | "Old" | "Refurbished" | "Used" | "Open Box";
  location?: string;
  startingBid?: Number;
  startingDate?: Date;
  endingDate?: Date;
  sellerName?: string;
  sellerPhone?: string;
  sellerEmail?: string;
  sellerCity?: string;
  sellerState?: string;
  sellerZip?: string;
  paymentInfo?: "online" | "COD" | "POS";
  shippingInfo?: "self" | "arrange";
};
const index = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  // images
  const [product, setProduct] = useState<ProductType>({
    brand: "",
    title: "",
    description: "",
    images: [],
    category: "other",
    owner: "3rd",
    condition: "Old",
    location: "",
    startingBid: 0,
    startingDate: new Date(),
    endingDate: new Date(),
    sellerName: "",
    sellerPhone: "",
    sellerCity: "",
    sellerEmail: "",
    sellerState: "",
    sellerZip: "",
    paymentInfo: "online",
    shippingInfo: "self",
  });
  const renderComponent = (activeStep: number) => {
    if (activeStep == 0) {
      return (
        <ProductSellDetail
          setActiveStep={setActiveStep}
          setProduct={setProduct}
        />
      );
    } else if (activeStep == 1) {
      return (
        <ProductBiddingDetail
          setActiveStep={setActiveStep}
          setProduct={setProduct}
        />
      );
    }
    return (
      <ProductSellerDetail
        setActiveStep={setActiveStep}
        setProduct={setProduct}
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
