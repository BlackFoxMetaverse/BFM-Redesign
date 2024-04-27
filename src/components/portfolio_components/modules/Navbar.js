"use client";

import PrimaryButton from "@/shared/buttons/PrimaryButton";
import SecondaryButton from "@/shared/buttons/SecondaryButton";
import TokenDetails from "@/utils/others/tokenDetails";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const PortfolioNavbar = () => {
  return (
    <nav>
      <div className="w-11/12 py-10 mx-auto flex items-center justify-between">
        <Image
          src={"/logos/white_fox.svg"}
          alt=""
          width={96}
          height={30}
          className="object-contain"
        />
        <div className="flex items-center gap-7 text-balance">
          <PrimaryButton>Edit Profile</PrimaryButton>
          <SecondaryButton>Share & Download</SecondaryButton>
        </div>
      </div>
    </nav>
  );
};

export default PortfolioNavbar;
