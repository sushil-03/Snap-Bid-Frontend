import React, { useState } from "react";
import Image from "next/image";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Button from "../atoms/Button";
import { useSelectedUser } from "@/hooks/state/useAppState";
import { usePayBid } from "@/hooks/mutation/usePayBid";
import Loader from "./Loader";
import Box from "@mui/material/Box";
import { LuArrowUpRight } from "react-icons/lu";
import Modal from "@mui/material/Modal";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

export type ProductBidderType = {
  data: {
    profile: string;
    link: string;
    userName: string;
    email: string;
    price: string;
  }[];
};
export enum PaymentOption {
  "online" = "online",
  "offline" = "offline",
  "both" = "both",
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
import { BidType } from "@/endpoints/product";
import Link from "next/link";
import Countdown from "react-countdown";
import { useRouter } from "next/router";
const ProductBidder = ({ product }: any) => {
  const [user] = useSelectedUser();
  const [addressModal, setAddressModal] = useState(false);
  const [amountToPay, setAmountToPay] = useState(0);
  const router = useRouter();
  const [paymentModal, showPaymentModal] = useState<boolean>(false);

  const { mutate: proposePayment, isLoading } = usePayBid();

  console.log("pro", product);

  const handlePay = async (paymentMethod: PaymentOption) => {
    if (user._id === "") {
      router.push("/auth");
      return;
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISABLE_KEY || ""
    );
    console.log("stripe", stripe);
    if (!stripe) {
      toast.error("Stripe is not working ");
      return;
    }

    const data: BidType = {
      productId: product._id,
      amount: amountToPay,
      type: paymentMethod,
    };
    console.log("data", data);

    proposePayment(data, {
      onSuccess(result) {
        if (result.id && paymentMethod === PaymentOption.online) {
          stripe.redirectToCheckout({
            sessionId: result.id,
          });
        } else if (result?.success) {
          showPaymentModal(false);
          toast.success("Order has been created");
        }
      },
      onError() {
        toast.error("Payment didn't go through");
      },
    });
  };
  if (isLoading) {
    return <Loader />;
  }
  const data = product.allBidder;
  console.log("user", user);
  const getPaymentTime = (deadline: string) => {
    const deadlineTimestamp = new Date(deadline);
    return (
      <Countdown
        date={deadlineTimestamp}
        renderer={({ hours, minutes, seconds, completed }) => {
          return (
            <div>
              {completed
                ? "Times up"
                : `${hours.toString().padStart(2, "0")}h : ${minutes
                    .toString()
                    .padStart(2, "0")}m : ${seconds
                    .toString()
                    .padStart(2, "0")}s `}
            </div>
          );
        }}
      ></Countdown>
    );
  };

  return (
    <div className="relative mx-0 my-4 md:mx-6 ">
      <Modal
        open={paymentModal}
        onClose={() => showPaymentModal(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: window.innerWidth > 600 ? 600 : 400,
            position: "relative",
          }}
        >
          <div className="absolute right-4 top-6 font-baibold ">1/2</div>
          <h2
            id="child-modal-title"
            className="text-3xl font-semibold text-center font-baiMedium"
          >
            SnapBid
          </h2>
          <p className="text-sm text-center text-gray-500">
            You are just step away from your product 2/2
          </p>

          <div className="mt-8">
            <span>Select payment method</span>
            <div>
              {(product.paymentOption === "both" ||
                product.paymentOption === "offline") && (
                <div>
                  <Button
                    onClick={() => handlePay(PaymentOption.offline)}
                    className="w-full mt-4 !hover:bg-black-400"
                  >
                    Pay offline
                  </Button>
                </div>
              )}
              {(product.paymentOption === "both" ||
                product.paymentOption === "online") && (
                <div>
                  <Button
                    onClick={() => handlePay(PaymentOption.online)}
                    className="w-full mt-4 !hover:bg-black-400"
                  >
                    Pay using stripe
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-10 mt-6">
            <Button
              onClick={() => {
                showPaymentModal(false);
                setAddressModal(true);
              }}
              className="w-full hover:bg-black-600"
            >
              Go back
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={addressModal}
        onClose={() => setAddressModal(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: window.innerWidth > 600 ? 600 : 400,
            position: "relative",
          }}
        >
          <div className="absolute right-4 top-6 font-baibold ">1/2</div>
          <h2
            id="child-modal-title"
            className="text-3xl font-semibold text-center font-baiMedium"
          >
            SnapBid
          </h2>
          <p className="text-sm text-center text-gray-500">
            You are just step away from your product
          </p>
          {user.address.length === 0 ? (
            <div className="mt-8">
              <span>You don't have any address link to your account</span>
              <Link href={`/profile/${user._id}`}>
                <Button
                  onClick={() => setAddressModal(false)}
                  className="w-full mt-4 hover:bg-black-600"
                >
                  Go to profile
                </Button>
              </Link>
            </div>
          ) : user.selectedAddress < 0 ? (
            <div className="mt-8">
              <span>You haven't selected any address to your account</span>
              <Link href={`/profile/${user._id}`}>
                <Button
                  onClick={() => setAddressModal(false)}
                  className="w-full mt-4 hover:bg-black-600"
                >
                  Go to profile
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-8">
              <span>Please confirm your address</span>
              <div className="grid grid-cols-2 p-3 my-2 bg-blue-100 font-baiMedium">
                <span>
                  Country: {user.address[user.selectedAddress].country}
                </span>
                <span>City: {user.address[user.selectedAddress].city}</span>
                <span>State: {user.address[user.selectedAddress].state}</span>
                <span>
                  Pincode: {user.address[user.selectedAddress].pincode}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-10 mt-6">
            <Link href={`/profile/${user._id}`}>
              <Button
                onClick={() => setAddressModal(false)}
                className="w-full hover:bg-black-600"
              >
                Change
              </Button>
            </Link>{" "}
            <Button
              onClick={() => {
                setAddressModal(false);
                showPaymentModal(true);
              }}
              disabled={user.selectedAddress < 0}
            >
              Continue
            </Button>
          </div>
        </Box>
      </Modal>
      <p className="pb-2 text-sm text-gray-600">
        Payment is done after you won the bid!
      </p>
      <div
        className={`flex flex-col gap-4 rounded-md  last:pb-6 bg-slate-200 `}
      >
        {data.length === 0 && (
          <div>
            <div className="flex items-center justify-center px-3 mx-4 mt-4 bg-white rounded-md sm:p-6">
              <p className="text-2xl font-baiMedium">No Bids Yet</p>
              <Player
                autoplay
                loop
                src=" https://assets1.lottiefiles.com/packages/lf20_8tgrazq6.json"
                style={{ height: "250px", width: "200px" }}
              >
                <Controls
                  visible={false}
                  buttons={["play", "repeat", "frame", "debug"]}
                />
              </Player>
            </div>
          </div>
        )}
        {data.map((item: any, key: number) => {
          return (
            <div
              className={`grid grid-cols-4 grid-rows-1 items-center justify-between px-2 py-4 mx-2 md:mx-4 mt-4  rounded-md md:py-6 md:px-2 ${
                user._id.toString() === item.bidder._id.toString()
                  ? " bg-blue-200 "
                  : "bgwhite bg-gradient-to-r from-gray-50 to-gray-100"
              }
                ${
                  item.paymentInfo.status === "Completed"
                    ? " !bg-gradient-to-r !from-orange-400 !to-rose-400 "
                    : ""
                }
                `}
              key={key}
            >
              <div className="flex items-center gap-1 lg:col-span-2 sm:gap-2 md:gap-4">
                <div className="relative hidden w-10 h-10 overflow-hidden rounded-full md:w-20 md:h-20 sm:w-14 sm:h-14 sm:block">
                  <Image
                    src={item.bidder.avatar}
                    alt={item.bidder.firstname}
                    fill
                    className="object-contain"
                  />
                </div>
                {/* {showRank(key)} */}
                <div>
                  <p className="text-base md:text-lg font-baiMedium">
                    {item.bidder.firstname + " " + item.bidder.lastname}
                  </p>
                  <p className="hidden text-xs font-baiMedium md:text-sm lg:text-base lg:block">
                    {item.bidder.email}
                  </p>
                  <Link href={`/profile/${item.bidder._id}`}>
                    <p className="flex items-center gap-1 text-xs text-blue-800 transition-all duration-700 ease-out font-baiMedium md:text-sm lg:text-base sm:hidden hover:text-blue-700">
                      Profile <LuArrowUpRight />
                    </p>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center col-span-2 lg:col-span-1">
                <p className="text-base md:text-lg xl:text-3xl lg:text-xl font-baibold ">
                  ₹{item.bidAmount}
                </p>
                <div>
                  {item.paymentInfo.status === "Pending" ||
                  item.paymentInfo.status === "Expired" ? (
                    <div>
                      {getPaymentTime(item.paymentInfo.paymentDeadline)}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {/* {item.paymentInfo.paymentDeadline &&
                  new Date(item.paymentInfo.paymentDeadline).getTime() -
                    Date.now() >
                    0 ? (
                    <p className="text-base md:text-xl font-baiMedium">
                      {item.paymentInfo.status === "Completed"
                        ? "Paid"
                        : formatDuration(
                            new Date(
                              item.paymentInfo.paymentDeadline
                            ).getTime() - Date.now()
                          )}
                    </p>
                  ) : (
                    <p className="text-base xl:text-xl md:text-lg font-baiMedium">
                      Not Started
                    </p>
                  )} */}
                </div>
              </div>

              <div className="relative flex flex-col items-center align-middle ">
                {item.paymentInfo.status === "Completed" ? (
                  <div className="w-12 h-12 p-3 bg-red-500 rounded-full md:w-14 md:h-14 font-baibold">
                    <Image
                      src={"/images/ranking.png"}
                      fill
                      className="object-contain"
                      alt="1st"
                    />
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="tertiary"
                      className={` md:px-6 sm:!px-4 !px-2  sm:!py-2 !py-1 bg-green-700  disabled:cursor-not-allowed disabled:bg-gray-600  hover:bg-green-900   transition-colors ease-in-out duration-700 shadow-none sm:!rounded-xl !rounded-md !text-base lg:text-2xl md:text-xl sm:text-lg`}
                      disabled={
                        item.paymentInfo.status !== "Pending" ||
                        user._id !== item.bidder._id
                      }
                      // handlePay(item.bidAmount)
                      onClick={() => {
                        setAmountToPay(item.bidAmount);
                        setAddressModal(true);
                      }}
                    >
                      {item.paymentInfo.status === "PaymentOnDelivery"
                        ? "Cash on Delivery"
                        : item.paymentInfo.status}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductBidder;
