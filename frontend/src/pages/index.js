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
import { Paper, Typography, Grid, Box, Card, Tabs, Tab } from "@mui/material";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

import WeeklyHeatMap from "src/views/dashboard/WeeklyHeatMap";
import HeatMap from "src/views/dashboard/HeatMap";
import InputStatusBar from "src/views/dashboard/InputStatusBar";
import FactoryGuage from "src/views/dashboard/FactoryGuage";
import OrderGrid from "src/views/dashboard/OrderGrid";
import Trophy from "src/views/dashboard/Throphy";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function BarChart() {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={3}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={3}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={3}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={6}>
          <HeatMap />
        </Grid>
        <Grid item xs={12} md={6}>
          <OrderGrid />
        </Grid>
        <Grid item xs={12} md={5} sx={{ paddingBottom: 4 }}>
          <InputStatusBar />
        </Grid>
        <Grid item xs={12} md={7}>
          <FactoryGuage />
        </Grid>
        <Grid item xs={12} md={7}>
          지도 들어갈거임
        </Grid>
        <Grid item xs={12} md={5}>
          달력 들어갈예정
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
}
