import { Socials } from "@/shared/bfm_socials/Social";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <main className="bg-black size-full min-h-screen text-white">
      <section className="flex lg:flex-row flex-col lg:justify-between items-center gap-16 min-h-screen w-11/12 mx-auto py-12">
        <div className="left flex flex-col justify-center items-center gap-10 lg:w-1/3 relative">
          <Image
            src={"/images/form_background.gif"}
            height={500}
            width={500}
            alt=""
            priority
            unoptimized
            className="lg:w-3/4 w-full filter grayscale absolute aspect-square self-center"
          />
          <Image
            src={"/logos/white_fox.svg"}
            width={100}
            height={100}
            alt=""
            priority
            className="aspect-[3/1] lg:size-1/2 size-full z-10"
          />
          <div className="flex gap-7 items-center">
            {Socials.map((social, index) => (
              <Link
                href={social.link}
                target="_blank"
                key={index}
                className={`border-2 rounded-full z-10 aspect-square p-3 border-white/50 text-white text-xl`}
              >
                {social.logo}
              </Link>
            ))}
          </div>
        </div>
        {children}
      </section>
    </main>
  );
}
