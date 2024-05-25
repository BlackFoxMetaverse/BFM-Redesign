"use client";

import PrimaryButton from "@/shared/buttons/PrimaryButton";
import SecondaryButton from "@/shared/buttons/SecondaryButton";
import { useSellerProfile } from "@/utils/hooks/useSellerProfile";
import { handleShare } from "@/utils/others/sharing";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const PortfolioNavbar = ({ details }) => {
  const { sellerData, error, loading } = useSellerProfile(details[0]);
  const router = useRouter();
  const searchParams = useSearchParams();

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
        {sellerData?.uid === searchParams.get("uid").toString() ? (
          <div className="flex items-center gap-7 text-balance">
            <div className="sm:block hidden">
              <PrimaryButton onClick={() => router.push("/form")}>
                Edit Profile
              </PrimaryButton>
            </div>
            <SecondaryButton
              onClick={() =>
                // Swal.fire({
                //   title: "Feature available soon",
                //   icon: "info",
                //   text: "Sharing Feature will be available soon",
                //   timer: 2000,
                //   showConfirmButton: false,
                //   background: "black",
                //   color: "white",
                // })
                handleShare(
                  window.location.href.split("?")[0],
                  "My Portfolio on BFM",
                  "Portfolio link is copied to clipboard"
                )
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
