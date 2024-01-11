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
import withAuth from "./api/auth/withAuth";
import HeatMap from "src/views/dashboard/HeatMap";
import InputStatusBar from "src/views/dashboard/InputStatusBar";
import FactoryGuage from "src/views/dashboard/FactoryGuage";
import OrderGrid from "src/views/dashboard/OrderGrid";
import Trophy from "src/views/dashboard/Throphy";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const BarChart = () =>{
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // const handleSession = () => {
  //   if (status === "authenticated" && session) {
  //     console.log("User is authenticated:", session);
  //   } else if (status === "loading") {
  //     console.log("Session loading...");
  //     return null;
  //   } else {
  //     console.log("User not authenticated or session not available");
  //     router.push("/user/login");
  //   }
  // };
  // useEffect(() => {
  //   handleSession();
  // }, [session, status, router]);
  // if (status === "loading" || (status === "authenticated" && !session)) {
  //   return null;
  // }
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

export default withAuth(BarChart);