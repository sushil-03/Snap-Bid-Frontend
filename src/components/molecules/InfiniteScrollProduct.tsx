import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { useInView } from "react-intersection-observer";
import { QueryClient } from "react-query";
import { getAllProduct } from "@/endpoints/product";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import { useRouter } from "next/router";
const InfiniteScrollProduct = ({ data }: { data: any }) => {
  const queryClient = new QueryClient();
  const router = useRouter();
  const category = (router.query.cate as string) || "";
  const search = (router.query.search as string) || "";
  const controllerRef = useRef<AbortController>();

  const [allProduct, setAllProduct] = useState(data.products);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setAllProduct(data.products);
  }, [data.products]);

  useEffect(() => {
    // const productResponse = axios.CancelToken.source();
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    if (inView) {
      loadMoreProducts(signal);
    }
    return () => {};
  }, [inView]);

  const loadMoreProducts = async (token: any) => {
    const next = page + 1;
    const productResponse = await axios.CancelToken.source();
    console.log("ihhahahah", productResponse.token);

    console.log("loadmore token", token);

    // console.log("calling", category, search, page);

    // const productReseponse = axios.CancelToken.source();
    // await queryClient.cancelQueries({
    //   queryKey: ["products", category, search, page],
    // });
    // if (controller) {
    //   controller.abort();
    // }

    const response = await queryClient.fetchQuery(
      ["products", category, search, page],

      () =>
        getAllProduct({
          category,
          search,
          page: next,
          signal: token,
        })
    );
    //  getProducts({
    //   category: "",
    //   search: "",
    //   page: next,
    // });

    if (!response) {
      console.log("Abortino");
      return;
    }
    if (response.products.length) {
      setAllProduct([...allProduct, ...response.products]);
      setPage(next);
    } else if (response.products.length < 10) {
      setLoading(false);
    } else {
      console.log("re", response);
    }
    // console.log("new movies", products);
  };
  return (
    <div>
      <div className="grid flex-wrap justify-center w-full grid-cols-2 gap-1 mx-auto mt-6 sm:gap-2 md:grid-cols-3 2xl:grid-cols-4 2xl:gap-4 gap-y-3">
        {/* {JSON.stringify(allProduct)}
        <p>
          ----------------------------------------------------------------------------------
        </p>
        {JSON.stringify(data.products)} */}
        {data &&
          allProduct?.map((item: any, key: number) => {
            return <ProductCard key={key} productData={item} classname="" />;
          })}
      </div>
      <div>
        {data && data.products && data.products.length == 0 && (
          <div className="w-full mx-auto text-center ">
            <Player
              autoplay
              loop
              src="https://assets6.lottiefiles.com/packages/lf20_m9JXjh.json "
              style={{ height: "300px", width: "300px", scale: 4 }}
            >
              <Controls
                visible={false}
                buttons={["play", "repeat", "frame", "debug"]}
              />
            </Player>
            <p className="text-3xl text-center font-baiMedium">No Product</p>
          </div>
        )}
      </div>
      {loading && (
        <div ref={ref} className={`flex items-center justify-center my-4 `}>
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>

    // <>
    //   {allProduct?.map((item: any, key: number) => {
    //     return <ProductCard key={key} productData={item} classname="" />;
    //   })}
    //   <div ref={ref}>Loading...</div>
    // </>
  );
};

export default InfiniteScrollProduct;
