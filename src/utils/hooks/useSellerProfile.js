"use client";

import { useEffect, useState } from "react";
import { fetchSellerProfile } from "../apis/fetchSellerProfile";

export function useSellerProfile(username) {
  const [sellerData, setSellerData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellerProfile(username)
      .then((data) => setSellerData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [username]);

  function fetchAgain() {
    setLoading(true);

    fetchSellerProfile(username)
      .then((data) => setSellerData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  return { sellerData, error, loading, fetchAgain };
}
