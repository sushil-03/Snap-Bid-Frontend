import "../styles/global.css";
// import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import type { AppProps } from "next/app";
import MainContainer from "@/components/organisms/MainContainer";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect } from "react";
import { getAllProduct } from "@/endpoints/product";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    queryClient.prefetchQuery("products", getAllProduct);
  }, [queryClient]);

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
