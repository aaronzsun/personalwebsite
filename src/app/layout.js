// import localFont from "next/font/local";
import "./globals.css";

// const openSans = localFont({
//   src: "./fonts/OpenSans.ttf",
//   variable: "--font-open-sans",
//   weight: "100 900",
// });

export const metadata = {
  title: "Aaron Sun",
  description: "Aaron's Personal Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
