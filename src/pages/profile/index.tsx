import Image from "next/image";
import React from "react";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import UserBidding from "@/components/molecules/UserBidding";
import UserProfile from "@/components/molecules/UserProfile";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSelectedUser } from "@/hooks/state/useAppState";
const details = [
  {
    name: "My Profile",
    id: 1,
  },
  {
    name: "Bidding Info",
    id: 2,
  },
  {
    name: "Delivery Info",
    id: 3,
  },
];
const index = () => {
  const [, setUser] = useSelectedUser();
  const [active, setActive] = useState(1);
  const router = useRouter();
  const renderComponent = () => {
    if (active == 1) {
      return <UserProfile />;
    } else if (active == 2) {
      return <UserBidding />;
    } else if (active == 3) {
    }
    return <></>;
  };

  return (
    <div className="min-h-screen pt-32 bg-stone-100 ">
      <div className="w-11/12 p-6 mx-auto rounded-md ">
        <p className="mb-4 text-2xl font-baiMedium">Account Settings</p>
        <div className="flex flex-col gap-0 bg-white rounded-md sm:gap-4 md:gap-8 sm:flex-row ">
          <div className="flex flex-col gap-2 p-3 pr-2 m-3 text-gray-500 border-b-2 sm:border-r-2 md:pr-6 ">
            {details.map((item) => {
              return (
                <span
                  className={`p-4 rounded-md cursor-pointer ${
                    active == item.id && "bg-blue-500 text-white"
                  }`}
                  onClick={() => setActive(item.id)}
                  key={item.id}
                >
                  {item.name}
                </span>
              );
            })}
            <span
              className={`p-4 rounded-md cursor-pointer text-red-600`}
              onClick={() => {
                setUser("");
                toast.success("User Logout Successfully");
                router.push("/");
              }}
            >
              Logout
            </span>
          </div>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default index;
