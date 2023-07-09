import React, { FC } from "react";
import Image from "next/image";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
export type ProductBidderType = {
  data: {
    profile: string;
    link: string;
    userName: string;
    email: string;
    price: string;
  }[];
};
const ProductBidder = ({ data }: any) => {
  console.log("mydata", data);

  function showRank(key: number) {
    if (key === 0) {
      return (
        <div className="flex items-center justify-center w-20 h-20 text-2xl text-white rounded-full bg-yellow-50 font-baibold">
          <Image src={"/images/ranking.png"} width={50} height={50} alt="1st" />
        </div>
      );
    } else if (key === 1) {
      return (
        <div className="flex items-center justify-center ml-3 text-2xl text-white bg-gray-500 rounded-full w-14 h-14 font-baibold">
          2
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center ml-3 text-2xl text-white bg-yellow-900 rounded-full w-14 h-14 font-baibold">
          {key + 1}
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-md bg-stone-200 last:pb-6">
      {data.length === 0 && (
        <div>
          <div className="flex items-center justify-center p-6 mx-4 mt-4 bg-white rounded-md">
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
            className="flex items-center justify-between p-6 mx-4 mt-4 bg-white rounded-md"
            key={key}
          >
            <div className="flex items-center gap-4 sm:gap-6">
              {showRank(key)}
              <div>
                <p className="text-lg font-baiMedium">
                  {item.bidder.firstname + " " + item.bidder.lastname}
                </p>
                <p className="font-baiMedium">{item.bidder.email}</p>
              </div>
            </div>
            <div>
              <p className="text-3xl font-baibold">${item.bidAmount}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductBidder;
