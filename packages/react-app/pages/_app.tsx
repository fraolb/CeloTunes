import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { http, WagmiProvider, createConfig } from "wagmi";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/audioPlayerStyles.scss";
import { celo, celoAlfajores } from "wagmi/chains";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { AudioProvider } from "@/context/AudioContext";
import { MusicProvider } from "@/context/MusicContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { UserProvider } from "@/context/UserContext";
import Head from "next/head";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet],
    },
  ],
  {
    appName: "CeloTunes",
    projectId,
  }
);

const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
});

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ThemeProvider attribute="class">
            <SubscriptionProvider>
              <MusicProvider>
                <UserProvider>
                  <AudioProvider>
                    <Layout>
                      <Head>
                        <link rel="icon" href="/CTIcon.png" />

                        <title>CeloTunes</title>
                      </Head>
                      <Component {...pageProps} />
                    </Layout>
                  </AudioProvider>
                </UserProvider>
              </MusicProvider>
            </SubscriptionProvider>
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
