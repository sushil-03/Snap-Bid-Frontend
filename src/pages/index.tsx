import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import ProductCard from "@/components/molecules/ProductCard";
import Link from "next/link";
import { getProducts } from "@/hooks/query/getProduct";
import { categories } from "@/utils/constant";
import { useRouter } from "next/router";
const index = () => {
  const { data, isLoading } = getProducts("");
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
    <div className="w-11/12 h-full mx-auto overflow-hidden md:mt-2">
      <div className="flex flex-col items-center justify-center h-full min-h-screen gap-4 md:flex-row">
        <div className="pt-20 md:pt-10 sm:mt-0">
          <p className="font-baiMedium">Digital Bid _____</p>
          <div className="pt-10 pb-0 text-3xl font-extrabold md:pb-6 2xl:text-6xl md:text-5xl font-baiMedium">
            <p className="leading-tight whitespace-nowrap ">
              Discover, Bid, Win{" "}
            </p>
            <p>Shop, Unleash.</p>
          </div>
          <p className="w-3/4 text-sm leading-snug text-gray-400 md:w-5/6 uppercse md:text-lg font-baiMedium ">
            Welcome to BidConnect, your premier online bidding destination.
            <br />
            Explore a world of exciting auctions and exclusive deals on a wide
            range of products.
          </p>
        </div>
        <div className="">
          <Image
            src="/images/home.jpg"
            alt="Home"
            width={600}
            height={500}
            className="mix-blend-multiply"
          />
        </div>
      </div>

      {/* Second Screen */}
      <div className="min-h-screen">
        <div className="text-center ">
          <div className="mb-3 text-2xl leading-tight md:text-5xl sm:text-3xl font-baibold">
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
            isLoading={isLoading}
            productData={data?.products[0]}
            classname="w-2/5 xl:w-1/5 lg:w-1/3 md:w-1/3 sm:w-1/3 min-w-max h-1/2"
          />
          <ProductCard
            isLoading={isLoading}
            isShowBid={true}
            productData={data?.products[1]}
            classname="w-2/5 xl:w-1/5 lg:w-1/3 md:w-1/3 sm:w-1/3 min-w-max"
          />{" "}
          <ProductCard
            isShowBid={true}
            isLoading={isLoading}
            productData={data?.products[2]}
            classname="w-2/5 xl:w-1/5 lg:w-1/3 md:w-1/3 sm:w-1/3 min-w-max"
          />
        </div>
      </div>

      {/* Third Screen */}
      <div className="p-4 sm:p-8 ">
        <div className="text-center ">
          <div className="mb-8 text-3xl leading-tight font-baibold">
            <h1>Explore by Category</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center w-full gap-4 mx-auto mt-10 sm:w-11/12 lg:w-1/2 md:2/3 ">
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
        <div className="flex flex-col items-center justify-center gap-6 mx-auto mt-10 md:flex-row lg:w-4/5">
          {workData.map((item, key) => {
            return (
              <div
                key={key}
                className="flex flex-col gap-4 p-5 text-white h-44 w-80 md:p-3 sm:p-8 rounded-2xl bg-black-600"
              >
                <div className="flex items-center w-full gap-6 h-14">
                  <Image
                    src={`/images/work/${item.link}`}
                    alt={item.name}
                    height={40}
                    width={40}
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
