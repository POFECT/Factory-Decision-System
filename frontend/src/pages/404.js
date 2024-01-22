// ** Next Import
import Link from "next/link";

// ** MUI Components
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Demo Imports
import FooterIllustrations from "src/views/pages/misc/FooterIllustrations";

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}));

const Img = styled("img")(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down("lg")]: {
    height: 450,
    marginTop: theme.spacing(10),
  },
  [theme.breakpoints.down("md")]: {
    height: 400,
  },
  [theme.breakpoints.up("lg")]: {
    marginTop: theme.spacing(13),
  },
}));

const TreeIllustration = styled("img")(({ theme }) => ({
  left: 0,
  bottom: "5rem",
  position: "absolute",
  [theme.breakpoints.down("lg")]: {
    bottom: 0,
  },
}));

const Error404 = () => {
  return (
    <Box className="content-center">
      <Box
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* <Img
          height="300"
          alt="error-illustration"
          src="/images/pofect_logo3.png"
        /> */}
        <BoxWrapper>
          <Typography variant="h1">404</Typography>
          <Typography
            variant="h5"
            sx={{ mb: 1, fontSize: "1.5rem !important" }}
          >
            Page Not Found ⚠️
          </Typography>
          <Typography variant="body1">존재하지 않는 페이지 입니다.</Typography>
        </BoxWrapper>

        <Link passHref href="/">
          <Button
            component="a"
            variant="contained"
            sx={{ px: 5.5, width: "80%" }}
            style={{ whiteSpace: "nowrap", marginTop: "50px" }}
          >
            Go Dashboard
          </Button>
        </Link>
      </Box>
      <FooterIllustrations image={<TreeIllustration />} />
    </Box>
  );
};
Error404.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default Error404;
