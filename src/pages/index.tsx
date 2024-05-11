import React from "react";
import Image from "next/image";
import { categories } from "utils/constant";
import { useRouter } from "next/router";
import { HeroParallax } from "@/components/molecules/Hero-Parallax";

import ExploreSection from "@/components/molecules/ExploreSection";
const index = () => {
  // const data = null;
  // const isLoading = true;
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
  // NEXT_STRIPE_PUBLISABLE_KEY
  // console.log("data", data);
  return (
    <div>
      <HeroParallax />
      {/* Second Screen */}
      <ExploreSection />
      <div className="p-4 sm:p-8 ">
        <div className="text-center ">
          <div className="mb-8 text-lg leading-tight md:text-3xl sm:text-2xl font-baibold">
            <h1>Explore by Category</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center w-full gap-4 mx-auto mt-10 sm:w-11/12 lg:w-1/2 md:2/3 b- ">
          {categories.map((item, key) => {
            return (
              <div
                key={key}
                className={`${item.class} md:px-6 sm:px-4 px-3 md:py-2 py-1 rounded-md cursor-pointer sm:text-base text-sm`}
                onClick={() => {
                  router.push(`/explore?cate=${item.name}`);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
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
                className="flex flex-col h-32 gap-2 p-2 text-white lg:gap-4 lg:h-44 w-80 md:p-3 sm:p-5 rounded-2xl bg-black-600"
              >
                <div className="flex items-center w-full gap-6 h-14">
                  <div className="relative w-10 h-10 ">
                    <Image
                      src={`/images/work/${item.link}`}
                      alt={item.name}
                      fill
                      className="object-contain overflow-hidden rounded-md"
                    ></Image>
                  </div>
                  <p className="text-lg font-baiMedium">{item.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 md:text-sm lg:text-base font-bai">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      /
    </div>
  );
  // return (
  //   <div className="w-full h-full mx-auto overflow-hidden lg:w-11/12 md:mt-2 ">
  //     <div className="flex flex-col items-center justify-center h-full min-h-screen gap-4 mx-4 md:flex-row">
  //       <div className="pt-5 md:pt-10 sm:mt-0">
  //         <p className="font-baiMedium">Digital Bid _____</p>
  //         <div className="pt-10 pb-0 text-3xl font-extrabold md:pb-6 2xl:text-6xl md:text-5xl font-baiMedium">
  //           <p className="leading-tight whitespace-nowrap ">
  //             Discover, Bid, Win{" "}
  //           </p>
  //           <p>Shop, Unleash.</p>
  //         </div>
  //         <p className="w-3/4 text-sm leading-snug text-gray-400 md:w-5/6 uppercse md:text-lg font-baiMedium ">
  //
  //           <br />
  //
  //         </p>
  //       </div>
  //       <div className="">
  //         <Image
  //           src="/images/home.jpg"
  //           alt="Home"
  //           width={600}
  //           height={500}
  //           className="mix-blend-multiply"
  //         />
  //       </div>
  //     </div>

  //     {/* Second Screen */}
  //     <div className=" lg:min-h-screen">
  //       <div className="text-center ">
  //         <div className="mb-3 text-2xl leading-tight md:text-5xl sm:text-3xl font-baibold">
  //           <h1>Collect and Sell your</h1>
  //           <span className="relative text-red-500 ">
  //             awesome
  //             <Image
  //               src="/images/star1.png"
  //               height={25}
  //               width={25}
  //               alt="star"
  //               className="absolute top-2 -left-7 "
  //             />
  //           </span>{" "}
  //           Bid
  //         </div>
  //         <Link href="/explore">
  //           <Button variant="secondary">Explore now</Button>
  //         </Link>
  //       </div>
  //       <div className="flex items-center w-full  align-bottom    mt-10 [&>*:nth-child(2)]:mb-20 lg:[&>*:nth-child(2)]:mb-32 overflow-x-scroll  2xl:w-4/5 lg:w-5/6 sm:gap-2 gap-1 lg:px-0 sm:px-4 xs:px-2 xxs:px-1  mx-auto  ">
  //         <ProductCard
  //           isShowBid={true}
  //           isLoading={isLoading}
  //           productData={data?.products[0]}
  //           // classname="w-2/5 mx-auto xl:w-1/5 lg:w-1/3 md:w-1/3 sm:w-1/2 min-w-max h-1/2"
  //           classname="xs:h-[20rem] sm:h-[28rem] md:h-[30rem] xxs:h-[17rem] h-[16rem]"
  //         />
  //         <ProductCard
  //           isLoading={isLoading}
  //           isShowBid={true}
  //           productData={data?.products[1]}
  //           classname="xs:h-[20rem] sm:h-[28rem] md:h-[30rem] xxs:h-[17rem] h-[16rem]  sm:block hidden"

  //           // classname="w-2/5 mx-auto xl:w-1/5 lg:w-1/3 md:w-1/3 sm:w-1/3 min-w-max"
  //         />{" "}
  //         <ProductCard
  //           isShowBid={true}
  //           isLoading={isLoading}
  //           productData={data?.products[2]}
  //           classname="xs:h-[20rem] sm:h-[28rem] md:h-[30rem] xxs:h-[17rem] h-[16rem]"

  //           // classname="w-2/5 mx-auto xl:w-1/5 lg:w-1/3 md:w-1/3 sm:w-1/3 min-w-max"
  //           // classname="!h-[35rem]"
  //         />
  //       </div>
  //     </div>

  //     {/* Third Screen */}
  //     <div className="p-4 sm:p-8 ">
  //       <div className="text-center ">
  //         <div className="mb-8 text-lg leading-tight md:text-3xl sm:text-2xl font-baibold">
  //           <h1>Explore by Category</h1>
  //         </div>
  //       </div>
  //       <div className="flex flex-wrap items-center justify-center w-full gap-4 mx-auto mt-10 sm:w-11/12 lg:w-1/2 md:2/3 ">
  //         {categories.map((item, key) => {
  //           return (
  //             <span
  //               key={key}
  //               className={`${item.class} md:px-6 sm:px-4 px-3 md:py-2 py-1 rounded-md cursor-pointer sm:text-base text-sm`}
  //               onClick={() => {
  //                 router.push(`/explore?cate=${item.name}`);
  //               }}
  //             >
  //               {item.name}
  //             </span>
  //           );
  //         })}
  //       </div>
  //     </div>
  //     {/* Fourth Screen */}
  //     <div className="py-4 my-12">
  //       <div className="text-center ">
  //         <div className="mb-8 text-3xl leading-tight font-baibold">
  //           <h1>How it works?</h1>
  //         </div>
  //       </div>
  //       <div className="flex flex-col items-center justify-center gap-6 mx-auto mt-10 md:flex-row lg:w-4/5">
  //         {workData.map((item, key) => {
  //           return (
  //             <div
  //               key={key}
  //               className="flex flex-col h-32 gap-2 p-2 text-white lg:gap-4 lg:h-44 w-80 md:p-3 sm:p-5 rounded-2xl bg-black-600"
  //             >
  //               <div className="flex items-center w-full gap-6 h-14">
  //                 <div className="relative w-10 h-10 ">
  //                   <Image
  //                     src={`/images/work/${item.link}`}
  //                     alt={item.name}
  //                     fill
  //                     className="object-contain overflow-hidden rounded-md"
  //                   ></Image>
  //                 </div>
  //                 <p className="text-lg font-baiMedium">{item.name}</p>
  //               </div>
  //               <div>
  //                 <p className="text-xs text-gray-400 md:text-sm lg:text-base font-bai">
  //                   {item.detail}
  //                 </p>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default index;
