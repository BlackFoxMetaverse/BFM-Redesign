import Swal from "sweetalert2";

export async function handleShare(
  url = window.location.href,
  title = "",
  text = ""
) {
  try {
    if (navigator.canShare) {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url).then(() =>
        Swal.fire({
          title: title,
          text: text,
          confirmButtonText: "Got it!",
          background: "black",
          color: "white",
        })
      );
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error occurred while sharing",
      text: error?.message || "Something went wrong while sharing",
    });
  }
}
