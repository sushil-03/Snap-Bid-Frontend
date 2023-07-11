import { LoginType } from "@/endpoints/user";
import { Formik, Form } from "formik";
import { ImMail3 } from "react-icons/im";
import { RiLockPasswordLine } from "react-icons/ri";
import * as Yup from "yup";
import Input from "@/components/atoms/Input";
import React from "react";
import Button from "@/components/atoms/Button";
import { useLogin } from "@/hooks/mutation/useLogin";
import { useRouter } from "next/router";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useSelectedUser } from "@/hooks/state/useAppState";

import Cookies from "universal-cookie";
import jwt from "jwt-decode";
export type DecodedType = {
  exp: number;
  iat: number;
  id: string;
};

const Login = ({ setLogin }: { setLogin: (data: boolean) => void }) => {
  const [, setUser] = useSelectedUser();
  const router = useRouter();
  const cookie = new Cookies();
  const loginInitialValues = {
    email: "sushil121@gmail.com",
    password: "sushil121@gmail.com",
    // email: "",
    // password: "",
  };
  const loginValidationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
  });

  const { mutate: proposeLogin, isLoading: isLoginLoading } = useLogin();

  const loginHandler = (values: LoginType) => {
    console.log("Login called", values);
    proposeLogin(values, {
      onSuccess(result) {
        toast.success("User logged in ");
        setUser({
          name: result.user.firstname,
          _id: result.user._id,
          token: result.token,
        });
        const decoded: DecodedType = jwt(result.token);
        cookie.set("authorization", result, {
          expires: new Date(decoded.exp * 1000),
          path: "/",
        });
        router.push("/explore");
      },
      onError(errors) {
        toast.error("Invalid credentials");
        console.log("Login error", errors);
      },
    });
  };

  return (
    <Formik
      initialValues={loginInitialValues}
      onSubmit={loginHandler}
      validationSchema={loginValidationSchema}
    >
      {(formik) => {
        return (
          <Form className="w-full px-0 border-4 sm:px-8 md:w-2/5 md:px-0 border-black-100">
            <div className="flex flex-col flex-1 gap-6 rounded-md xl:p-8 ">
              <p className="text-2xl text-center text-transparent md:text-4xl bg-gradient-to-r from-violet-600 to-orange-600 bg-clip-text font-baibold">
                Welcome Back
              </p>
              <div className="flex flex-col gap-4 ">
                <div className="flex flex-col">
                  <label htmlFor="Email" className="text-violet-600">
                    Email
                  </label>
                  <Input
                    icon={
                      <ImMail3 size={20} className="mr-1 text-violet-800" />
                    }
                    {...formik.getFieldProps("email")}
                    placeholder="@mail"
                    fullWidth
                    className={` ${
                      formik.errors.email && formik.touched.email
                        ? "border-red-600 border-2 hover:ring-transparent"
                        : "border-violet-800 border-2"
                    } `}
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
                    className={`py-4 ${
                      formik.errors.password && formik.touched.password
                        ? "border-red-600 border-2 hover:ring-transparent"
                        : "border-violet-800 border-2"
                    } `}
                  />
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  variant="secondary"
                  className={`mb-2 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 disabled:bg-gray-400 disabled:hover:ring-transparent `}
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? (
                    <div className="absolute inset-0 bottom-0 w-screen h-screen pt-20 bg-violet-600">
                      <Loader />
                    </div>
                  ) : (
                    "Log in"
                  )}
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
  );
};

export default Login;
