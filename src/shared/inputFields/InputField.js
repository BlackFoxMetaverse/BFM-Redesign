import Image from "next/image";
import { IoIosVideocam, IoMdCloseCircle } from "react-icons/io";
import Swal from "sweetalert2";

const InputField = ({
  name = "",
  label = "" || null,
  placeholder = "",
  required = false,
  inputClassName = "",
  containerClassName = "",
  type = "text",
  labelBg = "transparent",
  fileContainer = "",
  fileType = "*",
  file = {},
  inputref = null,
  videoRef = null,
  disabled = false,
  options = [],
  value,
  setValue = () => {},
  fileUrl,
  additionalLabel = "" || null,
  onCrossClick = () => {},
  onChange = () => {},
  onAddSocial = () => {},
  inputData,
  onRemoveSocial = () => {},
  isError = false,
  errorMessage = "",
  instruction = "",
  suggestions = [],
  suggestionKey = "",
  handleSuggestionsClick = () => {},
  tags = [],
  setTags = () => {},
  mintags = 2,
  maxTags = 4,
}) => {
  const handleAddTag = (tagSuggestion) => {
    tags.push(tagSuggestion);
    setValue("");
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => {
      const newTags = [...prevTags];
      newTags.splice(index, 1);
      return newTags;
    });
  };

  const handleAddSocialLink = (social) => {
    const existingLink = inputData[name].find(
      (item) => item.platformType.toLowerCase() === social.name.toLowerCase()
    );

    Swal.fire({
      html: `<input
        type="url"
        name="${social.name}"
        id="${social.name}"
        placeholder="Paste your ${social.name} link"
        value="${existingLink ? existingLink.link : ""}" 
        required
        class="flex flex-wrap w-full gap-3 items-center focus:outline-none border ${
          validateURL(document.getElementById(`${social.name}`)?.value)
            ? "border-[#FF0000]"
            : "border-white/50"
        } disabled:cursor-not-allowed lg:text-base text-sm px-3 py-2 text-white rounded-lg bg-transparent ${inputClassName}"
      />`,
      background: "black",
      confirmButtonText: `Add ${social.name} link`,
      // showCancelButton: true,
      // cancelButtonText: `Remove ${social.name} link`,
      preConfirm: () => {
        const link = document.getElementById(`${social.name}`).value;
        if (link && validateURL(link, social.name)) {
          onAddSocial({ type: social.name, link: link });
        } else {
          Swal.showValidationMessage(`Invalid ${social.name} link`);
        }
      },
      didClose: () => {
        const removeLink = inputData[name].findIndex(
          (item) =>
            item.platformType.toLowerCase() === social.name.toLowerCase()
        );
        if (removeLink !== -1) {
          onRemoveSocial(removeLink);
        }
      },
    });
  };

  function validateURL(url, socialType) {
    try {
      const isUrl = new URL(url);

      if (socialType.toLowerCase() === "portfolio") {
        return true;
      }

      if (
        socialType.toLowerCase() === "gdrive" &&
        isUrl.hostname.includes("drive.google.com")
      ) {
        return true;
      }

      const hostname = isUrl.hostname.includes("www")
        ? isUrl.hostname.split(".")[1]
        : isUrl.hostname.split(".")[0];

      if (socialType.toLowerCase() === hostname) {
        return true;
      } else {
        throw new Error();
      }
    } catch (err) {
      return false;
    }
  }

  const handlePlay = (e) => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return type === "file" ? (
    <div className={`flex flex-col lg:text-base text-sm ${containerClassName}`}>
      <div className={`flex relative aspect-square ${fileContainer}`}>
        {fileUrl ? (
          (file &&
            typeof file === "object" &&
            file.type?.startsWith("video/")) ||
          fileUrl.endsWith(
            ".mp4" ||
              ".avi" ||
              ".wmv" ||
              ".mov" ||
              ".mkv" ||
              ".flv" ||
              ".webm" ||
              ".avchd"
          ) ? (
            <video
              src={fileUrl}
              alt=""
              className="size-full aspect-square object-cover cursor-pointer rounded-xl"
              ref={videoRef}
              muted
              onClick={handlePlay}
            />
          ) : (
            <Image
              src={fileUrl}
              alt=""
              loading="lazy"
              width={100}
              height={100}
              className="size-full aspect-square object-cover cursor-pointer rounded-xl"
            />
          )
        ) : (
          <label
            htmlFor={name}
            style={{
              backgroundColor: labelBg,
            }}
            className="size-full cursor-pointer rounded-xl flex justify-center items-center overflow-hidden"
          >
            {label}{" "}
            <input
              type={type}
              name={name}
              id={name}
              accept={fileType}
              onChange={onChange}
              ref={inputref}
              className="hidden"
            />
          </label>
        )}
        {additionalLabel ? (
          <label
            htmlFor={name}
            className="p-1 bg-black cursor-pointer absolute bottom-0 -right-2 rounded-xl overflow-hidden"
          >
            {additionalLabel}{" "}
            <input
              type={type}
              name={name}
              id={name}
              accept={fileType}
              onChange={onChange}
              className="hidden"
            />
          </label>
        ) : fileUrl || file ? (
          <div className="flex absolute items-center justify-between inset-x-1 top-1">
            <button
              type="button"
              onClick={onCrossClick}
              className="p-1 bg-black/50 cursor-pointer rounded-xl overflow-hidden"
            >
              <IoMdCloseCircle />
            </button>
            {(file &&
              typeof file === "object" &&
              file.type.startsWith("video/")) ||
            fileUrl.endsWith(
              ".mp4" ||
                ".avi" ||
                ".wmv" ||
                ".mov" ||
                ".mkv" ||
                ".flv" ||
                ".webm" ||
                ".avchd"
            ) ? (
              <div className="p-1 bg-black/50 cursor-pointer rounded-xl overflow-hidden">
                <IoIosVideocam />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {isError && errorMessage ? (
        <p className="text-[#FF0000] text-xs mt-1 px-2">{errorMessage}</p>
      ) : (
        <p className="text-white/50 text-xs mt-1 px-2">{instruction}</p>
      )}
    </div>
  ) : type === "tags" ? (
    <div
      className={`flex flex-col gap-1 lg:text-base text-sm relative ${containerClassName}`}
    >
      {label ? (
        <label htmlFor={name} className="px-2">
          {label}
          {required ? "*" : null}
        </label>
      ) : null}
      <div
        className={`flex flex-wrap gap-3 items-center focus:outline-none border ${
          isError ? "border-[#FF0000]" : "border-white/50"
        } disabled:cursor-not-allowed px-3 py-2 rounded-lg bg-transparent ${inputClassName}`}
      >
        {tags.length > 0
          ? tags.map((tag, index) => (
              <div
                key={index}
                className="flex px-3 py-1 items-center gap-2 rounded-full border-2 border-[#C5CEFB] bg-[#ECEFFE] text-[#4461F2]"
              >
                <button onClick={() => handleRemoveTag(index)} type="button">
                  <IoMdCloseCircle className="text-xl" />
                </button>
                {tag}{" "}
              </div>
            ))
          : null}
        {maxTags === tags.length ? null : (
          <input
            type="text"
            name={name}
            id={name}
            value={value}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            required={tags.length < mintags && required}
            className={`focus:outline-none w-full bg-transparent`}
          />
        )}
      </div>
      {isError && errorMessage ? (
        <p className="text-[#FF0000] text-xs mt-1 px-2">{errorMessage}</p>
      ) : (
        <p className="text-white/50 text-xs mt-1 px-2">{instruction}</p>
      )}
      {suggestions.length > 0 ? (
        <div className="absolute flex flex-col bg-black rounded-xl top-full inset-x-0 max-h-48 overflow-auto z-10">
          {suggestions.map((suggestion, index) => (
            <button
              type="button"
              onClick={() => handleAddTag(suggestion[suggestionKey])}
              key={index}
              className="p-2 hover:bg-blue-700 size-full text-left"
            >
              {suggestion[suggestionKey]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  ) : type === "socialmedia" ? (
    <div className="flex gap-2 items-center">
      {options.map((social, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleAddSocialLink(social)}
          className={`p-2 rounded-full focus:outline-none text-2xl ${
            inputData[name].find(
              (item) =>
                item.platformType.toLowerCase() === social.name.toLowerCase()
            )
              ? "bg-[#4461F2]"
              : "bg-[#383D38]"
          }`}
        >
          {social.icon}
        </button>
      ))}
    </div>
  ) : (
    <div
      className={`flex flex-col gap-1 lg:text-base text-sm relative ${containerClassName}`}
    >
      {label ? (
        <label htmlFor={name} className="px-2">
          {label}
          {required ? "*" : null}
        </label>
      ) : null}
      {type === "dropdown" ? (
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`focus:outline-none border ${
            isError ? "border-[#FF0000]" : "border-white/50"
          } disabled:cursor-not-allowed px-3 py-2 rounded-lg bg-transparent relative capitalize ${inputClassName} `}
        >
          {options.map((option, index) => (
            <option
              value={option}
              key={index}
              className="appearance-none bg-black capitalize"
            >
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          cols="30"
          rows="5"
          className={`${inputClassName} resize-none focus:outline-none border ${
            isError ? "border-[#FF0000]" : "border-white/50"
          } disabled:cursor-not-allowed size-full lg:px-4 lg:py-3 p-2 rounded-lg bg-transparent`}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`focus:outline-none border ${
            isError ? "border-[#FF0000]" : "border-white/50"
          } disabled:cursor-not-allowed px-3 py-2 rounded-lg bg-transparent ${inputClassName}`}
        />
      )}
      {isError && errorMessage ? (
        <p className="text-[#FF0000] text-xs mt-1 px-2">{errorMessage}</p>
      ) : (
        <p className="text-white/50 text-xs mt-1 px-2">{instruction}</p>
      )}
      {suggestions.length > 0 ? (
        <div className="absolute flex flex-col bg-black rounded-xl top-full inset-x-0 max-h-48 overflow-auto z-10">
          {suggestions.map((suggestion, index) => (
            <button
              type="button"
              onClick={() => handleSuggestionsClick(suggestion[suggestionKey])}
              key={index}
              className="p-2 hover:bg-blue-700 size-full text-left"
            >
              {suggestion[suggestionKey]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default InputField;
