// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Image from "next/image";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: theme.spacing(4.5),
  transition: "padding .25s ease-in-out",
  minHeight: theme.mixins.toolbar.minHeight,
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: "normal",
  textTransform: "uppercase",
  color: theme.palette.text.primary,
  transition: "opacity .25s ease-in-out, margin .25s ease-in-out",
}));

const StyledLink = styled("a")({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
});

const VerticalNavHeader = (props) => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props;

  // ** Hooks
  const theme = useTheme();

  return (
    <MenuHeaderWrapper
      style={{
        display: "flex",
        justifyContent: "left",
        background: "#0A5380",
        paddingLeft:"10px"
      }}
    >
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href="/" passHref>
          <div
            style={{
              fontSize: "40px",
              cursor: "pointer",
              fontFamily: "JalnanGothic",
              color: "white",
              alignItems:"baseline"
            }}
          ><Image
          src="/images/pofect_logo_reverse2.png"
          alt="POFECT Logo"
          width={50}
          height={50}
          style={{ paddingRight: "10px",marginTop:"10px",marginRight:"10px",objectFit:"cover" }}
        />
            POFECT
          </div>
        </Link>
      )}
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;
