import PortfolioNavbar from "@/components/portfolio_components/modules/Navbar";

export default function RootLayout({ children }) {
  return (
    <main className="bg-black size-full min-h-screen text-white">
      <PortfolioNavbar />
      {children}
    </main>
  );
}
