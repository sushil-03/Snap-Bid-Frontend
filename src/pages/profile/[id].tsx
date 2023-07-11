import React from "react";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import UserBidding from "@/components/molecules/UserBidding";
import UserProfile from "@/components/molecules/UserProfile";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
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
  const userId = useRouter().query.id;
  console.log(userId);

  const cookie = new Cookies();
  const [user, setUser] = useSelectedUser();
  const { data, isLoading } = getUserById(userId);

  const [active, setActive] = useState(1);
  const router = useRouter();
  const renderComponent = () => {
    if (active == 1) {
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
      <div className="w-full p-6 mx-auto rounded-md sm:w-11/12 ">
        <p className="mb-4 text-2xl font-baiMedium">Account Settings</p>
        <div className="flex flex-col gap-0 bg-white rounded-md sm:gap-4 md:gap-8 sm:flex-row ">
          <div className="flex flex-col gap-2 p-3 pr-2 m-3 text-gray-500 border-b-2 sm:border-r-2 md:pr-6 ">
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
            {user._id.toString() === data.user._id.toString() && (
              <span
                className={`p-4 rounded-md cursor-pointer text-red-600`}
                onClick={() => {
                  setUser({
                    name: "",
                    _id: "",
                    token: "",
                  });
                  cookie.remove("authorization", {
                    path: "/",
                  });

                  toast.success("User Logout Successfully");
                  router.push("/");
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
