"use client";

import { FileToUrl } from "@/shared/actions/convertFileToUrl";
import PrimaryButton from "@/shared/buttons/PrimaryButton";
import SecondaryButton from "@/shared/buttons/SecondaryButton";
import InputField from "@/shared/inputFields/InputField";
import React, { useRef } from "react";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";

const ShowYourWork = ({
  sellerInputData = {},
  setSellerInputData = () => {},
  handleSubmit = () => {},
}) => {
  // For Media

  const imagesRef = useRef([]);
  const videoRef = useRef(null);

  const handleMediaAdd = ({ index, file }) => {
    const fileType = file?.type.split("/")[0];
    if (fileType === "video") {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        if (video.duration <= 60) {
          setSellerInputData((prev) => {
            let imgsArr = prev.images;
            imgsArr[index] = file;
            return { ...prev, images: imgsArr };
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Video Upload instruction",
            text: "Please upload a video less than 1 minute in duration.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      };
    } else {
      setSellerInputData((prev) => {
        let imgsArr = prev.images;
        imgsArr[index] = file;
        return { ...prev, images: imgsArr };
      });
    }
  };

  const handleRemoveMedia = (index) => {
    setSellerInputData((prev) => {
      let imgsArr = prev.images;
      imgsArr[index] = null;
      return { ...prev, images: imgsArr };
    });

    if (imagesRef.current[index] && imagesRef.current[index].current) {
      imagesRef.current[index].current.value = "";
    }
  };

  // For Experience

  const handleAddExperinces = () => {
    setSellerInputData((prev) => {
      return {
        ...prev,
        experienceDetails: [
          ...prev.experienceDetails,
          { title: "", link: "", content: "" },
        ],
      };
    });
  };

  const handleExpFields = (index, e) => {
    const { name, value } = e.target;
    setSellerInputData((prev) => {
      let expArr = prev["experienceDetails"];
      expArr[index][name] = value;
      return { ...prev, experienceDetails: expArr };
    });
  };

  const handleRemoveExp = (index) => {
    setSellerInputData((prev) => {
      const newExpArr = [...prev["experienceDetails"]];
      newExpArr.splice(index, 1);
      return { ...prev, experienceDetails: newExpArr };
    });
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="grid grid-cols-2 items-start gap-7 justify-between size-full"
    >
      <div className="flex flex-col gap-1 w-full col-span-2">
        <label htmlFor="media">Upload Gigs</label>
        <p className="text-white/50 capitalize text-sm">
          upload upto 6 Gigs in png jpeg jpg mp4
        </p>
        <div className="grid md:grid-cols-6 grid-cols-3 gap-1 w-full mt-4">
          {sellerInputData["images"].map((media, index) => (
            <InputField
              key={index}
              labelBg="white"
              fileUrl={
                media && typeof media === "object" ? FileToUrl(media) : media
              }
              label={<IoIosAdd className="text-4xl text-blue-600" />}
              type="file"
              file={media}
              videoRef={videoRef}
              onChange={(e) =>
                handleMediaAdd({ index, file: e.target.files[0] })
              }
              onCrossClick={() => handleRemoveMedia(index)}
              name={media}
              inputref={imagesRef.current[index]}
              fileType="image/*, video/*"
              containerClassName="size-full aspect-square"
            />
          ))}
        </div>
      </div>
      {sellerInputData["experienceDetails"].length > 0 && (
        <div className="flex flex-col col-span-2 gap-4">
          <label htmlFor="experienceDetails">
            {" "}
            Experiences <span>*</span>
          </label>
          {sellerInputData["experienceDetails"].map((experience, index) => (
            <div key={index} className="flex flex-col gap-2 w-full">
              <InputField
                name="title"
                value={experience.title}
                required
                placeholder="Enter title of project"
                onChange={(e) => handleExpFields(index, e)}
              />
              <InputField
                type="url"
                name="link"
                placeholder="Paste link"
                value={experience.link}
                onChange={(e) => handleExpFields(index, e)}
              />
              <InputField
                type="textarea"
                name="content"
                placeholder="Describe your project and services"
                value={experience.content}
                required
                onChange={(e) => handleExpFields(index, e)}
              />
              <SecondaryButton
                type={"button"}
                onClick={() => handleRemoveExp(index)}
                className={"col-span-2 text-blue-600"}
              >
                <IoMdClose /> Remove Experiences
              </SecondaryButton>
            </div>
          ))}
        </div>
      )}
      <SecondaryButton
        type={"button"}
        onClick={handleAddExperinces}
        backgroundColor={"white"}
        className={"col-span-2 text-blue-600"}
      >
        <IoIosAdd /> Add Experiences
      </SecondaryButton>
      <PrimaryButton
        type={"submit"}
        backgroundColor={"#4461F2"}
        color={"white"}
        fontWeight={400}
        className="col-span-2 capitalize tracking-wide"
      >
        Save and complete
      </PrimaryButton>
    </form>
  );
};

export default ShowYourWork;
