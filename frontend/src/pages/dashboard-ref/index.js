// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import { LineChart } from "@mui/x-charts/LineChart";

// ** Demo Components Imports
import Trophy from "src/views/dashboard/Trophy";
import StatisticsCard from "src/views/dashboard/StatisticsCard";

const DashboardRef = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatisticsCard />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                valueFormatter: (value) =>
                  value == null ? "NaN" : value.toString(),
              },
              {
                data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
              },
              {
                data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
                valueFormatter: (value) =>
                  value == null ? "?" : value.toString(),
              },
            ]}
            height={200}
            margin={{ top: 10, bottom: 20 }}
          />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default DashboardRef;
