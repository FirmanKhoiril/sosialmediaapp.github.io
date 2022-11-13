import React, { useState, useEffect, useRef } from "react";
import { Video } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

const style = `absolute bottom-[-4px] md:bottom-6  cursor-pointer left-4 md:left-19 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3`;
interface IProps {
  post: Video;
}
const VideoCard: NextPage<IProps> = ({ post }: IProps) => {
  const [isHover, setIsHover] = useState(false); //
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const vidioRef = useRef<HTMLVideoElement>(null);
  // how to make custom hook with useRef
  const onVideoPres = () => {
    if (playing) {
      vidioRef?.current?.pause();
      setPlaying(false);
    } else {
      vidioRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (vidioRef?.current) {
      vidioRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);
  return (
    <div className="flex flex-col border-b-2 border-gray-300 pb-6">
      <div className="">
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image width={40} height={40} className="rounded-full" src={post.postedBy.image} alt="profile shoot" />
              </>
            </Link>
          </div>
          <div className="">
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold capitalize text-primary">
                  {post.postedBy.userName} {``}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">{post.postedBy.userName}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div className="rounded-3xl bg-primary hover:shadow-sm hover:shadow-black/70" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
          <Link href={`/detail/${post._id}`}>
            <video loop className="lg:w-[550px] h-[300px] md:h-[400px] lg:h-[530px] w-[400px] rounded-2xl cursor-pointer " ref={vidioRef} src={post.video.asset.url}></video>
          </Link>

          {isHover && (
            <div className={style}>
              {playing ? (
                <button onClick={onVideoPres}>
                  <BsFillPauseFill className="text-white md:text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPres}>
                  <BsFillPlayFill className=" text-2xl text-black lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
