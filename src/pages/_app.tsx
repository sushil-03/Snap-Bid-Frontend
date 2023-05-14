import "../styles/global.css";

import type { AppProps } from "next/app";
import MainContainer from "@/components/organisms/MainContainer";
const MyApp = ({ Component, pageProps }: AppProps) => (
  <MainContainer>
    <Component {...pageProps} />
  </MainContainer>
);

export default MyApp;
