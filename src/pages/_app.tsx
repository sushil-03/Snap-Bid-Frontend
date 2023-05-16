import "../styles/global.css";
// import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import type { AppProps } from "next/app";
import MainContainer from "@/components/organisms/MainContainer";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <MainContainer>
    <Component {...pageProps} />
  </MainContainer>
);

export default MyApp;
