import { Rating } from "@mui/material";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";
import Input from "../atoms/Input";
import { Formik, Form } from "formik";
import Button from "../atoms/Button";
import { AiFillPhone } from "react-icons/ai";
import { CgGhostCharacter } from "react-icons/cg";
import { RiCharacterRecognitionFill } from "react-icons/ri";
import { useUpdateUser } from "@/hooks/mutation/useUpdateUser";
import toast from "react-hot-toast";

import { useSelectedUser } from "@/hooks/state/useAppState";
import { DecodedType } from "./Login";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import Address from "./Address";
const MyProfile = ({ data }: any) => {
  const personalInitialInfo = {
    firstname: data.firstname,
    lastname: data.lastname,
    contact: data.contact,
  };

  const [profileEditInfo, setProfileEditInfo] = useState(false);
  const [_, setUser] = useSelectedUser();
  const cookie = new Cookies();
  const { mutate: proposeUpdateUser, isLoading } = useUpdateUser();

  const callUpateUserAPI = async (updatedData: any) => {
    proposeUpdateUser(updatedData, {
      onSuccess(result) {
        console.log("success", result);
        toast.success("Updated successfully");

        setUser((user) => {
          return {
            ...user,
            address: result.user.address,
            selectedAddress: result.user.selectedAddress,
          };
        });
        const decoded: DecodedType = jwt(result.token);
        cookie.set("authorization", result, {
          expires: new Date(decoded.exp * 1000),
          path: "/",
        });
      },
      onError(error) {
        console.log("error", error);
      },
    });
  };
  const handleUpdate = (values: any) => {
    const updatedData = {
      ...data,
      ...values,
    };
    callUpateUserAPI(updatedData);
  };

  return (
    <div className="flex-1 px-2 ">
      <p className="my-4 text-lg">My Profile</p>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-start justify-between w-full p-2 shadow-xl sm:p-4 flexcol md:flex-row rounded-xl bg-stone-50">
          <div className="flex items-center gap-4">
            <Image
              src={data.avatar ? data.avatar : "/images/profile/p1.png"}
              height={50}
              width={100}
              alt="image"
            />
            <div className="flex flex-col font-baiLight">
              <span className="font-baiMedium">{`${data.firstname} ${data.lastname}`}</span>
              <span className="text-sm">{data.email}</span>
              <span className="text-sm">
                <Rating
                  name="read-only"
                  value={3}
                  readOnly
                  className="text-lg smxt-sm"
                />
              </span>
            </div>
          </div>
        </div>
        {/* Personal INformation */}
        <div className="relative w-full p-4 shadow-xl rounded-xl bg-stone-50">
          <p className="my-4 text-lg">Personal Information</p>

          <Formik initialValues={personalInitialInfo} onSubmit={handleUpdate}>
            {(formik) => {
              return (
                <Form>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-1 font-baiMedium">
                    <div>
                      <p className="text-sm text-gray-400">First Name</p>

                      {profileEditInfo ? (
                        <Input
                          {...formik.getFieldProps("firstname")}
                          placeholder="First Name"
                          name="firstname"
                          fullWidth
                          defaultValue={data.firstname}
                          Icon={RiCharacterRecognitionFill}
                          className={`  ${
                            formik.errors.firstname && formik.touched.firstname
                              ? "!border-red-600 border-2 ring-4"
                              : "border-violet-800 border-2"
                          } `}
                          type="text"
                        />
                      ) : (
                        <p>{data.firstname}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Last Name</p>
                      {profileEditInfo ? (
                        <Input
                          {...formik.getFieldProps("lastname")}
                          placeholder="Last Name"
                          Icon={CgGhostCharacter}
                          name="lastname"
                          fullWidth
                          className={` ${
                            formik.errors.lastname && formik.touched.lastname
                              ? "border-red-600 border-2 hover:ring-transparent"
                              : "border-violet-800 border-2"
                          } `}
                          type="text"
                        />
                      ) : (
                        <p>{data.lastname}</p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Phone Number</p>

                      {profileEditInfo ? (
                        <div className="flex flex-col flex-1">
                          <Input
                            Icon={AiFillPhone}
                            {...formik.getFieldProps("contact")}
                            placeholder="contact"
                            fullWidth
                            name="contact"
                            className={` ${
                              formik.errors.contact && formik.touched.contact
                                ? "!border-red-600 border-2 hover:ring-transparent"
                                : "border-violet-800 border-2"
                            } `}
                            type="text"
                          />
                        </div>
                      ) : (
                        <p>{data.contact}</p>
                      )}
                    </div>
                  </div>
                  {profileEditInfo && (
                    <div className="flex items-center justify-center mt-5">
                      <Button
                        onClick={() => handleUpdate(formik.values)}
                        type="submit"
                        disabled={isLoading}
                        variant="secondary"
                        className="!py-2 !px-4 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 disabled:bg-gray-400 disabled:hover:ring-transparent "
                      >
                        Update
                      </Button>
                    </div>
                  )}
                </Form>
              );
            }}
          </Formik>

          <div
            className="absolute flex items-center justify-center w-10 h-10 gap-2 bg-white border-2 rounded-full cursor-pointer xl:top-5 top-5 right-5 font-baiMedium border-black-700 "
            onClick={() => setProfileEditInfo(!profileEditInfo)}
          >
            <CiEdit size={20} />
          </div>
        </div>
        {/* Address Information */}
        <Address />
      </div>
    </div>
  );
};

export default MyProfile;
