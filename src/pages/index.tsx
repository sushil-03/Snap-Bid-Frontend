import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import ProductCard from "@/components/molecules/ProductCard";
import Link from "next/link";
import { getProducts } from "@/hooks/query/getProduct";
import { categories } from "@/utils/constant";
import { useRouter } from "next/router";
const index = () => {
  const products = getProducts("");
  const router = useRouter();
  const workData = [
    {
      name: "Explore Auction",
      link: "bidexplore.png",
      detail:
        "Discover a variety of exciting auctions across different categories.",
    },
    {
      name: "Place Your Bids",
      link: "placebid.png",
      detail:
        "Easily place bids on your desired items and stay updated on completing bids",
    },
    {
      name: "Win and Secure",
      link: "securelock.png",
      detail:
        "Secure your win by following instructions to complete the purchase",
    },
    {
      name: "Sell with ease",
      link: "sellbid.png",
      detail:
        "List your products, set prices, and attract potential buyers through our platform",
    },
  ];

  return (
    <div className="w-11/12 h-full mx-auto mt-32 overflow-hidden md:mt-2">
      <div className="flex flex-col items-center h-full gap-4 sm:min-h-screen md:flex-row">
        <div className="pt-24 sm:mt-0">
          <p className="font-piru">Digital Bid _____</p>
          <div className="pt-10 pb-0 text-2xl font-extrabold md:pb-6 2xl:text-6xl xl:text-5xl md:text-4xl sm:text-3xl font-piru">
            <p className="leading-tight whitespace-nowrap ">
              Discover, Bid, Win{" "}
            </p>
            <p>Shop, Unleash.</p>
          </div>
          <p className="w-3/4 text-sm leading-snug text-gray-400 sm:w-2/3 uppercse md:text-lg font-baiMedium ">
            Welcome to BidConnect, your premier online bidding destination.
            Explore a world of exciting auctions and exclusive deals on a wide
            range of products.
          </p>
        </div>
        <div className="">
          <Image src="/images/home.jpg" alt="Home" width={1000} height={500} />
        </div>
      </div>

      {/* Second Screen */}
      <div className="mt-8 mb-16 md:mt-0 ">
        <div className="text-center ">
          <div className="mb-8 text-2xl leading-tight md:text-5xl sm:text-3xl font-baibold">
            <h1>Collect and Sell your</h1>
            <span className="relative text-red-500 ">
              awesome
              <Image
                src="/images/star1.png"
                height={25}
                width={25}
                alt="star"
                className="absolute top-2 -left-7 "
              />
            </span>{" "}
            Bid
          </div>
          <Link href="/explore">
            <Button variant="secondary">Explore now</Button>
          </Link>
        </div>
        <div className="flex items-center justify-center md:gap-10 gap-8 mt-10 [&>*:nth-child(2)]:mb-32 overflow-x-scroll ">
          <ProductCard
            isShowBid={true}
            productData={products?.data?.products[0]}
            classname="w-2/5 xl:w-1/5 lg:w-1/3 md:w-1/3 sm:w-1/3 min-w-max h-1/2"
          />
          <ProductCard
            isShowBid={true}
            productData={products?.data?.products[1]}
            classname="w-2/5 xl:w-1/5 lg:w-1/3 md:w-1/3 sm:w-1/3 min-w-max"
          />{" "}
          <ProductCard
            isShowBid={true}
            productData={products?.data?.products[2]}
            classname="w-2/5 xl:w-1/5 lg:w-1/3 md:w-1/3 sm:w-1/3 min-w-max"
          />
        </div>
      </div>

      {/* Third Screen */}
      <div className="p-4 my-16 sm:p-8 ">
        <div className="text-center ">
          <div className="mb-8 text-3xl leading-tight font-baibold">
            <h1>Explore by Category</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center w-11/12 gap-4 mx-auto mt-10 lg:w-1/2 md:2/3">
          {categories.map((item, key) => {
            return (
              <span
                key={key}
                className={`${item.class} px-6 py-2 rounded-md cursor-pointer`}
                onClick={() => {
                  router.push(`/explore?cate=${item.name}`);
                }}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      </div>
      {/* Fourth Screen */}
      <div className="py-4 my-12">
        <div className="text-center ">
          <div className="mb-8 text-3xl leading-tight font-baibold">
            <h1>How it works?</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 mx-auto mt-10 md:flex-row">
          {workData.map((item, key) => {
            return (
              <div
                key={key}
                className="flex flex-col w-4/5 gap-4 p-5 text-white sm:p-8 md:w-1/5 rounded-2xl bg-black-600"
              >
                <div className="flex items-center gap-6">
                  <Image
                    src={`/images/work/${item.link}`}
                    alt={item.name}
                    height={50}
                    width={50}
                    className="overflow-hidden rounded-md"
                  ></Image>
                  <p className="text-lg font-baiMedium">{item.name}</p>
                </div>
                <div>
                  <p className="text-base text-gray-400 font-bai">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default index;
