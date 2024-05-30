import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>판다 마켓</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main></main>
    </>
  );
}
