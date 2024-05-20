"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from "@/utils/useProvider";
import { addEmployee } from "@/utils/addEmployee";
import CustomModal from "./customModal";
import { loginUser } from "@/utils/loginUser";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [user, setUser] = useState("");
  const [registerInput, setRegisterInput] = useState("");
  const { userId, setUserId } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAddEmployee = async () => {
    try {
      const data = await addEmployee(registerInput);

      setUserId(data);
      setIsLoggedIn(true);
      setRegisterModalOpen(false);
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser(user);

      setUserId(data);

      setIsLoggedIn(true);
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      setLoginError(error.message);
      setIsLoggedIn(false);
      console.log(error);
      console.log("Login Error:", loginError);
      onOpen();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("rate");

    setUserId(null);
    setIsLoggedIn(false);
    window.location.reload();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };
  const registerOnSubmit = (e) => {
    e.preventDefault();
    handleAddEmployee();
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("username", "rate");
    if (storedUser) {
      setUserId(storedUser);
      setIsLoggedIn(true);
    }
  }, [setUserId]);

  return (
    <div>
      <div className="flex flex-row justify-between bg-white p-2">
        <Link href="/" className="text-red-1500 bold-24">
          Timesheet Management
        </Link>
        <div className="flex bg-gray-100">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-1500 hover:bg-red-600 text-white rounded-lg"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="px-3 py-1 bg-blue-1200 hover:bg-red-600 text-white rounded-lg"
            >
              Login
            </button>
          )}
          <CustomModal
            isOpen={isModalOpen}
            input={(e) => setUser(e.target.value)}
            onClose={() => setModalOpen(false)}
            onClick={onSubmit}
            title="Login"
            label="Username"
            submit="Login"
            cancel="Close"
          />
          <div className="flex ml-2">
            {!isLoggedIn ? (
              <button
                disabled={isLoggedIn}
                onClick={() => setRegisterModalOpen(true)}
                className="px-3 py-1 bg-blue-1200 hover:bg-red-600 text-white rounded-lg"
              >
                Register
              </button>
            ) : (
              <h1 className="text-blue-1200"></h1>
            )}

            <CustomModal
              isOpen={isRegisterModalOpen}
              input={(e) => setRegisterInput(e.target.value)}
              onClose={() => setRegisterModalOpen(false)}
              onClick={registerOnSubmit}
              title="Register"
              label="Username"
              submit="Register"
              cancel="Close"
            />
          </div>
        </div>
      </div>

      <div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-center">
                  <p>Error Message</p>
                </ModalHeader>
                <ModalBody className="flex items-center justify-center">
                  {loginError && <p className="text-red-1500">{loginError}</p>}
                  {registerError && (
                    <p className="text-red-1500">{registerError}</p>
                  )}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="flex flex-col bg-white my-5">
        <h1 className="bold-24">HH Timesheet</h1>
        <div className="flex flex-row my-2 ">
          <div className="mx-2 font-bold hover:underline text-blue-1200">
            <Link href="/">List of Activities</Link>
          </div>
          <div className="mx-2 font-bold hover:underline text-blue-1200">
            <Link href="/settings">Setting</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
