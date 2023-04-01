import "@/styles/style.scss";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import { Noto_Sans_JP } from "next/font/google";
import { Contents } from "@/gl/parts/contents";
import useLenis from "@/utils/useLenis";
const font = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--noto-font",
});

export default function App({ Component, pageProps }: AppProps) {
  const three = useRef<Contents>();

  useLenis();

  useEffect(() => {
    // canvas
    if (three.current) return;
    three.current = new Contents(document.querySelector(".l-canvas"));
  }, []);
  return (
    <main className={font.variable}>
      <Component {...pageProps} />
    </main>
  );
}
