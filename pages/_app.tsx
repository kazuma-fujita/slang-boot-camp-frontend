import {
  AmazonAIPredictionsProvider,
  Predictions,
} from "@aws-amplify/predictions";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Amplify } from "aws-amplify";
import type { AppProps } from "next/app";
import Head from "next/head";
import awsconfig from "../src/aws-exports";
import { appUrl } from "../src/constants/urls";
import createEmotionCache from "../src/mui/create-emotion-cache";
import theme from "../src/mui/theme";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

Amplify.configure(awsconfig);
Amplify.register(Predictions);
try {
  Amplify.addPluggable(new AmazonAIPredictionsProvider());
} catch (error) {}

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Slang Boot Camp</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@zuma_lab" />
        <meta name="twitter:creator" content="@zuma_lab" />
        <meta property="og:url" content={appUrl} />
        <meta property="og:title" content="Slang Boot Camp" />
        <meta
          property="og:description"
          content="学校や TOEIC で絶対出てこない英語フレーズの発音練習が出来るアプリ"
        />
        <meta property="og:image" content="/ogp.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
