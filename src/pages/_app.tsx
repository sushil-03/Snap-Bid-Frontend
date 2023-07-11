import "../styles/global.css";
// import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import type { AppProps } from "next/app";
import MainContainer from "@/components/organisms/MainContainer";
import { QueryClient, QueryClientProvider } from "react-query";
export const queryClient = new QueryClient();

import { ReactQueryDevtools } from "react-query/devtools";
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  );
};

export default MyApp;
