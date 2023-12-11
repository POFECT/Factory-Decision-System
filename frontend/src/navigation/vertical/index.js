import CubeOutline from "mdi-material-ui/CubeOutline";

const navigation = () => {
  return [
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
      title: "사이즈 기준",
      path: "/size-standard",
    },
    {
      icon: CubeOutline,
      title: "필수재 기준",
      path: "/essential-goods",
    },
    {
      icon: CubeOutline,
      title: "가능/확통 기준",
      path: "/factory-standard",
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
