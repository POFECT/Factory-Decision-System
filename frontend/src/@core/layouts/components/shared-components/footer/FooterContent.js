// ** MUI Imports
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}, Made with `}
        <Box component="span" sx={{ color: "error.main" }}>
          ❤️
        </Box>
        {` by `}
        <Link target="_blank" href="https://themeselection.com/">
          POFECT FOOTER 수정하기
        </Link>
      </Typography>
      {hidden ? null : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            "& :not(:last-child)": { mr: 4 },
          }}
        >
          <Link
            target="_blank"
            href="https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free/blob/main/LICENSE"
          >
            여긴 나중에
          </Link>
          <Link target="_blank" href="https://themeselection.com/">
            어떻게{" "}
          </Link>
          <Link
            target="_blank"
            href="https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free/blob/main/README.md"
          >
            바꿀지{" "}
          </Link>
          <Link
            target="_blank"
            href="https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free/issues"
          >
            고민해보자
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default FooterContent;
