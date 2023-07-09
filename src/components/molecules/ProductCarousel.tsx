import React, { FC } from "react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper";
export type ProductCarouselType = {
  data: { filename: string; fileimage: string }[];
};
const ProductCarousel: FC<ProductCarouselType> = ({ data }) => {
  if (!data) return <div></div>;
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      defaultChecked
      centeredSlides={true}
      loop={true}
      centerInsufficientSlides
      slidesPerView={3}
      coverflowEffect={{
        rotate: 10,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
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
            <div className="relative h-00px]" key={_key}>
              <Image
                src={`${_item.fileimage}`}
                alt="Image"
                width={500}
                height={500}
                className="bg-transparent rounded-md n"
              />
            </div>
          </SwiperSlide>
        );
      })}
      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow"></div>
        <div className=" swiper-button-next slider-arrow"></div>
        <div className="swiper-pagination"></div>
      </div>{" "}
    </Swiper>
  );
};

export default ProductCarousel;
