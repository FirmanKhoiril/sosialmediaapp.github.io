import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);
  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold mt-4 hidden m-2 xl:block">Suggested Account</p>

      <div className="">
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
              <div className="w-8 h-8">
                <Image src={user.image} width={34} height={34} className="rounded-full" alt="user Profile" />
              </div>
              <div className="hidden xl:block">
                <p className="text-md font-bold lowercase flex gap-1 items-center">
                  {user.userName.replaceAll(" ", "")}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className=" capitalize text-gray-400 text-xs">{user.userName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
