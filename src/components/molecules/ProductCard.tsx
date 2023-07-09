import React, { FC } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Button from "../atoms/Button";
import Link from "next/link";
import { ProductType } from "@/endpoints/product";
type CurrProductType = {
  isShowBid?: Boolean;
  classname?: string;

  productData: {
    _id: string;
    startingBid: number;
    timeleft: string;
    title: string;
    totalBid: string;
  } & Partial<ProductType>;
};

const ProductCard: FC<CurrProductType> = ({
  isShowBid,
  classname,
  productData,
}) => {
  const helper = (time: Date, date: Date) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    // Extract the time components from the reference time
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();

    // Create a new date by combining the extracted date and time components
    const newDate = new Date(
      Date.UTC(year, month, day, hours, minutes, seconds)
    );
    return newDate;
  };
  const formatDuration = (timeDifferenceMs: number) => {
    const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifferenceMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifferenceMs / (1000 * 60)) % 60);

    const formattedTimeDifference = `${days}d :${hours
      .toString()
      .padStart(2, "0")}h:${minutes.toString().padStart(2, "0")}m`;
    return formattedTimeDifference;
  };

  if (!productData) return <div></div>;
  const getTime = () => {
    const startingTime = new Date(productData.startingTime!);
    const endingTime = new Date(productData.endingTime!);
    const startingDate = new Date(productData.startingDate!);
    const endingDate = new Date(productData.endingDate!);

    const now = new Date(Date.now());
    const start = helper(startingTime, startingDate);
    const end = helper(endingTime, endingDate);
    if (now.getTime() > end.getTime()) {
      return (
        <>
          <p className="text-xl text-red-300 font-orbitron ">Expired</p>
        </>
      );
    }
    if (now.getTime() < start.getTime()) {
      return (
        <>
          <p className="text-xs ">Start on</p>
          <p className="textxl font-orbitron">{start.toDateString()}</p>
        </>
      );
    }

    const result = end.getTime() - now.getTime();
    console.log("result", result);
    const remainingTime = formatDuration(result);

    // return remainingTime;
    return (
      <>
        <p className="text-xs ">Time Left</p>
        <p className="textxl font-orbitron">{remainingTime}</p>
      </>
    );
  };
  return (
    <Fragment>
      <div
        className={` relative items-center inline-block  mb-10  rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.)] z-40 overflow-hidden ${classname}`}
      >
        <div className="relative overflow-hidden">
          <Link href={`/product/${productData._id}`}>
            <div className="relative ">
              {/* profile */}
              <Image
                src="/images/profile/p1.png"
                alt=""
                height={30}
                width={40}
                className="absolute overflow-hidden top-3 right-4"
              />
              {/* Product Image */}
              <div className="relative flex items-center w-full h-80">
                <Image
                  src={
                    productData.images && productData.images[0]
                      ? productData.images[0].fileimage
                      : "/images/profile/p1.png"
                  }
                  alt=""
                  fill
                  className="-z-20"
                />
              </div>
              <div className="absolute w-11/12 ml-3 bottom-2">
                <div className="flex items-center justify-between overflow-hidden rounded-xl backdrop-blur-2xl backdrop-brightness-100 font-bai">
                  <div className="px-2 py-5">
                    <p className="text-xs ">Start From</p>
                    <p className="text-sm font-orbitron">
                      {productData.startingBid} eth
                    </p>
                  </div>
                  <div className="px-2 py-5">
                    {getTime()}
                    {/* <p className="text-xs ">Time Left</p>
                    <p className="textxl font-orbitron">{getTime()}</p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8 py-6 text-white rounded-b-xl bg-black-600">
              <div className="flex text-2xl uppercase font-baiMedium">
                <p className="flex-1"> {productData.title}</p>
                <Image
                  src={"/images/profile/p2.png"}
                  alt="profile"
                  height={30}
                  width={40}
                ></Image>
              </div>
              <div className="flex items-center justify-between">
                <div className="pb-4">
                  <p className="text-xs text-gray-500 font-orbitron">
                    Total Bidders
                  </p>
                  <p className="text-xs">{productData.totalBid} users</p>
                </div>
                <div></div>
              </div>
            </div>
          </Link>
        </div>
        <div
          className={`absolute transform -translate-x-1/2 bottom-2 z-50 left-1/2  ${
            isShowBid ? "block" : "hidden"
          }`}
        >
          <Button
            variant="tertiary"
            className="px-8 py-[6px] bg-violet-600 hover:bg-violet-800 hover:scale-90 border-1 border-white hover:border-none transform transition-all duration-700 ease-in-out shadow-md"
          >
            Bid
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
