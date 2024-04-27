"use client";

import React, { useState } from "react";
import SkeletonLoader from "../../../shared/loader/SkeletonLoader";
import { useSellerProfile } from "@/utils/hooks/useSellerProfile";
import { BiSolidPhoneCall } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  FaBehance,
  FaDribbble,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/shared/buttons/PrimaryButton";
import SecondaryButton from "@/shared/buttons/SecondaryButton";
import ExperienceDetails from "../modules/ExperienceDetails";
import SellerCard from "../modules/SellerCard";
import MediaGallery from "@/shared/MediaRendering/MediaGallery";
import handleSendEmail from "@/utils/others/sendEmail";
import handleScheduleMeet from "@/utils/others/scheduleMeet";

const SocialTypes = [
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
  },
  {
    name: "Behance",
    icon: <FaBehance />,
  },
  {
    name: "Dribble",
    icon: <FaDribbble />,
  },
  {
    name: "Github",
    icon: <FaGithub />,
  },
  {
    name: "Website",
    icon: <FaGlobe />,
  },
];

const PortfolioDetails = ({ details }) => {
  const { sellerData, error, loading } = useSellerProfile(details[0]);
  const [viewAll, setViewAll] = useState(false);

  function getIconByName(name) {
    const socialType = SocialTypes.find(
      (social) => social.name.toLowerCase() === name?.toLowerCase()
    );
    return socialType ? socialType.icon : null;
  }

  return error ? (
    <div className="size-full"></div>
  ) : (
    <div className="w-11/12 mx-auto flex lg:flex-row flex-col gap-10 py-6">
      <div className="left lg:w-1/4 shrink-0 space-y-7">
        <div
          className={`max-w-full ${
            loading && "aspect-video overflow-hidden min-h-24"
          } rounded-2xl bg-[#1D1D1D]`}
        >
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="flex px-5 py-7 gap-5 size-full">
              <Image
                src={sellerData?.image || "/Images/default_male.svg"}
                width={100}
                height={100}
                alt=""
                loading="lazy"
                className="flex-1 size-full rounded-3xl object-cover aspect-square"
              />
              <div className="flex-1 flex flex-col gap-2 text-pretty justify-between">
                <div className="basicData">
                  <h5 className="font-semibold text-xl">{sellerData?.name}</h5>
                  <p className="text-green-400 text-xs">
                    {sellerData?.userName}
                  </p>
                  <p className="text-green-400 text-xs">
                    {sellerData?.profession}
                  </p>
                </div>
                <div className="otherData">
                  <p className="flex gap-2 items-center">
                    <HiOutlineLocationMarker /> {sellerData?.city}
                  </p>
                  <p className="flex gap-2 items-center">
                    <BiSolidPhoneCall /> {sellerData?.phone_number}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {sellerData && (
          <PrimaryButton
            color={"white"}
            fontWeight={400}
            backgroundColor={"#4461F2"}
            type="button"
            onClick={() => {
              handleSendEmail(sellerData?.email);
            }}
          >
            Send Email
          </PrimaryButton>
        )}
        {sellerData && (
          <SecondaryButton
            border={"1px solid"}
            borderColor={"#4461F2"}
            type="button"
            onClick={() => {
              handleScheduleMeet(sellerData?.userName);
            }}
          >
            Schedule Meet
          </SecondaryButton>
        )}
        <div
          className={`w-full overflow-hidden max-w-full ${
            loading ? "aspect-[7/1] min-h-10" : "py-2 px-5"
          } rounded-2xl bg-[#1D1D1D]`}
        >
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="flex items-center gap-5 justify-center">
              {sellerData?.socialMediaLinks?.map((social) => (
                <Link
                  href={social?.link}
                  key={social?._id}
                  target="_blank"
                  className="text-2xl"
                >
                  {getIconByName(social?.platformType)}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div
          className={`w-full overflow-hidden ${
            loading ? "aspect-video" : "min-h-24"
          } max-w-full rounded-2xl bg-[#1D1D1D]`}
        >
          {loading ? (
            <SkeletonLoader />
          ) : (
            <SellerCard
              className={"w-full flex flex-col justify-between gap-2 p-4"}
              title={"Skills I have"}
              subtitle={`${sellerData?.skills?.length} skills learned`}
            >
              <div className="flex items-center gap-2 flex-wrap">
                {sellerData?.skills?.map((skill, index) => (
                  <div
                    className="border border-white text-sm opacity-60 py-2 px-3 rounded-3xl"
                    key={index}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </SellerCard>
          )}
        </div>
        <div
          className={`w-full overflow-hidden ${
            loading && "aspect-video min-h-24"
          } max-w-full rounded-2xl bg-[#1D1D1D]`}
        >
          {loading ? (
            <SkeletonLoader />
          ) : (
            <SellerCard
              className={"w-full flex flex-col justify-between gap-2 p-4"}
              title={"Service I provide"}
              subtitle={`${sellerData?.services?.length} Services Provided`}
            >
              <div className="flex items-center gap-2 flex-wrap">
                {sellerData?.services?.map((service, index) => (
                  <div
                    className="border border-white text-sm opacity-60 py-2 px-3 rounded-3xl"
                    key={index}
                  >
                    {service}
                  </div>
                ))}
              </div>
            </SellerCard>
          )}
        </div>
        <div
          className={`w-full overflow-hidden ${
            loading && "aspect-video min-h-32"
          } max-w-full rounded-2xl bg-[#1D1D1D]`}
        >
          {loading ? (
            <SkeletonLoader />
          ) : (
            <SellerCard
              className={"w-full flex flex-col justify-between gap-7 p-4"}
              title={" Projects I have done"}
              subtitle={`${sellerData?.experienceDetails?.length} projects in total`}
            >
              {sellerData?.experienceDetails ? (
                <div className="flex flex-col gap-2">
                  {sellerData?.experienceDetails?.map((exp) => (
                    <ExperienceDetails {...exp} key={exp?._id} />
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </SellerCard>
          )}
        </div>
      </div>
      <div className="right space-y-7 size-full">
        <div
          className={`w-full overflow-hidden ${
            loading && "aspect-[4/1] min-h-24"
          } max-w-full rounded-2xl bg-[#1D1D1D]`}
        >
          {loading ? (
            <SkeletonLoader />
          ) : (
            <SellerCard
              className={"w-full flex flex-col justify-between gap-5 p-4"}
              title={"About Me"}
              hr
              glass
            >
              <p className="opacity-60">{sellerData?.description}</p>
            </SellerCard>
          )}
        </div>
        {loading ? (
          <div className="size-full aspect-square rounded-xl overflow-hidden">
            <SkeletonLoader />
          </div>
        ) : (
          <MediaGallery loading={loading} medias={sellerData?.images} />
        )}
      </div>
    </div>
  );
};

export default PortfolioDetails;
