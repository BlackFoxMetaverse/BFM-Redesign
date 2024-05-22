"use client";

import PrimaryButton from "@/shared/buttons/PrimaryButton";
import SecondaryButton from "@/shared/buttons/SecondaryButton";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PortfolioNavbar = ({ details }) => {
  const router = useRouter();
  const params = useParams();
  const [uid, setUid] = useState(null);
  useEffect(() => {
    setUid(sessionStorage.getItem("bfm-seller-uid"));
  }, []);

  const handleShare = () => {};

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
            <SecondaryButton
              onClick={() =>
                Swal.fire({
                  title: "Feature available soon",
                  icon: "info",
                  text: "Sharing Feature will be available soon",
                  timer: 2000,
                  showConfirmButton: false,
                  background: "black",
                  color: "white",
                })
              }
            >
              Share
            </SecondaryButton>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default PortfolioNavbar;
