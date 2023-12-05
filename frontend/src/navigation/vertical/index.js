import Login from "mdi-material-ui/Login";
import Table from "mdi-material-ui/Table";
import CubeOutline from "mdi-material-ui/CubeOutline";
import HomeOutline from "mdi-material-ui/HomeOutline";
import FormatLetterCase from "mdi-material-ui/FormatLetterCase";
import AccountCogOutline from "mdi-material-ui/AccountCogOutline";
import CreditCardOutline from "mdi-material-ui/CreditCardOutline";
import AccountPlusOutline from "mdi-material-ui/AccountPlusOutline";
import AlertCircleOutline from "mdi-material-ui/AlertCircleOutline";
import GoogleCirclesExtended from "mdi-material-ui/GoogleCirclesExtended";

const navigation = () => {
  return [
    {
      title: "Dashboard",
      icon: HomeOutline,
      path: "/",
    },
    {
      title: "Account Settings",
      icon: AccountCogOutline,
      path: "/account-settings",
    },
    {
      sectionTitle: "Pages",
    },
    {
      title: "Login",
      icon: Login,
      path: "/pages/login",
      openInNewTab: true,
    },
    {
      title: "Register",
      icon: AccountPlusOutline,
      path: "/pages/register",
      openInNewTab: true,
    },
    {
      title: "Error",
      icon: AlertCircleOutline,
      path: "/pages/error",
      openInNewTab: true,
    },
    {
      sectionTitle: "User Interface",
    },
    {
      title: "Typography",
      icon: FormatLetterCase,
      path: "/typography",
    },
    {
      title: "Icons",
      path: "/icons",
      icon: GoogleCirclesExtended,
    },
    {
      title: "Cards",
      icon: CreditCardOutline,
      path: "/cards",
    },
    {
      title: "Tables",
      icon: Table,
      path: "/tables",
    },
    {
      icon: CubeOutline,
      title: "Form Layouts",
      path: "/form-layouts",
    },
    {
      sectionTitle: "Login & UserInfo",
    },
    {
      title: "Login",
      icon: Login,
      path: "/login&userInfo/login",
      openInNewTab: false,
    },
    {
      sectionTitle: "참고 화면",
    },
    {
      icon: CubeOutline,
      title: "재원 대시보드-ref",
      path: "/dashboard-ref",
    },
    {
      icon: CubeOutline,
      title: "필수재기준-ref",
      path: "/essential-goods-ref",
    },
    {
      icon: CubeOutline,
      title: "투입 능력 관리-ref",
      path: "/input-capacity-ref",
    },
    {
      sectionTitle: "dev",
    },
    {
      sectionTitle: "업무 화면",
    },

    {
      icon: CubeOutline,
      title: "가능 통과 공장 설계",
      path: "/main-capacity",
    },
    {
      icon: CubeOutline,
      title: "공장 결정",
      path: "/main-confirm",
    },
    {
      icon: CubeOutline,
      title: "투입 능력 관리",
      path: "/capacity",
    },

    {
      sectionTitle: "기준 관리",
    },
    {
      icon: CubeOutline,
      title: "사이즈 기준 관리",
      title: "사이즈 기준",
      path: "/size-standard",
    },
    {
      icon: CubeOutline,
      title: "가능/확통 기준",
      path: "/factory-standard",
    },
    {
      icon: CubeOutline,
      title: "필수재 기준",
      path: "/essential-goods",
    },

    {
      sectionTitle: "모니터링",
    },
    {
      icon: CubeOutline,
      title: "대시보드",
      path: "/dashboard",
    },
    {
      icon: CubeOutline,
      title: "출강 Lot 집약",
      path: "/lot",
    },
  ];
};

export default navigation;
