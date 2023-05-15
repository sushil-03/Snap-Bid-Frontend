import React, { FC } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Button from "../atoms/Button";
import Link from "next/link";
type ProductType = {
  isShowBid?: Boolean;
};
const ProductCard: FC<ProductType> = ({ isShowBid }) => {
  return (
    <Fragment>
      <div className="relative items-center inline-block w-1/5 mb-10 border-2 h rounded-xl">
        <Link href="/product">
          <div className="relative">
            {/* profile */}
            <Image
              src="/images/profile/p1.png"
              alt=""
              height={30}
              width={40}
              className="absolute top-3 right-4"
            />
            {/* Product Image */}
            <div className="flex items-center w-full h-64">
              <Image src="/images/iphone.png" alt="" fill className="-z-10" />
            </div>
            <div className="absolute w-11/12 ml-3 bottom-2">
              <div className="flex items-center justify-between overflow-hidden rounded-xl backdrop-blur-2xl backdrop-brightness-90 font-bai">
                <div className="px-2 py-5">
                  <p className="text-xs ">Start From</p>
                  <p className="text-sm font-orbitron">200000 eth</p>
                </div>
                <div className="px-2 py-5">
                  <p className="text-xs ">Remaining Time</p>
                  <p className="textxl font-orbitron">2:22:40</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-8 py-6 text-white rounded-b-xl bg-black-600">
            <p className="text-2xl uppercase font-baiMedium">Iphone X50</p>
            <div className="flex items-center justify-between">
              <div className="py-2">
                <p className="text-xs text-gray-500 font-orbitron">
                  Total Bidders
                </p>
                <p className="text-xs">3000 users</p>
              </div>
              <div>
                <Image
                  src={"/images/profile/p2.png"}
                  alt="profile"
                  height={30}
                  width={40}
                ></Image>
              </div>
            </div>
          </div>
          <div
            className={`absolute transform -translate-x-1/2 -bottom-5 left-1/2  ${
              isShowBid ? "block" : "hidden"
            }`}
          >
            <Button
              variant="secondary"
              className="px-8 py-[6px] bg-violet-600 hover:bg-violet-800 ring-violet-800"
            >
              Bid
            </Button>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default ProductCard;
