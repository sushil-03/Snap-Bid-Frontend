import React, { FC } from "react";
import Image from "next/image";
import Button from "../atoms/Button";
import Link from "next/link";
import { ProductType } from "@/endpoints/product";
import Countdown from "react-countdown";
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
  const getTime = () => {
    const start = new Date(productData.starting!);
    const end = new Date(productData.ending!);
    const now = Date.parse(new Date().toISOString());
    const endStamp = Date.parse(end.toISOString());
    const startStamp = Date.parse(start.toISOString());
    if (now > endStamp) {
      return (
        <p
          className={`md:text-lg sm:text-sm text-xs ${
            productData.status === "Expired"
              ? "text-rose-600"
              : productData.status === "Completed"
              ? "text-green-700"
              : productData.status === "PaymentOnDelivery" ||
                productData.status === "Transaction"
              ? // ? " text-sky-600"
                "  text-cyan-500"
              : ""
          }   font-baiMedium`}
        >
          {productData.status === "PaymentOnDelivery"
            ? "COD"
            : productData.status}
        </p>
      );
    }
    if (now < startStamp) {
      return (
        <div className="">
          <p className="hidden text-xs text-white/60 sm:text-sm sm:block">
            Start on
          </p>
          <p className="w-24 text-xs sm:w-36 sm:text-sm md:text-base font-baiMedium whitespace-nowrap">
            {/* {formatDuration(startStamp - now)} */}
            <Countdown
              date={start}
              renderer={({ hours, minutes, seconds, completed }) => (
                <div>
                  {completed
                    ? "Bid Started"
                    : `${hours.toString().padStart(2, "0")}h : 
                  ${minutes.toString().padStart(2, "0")}m : 
                  ${seconds.toString().padStart(2, "0")}s`}
                </div>
              )}
            ></Countdown>
          </p>
        </div>
      );
    }

    const result = endStamp - now;
    console.log("result", result);
    // const remainingTime = formatDuration(result);

    // return remainingTime;
    return (
      <div>
        <p className="hidden w-20 text-xs text-white/60 sm:text-sm sm:block">
          Time Left
        </p>
        <div className="w-24 text-xs sm:w-36 sm:text-sm md:text-base font-baiMedium whitespace-nowrap">
          {/* {remainingTime} */}
          <Countdown
            date={end}
            renderer={(props) => (
              <div className="text-xs md:text-base">
                {props.hours.toString().padStart(2, "0")}h :{" "}
                {props.minutes.toString().padStart(2, "0")}m :{" "}
                {props.seconds.toString().padStart(2, "0")}s
              </div>
            )}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={` relative items-center inline-block rounded-md  sm:rounded-xl shadow-[8px_8px_30px_rgb(0,0,0,0.12)] bg-transparent z-20 overflow-hidden w-full  xs:h-[18rem] sm:h-[28rem] h-[16rem] ${classname}   `}
    >
      {/* <span className="sm:bg-blue-500 xs:bg-red-500 xxs:bg-purple-800 bigMobile:bg-black-800 mobile:bg-yellow-800">
        COlor
      </span> */}
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
        <div className="w-full h-full ">
          <Link href={`/product/${productData._id}`}>
            <div className="relative w-full h-full ">
              <div className="relative ">
                {/* profile */}

                {/* Product Image */}
                <div className="relative flex items-center w-full h-40 sm:h-80 xs:h-40 xxs:h-30 ">
                  <Image
                    src={
                      productData.images && productData.images[0]
                        ? productData.images[0].fileimage
                        : "/images/profile/p1.png"
                    }
                    alt=""
                    fill
                    className="object-cover -z-20"
                  />
                  <div className="absolute right-0 top-1 xs:top-3 sm:right-4 sm:left-0 left-1">
                    <Image
                      src="/images/profile/p1.png"
                      alt=""
                      height={300}
                      width={40}
                      className="object-contain overflow-hidden "
                    />
                  </div>
                </div>
                <div className="absolute hidden w-11/12 ml-3 text-white/90 -bottom-5 sm:block">
                  {/* <div className="flex items-center justify-between px-2 overflow-hidden bg-gradient-to-tr from-gray-700 via-gray-900 to-black rounded-xl backdrop-brightness00 backdrop-brightness-150 font-bai"> */}
                  {/* <div className="flex items-center justify-between px-2 overflow-hidden bg-gradient-to-t    from-gray-900    from-50% via-gray-900 to-gray-700 to-100% rounded-xl backdrop-brightness00 backdrop-brightness-150 font-bai"> */}
                  <div className="flex items-center justify-between px-2 overflow-hidden bg-gradient-to-t    from-gray-900    from-50% via-gray-900 to-gray-700 to-100% rounded-xl backdrop-brightness00 backdrop-brightness-150 font-bai">
                    <div className="px-2 py-5">
                      <p className="text-xs text-white/60 sm:text-sm">
                        Max Bid
                      </p>
                      <p className="text-xs sm:text-sm font-baiMedium whitespace-nowrap">
                        {productData.maxBid} ₹
                      </p>
                    </div>
                    <div className="px-1 py-5 lg:px-2">{getTime()}</div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full px-2 pt-3 text-gray-200 sm:pt-6 sm:px-6 rounded-b-xl bg-black-900">
                <div className="flex items-center justify-between text-lg uppercase md:text-xl font-baiMedium">
                  <p className="overflow-hidden text-xxs xxs:text-xs sm:text-sm sm:flex-1 md:text-base whitespace-nowrap text-ellipsis">
                    {productData.title}
                  </p>
                  <div className="relative w-10 h-7">
                    <Image
                      src={"/images/profile/p2.png"}
                      alt="profile"
                      fill
                      className="hidden object-contain xxs:block"
                    ></Image>
                  </div>
                </div>
                <div
                  className={`flex  items-center justify-between mt-1  sm:hidden ${
                    isShowBid ? "xs:flex-col" : "xs:flex-col"
                  }`}
                >
                  <p className="text-sm font-semibold xs:text-xs ">
                    ${productData.maxBid}{" "}
                  </p>
                  <p className="!text-xs">{getTime()}</p>
                </div>
                <div
                  className={`items-center justify-between  mt-1  xs:mt-3 sm:mt-0 ${
                    isShowBid ? "sm:block hidden " : "xxs:flex hidden"
                  }`}
                >
                  <div className="flex gap-2 pb-4 sm:block">
                    <p className="text-xs text-gray-500 font-baiMedium">
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
                className="px-3 !py-1 sm:text-base xxs:text-sm text-xs sm:px-8 sm:py-[6px] bg-violet-600 hover:bg-violet-800 hover:scale-90 border-1 border-white hover:border-none transform transition-all duration-700 ease-in-out shadow-md disabled:bg-gray-800"
                disabled={productData.status !== "Pending"}
              >
                Bid
              </Button>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
