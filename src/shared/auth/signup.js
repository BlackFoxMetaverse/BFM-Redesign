import PrimaryButton from "../buttons/PrimaryButton";
import Image from "next/image";
import SecondaryButton from "../buttons/SecondaryButton";
import Link from "next/link";
import Swal from "sweetalert2";
import { handleGoogleSignIn } from "@/utils/apis/fireabseApis/GoogleSignIn";
import { navigate } from "../actions/routing";

const SignUpComponent = ({
  setSellerInputData = () => {},
  setCurrentPageIndex = () => {},
  to = "/",
}) => {
  async function handleGoogleRegister() {
    handleGoogleSignIn()
      .then((data) => {
        if (data.isExistingUser) {
          navigate(`/portfolio/${data?.username}?uid=${data?.uid}`) ||
            navigate(to);
        } else {
          setSellerInputData((prev) => ({ ...prev, ...data }));
          setCurrentPageIndex(1) || navigate(to);
        }
      })
      .catch((err) =>
        Swal.fire({
          title: "Error While Signin",
          text: err?.error || err?.message || "Something went Wrong",
          icon: "error",
          background: "black",
          color: "white",
          showConfirmButton: false,
          timer: 2000,
        })
      );
  }

  return (
    <div className="flex flex-col gap-4 sm:w-1/2 items-center justify-center">
      <PrimaryButton
        onClick={handleGoogleRegister}
        fontWeight={400}
        borderRadius={32}
        px={48}
        py={12}
        className="w-full"
      >
        <Image
          src={"/logos/google.svg"}
          alt=""
          priority
          height={50}
          width={50}
          className="size-6"
        />{" "}
        Sign up with Google
      </PrimaryButton>
      {/* <PrimaryButton
        onClick={() =>
          Swal.fire({
            title: "Feature available soon",
            icon: "info",
            text: "Sign In with apple will be available soon",
            timer: 2000,
            showConfirmButton: false,
          })
        }
        fontWeight={400}
        borderRadius={32}
        px={48}
        py={12}
      >
        <Image
          src={"/logos/apple.svg"}
          alt=""
          priority
          height={50}
          width={50}
          className="size-6"
        />{" "}
        Sign up with Apple
      </PrimaryButton> */}
      <div className="flex w-full items-center gap-4">
        <hr className="w-full border-t-white/50" />
        <p className="text-white/50">OR</p>
        <hr className="w-full border-t-white/50" />
      </div>
      <SecondaryButton
        onClick={() =>
          Swal.fire({
            title: "Feature available soon",
            icon: "info",
            text: "Sign In with Email will be available soon",
            timer: 2000,
            showConfirmButton: false,
            background: "black",
            color: "white",
          })
        }
        fontWeight={400}
        borderRadius={32}
        px={48}
        py={12}
        className=""
      >
        Sign up with Email
      </SecondaryButton>
      <p className="text-sm">
        By creating an account, you agree to the{" "}
        <Link
          href="#"
          className="underline underline-offset-2 whitespace-nowrap"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          className="underline underline-offset-2 whitespace-nowrap"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default SignUpComponent;
