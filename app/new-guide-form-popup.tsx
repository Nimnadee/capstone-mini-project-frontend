// "use client";
// import React, { useState } from "react";
// import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
// import { Input } from "@nextui-org/input";
// import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
// import { Link, Button } from "@nextui-org/react";
//
// import { saveGuide } from "@/service/guide.service";
// import LoginGuideForm from "@/app/guide-form-login";
// import { useRouter } from "next/navigation";
// import NewStudAccCreatedPopup from "@/app/guide-acc-successfully-created-popup";
// import {BsCheckLg} from "react-icons/bs";
//
// export default function NewGuideFormPopup({ onSave }) {
//   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
//   const { isOpen: isLoginOpen, onOpen: onLoginOpen, onOpenChange: onLoginOpenChange, onClose: onLoginClose } = useDisclosure();
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [profilePic, setProfilePic] = useState("");
//   const [job, setjob] = useState("");
//   const [about, setAbout] = useState("");
//   const [milestones, setMilestones] = useState("");
//   const [socialMediaLinks, setSocialMediaLinks] = useState("");
//
//   const toggleVisibility = () => setIsVisible(!isVisible);
//
//   const onSubmit = async () => {
//     const res = await saveGuide({
//       id: "",
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       password: password,
//       profilePic:profilePic,
//       job:job,
//       about:about,
//       milestones:milestones,
//       socialMediaLinks:socialMediaLinks,
//     });
//
//     onSave(res);
//     clearForm();
//     onClose();
//     setIsSuccessOpen(true);
//     console.log("trying to save", res);
//   };
//
//   const clearForm = () => {
//     setFirstName("");
//     setLastName("");
//     setEmail("");
//     setPassword("");
//     setProfilePic("");
//     setjob("");
//     setAbout("");
//     setMilestones("");
//     setSocialMediaLinks("");
//   };
//
//   const handleLoginClick = () => {
//     onClose();
//     onLoginOpen();
//   };
//
//   const handleSignUpClick = () => {
//     onLoginClose();
//     onOpen();
//   };
//
//   return (
//       <>
//         <div className="flex gap-3">
//           <Button radius="full" onPress={onOpen}>Guide</Button>
//
//           <Modal className={"p-0 m-0 max-w-3xl h-max"} isOpen={isOpen} onOpenChange={onOpenChange}>
//             <ModalContent className={"fixed-size pt-0"}>
//               {(onClose) => (
//                   <>
//                     <div className={"flex flex-col"}>
//                       <div>
//                         <ModalBody className={"h-full p-0 m-0"}>
//                           <div className={"flex flex-row gap-3"}>
//
//                               <div className="container basis-2/5 border-r-1 pr-10 pt-10 pl-8 bg-zinc-800">
//                                 <p>Your Projects Success Starts from here</p>
//                                 <ul className="check-list">
//                                   <li>Choose your guide according to your personal needs...</li>
//                                   <li>available over 1000 guides..</li>
//                                 </ul>
//                               </div>
//
//                             <div className={"basis-3/5"}>
//                               <div className="w-full flex flex-row gap-2 justify-center pt-10 pb-5">
//                                 <p>Do you already have an account?</p>
//                                 <Link href="#" underline="always" onClick={handleLoginClick}>Login</Link>
//                               </div>
//                               <div className={"w-full flex items-center justify-center flex-col gap-4"}>
//                                 <Input
//                                     isRequired
//                                     isClearable
//                                     className="max-w-xs"
//                                     label="First Name"
//                                     placeholder="Enter your first name"
//                                     type="text"
//                                     value={firstName}
//                                     variant="bordered"
//                                     onChange={(e) => setFirstName(e.target.value)}
//                                     onClear={() => console.log("input cleared")}
//                                 />
//                                 <Input
//                                     isRequired
//                                     isClearable
//                                     className="max-w-xs"
//                                     label="Last Name"
//                                     placeholder="Enter your last name"
//                                     type="text"
//                                     value={lastName}
//                                     variant="bordered"
//                                     onChange={(e) => setLastName(e.target.value)}
//                                     onClear={() => console.log("input cleared")}
//                                 />
//                                 <Input
//                                     isRequired
//                                     className="max-w-xs"
//                                     label="Email"
//                                     placeholder="Enter your email"
//                                     type="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     variant={"bordered"}
//                                 />
//                                 <Input
//                                     isRequired
//                                     className="max-w-xs"
//                                     endContent={
//                                       <button
//                                           className="focus:outline-none"
//                                           type="button"
//                                           onClick={toggleVisibility}
//                                       >
//                                         {isVisible ? (
//                                             <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//                                         ) : (
//                                             <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//                                         )}
//                                       </button>
//                                     }
//                                     label="Password"
//                                     placeholder="Enter your password"
//                                     type={isVisible ? "text" : "password"}
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     variant="bordered"
//                                 />
//                                  <Input
//                                     isRequired
//                                     isClearable
//                                     className="max-w-xs"
//                                     label="Profilepic"
//                                     placeholder="Enter your Profile picture"
//                                     type="text"
//                                     value={profilePic}
//                                     variant="bordered"
//                                     onChange={(e) => setProfilePic(e.target.value)}
//                                     onClear={() => console.log("input cleared")}
//                                 />
//                                  <Input
//                                     isRequired
//                                     isClearable
//                                     className="max-w-xs"
//                                     label="job"
//                                     placeholder="Enter your job"
//                                     type="text"
//                                     value={job}
//                                     variant="bordered"
//                                     onChange={(e) => setjob(e.target.value)}
//                                     onClear={() => console.log("input cleared")}
//                                 />
//                                  <Input
//                                     isRequired
//                                     isClearable
//                                     className="max-w-xs"
//                                     label="about"
//                                     placeholder="Enter your about"
//                                     type="text"
//                                     value={about}
//                                     variant="bordered"
//                                     onChange={(e) => setAbout(e.target.value)}
//                                     onClear={() => console.log("input cleared")}
//                                 />
//                                  <Input
//                                     isRequired
//                                     isClearable
//                                     className="max-w-xs"
//                                     label="milestones"
//                                     placeholder="Enter your Milestones"
//                                     type="text"
//                                     value={milestones}
//                                     variant="bordered"
//                                     onChange={(e) => setMilestones(e.target.value)}
//                                     onClear={() => console.log("input cleared")}
//                                 />
//                                  <Input
//                                     isRequired
//                                     isClearable
//                                     className="max-w-xs"
//                                     label="Social Media Links"
//                                     placeholder="Enter your Social Media links"
//                                     type="text"
//                                     value={socialMediaLinks}
//                                     variant="bordered"
//                                     onChange={(e) => setSocialMediaLinks(e.target.value)}
//                                     onClear={() => console.log("input cleared")}
//                                 />
//                               </div>
//                               <div className={"flex flex-row justify-end p-10 pb-5"}>
//                                 <div>
//                                   <Button color="danger" variant="light" onPress={onClose}>
//                                     Close
//                                   </Button>
//                                 </div>
//                                 <div>
//                                   <Button color="primary" type="submit" onPress={onSubmit}>
//                                     Create Account
//                                   </Button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </ModalBody>
//                       </div>
//                     </div>
//                   </>
//               )}
//             </ModalContent>
//           </Modal>
//
//           <Modal className={"p-0 m-0 max-w-3xl"} isOpen={isLoginOpen} onOpenChange={onLoginOpenChange}>
//             <ModalContent className={"pt-0"}>
//               {(onClose) => (
//                   <>
//                     <div className={"flex flex-col"}>
//                       <div>
//                         <ModalBody className={"h-full p-0 m-0"}>
//                           <div className={"flex flex-row gap-3"}>
//                             <div className="container basis-2/5 border-r-1 pr-10 pt-10 pl-8 bg-zinc-800">
//                               <p>Your Projects Success Starts from here</p>
//                               <ul className="check-list">
//                                 <li>Choose your guide according to your personal needs...</li>
//                                 <li>available over 1000 guides..</li>
//                               </ul>
//                             </div>
//
//                             <div className={"basis-3/5"}>
//                               <div className="w-full flex flex-row gap-2 justify-center pt-10 pb-20">
//                                 <p>Do you not have an account?</p>
//                                 <Link href="#" underline="always" onClick={handleSignUpClick}>Create New Account</Link>
//                               </div>
//                               <div className={"w-full flex items-center justify-center flex-col gap-4 pb-20"}>
//                                 <LoginGuideForm />
//                               </div>
//                               <div className={"flex flex-row justify-end p-10 pb-5"}>
//                                 <div>
//                                   <Button color="danger" variant="light" onPress={onClose}>
//                                     Close
//                                   </Button>
//                                 </div>
//                                 <div>
//                                   <Button color="primary" onPress={onClose}>
//                                     Login
//                                   </Button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </ModalBody>
//                       </div>
//                     </div>
//                   </>
//               )}
//             </ModalContent>
//           </Modal>
//
//           <NewStudAccCreatedPopup isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
//         </div>
//       </>
//   );
// }