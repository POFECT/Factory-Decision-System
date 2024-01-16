import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Grid } from "@mui/material";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import withAuth from "src/pages/api/auth/withAuth";
import HeatMap from "src/views/dashboard/HeatMap";
import InputStatusBar from "src/views/dashboard/InputStatusBar";
import FactoryGuage from "src/views/dashboard/FactoryGuage";
import OrderGrid from "src/views/dashboard/OrderGrid";
import PassProcessDash from "src/views/dashboard/PassProcessDash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Index = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3}>
          <PassProcessDash />
        </Grid>
        <Grid item xs={12} md={3}>
          <PassProcessDash />
        </Grid>
        <Grid item xs={12} md={3}>
          <PassProcessDash />
        </Grid>
        <Grid item xs={12} md={3}>
          <PassProcessDash />
        </Grid>
        <Grid item xs={12} md={6}>
          <HeatMap />
        </Grid>
        <Grid item xs={12} md={6}>
          <OrderGrid />
        </Grid>
        <Grid item xs={12} md={5}>
          <InputStatusBar />
        </Grid>
        <Grid item xs={12} md={7}>
          <FactoryGuage />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default withAuth(Index);
