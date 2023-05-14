import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import ProductCard from "@/components/molecules/ProductCard";
const index = () => {
  const categories = [
    {
      name: "Avatar",
      class: "bg-yellow-400 text-yellow-600",
    },
    {
      name: "Car",
      class: "bg-yellow-400 text-yellow-600",
    },
    {
      name: "Book",
      class: "bg-red-400 text-red-600",
    },
    {
      name: "House",
      class: "bg-green-400 text-green-600",
    },
    {
      name: "House",
      class: "bg-green-400 text-green-600",
    },
    {
      name: "House",
      class: "bg-green-400 text-green-600",
    },
    {
      name: "House",
      class: "bg-green-400 text-green-600",
    },
    {
      name: "House",
      class: "bg-green-400 text-green-600",
    },
    {
      name: "House",
      class: "bg-green-400 text-green-600",
    },
    {
      name: "House",
      class: "bg-green-400 text-green-600",
    },
    {
      name: "House",
      class: "bg-green-400 text-green-600",
    },
    {
      name: "House",
      class: "bg-green-400 text-green-600",
    },
    {
      name: "House",
      class: "bg-green-400 text-green-600",
    },
  ];
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
    <div className="w-full h-full overflow-hidden">
      <div className="flex items-center h-screen ">
        <div className=" border-black-900">
          <p className="font-piru">Digital Bid _____</p>
          <div className="pt-10 pb-6 text-6xl font-extrabold font-piru">
            <p className="leading-tight whitespace-nowrap ">
              Discover, Bid, Win{" "}
            </p>
            <p>Shop, Unleash.</p>
          </div>
          <p className="w-2/3 text-base text-gray-400 font-OrbitronMedium ">
            Welcome to BidConnect, your premier online bidding destination.
            Explore a world of exciting auctions and exclusive deals on a wide
            range of products.
          </p>
        </div>
        <div className="">
          <Image
            src={"/images/home.jpg"}
            alt="Home"
            width={1000}
            height={500}
          ></Image>
        </div>
      </div>

      {/* Second Screen */}
      <div className="mt-8 mb-16 ">
        <div className="text-center ">
          <div className="mb-8 text-5xl leading-tight font-baibold">
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
          <Button variant="secondary">Explore now</Button>
        </div>
        <div className="flex items-center justify-center gap-10 mt-10 [&>*:nth-child(2)]:mb-32 ">
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
        </div>
      </div>

      {/* Third Screen */}
      <div className="p-8 my-16 ">
        <div className="text-center ">
          <div className="mb-8 text-3xl leading-tight font-baibold">
            <h1>Explore by Category</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center w-1/2 gap-4 mx-auto mt-10">
          {categories.map((item, key) => {
            return (
              <span key={key} className={`${item.class} px-6 py-2 rounded-md`}>
                {item.name}
              </span>
            );
          })}
        </div>
      </div>
      {/* Fourth Screen */}
      <div className="my-12 ">
        <div className="text-center ">
          <div className="mb-8 text-3xl leading-tight font-baibold">
            <h1>How it works?</h1>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mx-auto mt-10">
          {workData.map((item, key) => {
            return (
              <div
                key={key}
                className="flex flex-col w-1/5 gap-4 p-8 text-white rounded-2xl bg-black-600"
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
