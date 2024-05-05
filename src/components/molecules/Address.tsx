import React, { useState } from "react";
import { Formik } from "formik";
import { useUpdateUser } from "@/hooks/mutation/useUpdateUser";
import Input from "../atoms/Input";
import { GiBlackFlag } from "react-icons/gi";
import { TbBuildingEstate } from "react-icons/tb";
import { AiTwotonePushpin } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useSelectedUser } from "@/hooks/state/useAppState";
import Button from "../atoms/Button";
import { DecodedType } from "./Login";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";

const Address = ({ update = true }: { update?: boolean }) => {
  const [user, setUser] = useSelectedUser();
  const { mutate: proposeUpdateUser, isLoading } = useUpdateUser();
  const cookie = new Cookies();
  const [addressEditInfo, setAddressEditInfo] = useState(false);
  const addInitialInfo = {
    country: "",
    city: "",
    state: "",
    pincode: "",
  };

  const callUpateUserAPI = async (updatedData: any) => {
    console.log("updated", updatedData);

    proposeUpdateUser(updatedData, {
      onSuccess(result) {
        console.log("success", result);

        setUser({
          ...user,
          address: result.user.address,
          selectedAddress: result.user.selectedAddress,
        });
        const decoded: DecodedType = jwt(result.token);
        cookie.set("authorization", result, {
          expires: new Date(decoded.exp * 1000),
          path: "/",
        });
      },
      onError(error) {
        console.log("error", error);
        const errorMessage = "Something went wrong. Please relogin again";
        toast.error(errorMessage);
      },
    });
  };
  const addAddress = (values: any) => {
    const newAddress = [
      ...user.address,
      {
        ...values,
      },
    ];

    const updatedData = {
      address: newAddress,
    };
    callUpateUserAPI(updatedData);
  };
  const updateAddress = (values: any, indexToChange: number) => {
    const updatedAddress = user.address.map((add: any, index: number) => {
      if (index === indexToChange) {
        return { ...add, ...values };
      }
      return add;
    });

    const updatedData = {
      ...user.address,
      address: updatedAddress,
    };
    callUpateUserAPI(updatedData);
  };
  const changeSelect = (index: number) => {
    const updatedData = {
      ...user.address,
      selectedAddress: index,
    };
    console.log("update", updatedData);

    callUpateUserAPI(updatedData);
  };
  return (
    <div className="relative w-full p-4 shadow-xl rounded-xl bg-stone-50">
      <p className="my-4 text-lg">Address</p>
      {/* Header */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:grid-cols-4 sm:grid-rows-1 font-baiMedium">
        <div>
          <p className="text-sm text-gray-400">Country</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">City</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">State</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Pin Code</p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full ">
        {user.address.map((addrs: any, index: number) => {
          return (
            <Formik
              key={index}
              onSubmit={(values) => updateAddress(values, index)}
              initialValues={{
                country: addrs.country,
                state: addrs.state,
                city: addrs.city,
                pincode: addrs.pincode,
              }}
            >
              {(formik) => {
                return (
                  <div
                    className={`grid grid-cols-2 p-2  grid-rows-2 gap-4 mt-4 sm:grid-cols-4 sm:grid-rows-1 font-baiMedium ${
                      user.selectedAddress === index && "bg-blue-100"
                    }`}
                    key={index}
                  >
                    <div>
                      {addressEditInfo ? (
                        <Input
                          Icon={GiBlackFlag}
                          {...formik.getFieldProps(`country-${index}`)}
                          placeholder="Country"
                          fullWidth
                          defaultValue={addrs.country}
                          autoComplete="false"
                          name={`country-${index}`}
                          className={`!text-sm !text-black-700 lg:pl-10 ${
                            formik.errors.country && formik.touched.country
                              ? "!border-red-600 border-2 hover:ring-transparent"
                              : "border-violet-800 border-2"
                          } `}
                          type="text"
                        />
                      ) : (
                        <p className="">{addrs.country}</p>
                      )}
                    </div>
                    <div>
                      {addressEditInfo ? (
                        <Input
                          Icon={TbBuildingEstate}
                          {...formik.getFieldProps(`city-${index}`)}
                          placeholder="City"
                          defaultValue={addrs.city}
                          fullWidth
                          name={`city-${index}`}
                          autoComplete="false"
                          className={`lg:pl-10 !text-sm !text-black-700  ${
                            formik.errors.city && formik.touched.city
                              ? "!border-red-600 !border-2 hover:ring-transparent"
                              : "border-violet-800 border-2"
                          } `}
                          type="text"
                        />
                      ) : (
                        <p>{addrs.city}</p>
                      )}
                    </div>
                    <div>
                      {addressEditInfo ? (
                        <Input
                          Icon={TbBuildingEstate}
                          {...formik.getFieldProps(`state-${index}`)}
                          placeholder="State"
                          fullWidth
                          autoComplete="false"
                          defaultValue={addrs.state}
                          name={`state-${index}`}
                          className={`lg:pl-10 !text-sm !text-black-700 ${
                            formik.errors.state && formik.touched.state
                              ? "!border-red-600 border-2 hover:ring-transparent"
                              : "border-violet-800 border-2"
                          } `}
                          type="text"
                        />
                      ) : (
                        <p>{addrs.state}</p>
                      )}
                    </div>
                    <div>
                      {addressEditInfo ? (
                        <div className="flex gap-2">
                          <Input
                            {...formik.getFieldProps(`pincode-${index}`)}
                            Icon={AiTwotonePushpin}
                            defaultValue={addrs.pincode}
                            placeholder="pincode"
                            fullWidth
                            name={`pincode-${index}`}
                            autoComplete="false"
                            className={`lg:pl-8 !text-sm !text-black-700   ${
                              formik.errors.pincode && formik.touched.pincode
                                ? "border-red-600 border-2 hover:ring-transparent"
                                : "border-violet-800 border-2"
                            } `}
                            type="text"
                          />
                          <Button
                            type="submit"
                            onClick={() => {
                              if (formik.dirty) {
                                const tempValues = formik.values;

                                const updatedValues = Object.fromEntries(
                                  Object.entries(tempValues).map(
                                    ([key, value]) => [
                                      key.replace(`-${index}`, ""),
                                      value,
                                    ]
                                  )
                                );
                                updateAddress(updatedValues, index);
                              }
                            }}
                            disabled={!formik.dirty}
                            variant="secondary"
                            className="!py-2 !px-4  text-sm rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 disabled:bg-gray-400 disabled:hover:ring-transparent "
                          >
                            Update
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-2">
                          <p>{addrs.pincode}</p>
                          <Button
                            type="submit"
                            onClick={() => changeSelect(index)}
                            variant="secondary"
                            className="!py-2 !px-4  text-sm rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 disabled:bg-gray-400 disabled:hover:ring-transparent "
                            disabled={user.selectedAddress === index}
                          >
                            {user.selectedAddress === index
                              ? "Selected"
                              : "Select"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }}
            </Formik>
          );
        })}
      </div>
      {/* Add Adresss */}
      <Formik onSubmit={addAddress} initialValues={addInitialInfo}>
        {(formik) => {
          return (
            <div
              className={`grid grid-cols-2 grid-rows-2 gap-1 mt-4 lg:gap-4 sm:grid-cols-4 sm:grid-rows-1 font-baiMedium `}
            >
              <div>
                <div className="text-sm text-gray-400">
                  <Input
                    Icon={GiBlackFlag}
                    {...formik.getFieldProps("country")}
                    placeholder="Country"
                    fullWidth
                    name="country"
                    className={`!text-sm !text-black-700 lg:pl-10 ${
                      formik.errors.country && formik.touched.country
                        ? "!border-red-600 border-2 hover:ring-transparent"
                        : "border-violet-800 border-2"
                    } `}
                    type="text"
                  />
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <Input
                  Icon={TbBuildingEstate}
                  {...formik.getFieldProps("city")}
                  placeholder="City"
                  fullWidth
                  name="city"
                  className={`lg:pl-10 !text-sm !text-black-700  ${
                    formik.errors.city && formik.touched.city
                      ? "!border-red-600 !border-2 hover:ring-transparent"
                      : "border-violet-800 border-2"
                  } `}
                  type="text"
                />
              </div>
              <div>
                <div className="text-sm text-gray-400">
                  {" "}
                  <Input
                    Icon={TbBuildingEstate}
                    {...formik.getFieldProps("state")}
                    placeholder="State"
                    fullWidth
                    name="state"
                    className={`lg:pl-10 !text-sm !text-black-700 ${
                      formik.errors.state && formik.touched.state
                        ? "!border-red-600 border-2 hover:ring-transparent"
                        : "border-violet-800 border-2"
                    } `}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">
                  <Input
                    Icon={AiTwotonePushpin}
                    {...formik.getFieldProps("pincode")}
                    placeholder="pincode"
                    fullWidth
                    name="pincode"
                    className={`lg:pl-8 !text-sm !text-black-700  ${
                      formik.errors.pincode && formik.touched.pincode
                        ? "border-red-600 border-2 hover:ring-transparent"
                        : "border-violet-800 border-2"
                    } `}
                    type="text"
                  />
                </div>
                <Button
                  type="submit"
                  onClick={() => {
                    if (formik.dirty) {
                      addAddress(formik.values);
                      formik.resetForm();
                    }
                  }}
                  disabled={!formik.dirty || isLoading}
                  variant="secondary"
                  className="!py-2  text-sm !px-4 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 disabled:bg-gray-400 disabled:hover:ring-transparent "
                >
                  Add
                </Button>
              </div>
            </div>
          );
        }}
      </Formik>
      {update && (
        <div
          className="absolute flex items-center justify-center w-10 h-10 gap-2 p-1 bg-white border rounded-full cursor-pointer xl:top-5 top-3 right-5 font-baiMedium border-black-700"
          onClick={() => setAddressEditInfo(!addressEditInfo)}
        >
          <CiEdit size={20} />
        </div>
      )}
    </div>
  );
};

export default Address;
