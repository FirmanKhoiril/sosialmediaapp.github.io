import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { topics } from "../utils/constants";
import { BASE_URL } from "../utils";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const [vidioAsset, setVidioAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setWrongFileType] = useState(false);

  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVidioAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && vidioAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: vidioAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}/api/post`, document);
      router.push("/");
    }
  };
  return (
    <div className="flex absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center w-full h-full">
      <div className="bg-white w-[70%] xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6 rounded-lg">
        <div>
          <div>
            <p className="text-2xl text-center font-bold">Upload Video</p>
            <p className="text-md text-center text-gray-400 mt-1">Post video to your account</p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div className="">
                {!vidioAsset ? (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">Select video to upload</p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg <br />
                        720x1280 resolution or higher <br />
                        Up to 10 minutes <br />
                        Less than 2 GB
                      </p>
                      <p className="bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium hover:bg-white hover:border-[#f51997] border-[1px] hover:text-[#f51997] p-2 w-52 outline-none">Select File</p>
                    </div>
                    <input type="file" name="upload-video" onChange={(e) => uploadVideo(e)} className="w-0 h-0" />
                  </label>
                ) : (
                  <div className=" rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center">
                    <video className="rounded-xl h-[462px] bg-black" controls loop src={vidioAsset.url} />
                  </div>
                )}
              </div>
            )}
            {wrongFileType && <p className="text-red-500 font semibold mt-4 text-xl text-center w-[250px]">Please Select a video file</p>}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10 ">
          <label className="font-medium text-md">Caption</label>
          <input type="text" value={caption} className="rounded outline-none text-md hover:border-[#f51997] border-2 border-gray-200 p-2" onChange={(e) => setCaption(e.target.value)} />
          <label className="font-medium text-md">Choose a Category</label>
          <select className="outline-none border-2 border-gray-200 bg-white text-md capitalize lg:p-3 p-2 rounded cursor-pointer hover:border-[#f51997]" onChange={(e) => setCategory(e.target.value)}>
            {topics.map((topic) => (
              <option key={topic.name} className="outline-none capitalize bg-whitetext-gray-700 text-md p-2 hover:bg-gray-300" value={topic.name}>
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button onClick={() => {}} className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none hover:border-[#f51997]" type="button">
              Discard
            </button>
            <button onClick={handlePost} className="bg-[#f51997] text-white hover:opacity-90 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none hover:border-[#f51997]" type="button">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
