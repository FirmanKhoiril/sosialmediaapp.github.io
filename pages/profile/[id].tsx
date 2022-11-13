import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedQuery: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [vidioList, setVidioList] = useState<Video[]>([]);
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const { user, userVideos, userLikedQuery } = data;

  const videos = showUserVideos ? "border-b border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b border-black" : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setVidioList(userVideos);
    } else {
      setVidioList(userLikedQuery);
    }
  }, [showUserVideos, userLikedQuery, userVideos]);
  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-13 h-13 md:w-16 md:h-16">
          <Image src={user.image} width={50} height={50} className="rounded-full" alt="user Profile" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="md:text-2xl justify-center tracking-wider font-bold lowercase flex gap-1 items-center">
            {user.userName.replace(/\s+/g, "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className=" capitalize md:text-xl text-gray-400 text-xs">{user.userName}</p>
        </div>
      </div>

      <div className="">
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={() => setShowUserVideos(true)}>
            Videos
          </p>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setShowUserVideos(false)}>
            Liked
          </p>
        </div>

        <div className="flex gap-6 flex-wrap md:justify-start">
          {vidioList.length > 0 ? vidioList.map((post: Video, idx: number) => <VideoCard key={idx} post={post} />) : <NoResults text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`} />}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};
export default Profile;
