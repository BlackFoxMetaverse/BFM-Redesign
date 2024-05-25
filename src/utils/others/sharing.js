import Swal from "sweetalert2";

export async function handleShare(url = "", title = "", text = "") {
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
    // window.alert(error?.message);
  }
}
