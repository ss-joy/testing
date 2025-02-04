import { NavigationMenuDemo } from "@/components/Navigation";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import store from "@/store";

// const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
      <Provider store={store}>
        {/* <ReactQueryDevtools /> */}
        <NavigationMenuDemo />
        <Component {...pageProps} />
      </Provider>
      {/* </QueryClientProvider> */}
    </>
  );
}
