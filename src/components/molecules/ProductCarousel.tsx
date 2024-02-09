import Image from "next/image";
import type { FC } from "react";
import React from "react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export type ProductCarouselType = {
  data: { filename: string; fileimage: string }[];
};
const ProductCarousel: FC<ProductCarouselType> = ({ data }) => {
  if (!data) return <div />;
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      defaultChecked
      centeredSlides
      loop
      centerInsufficientSlides
      slidesPerView={3}
      coverflowEffect={{
        rotate: 10,
        stretch: 0,
        depth: 100,
        modifier: 1.5,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      modules={[Autoplay, EffectCoverflow, Navigation]}
      className="swiper_container"
    >
      {data.map((_item, _key) => {
        return (
          <SwiperSlide key={_key}>
            <div className="relative " key={_key}>
              {_item.filename ? (
                <Image
                  src={`${_item.fileimage}`}
                  alt="Image"
                  // fill
                  width={500}
                  height={200}
                  className="object-contain bg-transparent rounded-md"
                  quality={70}
                />
              ) : (
                <div className="w-[500px] h-[600px] bg-[#FFF] ">
                  <div className="w-full h-full shimmerBG"></div>
                </div>
              )}
            </div>
          </SwiperSlide>
        );
      })}
      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow" />
        <div className=" swiper-button-next slider-arrow" />
        <div className="swiper-pagination" />
      </div>{" "}
    </Swiper>
  );
};

export default ProductCarousel;
