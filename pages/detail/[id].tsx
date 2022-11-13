import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { Video } from "../../types";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import Comment from "../../components/Comment";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const router = useRouter();
  const { userProfile }: any = useAuthStore();
  const vidioRef = useRef<HTMLVideoElement>(null);
  const onVidioClick = () => {
    if (playing) {
      vidioRef?.current?.pause();
      setPlaying(false);
    } else {
      vidioRef?.current?.play();
      setPlaying(true);
    }
  };
  useEffect(() => {
    if (post && vidioRef?.current) {
      vidioRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost({ ...post, comments: res.data.comments });
        setComment("");
        setIsPostingComment(false);
      }
    }
  };
  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setPost({ ...post, likes: data.likes });
    }
  };

  if (!post) return null;
  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center  bg-black bg-center">
        <div className="absolute top-5 left-5 lg:left-6 gap-6 flex z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video ref={vidioRef} onClick={onVidioClick} loop src={post?.video?.asset.url} className=" h-full cursor-pointer"></video>
          </div>

          <div className="absolute top-[45%] left-[40%]  cursor-pointer">
            {!playing && (
              <button onClick={onVidioClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-5 lg:bottom-10 left-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-14 md:h-20 w-10 h-14 ml-4">
              <Link href="">
                <>
                  <Image width={40} height={40} className="rounded-full" src={post.postedBy.image} alt="profile shoot" />
                </>
              </Link>
            </div>
            <div className="">
              <Link href="/">
                <div className="flex mt-[-4px] flex-col gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold capitalize text-primary">
                    {post.postedBy.userName} {``}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">{post.postedBy.userName}</p>
                </div>
              </Link>
            </div>
          </div>
          <p className="px-6 text-md text-gray-500">{post.caption}</p>
          <div className="mt-10 px-10">{userProfile && <LikeButton likes={post.likes} handleLike={() => handleLike(true)} handleDislike={() => handleLike(false)} />}</div>
          <Comment comment={comment} setComment={setComment} addComment={addComment} comments={post.comments} isPostingComment={isPostingComment} />
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: res.data },
  };
};

export default Detail;
