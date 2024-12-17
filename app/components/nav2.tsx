"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Newnav() {
  const router = useRouter();

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 fixed w-full z-50 top-0 backdrop-blur-lg bg-opacity-10 shadow-md">
      <div className="container mx-auto px-1 py-2 flex justify-between items-center">
        <div className="flex items-center cursor-pointer space-x-2" onClick={() => router.push("/")}>
          <img
            src="/images/32.png"
            alt="Guidly Logo"
            className="h-20 w-auto object-contain"
          />
          <span className="text-white text-2xl font-semibold tracking-wide">Guidely</span>
        </div>
        <div className="flex space-x-6 font-semibold" style={{ paddingRight: '60px' }}>
        <a href="/" className="text-white hover:text-yellow-400 text-xl transition duration-300 ease-in-out transform hover:scale-105">
                Home
          </a>
          <a href="/project/create-new-project-form" className="text-white hover:text-yellow-400 text-xl transition duration-300 ease-in-out transform hover:scale-105">
                Create Project
          </a> 
          <a href="/project/exisiting-projects" className="text-white hover:text-yellow-400 text-xl transition duration-300 ease-in-out transform hover:scale-105">
                View Exisiting Projects
          </a>
          <a href="/contactus" className="text-white hover:text-yellow-400 text-xl transition duration-300 ease-in-out transform hover:scale-105">
                Contact
          </a>

        </div>
      </div>
    </nav>
  );
}
