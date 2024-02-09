import React, { FC } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Button from "../atoms/Button";
import Link from "next/link";
import { ProductType } from "@/endpoints/product";
export type CurrProductType = {
  isShowBid?: Boolean;
  classname?: string;
  isLoading?: boolean;
  productData: {
    _id: string;
    startingBid: number;
    timeleft: string;
    title: string;
    totalBid: string;
    status: string;
    maxBid: number;
    allBidder: {
      bidder: string;
      bidAmount: number;
    }[];
  } & Partial<ProductType>;
};

const ProductCard: FC<CurrProductType> = ({
  isShowBid,
  classname,
  productData,
  isLoading,
}) => {
  const formatDuration = (timeDifferenceMs: number) => {
    const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifferenceMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifferenceMs / (1000 * 60)) % 60);
    const second = Math.floor((timeDifferenceMs / 1000) % 60);

    let formattedTimeDifference = `${days
      .toString()
      .padStart(2, "0")}d : ${hours.toString().padStart(2, "0")}h : ${minutes
      .toString()
      .padStart(2, "0")}m`;
    if (days === 0) {
      formattedTimeDifference =
        formattedTimeDifference.slice(6) +
        " : " +
        second.toString().padStart(2, "0") +
        "s";
    }

    return formattedTimeDifference;
  };

  // if (!productData) return <div></div>;
  const getTime = () => {
    const start = new Date(productData.starting!);
    const end = new Date(productData.ending!);
    const now = Date.parse(new Date().toISOString());
    const endStamp = Date.parse(end.toISOString());
    const startStamp = Date.parse(start.toISOString());
    if (now > endStamp) {
      return (
        <p
          className={`text-lg ${
            productData.status === "Expired" ? "text-red-600" : "text-green-600"
          }  font-obitron font-OrbitronMedium`}
        >
          {productData.status}
        </p>
      );
    }
    if (now < startStamp) {
      return (
        <div>
          <p className="text-xs ttext-white/60 sm:text-sm">Start on</p>
          <p className="text-sm sm:text-base font-orbitron whitespace-nowrap">
            {formatDuration(startStamp - now)}
          </p>
        </div>
      );
    }

    const result = endStamp - now;
    console.log("result", result);
    const remainingTime = formatDuration(result);

    // return remainingTime;
    return (
      <div>
        <p className="text-xs text-white/60 sm:text-sm">Time Left</p>
        <p className="text-xs sm:text-sm md:text-base font-orbitron whitespace-nowrap">
          {remainingTime}
        </p>
      </div>
    );
  };

  return (
    <Fragment>
      <div
        className={` relative items-center inline-block  rounded-xl shadow-[8px_8px_30px_rgb(0,0,0,0.12)] bg-transparent z-20 overflow-hidden w-[20rem] sm:w-[18rem]  md:w-[20rem] h-[30rem] ${classname}`}
      >
        {isLoading ? (
          <div className="wfull h-full w-[20rem] bg-[#FFF]  relative">
            <div className="w-full h-64 shimmerBG"></div>
            <div className="absolute w-11/12 p-12 -translate-x-1/2 bg-white left-1/2 rounded-xl bottom-28 shimmerBG"></div>
            <div className="absolute w-10 h-10 rounded-full shimmerBG bottom-16 right-5">
              {" "}
            </div>
            <div className="absolute w-32 h-5 rounded-full shimmerBG bottom-20 left-4"></div>
            <div className="absolute w-20 h-5 rounded-full shimmerBG bottom-12 left-4"></div>
            <div className="absolute z-50 w-20 h-6 p-4 transform -translate-x-1/2 rounded-full shimmerBG bottom-2 left-1/2"></div>
          </div>
        ) : (
          <div className="h-full ">
            <Link href={`/product/${productData._id}`}>
              <div className="relative h-full ">
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
                  <div className="absolute w-11/12 ml-3 text-white/90 -bottom-5">
                    <div className="flex items-center justify-between px-2 overflow-hidden rounded-xl backdrop-blur-3xl backdrop-brightness00 backdrop-brightness-150 font-bai">
                      <div className="px-2 py-5">
                        <p className="text-xs text-white/60 sm:text-sm">
                          Max Bid
                        </p>
                        <p className="text-xs sm:text-sm font-orbitron whitespace-nowrap">
                          {productData.maxBid} $
                        </p>
                      </div>
                      <div className="px-2 py-5">{getTime()}</div>
                    </div>
                  </div>
                </div>
                <div className="h-full px-6 pt-6 text-white rounded-b-xl bg-black-900 ">
                  <div className="flex text-lg uppercase md:text-xl font-baiMedium">
                    <p className="flex-1">{productData.title}</p>
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
                      <p className="text-xs">
                        {productData.allBidder.length} users
                      </p>
                    </div>
                    <div></div>
                  </div>
                </div>
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
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProductCard;
