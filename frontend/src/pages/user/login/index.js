// ** React Imports
import { useEffect,useState } from "react";

// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { styled, useTheme } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import Image from "next/image";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Demo Imports
import FooterIllustrationsV1 from "src/views/pages/auth/FooterIllustration";
import { useSession, signIn, signOut } from "next-auth/react";

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "28rem" },
}));

const LinkStyled = styled("a")(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  // ** Hook
  const theme = useTheme();
  const router = useRouter();
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { data: session,status } = useSession();
  useEffect(() => {
    // 로그인이 완료된 경우
    if (status === 'authenticated') {
      // 원하는 페이지로 리다이렉션
      router.push('/');
    }
  }, [status]);


  return (
    <Box className="content-center">
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}
        >
          <Box
            sx={{
              mb: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/pofect_logo5.png"
              alt="POFECT Logo"
              width={200}
              height={200}
            />
            </Box>
            
          <Box
            sx={{
              mb: 6,
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}
            >
              Factory Decision System
            </Typography>
            <Typography variant="body2">
              POSCO DX 청년IT전문가 6기 2조 (POFECT)
            </Typography>
          </Box>
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >

            {session ? (
              <Button
                size="large"
                variant="contained"
                sx={{ marginBottom: 7, width: "100%" }}
                onClick={() =>signOut()}
                >
                Sign Out
              </Button>
            ) : (
              <Button
                size="large"
                variant="contained"
                sx={{ marginBottom: 7, width: "100%" }}
                onClick={()=>signIn()}
                >
                Sign In
              </Button>
            )}
            
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2">
                신규회원가입 및 비밀번호 문의는
              </Typography>
              <Typography variant="body2">
                공장 결정 시스템 관리자 (pofect2@gmail.com)
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  );
};
LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;
