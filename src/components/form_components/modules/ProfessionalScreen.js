"use client";

import { SellerSocials } from "@/shared/bfm_socials/SellerSocials";
import PrimaryButton from "@/shared/buttons/PrimaryButton";
import InputField from "@/shared/inputFields/InputField";
import {
  GetCollegs,
  GetProfessions,
  GetServices,
  GetSkills,
} from "@/utils/apis/AdditionalApis";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProfessionalScreen = ({
  sellerInputData = {},
  setSellerInputData = () => {},
  setCurrentPage = () => {},
}) => {
  const [professions, setProfessions] = useState([]);
  const [colleges, setColleges] = useState([]);

  // Services States
  const [services, setServices] = useState([]);
  const [sellerServices, setSellerServices] = useState(
    sellerInputData?.services
  );
  const [serviceInput, setServiceInput] = useState("");

  // Skills States
  const [skillsInput, setSkillsInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [sellerSkills, setSellerSkills] = useState(sellerInputData?.skills);

  function handleValueChange(e) {
    const { name, value, files } = e.target;
    if (name === "profession" && value) {
      GetProfessions(value)
        .then((data) => setProfessions(data))
        .catch((err) =>
          Swal.fire({
            title: "Error Fetching Professions",
            text: err?.message || "Something went Wrong",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          })
        );
      setSellerInputData({ ...sellerInputData, [name]: value });
    } else if (name === "collegeName" && value) {
      GetCollegs(value)
        .then((data) => setColleges(data))
        .catch((err) =>
          Swal.fire({
            title: "Error Fetching Professions",
            text: err?.message || "Something went Wrong",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          })
        );
      setSellerInputData({ ...sellerInputData, [name]: value });
    } else if (name === "resume") {
      setSellerInputData({ ...sellerInputData, [name]: files[0] });
    } else {
      setSellerInputData({ ...sellerInputData, [name]: value });
    }
  }

  // For Services
  useEffect(() => {
    if (serviceInput !== "") {
      GetServices(serviceInput)
        .then((data) =>
          setServices(
            data?.filter(
              (service) => !sellerInputData.services.includes(service.tag)
            )
          )
        )
        .catch((err) =>
          Swal.fire({
            title: "Error Fetching Services",
            text: err?.message || "Something went Wrong",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          })
        );
    }

    return () => {};
  }, [serviceInput, sellerInputData?.services]);

  // Fo Skills
  useEffect(() => {
    if (skillsInput !== "") {
      GetSkills(skillsInput)
        .then((data) =>
          setSkills(
            data?.filter((skill) => !sellerInputData.skills.includes(skill.tag))
          )
        )
        .catch((err) =>
          Swal.fire({
            title: "Error Fetching Services",
            text: err?.message || "Something went Wrong",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          })
        );
    }

    return () => {};
  }, [skillsInput, sellerInputData?.skills]);

  // For Tags

  useEffect(() => {
    setSellerInputData((prevData) => ({
      ...prevData,
      services: sellerServices,
      skills: sellerSkills,
    }));
  }, [sellerServices, sellerSkills]);

  // for socials

  function addSocials({ type, link }) {
    const newSocialMediaLinks = [
      ...sellerInputData.socialMediaLinks,
      { platformType: type, link: link },
    ];
    setSellerInputData((prev) => ({
      ...prev,
      socialMediaLinks: newSocialMediaLinks,
    }));
  }

  function removeSocials(index) {
    const newSocialMediaLinks = [...sellerInputData.socialMediaLinks];
    newSocialMediaLinks.splice(index, 1);
    setSellerInputData((prev) => ({
      ...prev,
      socialMediaLinks: newSocialMediaLinks,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (sellerInputData["socialMediaLinks"].length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Add one Social Media",
        text: "Please atleast one social media link",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      setCurrentPage(3);
    }
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="grid grid-cols-2 items-start gap-7 justify-between size-full"
    >
      <InputField
        label="Profession"
        required
        name="profession"
        value={sellerInputData?.profession}
        onChange={handleValueChange}
        placeholder="Developer"
        containerClassName="lg:col-span-1 col-span-2"
        suggestions={sellerInputData?.profession === "" ? [] : professions}
        suggestionKey="tag"
        handleSuggestionsClick={(selectedOption) => {
          setSellerInputData({
            ...sellerInputData,
            profession: selectedOption,
          });
          setProfessions([]);
        }}
      />
      <InputField
        label="Experience (in years)"
        type="dropdown"
        options={["0-1", "1-3", "3-5", "5+"]}
        required
        name="experience"
        containerClassName="lg:col-span-1 col-span-2"
        value={sellerInputData?.experience}
        onChange={handleValueChange}
        placeholder="Developer"
      />
      <InputField
        type="tags"
        label="Services Provides"
        name="services"
        containerClassName="lg:col-span-1 col-span-2"
        value={serviceInput}
        setValue={setServiceInput}
        onChange={(e) => setServiceInput(e.target.value)}
        suggestions={serviceInput === "" ? [] : services}
        suggestionKey="tag"
        required
        tags={sellerServices}
        setTags={setSellerServices}
        mintags={2}
        maxTags={7}
        placeholder={`Add more ${7 - sellerServices?.length} services`}
        instruction="Minimum 2 services are required"
      />
      <InputField
        type="tags"
        label="Skills Provides"
        name="skills"
        containerClassName="lg:col-span-1 col-span-2"
        value={skillsInput}
        setValue={setSkillsInput}
        onChange={(e) => setSkillsInput(e.target.value)}
        suggestions={skillsInput === "" ? [] : skills}
        suggestionKey="tag"
        required
        tags={sellerSkills}
        setTags={setSellerSkills}
        mintags={2}
        maxTags={7}
        placeholder={`Add more ${7 - sellerSkills?.length} skills`}
        instruction="Minimum 2 skills are required"
      />
      <InputField
        label="College"
        name="collegeName"
        value={sellerInputData?.collegeName}
        onChange={handleValueChange}
        placeholder="Enter your College Name"
        suggestions={sellerInputData?.collegename === "" ? [] : colleges}
        suggestionKey="College Name"
        handleSuggestionsClick={(selectedOption) => {
          setSellerInputData({
            ...sellerInputData,
            collegeName: selectedOption,
          });
          setColleges([]);
        }}
        containerClassName="col-span-2"
      />
      <div
        className={`flex flex-col gap-1 col-span-2 relative lg:text-base text-sm`}
      >
        <label htmlFor="resume" className="px-2">
          Resume
        </label>
        <div
          className={`focus:outline-none border flex items-center border-white/50 disabled:cursor-not-allowed px-3 py-2 rounded-lg bg-transparent`}
        >
          <p className="w-full">
            {typeof sellerInputData?.resume === "string"
              ? `${sellerInputData?.userName}'s resume`
              : sellerInputData?.resume?.name || "Upload your resume here"}
          </p>
          <input
            type="file"
            name="resume"
            id="resume"
            onChange={handleValueChange}
            placeholder=""
            accept=".doc, .docx, .pdf"
            className="focus:outline-none w-full hidden"
          />
          <label
            htmlFor="resume"
            type="button"
            className="bg-black px-4 py-1 rounded-full"
          >
            Upload
          </label>
        </div>
      </div>
      <InputField
        label="Social Media"
        name="socialMediaLinks"
        type="socialmedia"
        options={SellerSocials}
        onChange={(e) => {
          setSocialLink(e.target.value);
        }}
        inputData={sellerInputData}
        onAddSocial={({ type, link }) => {
          addSocials({ type: type, link: link });
        }}
        onRemoveSocial={(index) => removeSocials(index)}
      />
      <div className="buttonplacement flex lg:justify-end lg:items-end items-center justify-center col-span-2">
        <PrimaryButton
          backgroundColor={"#4461F2"}
          color={"white"}
          fontWeight={400}
          className="lg:size-1/4 w-3/4"
        >
          Save & Continue
        </PrimaryButton>
      </div>
    </form>
  );
};

export default ProfessionalScreen;
