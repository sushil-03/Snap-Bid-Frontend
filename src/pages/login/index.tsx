import Input from "@/components/atoms/Input";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { Formik, Form } from "formik";
import { RiLockPasswordLine } from "react-icons/ri";
import { ImMail3 } from "react-icons/im";
import { AiFillPhone } from "react-icons/ai";
type LoginType = {
  email: string;
  password: string;
};

type RegisterType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
};

const index = () => {
  const loginInitialValues = {
    email: "",
    password: "",
  };
  const registerInitialValues = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    password: "",
  };
  const [login, setLogin] = useState(true);
  const loginHandler = (values: LoginType) => {
    console.log("Login called", values);
  };
  const registerHandler = (values: RegisterType) => {
    console.log("Register Called", values);
  };
  return (
    <div className="h-full ">
      <div className="mt-52"></div>
      <div className="flex items-center justify-between lg:w-4/5 p-8 mx-auto w-full m-10  border-2 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-xl font-baiMedium">
        <div className="relative hidden w-1/4 h-40 sm:inline-block md:w-1/2 md:h-96">
          <Image src={`/images/test.jpg`} fill alt="image"></Image>
        </div>
        {login ? (
          <Formik initialValues={loginInitialValues} onSubmit={loginHandler}>
            {(formik) => {
              return (
                <Form className="w-2/5">
                  <div className="flex flex-col flex-1 gap-6 p-8 rounded-md">
                    <p className="text-4xl text-center text-transparent bg-gradient-to-r from-violet-600 to-orange-600 bg-clip-text font-baibold">
                      Welcome Back
                    </p>
                    <div className="flex flex-col gap-4 ">
                      <div className="flex flex-col">
                        <label htmlFor="Email" className="text-violet-600">
                          Email
                        </label>
                        <Input
                          icon={
                            <ImMail3
                              size={20}
                              className="mr-1 text-violet-800"
                            />
                          }
                          {...formik.getFieldProps("email")}
                          placeholder="@mail"
                          fullWidth
                          className=""
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="password" className="text-violet-600">
                          Password
                        </label>
                        <Input
                          icon={
                            <RiLockPasswordLine
                              size={23}
                              className="text-violet-800"
                            />
                          }
                          {...formik.getFieldProps("password")}
                          placeholder="Password"
                          type="password"
                          fullWidth
                          className="py-4 border-violet-800"
                        />
                      </div>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        variant="secondary"
                        className="mb-2 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800"
                      >
                        Log in
                      </Button>
                      <span className="text-sm">Don't have a account </span>
                      <span
                        className="text-base cursor-pointer text-violet-600"
                        onClick={() => setLogin(false)}
                      >
                        Register
                      </span>{" "}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <Formik
            initialValues={registerInitialValues}
            onSubmit={registerHandler}
          >
            {(formik) => {
              return (
                <Form>
                  <div className="flex flex-col w-full gap-6 p-8 mx-4 rounded-md ">
                    <div className="flex flex-col gap-4 ">
                      <p className="text-4xl text-center text-transparent bg-gradient-to-r from-violet-600 to-orange-600 bg-clip-text font-baibold">
                        Welcome to our Battleground!
                      </p>
                      <div className="flex justify-around gap-4">
                        <div className="flex flex-col flex-1">
                          <label
                            htmlFor="firstName"
                            className="text-violet-600"
                          >
                            First Name
                          </label>
                          <Input
                            {...formik.getFieldProps("firstName")}
                            placeholder="First Name"
                            name="firstName"
                            fullWidth
                            className="p-2 pl-1"
                            type="text"
                          />
                        </div>
                        <div className="flex flex-col flex-1">
                          <label htmlFor="name" className="text-violet-600">
                            Last Name
                          </label>
                          <Input
                            {...formik.getFieldProps("lastName")}
                            placeholder="Last Name"
                            name="lastName"
                            fullWidth
                            className="pl-1"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="flex justify-around gap-4">
                        <div className="flex flex-col flex-1">
                          <label htmlFor="Email" className="text-violet-600">
                            Email
                          </label>
                          <Input
                            icon={
                              <ImMail3
                                size={20}
                                className="mr-1 text-violet-800"
                              />
                            }
                            {...formik.getFieldProps("email")}
                            placeholder="@mail"
                            fullWidth
                            name="email"
                            className="px-2 py-4 pl-4 "
                            type="text"
                          />
                        </div>
                        <div className="flex flex-col flex-1">
                          <label htmlFor="PhoneNo" className="text-violet-600">
                            Phone Number
                          </label>
                          <Input
                            icon={
                              <AiFillPhone
                                size={22}
                                className="text-violet-800"
                              />
                            }
                            {...formik.getFieldProps("PhoneNo")}
                            placeholder="Phone Numebr"
                            fullWidth
                            name="PhoneNo"
                            className="px-2 py-4 pl-4 "
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col ">
                        <label htmlFor="password" className="text-violet-600">
                          Password
                        </label>
                        <Input
                          icon={
                            <RiLockPasswordLine
                              size={23}
                              className="text-violet-800"
                            />
                          }
                          {...formik.getFieldProps("password")}
                          placeholder="Password"
                          name="password"
                          type="password"
                          fullWidth
                          className="px-2 py-4 pl-4 "
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      variant="secondary"
                      className="mb-2 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800"
                    >
                      Register
                    </Button>
                    <div>
                      <span className="text-sm">Already have a account </span>
                      <span
                        className="text-base cursor-pointer text-violet-600"
                        onClick={() => setLogin(true)}
                      >
                        Log in
                      </span>{" "}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default index;
