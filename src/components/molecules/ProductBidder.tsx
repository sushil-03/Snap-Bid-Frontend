import React from "react";
import Image from "next/image";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Button from "../atoms/Button";
import { useSelectedUser } from "@/hooks/state/useAppState";
import { usePayBid } from "@/hooks/mutation/usePayBid";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
export type ProductBidderType = {
  data: {
    profile: string;
    link: string;
    userName: string;
    email: string;
    price: string;
  }[];
};
import { BidType } from "@/endpoints/product";
const ProductBidder = ({ product }: any) => {
  // const queryClient = useQueryClient();
  const [user] = useSelectedUser();

  const { mutate: proposePayment, isLoading } = usePayBid();
  function showRank(key: number) {
    if (key === 0) {
      return (
        <div className="flex items-center justify-center w-8 h-8 text-2xl text-white rounded-full md:w-14 md:h-14 bg-yellow-50 font-baibold">
          <Image src={"/images/ranking.png"} width={50} height={50} alt="1st" />
        </div>
      );
    } else if (key === 1) {
      return (
        <div className="flex items-center justify-center w-8 h-8 text-2xl text-white bg-gray-500 rounded-full md:ml-2 md:w-14 md:h-14 font-baibold">
          2
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-8 h-8 ml-3 text-2xl text-white bg-yellow-900 rounded-full md:ml-2 md:w-14 md:h-14 font-baibold">
          {key + 1}
        </div>
      );
    }
  }
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
  const handlePay = (amount: number) => {
    const data: BidType = {
      productId: product._id,
      amount,
    };
    proposePayment(data, {
      onSuccess(result, value) {
        console.log("PAYMENT____", result);
        console.log("VALUE____", value);

        toast.success("Congratulation Product is on the way,");
        // queryClient.invalidateQueries(["product",productId]);
        // window.location.reload();
        // router.push(`/product/${product._id}`)
      },
      onError() {
        toast.error("Payment didn't go through");
      },
    });
  };
  if (isLoading) {
    return <Loader />;
  }
  const data = product.allBidder;
  return (
    <div className="mx-0 my-4 sm:mx-6 md:mx-12">
      <p className="pb-2 text-sm text-gray-600">
        Payment is done after you won the bid!
      </p>
      <div
        className={`flex flex-col gap-4 rounded-md  last:pb-6 bg-stone-100 `}
      >
        {data.length === 0 && (
          <div>
            <div className="flex items-center justify-center px-3 mx-4 mt-4 bg-white rounded-md sm:p-6">
              <p className="text-2xl font-baiMedium">No Bids Yet</p>
              <Player
                autoplay
                loop
                src=" https://assets1.lottiefiles.com/packages/lf20_8tgrazq6.json"
                style={{ height: "250px", width: "200px" }}
              >
                <Controls
                  visible={false}
                  buttons={["play", "repeat", "frame", "debug"]}
                />
              </Player>
            </div>
          </div>
        )}
        {data.map((item: any, key: number) => {
          return (
            <div
              className={`flex items-center justify-between px-0 py-4 mx-4 mt-4  rounded-md md:py-6 md:px-2 ${
                user._id.toString() === item.bidder._id.toString()
                  ? " bg-blue-400"
                  : "bg-white"
              }
                ${item.paymentInfo.status === "Completed" ? " bg-red-300" : ""}
                `}
              key={key}
            >
              <div className="flex items-center gap-4 sm:gap-6">
                {showRank(key)}
                <div>
                  <p className="text-base md:text-lg font-baiMedium">
                    {item.bidder.firstname + " " + item.bidder.lastname}
                  </p>
                  <p className="text-sm font-baiMedium md:text-base ">
                    {item.bidder.email}
                  </p>
                </div>
              </div>
              <div className="">
                <p className="text-lg xl:text-3xl lg:text-xl font-baibold ">
                  ${item.bidAmount}
                </p>
                <div>
                  {item.paymentInfo.paymentDeadline &&
                  new Date(item.paymentInfo.paymentDeadline).getTime() -
                    Date.now() >
                    0 ? (
                    <p className="text-base md:text-xl font-baiMedium">
                      {item.paymentInfo.status === "Completed"
                        ? "Paid"
                        : formatDuration(
                            new Date(
                              item.paymentInfo.paymentDeadline
                            ).getTime() - Date.now()
                          )}
                    </p>
                  ) : (
                    <p className="text-base xl:text-xl md:text-lg font-baiMedium">
                      Not Available
                    </p>
                  )}
                </div>
              </div>

              <div className="relative align-middle ">
                {item.paymentInfo.status === "Completed" ? (
                  <div className="text-2xl font-baiMedium">
                    <p>Winner</p>
                  </div>
                ) : (
                  <Button
                    variant="tertiary"
                    className={`right-0 absolute top-1/2 -translate-y-1/2 px-3 sm:px-6 py-0 bg-green-700  xl:px-8 disabled:cursor-not-allowed disabled:bg-gray-600  hover:bg-green-900   transition-colors ease-in-out duration-700 shadow-none`}
                    disabled={
                      item.paymentInfo.status !== "Pending" ||
                      user._id !== item.bidder._id
                    }
                    onClick={() => handlePay(item.bidAmount)}
                  >
                    Pay
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductBidder;
