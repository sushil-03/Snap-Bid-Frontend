import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/hooks/query/getProduct";
import Image from "next/image";
import Link from "next/link";
import Button from "../atoms/Button";
import { useInView as framerUserInView } from "framer-motion";

import { motion, useAnimation, AnimationControls } from "framer-motion";
import { useInView } from "react-intersection-observer";
const ExploreSection = () => {
  const { data, isLoading } = getProducts({});
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const { ref: ref1, inView: inView1 } = useInView();
  const { ref: ref2, inView: inView2 } = useInView();
  const { ref: ref3, inView: inView3 } = useInView();
  const variants1 = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };
  const variants2 = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const variants3 = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.4 } },
  };
  const startAnimation = (controls: AnimationControls, inView: boolean) => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  };
  useEffect(() => {
    startAnimation(controls1, inView1);
  }, [controls1, inView1]);

  useEffect(() => {
    startAnimation(controls2, inView2);
  }, [controls2, inView2]);

  useEffect(() => {
    startAnimation(controls3, inView3);
  }, [controls3, inView3]);
  const ref = React.useRef(null);
  const isInView = framerUserInView(ref, { once: true });
  return (
    <div className=" lg:min-h-screen">
      <div className="text-center ">
        <motion.div
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateY(-100px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
          className="mb-3 text-2xl leading-tight md:text-5xl sm:text-3xl font-baibold"
        >
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
        </motion.div>
        <Link href="/explore">
          <Button variant="secondary">Explore now</Button>
        </Link>
      </div>
      <div className="flex items-center w-full  align-bottom    mt-10 [&>*:nth-child(2)]:mb-20 lg:[&>*:nth-child(2)]:mb-32 overflow-x-scroll  2xl:w-4/5 lg:w-5/6 sm:gap-2 gap-1 lg:px-0 sm:px-4 xs:px-2 xxs:px-1  mx-auto  ">
        <motion.div
          animate={controls1}
          initial="hidden"
          variants={variants1}
          ref={ref1}
          className="w-full h-full "
        >
          <ProductCard
            isLoading={isLoading}
            isShowBid={true}
            productData={data?.products[0]}
            classname="w-full !h-full"
          />
        </motion.div>
        <motion.div
          animate={controls2}
          initial="hidden"
          variants={variants2}
          ref={ref2}
          className="hidden w-full h-full sm:block"
        >
          <ProductCard
            isLoading={isLoading}
            isShowBid={true}
            productData={data?.products[1]}
            classname="w-full !h-full"
            // classname=""
          />
        </motion.div>
        <motion.div
          animate={controls3}
          initial="hidden"
          variants={variants3}
          ref={ref3}
          className="w-full h-full "
        >
          <ProductCard
            isShowBid={true}
            isLoading={isLoading}
            productData={data?.products[2]}
            classname="w-full !h-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreSection;
