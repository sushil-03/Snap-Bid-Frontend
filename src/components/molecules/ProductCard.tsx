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
          className={`md:text-md sm:text-sm text-xs ${
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
          <p className="hidden w-20 text-xs text-white/60 sm:text-sm md:block">
            Start on
          </p>
          <div className="w-full text-[12px] xxs:text-[14px] xs:text-lg sm:text-base font-baiMedium whitespace-nowrap">
            <div className="w-full md:w-32 ">
              <Countdown
                date={productData.starting}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  const isDays = days == 0;
                  return (
                    <div>
                      {completed
                        ? "Bid Started"
                        : `${
                            !isDays
                              ? `${days.toString().padStart(2, "0")}d :`
                              : ""
                          }
                  ${hours.toString().padStart(2, "0")}h : 
                ${minutes.toString().padStart(2, "0")}m : 
                ${seconds.toString().padStart(2, "0")}s`}
                    </div>
                  );
                }}
              ></Countdown>
            </div>
          </div>
        </div>
      );
    }
    // const remainingTime = formatDuration(result);

    // return remainingTime;
    return (
      <div>
        <p className="hidden text-xs text-white/60 sm:text-sm md:block">
          Time Left
        </p>
        <div className="w-full  md:w-36 text-[12px]   xs:text-lg sm:text-base font-baiMedium whitespace-nowrap">
          {/* {remainingTime} */}
          <div className="flex items-center justify-center w-full xs:w-28 sm:w-32">
            <Countdown
              date={end}
              renderer={({ days, hours, minutes, seconds, completed }) => {
                const isDays = days == 0;
                return (
                  <div>
                    {completed
                      ? "Bid Started"
                      : `${
                          !isDays
                            ? `${days.toString().padStart(2, "0")}d :`
                            : ""
                        }
                  ${hours.toString().padStart(2, "0")}h : 
                ${minutes.toString().padStart(2, "0")}m : 
                ${seconds.toString().padStart(2, "0")}s`}
                  </div>
                );
              }}
            ></Countdown>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={` relative items-center inline-block rounded-md  sm:rounded-xl shadow-[8px_8px_30px_rgb(0,0,0,0.12)] bg-transparent z-20 overflow-hidden w-full h-[21rem] xxs:h-[20rem] md:h-[25rem] lg:h-[30rem] sm:h-[24rem] xs:h-[23rem] ${classname}   `}
    >
      {/* <span className="md:bg-orange-600 lg:bg-fuchsia-800 sm:bg-blue-500 xs:bg-red-800 xxs:bg-purple-800 bigMobile:bg-black-800 mobile:bg-yellow-800">
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
                <div className="relative flex items-center w-full h-40 xs:h-56 md:h-60 lg:h-80 ">
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
                  <div className="absolute right-0 hidden top-1 xs:top-3 sm:right-4 sm:left-0 left-1 md:block">
                    <Image
                      src="/images/profile/p1.png"
                      alt=""
                      height={300}
                      width={40}
                      className="object-contain overflow-hidden "
                    />
                  </div>
                </div>
                <div className="absolute  lg:w-11/12 w-[96%] lg:ml-3 ml-1 text-white/90 -bottom-5 block">
                  {/* <div className="flex items-center justify-between px-2 overflow-hidden bg-gradient-to-tr from-gray-700 via-gray-900 to-black rounded-xl backdrop-brightness00 backdrop-brightness-150 font-bai"> */}
                  {/* <div className="flex items-center justify-between px-2 overflow-hidden bg-gradient-to-t    from-gray-900    from-50% via-gray-900 to-gray-700 to-100% rounded-xl backdrop-brightness00 backdrop-brightness-150 font-bai"> */}
                  <div className="xs:flex md:flex-row flex-col hidden items-center justify-between md:px-2  overflow-hidden bg-gradient-to-t    from-gray-900    from-50% via-gray-900 to-gray-700 to-100% rounded-xl backdrop-brightness00 backdrop-brightness-150    px-1 py-2">
                    <div className="flex flex-row items-center justify-between w-11/12 px-2 md:w-auto md:flex-col xxs:py-2 sm:py-1 md:py-5 md:gap-0">
                      <p className="text-[10px] xxs:text-xs text-white/60 sm:text-sm">
                        Max Bid
                      </p>
                      <p className="text-[12px] xxs:text-[14px] sm:text-base font-baiMedium whitespace-nowrap">
                        ₹{productData.maxBid}
                      </p>
                    </div>
                    <div className="px-2 sm:py-1 md:py-5">{getTime()}</div>
                  </div>
                </div>
              </div>
              {/* px-2 pt-6 pb-10 text-gray-200 xs:pt-10 md:py-5 lg:pt-3 sm:px-6 */}
              <div className="w-full h-full p-2 text-gray-200 rounded-b-xl bg-black-900 xs:p-6">
                <div className="flex items-center justify-between text-lg uppercase md:text-xl font-baiMedium">
                  <p className="overflow-hidden text-sm sm:flex-1 xs:text-base whitespace-nowrap text-ellipsis">
                    {productData.title}
                  </p>
                  <div className="relative hidden w-10 h-7 xs:block">
                    <Image
                      src={"/images/profile/p2.png"}
                      alt="profile"
                      fill
                      className="hidden object-contain xxs:block"
                    ></Image>
                  </div>
                </div>
                <div
                  className={`flex  items-center justify-between mt-1  xs:hidden ${
                    isShowBid ? "flex-col" : "flex-col"
                  }`}
                >
                  <p className="text-sm font-semibold xs:text-xs ">
                    ₹{productData.maxBid}{" "}
                  </p>
                  <p className="!text-xs">{getTime()}</p>
                </div>
                <div
                  className={`items-center justify-between  mt-1  xs:mt-3 sm:mt-0  ${
                    isShowBid ? "block  " : "flex"
                  }`}
                >
                  <div className="flex flex-col gap-0 pb-4">
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
                disabled={productData.status === "Pending"}
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
