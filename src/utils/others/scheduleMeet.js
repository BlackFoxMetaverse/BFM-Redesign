const handleScheduleMeet = (userName) => {
  if (userName) {
    const eventName = "Meeting with " + userName; // Event name for Google Calendar
    const eventDetails = "Discussing services"; // Event details
    const startTime = new Date(); // Start time of the event (current time)
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // End time of the event (1 hour from now)

    // Google Calendar event URL
    const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventName
    )}&details=${encodeURIComponent(eventDetails)}&dates=${startTime
      .toISOString()
      .replace(/-|:|\.\d+/g, "")}/${endTime
      .toISOString()
      .replace(/-|:|\.\d+/g, "")}&location=${encodeURIComponent(
      "Google Meet Link"
    )}&sf=true&output=xml`;

    window.open(calendarLink);
  }
};

export default handleScheduleMeet;
