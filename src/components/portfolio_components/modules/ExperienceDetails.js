"use client";

import SecondaryButton from "@/shared/buttons/SecondaryButton";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const ExperienceDetails = ({ title, link, content }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      {<h5 className="font-black text-lg">{title}</h5>}
      {<p className="text-lg opacity-60">{content}</p>}
      {link && link.startsWith("http") && (
        <SecondaryButton
          type={"button"}
          border={"1px solid"}
          borderColor={"#B3B3B3"}
          fontSize={"12px"}
          width={"fit-content"}
          onClick={() => router.push(link)}
        >
          Look At the Project
          <IoIosArrowForward className="font-bold" />
        </SecondaryButton>
      )}
    </div>
  );
};

export default ExperienceDetails;
