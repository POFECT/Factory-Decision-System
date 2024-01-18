import CubeOutline from "mdi-material-ui/CubeOutline";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import FactoryIcon from "@mui/icons-material/Factory";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import CalculateIcon from "@mui/icons-material/Calculate";
import LanIcon from "@mui/icons-material/Lan";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import DvrIcon from "@mui/icons-material/Dvr";
import { Input, SaveAlt } from "@mui/icons-material";

const navigation = () => {
  return [
    {
      sectionTitle: "업무 화면",
    },
    {
      icon: PrecisionManufacturingIcon,
      title: "가능 통과 공장 설계",
      path: "/main-capacity",
    },

    {
      icon: TouchAppIcon,
      title: "공장 결정",
      path: "/main-confirm",
    },

    {
      icon: SaveAlt,
      title: "투입 능력 관리",
      path: "/capacity",
    },

    {
      sectionTitle: "기준 관리",
    },
    {
      icon: CropRotateIcon,
      title: "사이즈 기준",
      path: "/size-standard",
    },
    {
      icon: CalculateIcon,
      title: "필수재 기준",
      path: "/essential-goods",
    },
    {
      icon: FactoryIcon,
      title: "가능/확통 기준",
      path: "/pass-standard",
    },
    {
      sectionTitle: "모니터링",
    },
    {
      icon: CubeOutline,
      title: "대시보드",
      path: "/",
    },
    {
      icon: LanIcon,
      title: "출강 Lot 집약",
      path: "/lot",
    },
    {
      icon: DvrIcon,
      title: "주문 Log",
      path: "/log",
    },
  ];
};

export default navigation;
