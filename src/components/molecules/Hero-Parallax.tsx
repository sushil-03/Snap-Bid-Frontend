"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";

export const HeroParallax = () => {
  const products = [
    {
      title: "homepage",
      thumbnail: "/images/website/home.png",
    },
    {
      title: "profile",
      thumbnail: "/images/website/profile.png",
    },
    {
      title: "explore",
      thumbnail: "/images/website/explore.png",
    },
    {
      title: "product1",
      thumbnail: "/images/website/product1.png",
    },

    {
      title: "top",
      thumbnail: "/images/website/top.png",
    },
    {
      title: "product2",
      thumbnail: "/images/website/product2.png",
    },
    {
      title: "homepage",
      thumbnail: "/images/website/home.png",
    },
    {
      title: "bidding",
      thumbnail: "/images/website/bidding.png",
    },
    {
      title: "product1",
      thumbnail: "/images/website/product1.png",
    },
    {
      title: "profile",
      thumbnail: "/images/website/profile.png",
    },
    {
      title: "top",
      thumbnail: "/images/website/top.png",
    },
    {
      title: "product2",
      thumbnail: "/images/website/product2.png",
    },
    {
      title: "homepage",
      thumbnail: "/images/website/home.png",
    },
    {
      title: "explore",
      thumbnail: "/images/website/explore.png",
    },
    {
      title: "product2",
      thumbnail: "/images/website/product2.png",
    },
    {
      title: "profile",
      thumbnail: "/images/website/profile.png",
    },
    {
      title: "top",
      thumbnail: "/images/website/top.png",
    },
    {
      title: "product2",
      thumbnail: "/images/website/product2.png",
    },
  ];
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse mb-20 space-x-20 space-x-reverse">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="relative top-0 left-0 w-full px-4 py-20 mx-auto max-w-7xl md:py-40">
      <h1 className="text-2xl font-bold md:text-6xl ">
        From Bids to Riches <br /> Your Path to Success!
      </h1>
      <p className="max-w-2xl mt-8 text-base md:text-xl dark:text-neutral-200">
        Welcome to Snapbid, your premier online bidding destination. Explore a
        world of exciting auctions and exclusive deals on a wide range of
        products.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <div className="block group-hover/product:shadow-2xl ">
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="absolute inset-0 object-contain object-left-top w-full h-full"
          alt={product.title}
        />
      </div>
      <div className="absolute inset-0 w-full h-full bg-black opacity-0 pointer-events-none group-hover/product:opacity-80"></div>
      <h2 className="absolute text-white opacity-0 bottom-4 left-4 group-hover/product:opacity-100">
        {/* {product.title} */}
      </h2>
    </motion.div>
  );
};
