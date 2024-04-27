const handleSendEmail = (email) => {
  if (email) {
    const subject = "Regarding your services";
    const body =
      "Hello, I am interested in your services. Can we discuss further?";
    const mailToLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailToLink);
  }
};

export default handleSendEmail;
