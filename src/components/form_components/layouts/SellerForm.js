"use client";

import { navigate } from "@/shared/actions/routing";
import React, { useEffect, useState } from "react";
import PersonalScreen from "../modules/PersonalScreen";
import SignUpComponent from "@/shared/auth/signup";
import ProfessionalScreen from "../modules/ProfessionalScreen";
import ShowYourWork from "../modules/ShowYourWork";
import { getUsersLocation } from "@/utils/location/getUsersLocation";
import Swal from "sweetalert2";
import { checkUserDataByToken } from "@/utils/apis/checkUser";
import { useRouter } from "next/navigation";
import { CreateSeller, EditSeller } from "@/utils/apis/Seller";

const formPages = [
  "signup",
  "Personal Information",
  "Professional Information",
  "Show your Work",
];

const SellerForm = () => {
  const queryParams = new URLSearchParams();
  const router = useRouter();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isSeller, setIsSeller] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [sellerInputData, setSellerInputData] = useState({
    image: null,
    name: "",
    userName: "",
    email: "",
    phone_number: "",
    city: "",
    profession: "",
    gender: "male",
    experience: "0-1",
    services: [],
    skills: [],
    collegeName: "",
    resume: null,
    description: "",
    socialMediaLinks: [],
    experienceDetails: [],
    images: [null, null, null, null, null, null],
    coordinates: { longitude: 0, latitude: 0 },
  });

  console.log(sellerInputData);

  useEffect(() => {
    const token = sessionStorage.getItem("bfm-seller-token");
    getUsersLocation()
      .then((location) => {
        setSellerInputData({
          ...sellerInputData,
          coordinates: { ...location },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          title: "Allow Location!!",
          text: "We need to know your location so that the client can find you if you are nearby",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          background: "black",
          color: "white",
          confirmButtonText: "Allow Location",
        }).then((result) =>
          result.isConfirmed
            ? getUsersLocation().then((location) => {
                setSellerInputData({
                  ...sellerInputData,
                  coordinates: { ...location },
                });
              })
            : Swal.close()
        );
      });

    checkUserDataByToken(token)
      .then((result) => {
        setCurrentPageIndex(1);
        if (result?.isSeller) {
          setIsSeller(true);
          const images = result.data?.seller.images || [];
          const filledImages = images.concat(
            Array(6 - images.length).fill(null)
          );
          setSellerInputData({
            ...result?.data?.seller,
            phone_number: result?.data?.seller?.phone_number.split("+91")[1],
            coordinates: {
              longitude: result?.data.seller.location.coordinates[0],
              latitude: result?.data.seller.location.coordinates[1],
            },
            images: filledImages,
          });
        } else {
          setIsSeller(false);
        }
      })
      .catch((err) => err);
  }, []);

  useEffect(() => {
    if (queryParams.has("page")) {
      queryParams.set("page", formPages[currentPageIndex]);
    } else {
      navigate(`/form?page=${formPages[currentPageIndex]}`);
    }
  }, [currentPageIndex]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", sellerInputData.image);
    formData.append("resume", sellerInputData.resume);
    formData.append("name", sellerInputData.name);
    formData.append("userName", sellerInputData.userName);
    formData.append("gender", sellerInputData.gender);
    formData.append("email", sellerInputData.email);
    formData.append("phone_number", "+91" + sellerInputData.phone_number);
    formData.append("city", sellerInputData.city);
    formData.append("profession", sellerInputData.profession);
    formData.append("experience", sellerInputData.experience);
    formData.append("collegeName", sellerInputData.collegeName);
    formData.append("description", sellerInputData.description);
    formData.append("services", JSON.stringify(sellerInputData.services));
    formData.append("skills", JSON.stringify(sellerInputData.skills));
    formData.append(
      "experienceDetails",
      JSON.stringify(sellerInputData.experienceDetails)
    );
    formData.append(
      "socialMediaLinks",
      JSON.stringify(sellerInputData.socialMediaLinks)
    );

    sellerInputData.images.forEach((media, index) => {
      formData.append("images", media);
    });

    formData.append("coordinates", JSON.stringify(sellerInputData.coordinates));

    try {
      const token =
        localStorage.getItem("bfm-seller-token") ||
        sessionStorage.getItem("bfm-seller-token");
      if (!token) {
        Swal.fire({
          title: "You need to login",
          text: "Error while authentication. You're not logged in or your login token has expired. Please try again.",
          icon: "warning",
          showConfirmButton: false,
          background: "black",
          color: "white",
          timer: 2000,
        }).then(() => setCurrentPageIndex(0));
      }
      if (isSeller) {
        const data = await EditSeller(formData, token);
        Swal.fire({
          icon: "success",
          title: "Successfully Updated",
          text: "Your profile is successfully updated",
          background: "black",
          color: "white",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          router.replace(`/portfolio/${data?.userName}?uid=${data?.uid}`);
        });
      } else {
        const data = await CreateSeller(formData, token);
        Swal.fire({
          icon: "success",
          title: "Successfully Submitted",
          text: "You are successfully submitted as a seller at BFM",
          background: "black",
          color: "white",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          router.replace(`/portfolio/${data?.userName}?uid=${data?.uid}`);
        });
      }
      setSubmitted(true);
    } catch (error) {
      Swal.fire({
        title: "Error submitting form",
        text:
          error?.message || "Something went wrong Please try after sometime",
        icon: "error",
        showConfirmButton: false,
        background: "black",
        color: "white",
        timer: 2000,
      }).then(() => {
        setCurrentPageIndex(0);
      });
      setSubmitted(false);
    }
  }

  return currentPageIndex === 0 ? (
    <div className="lg:w-1/2 w-5/6 flex flex-col items-center justify-center">
      <SignUpComponent
        setCurrentPageIndex={setCurrentPageIndex}
        setSellerInputData={setSellerInputData}
      />
    </div>
  ) : (
    <div className="flex-1 form_layout lg:border space-y-14 border-white lg:p-8 rounded-lg lg:bg-[#191919] lg:w-2/3 w-11/12 size-full flex flex-col justify-center items-center">
      <div className="flex w-full justify-center items-center lg:gap-5 gap-2">
        {formPages.slice(1, 4).map((page, index) => (
          <button
            disabled={index + 1 > currentPageIndex}
            type="button"
            onClick={() =>
              index < currentPageIndex ? setCurrentPageIndex(index + 1) : null
            }
            key={index}
            className="flex lg:gap-2 gap-1 justify-center lg:text-base text-[8px] disabled:cursor-not-allowed items-center"
          >
            <div
              className={`lg:w-6 w-4 flex items-center justify-center rounded-full aspect-square ${
                index < currentPageIndex ? "bg-green-400" : "bg-white/50"
              }`}
            >
              {index + 1}
            </div>
            <p className="capitalized lg:text-sm text-[8px] whitespace-nowrap">
              {page}
            </p>
          </button>
        ))}
      </div>
      {currentPageIndex === 1 ? (
        <PersonalScreen
          sellerInputData={sellerInputData}
          setSellerInputData={setSellerInputData}
          setCurrentPage={setCurrentPageIndex}
        />
      ) : null}
      {currentPageIndex === 2 ? (
        <ProfessionalScreen
          sellerInputData={sellerInputData}
          setSellerInputData={setSellerInputData}
          setCurrentPage={setCurrentPageIndex}
        />
      ) : null}
      {currentPageIndex === 3 ? (
        <ShowYourWork
          sellerInputData={sellerInputData}
          setSellerInputData={setSellerInputData}
          handleSubmit={handleSubmit}
          isSubmitted={isSubmitted}
        />
      ) : null}
    </div>
  );
};

export default SellerForm;
