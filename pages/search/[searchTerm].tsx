import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

const Search = ({ videos }: { videos: Video[] }) => {
  const [showUserVideos, setShowUserVideos] = useState(false);
  const [isAccount, setIsAccount] = useState(false);
  const { allUsers } = useAuthStore();
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const account = isAccount ? "border-b border-black" : "text-gray-400";
  const liked = !isAccount ? "border-b border-black" : "text-gray-400";
  const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${account}`} onClick={() => setIsAccount(true)}>
          Account
        </p>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setIsAccount(false)}>
          Vidio
        </p>
      </div>
      {isAccount ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex cursor-pointer font-semibold  p-2 mb-4 border-b-2 gap-3">
                  <div>
                    <Image width={50} height={50} className="rounded-full cursor-pointer" src={user.image} alt="user-profile" />
                  </div>
                  <p className="flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
                    {user.userName} <GoVerified className="text-blue-400" />
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No vidio result for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">{videos.length ? videos.map((video: Video, idx: number) => <VideoCard post={video} key={idx} />) : <NoResults text={`No vidio result for ${searchTerm}`} />}</div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string } }) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};
export default Search;
