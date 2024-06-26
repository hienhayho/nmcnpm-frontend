"use client";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { BiHomeAlt, BiBrightness } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { POST } from "@/app/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { message } from "antd";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const successMessage = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const error = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = {
        userName: userName,
        password: password,
      };
      const res = await POST({ body }, "v1/auth/login");

      const data = await res.json();

      console.log("data: ", data);
      if (data.error == 0) {
        successMessage("Login successfully!");
        setTimeout(() => {
          if (data.role_id === 1) {
            router.push("/admin");
          } else {
            router.push("/");
          }
        }, 500);
      } else {
        error(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen flex justify-center items-center bg-blue-200">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-2/5 h-full"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/564x/a7/c4/32/a7c4321221cd2f608bbd935d0edb1f66.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Link href="../">
            {" "}
            <button
              type="submit"
              className="mx-2 my-2 text-white rounded-md hover:bg-slate-700"
            >
              <BiHomeAlt className="text-5xl text-white mx-2 my-2" />
            </button>
          </Link>
          <div className="flex items-center mx-10 mt-40">
            <h1 className="text-gray-100 text-6xl font-normal">
              Good Hotel for good experience
            </h1>
          </div>
          <p className="text-gray-200 text-2xl font-normal mx-10 mt-5">
            Find your perfect room and explore the place
          </p>
        </div>

        {/* Login Form */}
        <div className="absolute right-0 w-3/5 h-full p-16 border-2 border-slate-500 bg-slate-400">
          <div className="flex items-center mb-5">
            <BiBrightness className="text-4xl text-gray-700 mr-4" />
            <h1 className="text-gray-700 text-2xl font-normal">
              Interactive Brand
            </h1>
          </div>
          <div className="flex flex-col bg-slate-100 p-10 rounded-lg shadow-lg mb-0 mx-20">
            <h2
              className="text-5xl font-bold mb-6 mx-14 "
              style={{ marginBottom: "10px" }}
            >
              Login
            </h2>
            <p className="text-sm mb-5 mx-14 p-0 text-gray-600">
              Welcome Back! Please enter your details.
            </p>

            {errorMessage && (
              <p className="text-red-500 mb-4 w-full mx-14">{errorMessage} </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4 mx-14">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-600"
                >
                  UserName
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="mb-4 mx-14">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="mt-1 p-2 w-full border rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-6 w-6 text-gray-400" />
                    ) : (
                      <FaEye className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-4 mx-14">
                {/* <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Remember for 30 days</label>
                <button className="font-medium text-base text-blue-800 mb-5 ml-20">
                  Forgot password
                </button> */}
              </div>

              <div className="flex justify-end w-full">
                <button
                  type="submit"
                  className="px-5 py-2 mx-2 bg-sky-800 text-white rounded-md hover:bg-slate-700 transition duration-500"
                >
                  Login
                </button>
                <Link href="../register">
                  {" "}
                  <button className="px-5 py-2 mr-14 bg-sky-800 text-white rounded-md hover:bg-slate-700 transition duration-500">
                    Register
                  </button>
                </Link>
              </div>
              <div className="w-full flex items-center justify-center relative mt-10">
                <div className="w-full h-[1px] bg-black"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
