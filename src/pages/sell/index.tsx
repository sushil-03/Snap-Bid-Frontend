import ProductStepper from "@/components/molecules/ProductStepper";
import React, { useState } from "react";
import ProductSellDetail from "@/components/molecules/ProductSellDetail";
import ProductBiddingDetail from "@/components/molecules/ProductBiddingDetail";
import ProductSellerDetail from "@/components/molecules/ProductSellerDetail";

const index = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  // images
  const renderComponent = (activeStep: number) => {
    if (activeStep == 0) {
      return <ProductSellDetail setActiveStep={setActiveStep} />;
    } else if (activeStep == 1) {
      return <ProductBiddingDetail setActiveStep={setActiveStep} />;
    }
    return <ProductSellerDetail setActiveStep={setActiveStep} />;
  };

  return (
    <div className="w-full h-full min-h-screen mt-32">
      <div className="flex flex-col w-4/6 gap-2 p-4 px-10 pb-16 mx-auto mt-24 bg-stone-100 rounded-xl">
        <ProductStepper activeStep={activeStep} />
        {renderComponent(activeStep)}
      </div>
    </div>
  );
};

export default index;
