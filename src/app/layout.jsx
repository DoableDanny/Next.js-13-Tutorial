// import localFont from "next/font/local";
import "./globals.css"; // apply to entire site
import { Rubik } from "next/font/google"; // Google fonts will be served from our deployment -- no requests made to Google from browser for SPEED.

// Components
import Navbar from "./components/Navbar";

// If loading a variable font, you don't need to specify the font weight https://nextjs.org/docs/app/building-your-application/optimizing/fonts#google-fonts
const rubik = Rubik({
  subsets: ["latin"],
});

// Local font example:
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// Can override this in each page file
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// This Layout component wraps any page component -- e.g. can put header and footer in here.
// children is one of the page components
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={rubik.className}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
