"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = () => {
    router.push('/contactus');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-black to-gray-800 fixed w-full z-50 top-0 backdrop-blur-lg bg-opacity-10 shadow-md ">
      <div className="container mx-auto px-1 py-2 flex justify-between items-center">
        <div className="flex items-center cursor-pointer space-x-2" onClick={() => router.push("/")}>
          <img
            src="/images/32.png"
            alt="Guidly Logo"
            className="h-20 w-auto object-contain"
          />
          <span className="text-white text-2xl font-semibold tracking-wide">Guidely</span>
        </div>
        <div className="flex space-x-6 font-semibold " style={{ paddingRight: '230px' }}>
        <a href="/" className="text-white hover:text-yellow-400 text-xl transition duration-300 ease-in-out transform hover:scale-105">
                Home
          </a>
           
          <a href="/contactus" className="text-white hover:text-yellow-400 text-xl transition duration-300 ease-in-out transform hover:scale-105">
                Contact
          </a>

        </div>
      </div>
    </nav>
  );
}
