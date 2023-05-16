import Image from "next/image";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IoStarOutline } from "react-icons/io5";

import ProductDetail from "@/components/molecules/ProductDetail";
import ProductCarousel from "@/components/molecules/ProductCarousel";
import ProductBidder from "@/components/molecules/BiddingList";
import Button from "@/components/atoms/Button";

const index = () => {
  const [showOverview, setShow] = useState(true);
  const user = {
    profile: "p1.png",
    name: "Sushil",
    link: "/",
  };
  const productDetail = {
    name: "Msg Title",
    category: "Electric",
    startingBid: "44333",
    currBid: "993333",
    owner: "2nd",
    location: "Raipur Dehradun",
    postingDate: "21-APR-23",
    remainingTime: "32:32:90",
    description:
      "I am selling my MG ZS EV bought on July 2022 since I am moving abroad. 2 free services left. Currently under 19000 km driven. If you want to drive an electric car, this is the car you would need. Excellent condition. I have also done a ceramic coating, topped up at 18500 km and one more free topup left.",
    images: [
      {
        url: "ipad.jpeg",
      },
      { url: "iphone.png" },
      { url: "iphone.png" },
      { url: "iphone.png" },
      { url: "iphone.png" },
      {
        url: "ipad.jpeg",
      },
      { url: "lap.png" },
    ],
    condition: "Refurbished",
    bidder: [
      {
        profile: "p1.png",
        link: "/",
        userName: "anony",
        email: "sds@gmail.com",
        price: "449",
      },
      {
        profile: "p2.png",
        link: "/",
        userName: "anony",
        email: "sds@gmail.com",
        price: "449",
      },
      {
        profile: "p3.png",
        userName: "anony",
        link: "/",
        email: "sds@gmail.com",
        price: "449",
      },
      {
        profile: "p3.png",
        userName: "anony",
        link: "/",
        email: "sds@gmail.com",
        price: "449",
      },
      {
        profile: "p3.png",
        userName: "anony",
        link: "/",
        email: "sds@gmail.com",
        price: "449",
      },
      {
        profile: "p3.png",
        userName: "anony",
        link: "/",
        email: "sds@gmail.com",
        price: "449",
      },
      {
        profile: "p3.png",
        userName: "anony",
        link: "/",
        email: "sds@gmail.com",
        price: "449",
      },
      {
        profile: "p3.png",
        userName: "anony",
        link: "/",
        email: "sds@gmail.com",
        price: "449",
      },
      {
        profile: "p3.png",
        userName: "anony",
        link: "/",
        email: "sds@gmail.com",
        price: "449",
      },
      {
        profile: "p3.png",
        userName: "anony",
        link: "/",
        email: "sds@gmail.com",
        price: "449",
      },
      {
        profile: "p3.png",
        userName: "anony",
        link: "/",
        email: "sds@gmail.com",
        price: "449",
      },
      {
        profile: "p3.png",
        userName: "anony",
        link: "/",
        email: "sds@gmail.com",
        price: "449",
      },
      {
        profile: "p3.png",
        userName: "anony",
        link: "/",
        email: "sds@gmail.com",
        price: "449",
      },
    ],
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen mt-32 bg--100">
      <div className="">
        <ProductCarousel data={productDetail.images} />
      </div>
      <div className="flex justify-start gap-12 mt-8">
        <div className="w-full">
          <div className="flex gap-8 p-4">
            <p
              onClick={() => setShow(true)}
              className="p-3 transition-colors duration-500 ease-in-out border-2 cursor-pointer border-black-600 hover:bg-black-100 hover:text-white font-baiMedium"
            >
              Oveview
            </p>
            <p
              onClick={() => setShow(false)}
              className="p-3 transition-colors duration-500 ease-in-out border-2 cursor-pointer border-black-600 hover:bg-black-100 hover:text-white font-baiMedium"
            >
              Bidding
            </p>
            <p
              onClick={() => setIsOpen(true)}
              className="p-3 transition-colors duration-500 ease-in-out border-2 cursor-pointer border-black-600 hover:bg-black-100 hover:text-white font-baiMedium"
            >
              Place Your Bid
            </p>
          </div>
          {showOverview && !isOpen ? (
            <ProductDetail />
          ) : (
            <ProductBidder data={productDetail.bidder} />
          )}
          {isOpen && (
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="relative z-50 bg-black-100 text-black-600"
            >
              <div
                className="fixed inset-0 bg-black-900/30"
                aria-hidden="true"
              />

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 ">
                  <Dialog.Panel className="w-full max-w-sm p-4 mx-auto bg-white rounded h-1/4">
                    <Dialog.Title className="text-xl font-baibold">
                      <div className="flex items-center justify-between mx-2">
                        <p>Place your bid</p>
                        <p>200 bids</p>
                      </div>
                    </Dialog.Title>
                    <div className="p-1 mt-6 font-baiMedium ">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <p>Your max bid : </p>
                          <input
                            type="number"
                            className="flex-1 border-b-2 outline-none border-black-600 placeholder:text-sm"
                            placeholder="Enter your maximum bid "
                          />
                        </div>

                        <Button
                          variant="secondary"
                          fullWidth
                          className="px-3 py-1 rounded-md py0 hover:ring-0"
                        >
                          Place Bid
                        </Button>
                      </div>
                      <div className="text-gray-600 font-baiMedium">
                        <p className="my-1 text-sm text-center ">
                          Bid should be more than current bid
                        </p>
                        <p className="mt-8">Sales tax : 7.50%</p>
                        <p>GST(Goods and Services Tax) : 10%</p>
                      </div>
                      <div className="flex items-center justify-center gap-2 p-4 my-4 text-center rounded-md bg-stone-100 hover:bg-stone-200">
                        <IoStarOutline size={20} className="text-red-600" />
                        <span className="text-center text-red-600">
                          Add To Watch List
                        </span>
                      </div>
                    </div>
                  </Dialog.Panel>
                </div>
              </div>
            </Dialog>
          )}
        </div>

        <div className="flex flex-col w-2/5 gap-4 mt-20">
          <div className="p-4 rounded-xl bg-stone-100">
            <p className="text-x">Remaining Time</p>
            <p className="text-4xl font-baibold">
              ${productDetail.remainingTime}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-100">
            <p className="text-x">Current Bid</p>
            <p className="text-4xl font-baibold">${productDetail.currBid}</p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-stone-100">
            <div className="flex items-center gap-2 text-lg font-bai">
              <Image
                src={`/images/profile/${user.profile}`}
                width={80}
                height={80}
                alt=""
              ></Image>
              <p>{user.name}</p>
            </div>
            <AiOutlineArrowRight size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
