import { LoginType } from "@/endpoints/user";
import { Formik, Form } from "formik";
import { ImMail3 } from "react-icons/im";
import { RiLockPasswordLine } from "react-icons/ri";
import * as Yup from "yup";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { useLogin } from "@/hooks/mutation/useLogin";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

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
    email: "",
    password: "",
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
        console.log("result", result);

        setUser({
          name: result.user.firstname,
          _id: result.user._id,
          token: result.token,
          address: result.user.address,
          avatar: result.user.avatar,
          selectedAddress: result.user.selectedAddress,
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
          <Form className="w-full px-4 py-10 sm:px-8 lg:w-2/5 md:px-0">
            <div className="flex flex-col flex-1 gap-6 rounded-md xl:p-8 ">
              <p className="text-2xl text-center md:text-4xl font-baibold">
                Welcome Back
              </p>
              <div className="flex flex-col gap-4 ">
                <div className="flex flex-col">
                  {/* <label htmlFor="Email" className="text-violet-600">
                    Email
                  </label> */}
                  <Input
                    Icon={ImMail3}
                    {...formik.getFieldProps("email")}
                    placeholder="@mail"
                    fullWidth
                    className={`lg:pl-10 md:pl-8 ${
                      formik.errors.email && formik.touched.email
                        ? "!border-red-600 hover:ring-transparent"
                        : ""
                    } `}
                    type="text"
                  />
                  <p className="mt-1 text-xs text-red-700 text-end">
                    {formik.touched.email ? formik.errors.email : ""}
                  </p>
                </div>
                <div className="flex flex-col">
                  {/* <label htmlFor="password" className="text-violet-600">
                    Password
                  </label> */}
                  <Input
                    Icon={RiLockPasswordLine}
                    {...formik.getFieldProps("password")}
                    placeholder="Password"
                    type="password"
                    fullWidth
                    className={` lg:pl-10 md:pl-8 ${
                      formik.errors.password && formik.touched.password
                        ? "!border-red-600 !border-2 hover:ring-transparent"
                        : ""
                    } `}
                  />
                  <p className="mt-1 text-xs text-red-800 text-end">
                    {formik.touched.password ? formik.errors.password : ""}
                  </p>
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  variant="secondary"
                  className={`mb-2 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 disabled:bg-gray-400 disabled:hover:ring-transparent !py-2 `}
                  disabled={isLoginLoading}
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
  );
};

export default Login;
