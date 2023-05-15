import React, { FC } from "react";
import Image from "next/image";
export type ProductBidderType = {
  data: {
    profile: string;
    link: string;
    userName: string;
    email: string;
    price: string;
  }[];
};
const ProductBidder: FC<ProductBidderType> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-stone-200 last:pb-6">
      {data.map((item, key) => {
        return (
          <div
            className="flex items-center justify-between p-6 mx-4 mt-4 bg-white rounded-md"
            key={key}
          >
            <div className="flex gap-2">
              <div>
                <Image
                  src={`/images/profile/${item.profile}`}
                  height={50}
                  width={50}
                  alt=""
                ></Image>
              </div>
              <div>
                <p className="text-lg font-baiMedium">{item.userName} </p>
                <p className="font-baiMedium">{item.email}</p>
              </div>
            </div>
            <div>
              <p className="text-3xl font-baibold">${item.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductBidder;
