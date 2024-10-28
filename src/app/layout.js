// import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"


// const openSans = localFont({
//   src: "./fonts/OpenSans.ttf",
//   variable: "--font-open-sans",
//   weight: "100 900",
// });

export const metadata = {
  title: "Aaron Sun",
  description: "I'm a full stack engineer and data-enthusiast passionate about delivering great digital experiences and producing unique insights from data. I specialize in building full-stack products with elegant and intuitive designs. I'm currently based in San Francisco seeking new challenges.",
  robots: 'index, follow',  // Set robots to allow indexing
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${openSans.variable} antialiased`}
      >
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
