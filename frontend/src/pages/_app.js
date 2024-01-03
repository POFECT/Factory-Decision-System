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

  return (
    <SessionProvider session={session}>
      <SettingsConsumer>
        {({ settings }) => {
          return (
            <ThemeComponent settings={settings}>
              {getLayout(<Component {...pageProps} />)}
            </ThemeComponent>
          );
        }}
      </SettingsConsumer>
    </SessionProvider>
  );
};

export default App;
