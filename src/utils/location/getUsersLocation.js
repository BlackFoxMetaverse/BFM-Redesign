export function getUsersLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ longitude, latitude });
        },
        function (error) {
          reject(error);
        },
        options
      );
    } else {
      reject(new Error("Geolocation is not supported in your browser."));
    }
  });
}
