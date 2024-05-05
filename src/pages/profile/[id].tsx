import React from "react";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import UserBidding from "@/components/molecules/UserBidding";
import UserProfile from "@/components/molecules/UserProfile";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { useSelectedUser } from "@/hooks/state/useAppState";
import Cookies from "universal-cookie";
import { getUserById } from "@/hooks/query/getUserById";
import Loader from "@/components/molecules/Loader";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { GiFlatHammer } from "react-icons/gi";
const ProfileDetails = [
  {
    name: "My Profile",
    icon: <CgProfile size={24} />,
    id: 1,
  },
  {
    name: "Bidding Info",
    icon: <GiFlatHammer size={24} />,
    id: 2,
  },
];
const ProfileDetail = () => {
  const router = useRouter();
  const userId = router.query.id || "";

  const cookie = new Cookies();
  const [user, setUser] = useSelectedUser();

  const { data, isLoading } = getUserById(userId.toString());

  console.log("data", data, userId);

  const [active, setActive] = useState(1);
  const renderComponent = () => {
    if (active == 1 && data) {
      return <UserProfile data={data.user} />;
    } else if (active == 2) {
      return <UserBidding data={data.user} />;
    }
    return <></>;
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen pt-32 bg-stone-100">
      <div className="w-full p-3 mx-auto rounded-md lg:p-6 lg:w-11/12 ">
        <p className="mb-4 text-2xl font-baiMedium">Account Settings</p>
        <div className="flex flex-col gap-0 bg-white rounded-md lg:gap-8 sm:flex-row">
          <div className="flex flex-col gap-2 md:p-2 p-0  md:m-3 m-0 text-gray-500 border-b-2 sm:border-r-2   sm:w-[200px] w-full">
            <List>
              {ProfileDetails.map((item) => {
                return (
                  <ListItem
                    disablePadding
                    onClick={() => setActive(item.id)}
                    key={item.id}
                  >
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            {data &&
              data.user &&
              user._id.toString() === data.user._id.toString() && (
                <span
                  className={`p-2 rounded-md cursor-pointer text-red-600`}
                  onClick={() => {
                    setUser({
                      name: "",
                      _id: "",
                      token: "",
                      avatar: "",
                      selectedAddress: -1,
                      address: [],
                    });
                    cookie.remove("authorization", {
                      path: "/",
                    });

                    router.push("/");
                    toast.success("User Logout Successfully");
                  }}
                >
                  Logout
                </span>
              )}
          </div>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
