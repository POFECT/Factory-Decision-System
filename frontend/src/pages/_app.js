import { Router } from "next/router";

// ** Loader Import
import NProgress from "nprogress";

// ** Emotion Imports

// ** Config Imports
import themeConfig from "src/configs/themeConfig";

// ** Component Imports
import UserLayout from "src/layouts/UserLayout";
import ThemeComponent from "src/@core/theme/ThemeComponent";

// ** Contexts
import { SettingsConsumer } from "src/@core/context/settingsContext";

// ** Utils Imports
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";

// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css";

// ** Global css styles
import "../../styles/globals.css";
import { SessionProvider } from "next-auth/react";


import 'react-chatbot-kit/build/main.css';
import "../../styles/chatbot.css";
import Layout from "src/views/chat-bot/Layout";
import { useState } from "react";

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
}

// ** Configure JSS & ClassName
const App = (props) => {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  // Variables
  const getLayout =
    Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);


  try {
    const asPath = props.router?.asPath;

    console.log(asPath);
    if (asPath === '/user/login/') {
      return (
        <SessionProvider session={session}>
          <SettingsConsumer>
            {({ settings }) => (
              <ThemeComponent settings={settings}>
                {getLayout(<Component {...pageProps} />)}
              </ThemeComponent>
            )}
          </SettingsConsumer>
        </SessionProvider>
      );
    }
    return (
      <Layout>
        <SessionProvider session={session}>
          <SettingsConsumer>
            {({ settings }) => (
              <ThemeComponent settings={settings}>
                {getLayout(<Component {...pageProps} />)}
              </ThemeComponent>
            )}
          </SettingsConsumer>
        </SessionProvider>
      </Layout>
    );
  } catch (error) {
    // 오류가 발생한 경우 처리
    console.error('Error in _app.js:', error);
    return (
      <Layout>
        <SessionProvider session={session}>
          <SettingsConsumer>
            {({ settings }) => (
              <ThemeComponent settings={settings}>
                {getLayout(<Component {...pageProps} />)}
              </ThemeComponent>
            )}
          </SettingsConsumer>
        </SessionProvider>
      </Layout>
    );
  }
  // return (
  //   <Layout>
  //     <SessionProvider session={session}>
  //       <SettingsConsumer>
  //         {({ settings }) => {
  //           return (
  //             <ThemeComponent settings={settings}>
  //               {getLayout(<Component {...pageProps} />)}
  //             </ThemeComponent>
  //           );
  //         }}
  //       </SettingsConsumer>
  //     </SessionProvider>
  //   </Layout>

  // );
};

export default App;
