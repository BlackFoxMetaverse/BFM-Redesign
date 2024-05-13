import PortfolioDetails from "@/components/portfolio_components/layouts/portfolio";
import PortfolioNavbar from "@/components/portfolio_components/modules/Navbar";
import React from "react";

export default function Portfolio({ params }) {
  return (
    <>
      <PortfolioNavbar details={params?.details} />
      <PortfolioDetails details={params?.details} />
    </>
  );
}
