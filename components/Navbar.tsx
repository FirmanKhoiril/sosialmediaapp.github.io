import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { BASE_URL } from "../utils";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import logo from "../utils/f.png";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { userProfile, removeUser, addUser }: any = useAuthStore();
  const router = useRouter();
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:h-[30px] h-[38px] md:w-[110px]">
          <Image src={logo} alt="sosmed App" className="cursor-pointer" layout="responsive" />
        </div>
      </Link>
      <div className="relative hidden md:block">
        <form action="" onSubmit={handleSearch} className="absolute md:static top-10 -left-20 bg-white">
          <input
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Account Or Video"
          />
          <button onClick={handleSearch} className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400">
            <BiSearch />
          </button>
        </form>
      </div>

      <div className="">
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className=" hover:bg-pink-500 border-2 px-2 py-2 md:px-4 text-md font-semibold flex items-center gap-2 shadow-sm rounded-sm">
                <IoMdAdd className="text-xl text-black" /> {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image width={40} height={40} className="rounded-full cursor-pointer" src={userProfile.image} alt="profile" />
                </>
              </Link>
            )}
            <button
              className="px-2 rounded-full hover:bg-gray-300 shadow-md shadow-black bg-gray-200"
              type="button"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin onSuccess={(response) => createOrGetUser(response, addUser)} onError={() => console.log("error")} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
