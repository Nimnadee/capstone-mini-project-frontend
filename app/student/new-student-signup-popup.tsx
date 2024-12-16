"use client";
import React, { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import { Link, Button } from "@nextui-org/react";
import { saveStudent } from "@/service/student.service";
import LoginStudentForm from "../student/student-login-popup";
import { FaTimes } from "react-icons/fa";

export default function NewStudentSignupPopup({ onSave }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onOpenChange: onLoginOpenChange, onClose: onLoginClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [error, setError] = useState<string | null>(null);
   

  const validateEmail = (email: string) => {  
    return /^[^\s@]+@[^\s@]+\.(ac\.lk|lk)$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length > 6;
  };

  const onSubmit = async () => {

    if (!email.trim() || !password.trim() || !firstName.trim() || !lastName.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please use your university email!");
      return;
    }
  
    if (!validatePassword(password)) {
      setError("Password must be more than 6 characters!");
      return;
    }
    const res = await saveStudent({
      id: "",
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      success: undefined
    });
    onSave(res);
    handleLoginClick();
    clearForm();
    onClose();
    console.log("trying to save", res);
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const handleLoginClick = () => {
    onClose();
    onLoginOpen();
  };

  const handleSignUpClick = () => {
    onLoginClose();
    onOpen();
  };

 
  
  const handleClose = () => {
    
    onLoginClose();  
  };

  return (
    <>
      <div className="flex gap-3">
        <Button
          className="px-6 py-3 text-lg font-semibold rounded-full bg-gradient-to-br from-black via-violet-900 to-blue-400 hover:bg-gradient-to-br hover:from-black hover:via-violet-900 hover:to-blue-400 relative overflow-hidden"
          onPress={onLoginOpen}
        >
          <span className="relative z-10">Student</span>
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white opacity-20 mix-blend-screen pointer-events-none"></span>
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white opacity-20 mix-blend-screen pointer-events-none"></span>
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white opacity-20 mix-blend-screen pointer-events-none"></span>
        </Button>

        <Modal className={"p-0 m-0 max-w-6xl h-4/5"} isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className={"fixed-size pt-0"}>{(onClose) => (
            <>
              <div className={" flex flex-col h-full"}>
                <div className={"h-full  "}>
                  <ModalBody className={"h-full p-0 m-0"}>
                    <div className={"flex flex-row h-full"}>
                      <div className="container basis-2/5 border-r-1 pr-10 pt-20 pl-8 h-full flex flex-col justify-between"
                        style={{
                          backgroundColor: 'rgba(39, 39, 42, 0.8)',
                          backgroundImage: 'url("https://img.freepik.com/premium-photo/empty-wooden-table-with-smoke-float-up-dark-background_68495-135.jpg")',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                        }}>
                        <p className="mt- text-lg">Your Projects Success Starts from here</p>
                        <ul className="check-list mb-80">
                          <li>Choose your guide according to your personal needs...</li>
                          <li>Personalize your mentorship experience by selecting a guide that meets your criteria....</li>
                          <li>Begin your journey towards success with the right guide by your side...</li>
                          <li>Kickstart your project with guidance from industry experts.</li>
                          <li>Ensure your project's success with personalized mentorship.</li>
                          <li>Available over 1000 guides...</li>
                        </ul>
                      </div>

                      <div className={"basis-3/5 h-full flex flex-col justify-between bg-gradient-to-br from-gray-800 via-black to-gray-900 backdrop-blur-lg bg-opacity-10"}>
                        <div className="w-full flex flex-row gap-2 justify-center pt-0 pb-5 mt-20 text-gray-400 text-xm">
                          <p>Do you already have an account?</p>
                          <Link href="#" underline="always" onClick={handleLoginClick}>Login</Link>
                        </div>
                        <div className={"w-full flex items-center justify-center flex-col gap-4 flex-grow"}>
                          <Input
                            isRequired
                            isClearable
                            className="max-w-sm w-full m-3"
                            label="First name"
                            placeholder="Enter your first name"
                            type="text"
                            value={firstName}
                            variant="bordered"
                            onChange={(e) => setFirstName(e.target.value)}
                            onClear={() => console.log("input cleared")}
                          />
                          <Input
                            isRequired
                            isClearable
                            label="Last name"
                            className="max-w-sm w-full"
                            placeholder="Enter your last name"
                            type="text"
                            value={lastName}
                            variant="bordered"
                            onChange={(e) => setLastName(e.target.value)}
                            onClear={() => console.log("input cleared")}
                          />
                          <Input
                            isRequired
                            className="max-w-sm w-full m-3"
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant={"bordered"}
                          />
                          <Input
                            isRequired
                            className="max-w-sm w-full"
                            endContent={
                              <button
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                              >
                                {isVisible ? (
                                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                              </button>
                            }
                            label="Password"
                            placeholder="Enter your password"
                            type={isVisible ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="bordered"
                          />
                        </div>
                        <div className="h-10 flex items-center justify-center">
                          {error && (
                            <p className="text-red-400 rounded-lg p-0 text-xs max-w-80 h-8 flex items-center justify-center">
                              {error}
                            </p>
                          )}
                        </div>
                        <div className={"flex flex-row justify-center flex-grow p-10"}>
                          <div>
                          <Button color="danger" variant="light" onPress={onClose} className="absolute top-4 right-4"> <FaTimes /></Button>
                          </div>
                          <div className="absolute bottom-5">
                            <Button color="primary" type="submit"  onPress={onSubmit}>
                              Create Account
                            </Button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </ModalBody>
                </div>
              </div>
            </>
          )}
          </ModalContent>
        </Modal>

        <Modal className={"p-0 m-0 max-w-6xl h-4/5"} isOpen={isLoginOpen} onOpenChange={onLoginOpenChange}>
          <ModalContent className={"pt-0"}>{(onClose) => (
            <>
              <div className={"flex flex-col h-full"}>
                <div className="h-full">
                  <ModalBody className={"h-full p-0 m-0"}>
                    <div className={"flex flex-row h-full"}>
                      <div className="container basis-2/5 border-r-1 pr-10 pt-10 pl-8 bg-zinc-800 h-full flex flex-col justify-between"
                        style={{
                          backgroundColor: 'rgba(39, 39, 42, 0.8)',
                          backgroundImage: 'url("https://img.freepik.com/premium-photo/empty-wooden-table-with-smoke-float-up-dark-background_68495-135.jpg")',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                        }}
                      >
                        <p className="mt-10 text-lg">Your Projects Success Starts from here</p>
                        <ul className="check-list mb-80">
                          <li>Choose your guide according to your personal needs...</li>
                          <li>Personalize your mentorship experience by selecting a guide that meets your criteria....</li>
                          <li>Begin your journey towards success with the right guide by your side...</li>
                          <li>Kickstart your project with guidance from industry experts.</li>
                          <li>Ensure your project's success with personalized mentorship.</li>
                          <li>Available over 1000 guides...</li>
                        </ul>

                      </div>

                      <div className={"basis-3/5 bg-gradient-to-br from-gray-800 via-black to-gray-900 backdrop-blur-lg bg-opacity-10 relative"}>
                        <Button color="danger" variant="light" onClick={handleClose} className="absolute top-4 right-4"><FaTimes /></Button>
                        <div className={"w-full flex flex-row gap-2 justify-center pt-10 pb-20 mb-22 text-gray-400"}>
                          <div className="mt-24">
                            <p>Do you not have an account? <Link href="#" underline="always" onClick={handleSignUpClick}>Create New Account</Link></p>
                          </div>
                        </div>
                        <div className={"w-full flex items-center justify-center flex-col gap-4 pb-20 mb-20"}>
                          <LoginStudentForm onCloseModal={handleClose} />
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                </div>
              </div>
            </>
          )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

 
