import Image from "next/image";
import type { FC } from "react";
import React from "react";
import { Carousel } from "react-responsive-carousel";

export type ProductCarouselType = {
  data: any;
};
const settings = {
  showArrows: false,
  interval: 3500,
  dynamicHeight: false,
  stopOnHover: false,
  infiniteLoop: true,
  showStatus: false,
  transitionTime: 500,
  showThumbs: false,
  showIndicators: true,
  swipeable: true,
  emulateTouch: true,
  autoPlay: true,
};
const ProductCarousel: FC<ProductCarouselType> = ({ data }) => {
  if (!data) return <div />;
  return (
    <div className="relative w-full">
      <Carousel thumbWidth={500} {...settings}>
        {data.map((_item: any, _key: number) => {
          return (
            <div className="relative h-[350px]" key={_key}>
              {_item.filename ? (
                <Image
                  src={`${_item.fileimage}`}
                  alt="Image"
                  fill
                  className="object-contain rounded-md"
                  quality={70}
                />
              ) : (
                <div className="bg-[#FFF] ">
                  <div className="w-full h-full shimmerBG"></div>
                </div>
              )}
            </div>
          );
        })}

        {/* <div>
          <Image
            src="/images/home.jpg"
            alt="Image"
            fill
            className="object-contain border-2 border-red-500 rounded-md"
            quality={70}
          />
        </div> */}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;

{
  /* // return (
  //   <Swiper
  //     effect="coverflow"
  //     grabCursor
  //     defaultChecked
  //     centeredSlides
  //     loop
  //     centerInsufficientSlides
  //     slidesPerView={3}
  //     coverflowEffect={{
  //       rotate: 10,
  //       stretch: 0,
  //       depth: 100,
  //       modifier: 1.5,
  //     }}
  //     autoplay={{
  //       delay: 2500,
  //       disableOnInteraction: false,
  //     }}
  //     navigation={{
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     }}
  //     modules={[Autoplay, EffectCoverflow, Navigation]}
  //     className="swiper_container"
  //   >
  //     {data.map((_item, _key) => {
  //       return (
  //         <SwiperSlide key={_key}>
  //           <div className="relative " key={_key}>
  //             {_item.filename ? (
  //               <Image
  //                 src={`${_item.fileimage}`}
  //                 alt="Image"
  //                 // fill
  //                 width={500}
  //                 height={200}
  //                 className="object-contain bg-transparent rounded-md"
  //                 quality={70}
  //               />
  //             ) : (
  //               <div className="w-[500px] h-[600px] bg-[#FFF] ">
  //                 <div className="w-full h-full shimmerBG"></div>
  //               </div>
  //             )}
  //           </div>
  //         </SwiperSlide>
  //       );
  //     })}
  //     <div className="slider-controler">
  //       <div className="swiper-button-prev slider-arrow" />
  //       <div className=" swiper-button-next slider-arrow" />
  //       <div className="swiper-pagination" />
  //     </div>{" "}
  //   </Swiper>
  // ); */
}
