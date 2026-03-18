import "@/styles/globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor  from "@/components/CustomCursor";
import Navbar        from "@/components/Navbar";

export const metadata = {
  title: {
    template: "%s — Two States",
    default: "Two States — Kerala × Tamil Nadu Cuisine",
  },
  description:
    "Two States — Where Kerala meets Tamil Nadu. An extraordinary journey through the flavours of South India.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
