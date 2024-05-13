"use client";

import { FileToUrl } from "@/shared/actions/convertFileToUrl";
import PrimaryButton from "@/shared/buttons/PrimaryButton";
import InputField from "@/shared/inputFields/InputField";
import { GetCities } from "@/utils/apis/AdditionalApis";
import { checkPhoneNumber, checkUserName } from "@/utils/apis/checkUser";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosCamera } from "react-icons/io";
import Swal from "sweetalert2";

const PersonalScreen = ({
  sellerInputData = {},
  setSellerInputData = () => {},
  setCurrentPage = () => {},
}) => {
  const [cities, setCities] = useState([]);
  const [isUserNameValid, setIsUsernameValid] = useState(null);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);

  function handleValueChange(e) {
    const { name, value, files } = e.target;
    if (name === "userName") {
      checkUserName(value)
        .then((data) => {
          value.includes(" ")
            ? setIsUsernameValid({ message: "Username cannot contains spaces" })
            : data
            ? setIsUsernameValid(null)
            : setIsUsernameValid({ message: "Username already taken" });
        })
        .catch((err) => setIsUsernameValid(null));
      setSellerInputData({ ...sellerInputData, [name]: value });
    } else if (name === "phone_number") {
      checkPhoneNumber(value)
        .then((data) => {
          value.length < 10 && value !== ""
            ? setIsPhoneNumberValid({ message: "Enter a valid phone number" })
            : data
            ? setIsPhoneNumberValid(null)
            : setIsPhoneNumberValid({
                message: `${value} already registered`,
              });
        })
        .catch((err) => setIsPhoneNumberValid(null));
      setSellerInputData({ ...sellerInputData, [name]: value });
    } else if (name === "image") {
      setSellerInputData({ ...sellerInputData, [name]: files[0] });
    } else if (name === "city") {
      GetCities(value)
        .then((data) => setCities(data))
        .catch((err) =>
          Swal.fire({
            title: "Error Fetching Cities",
            text: err?.message || err || "Something went Wrong",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          })
        );
      setSellerInputData({ ...sellerInputData, [name]: value });
    } else {
      setSellerInputData({ ...sellerInputData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isPhoneNumberValid !== null || isUserNameValid !== null) {
      return;
    } else {
      setCurrentPage(2);
    }
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="grid grid-cols-2 items-start gap-7 justify-between size-full"
    >
      <InputField
        type="file"
        containerClassName="col-span-2 lg:items-start lg:justify-normal items-center justify-center"
        fileUrl={
          sellerInputData?.image !== null &&
          typeof sellerInputData?.image === "object"
            ? FileToUrl(sellerInputData?.image)
            : sellerInputData?.image
        }
        name="image"
        onChange={handleValueChange}
        fileType="image/*"
        file={sellerInputData?.image}
        fileContainer="lg:w-1/6 sm:w-1/4 w-1/2 items-center justify-center"
        label={
          <Image
            src={
              sellerInputData?.gender === "male"
                ? "/images/default_male.svg"
                : "/images/default_female.svg"
            }
            alt=""
            width={100}
            height={100}
            priority
            className="size-full"
          />
        }
        additionalLabel={<IoIosCamera />}
      />
      <InputField
        label="Name"
        name="name"
        value={sellerInputData?.name}
        onChange={handleValueChange}
        containerClassName="lg:col-span-1 col-span-2"
        isError={sellerInputData?.name && sellerInputData?.name.length < 3}
        errorMessage="Name should be at least 3 characters long"
        required
        placeholder="Enter Full Name"
      />
      <InputField
        label="Username"
        name="userName"
        value={sellerInputData?.userName}
        onChange={handleValueChange}
        containerClassName="lg:col-span-1 col-span-2"
        required
        isError={isUserNameValid}
        errorMessage={isUserNameValid?.message}
        placeholder="Enter Your Username"
      />
      <InputField
        label="Gender"
        name="gender"
        type="dropdown"
        containerClassName="lg:col-span-1 col-span-2"
        options={["male", "female", "others"]}
        onChange={handleValueChange}
        required
      />
      <InputField
        label="Email Address"
        name="email"
        type="email"
        containerClassName="lg:col-span-1 col-span-2"
        value={sellerInputData?.email}
        disabled
        required
        placeholder="12345@gmail.com"
      />
      <InputField
        label="Phone Number"
        name="phone_number"
        type="number"
        containerClassName="lg:col-span-1 col-span-2"
        value={sellerInputData?.phone_number}
        onChange={handleValueChange}
        isError={isPhoneNumberValid}
        errorMessage={isPhoneNumberValid?.message}
        required
        placeholder="+91 1234567890"
      />
      <InputField
        label="City"
        name="city"
        containerClassName="lg:col-span-1 col-span-2"
        value={sellerInputData?.city}
        onChange={handleValueChange}
        required
        placeholder="Enter Your Current City"
        suggestions={sellerInputData?.city === "" ? [] : cities}
        suggestionKey="ASCII Name"
        handleSuggestionsClick={(selectedOption) => {
          setSellerInputData({ ...sellerInputData, city: selectedOption });
          setCities([]);
        }}
      />
      <InputField
        label="About Me"
        name="description"
        type="textarea"
        value={sellerInputData?.description}
        onChange={handleValueChange}
        required
        placeholder="Write about yourself"
        containerClassName="col-span-2 row-span-2"
      />
      <div className="buttonplacement flex md:justify-end md:items-end justify-center items-center col-span-2">
        <PrimaryButton
          disabled={isPhoneNumberValid !== null || isUserNameValid !== null}
          backgroundColor={"#4461F2"}
          color={"white"}
          fontWeight={400}
          className="md:w-1/4 w-3/4"
        >
          Save & Continue
        </PrimaryButton>
      </div>
    </form>
  );
};

export default PersonalScreen;
