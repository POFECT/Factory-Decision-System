// ** MUI Imports
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from "src/@core/layouts/VerticalLayout";

// ** Navigation Imports
import VerticalNavItems from "src/navigation/vertical";

// ** Component Import
import VerticalAppBarContent from "./components/vertical/AppBarContent";

// ** Hook Import
import { useSettings } from "src/@core/hooks/useSettings";
import Spinner from "src/views/spinners/Spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import withAuth from "src/pages/api/auth/withAuth";

const UserLayout = ({ children }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings();

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(false);
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsPageLoading(true);
    });
    //
    router.events.on("routeChangeComplete", () => {
      setIsPageLoading(false);
    });
  }, [router]);
  return (
    <>
      {isPageLoading && <Spinner />}
      <VerticalLayout
        hidden={hidden}
        settings={settings}
        saveSettings={saveSettings}
        verticalNavItems={VerticalNavItems()} // Navigation Items
        verticalAppBarContent={(
          props // AppBar Content
        ) => (
          <VerticalAppBarContent
            hidden={hidden}
            settings={settings}
            saveSettings={saveSettings}
            toggleNavVisibility={props.toggleNavVisibility}
          />
        )}
      >
        {children}
      </VerticalLayout>
    </>
  );
};

export default withAuth(UserLayout);
