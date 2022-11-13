import React from "react";
import { NextPage } from "next";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";

interface IProps {
  text: string;
}
const NoResults: NextPage<IProps> = ({ text }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">{text === "no comments!" ? <BiCommentX /> : <MdOutlineVideocamOff />}</p>
      <p className="text-xl text-center text-gray-600">{text}</p>
    </div>
  );
};

export default NoResults;
