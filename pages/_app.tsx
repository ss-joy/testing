import { NavigationMenuDemo } from "@/components/Navigation";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import store from "@/store";
import Head from "next/head";

// const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="screen-orientation" content="portrait" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black"
        ></meta>
      </Head>
      {/* <QueryClientProvider client={queryClient}> */}
      <Provider store={store}>
        {/* <ReactQueryDevtools /> */}
        {/* <NavigationMenuDemo /> */}
        <Component {...pageProps} />
      </Provider>
      {/* </QueryClientProvider> */}
    </>
  );
}
