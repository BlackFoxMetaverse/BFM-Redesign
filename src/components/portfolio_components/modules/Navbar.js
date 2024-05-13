"use client";

import PrimaryButton from "@/shared/buttons/PrimaryButton";
import SecondaryButton from "@/shared/buttons/SecondaryButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PortfolioNavbar = ({ details }) => {
  const router = useRouter();
  const [uid, setUid] = useState(null);
  useEffect(() => {
    setUid(sessionStorage.getItem("bfm-seller-uid"));
  }, []);

  return (
    <nav>
      <div className="w-11/12 py-10 mx-auto flex items-center justify-between">
        <Image
          src={"/logos/white_fox.svg"}
          alt=""
          width={96}
          height={30}
          priority
          className="object-contain"
        />
        {uid === details[1] ? (
          <div className="flex items-center gap-7 text-balance">
            <div className="sm:block hidden">
              <PrimaryButton onClick={() => router.push("/form")}>
                Edit Profile
              </PrimaryButton>
            </div>
            <SecondaryButton>Share & Download</SecondaryButton>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default PortfolioNavbar;
