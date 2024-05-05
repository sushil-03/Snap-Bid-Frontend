import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { getOrders } from "@/hooks/query/getOrder";
import { useSelectedUser } from "@/hooks/state/useAppState";
import Table from "@/components/molecules/Table";

const index = () => {
  const [userType, setUserType] = useState("buyer");
  const [user] = useSelectedUser();
  const [isUser, setIsUser] = useState<boolean>(true);
  console.log("user", user);

  useEffect(() => {
    if (user._id !== "") {
      setIsUser(true);
    }
  }, [user]);
  const { data, isLoading } = getOrders({ userId: user._id, userType });

  return (
    <div className="w-full h-full min-h-screen mt-16 sm:mt-20 md:mt-32">
      <div className="flex flex-col w-full gap-2 p-2 pb-16 mx-auto mt-24 bg-gray-100 sm:px-10 rounded-xl shadow-3xl">
        {isLoading && <div>Loading..</div>}
        {isUser && !isLoading ? (
          <div>
            <div>
              <ToggleButtonGroup
                color="primary"
                value={userType}
                exclusive
                onChange={(e: any) => setUserType(e.target.value)}
                aria-label="Platform"
              >
                <ToggleButton
                  value="buyer"
                  className={`${userType === "buyer" && "!bg-purple-200"} `}
                >
                  Customer
                </ToggleButton>
                <ToggleButton
                  value="seller"
                  className={`${userType === "seller" && "!bg-purple-200"} `}
                >
                  Vendor
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="mt-5">
              {data && <Table data={data.orders} userType={userType} />}
            </div>
            {/* {userType} {user._id} */}
          </div>
        ) : (
          <div>Please login</div>
        )}
      </div>
    </div>
  );
};

export default index;
