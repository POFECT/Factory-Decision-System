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
        <Grid item xs={12} md={6}>
          <HeatMap />
        </Grid>
        <Grid item xs={12} md={6}>
          <WeeklyHeatMap />
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ paddingBottom: 4 }}>
          <InputStatusBar />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <FactoryGuage />
        </Grid>
        <Grid item xs={12}>
          <OrderGrid />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
}
