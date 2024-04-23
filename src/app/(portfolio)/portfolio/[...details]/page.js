import PortfolioDetails from "@/components/portfolio_components/layouts/portfolio";
import React from "react";

export default function Portfolio({ params }) {
  return <PortfolioDetails details={params?.details} />;
}
