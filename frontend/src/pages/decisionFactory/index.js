import { Grid, Typography } from "@mui/material";
import CardAppleWatch from "src/views/cards/CardAppleWatch";
import CardHorizontalRatings from "src/views/cards/CardHorizontalRatings";
import CardImgTop from "src/views/cards/CardImgTop";
import CardInfluencer from "src/views/cards/CardInfluencer";
import CardMembership from "src/views/cards/CardMembership";
import CardMobile from "src/views/cards/CardMobile";
import CardSupport from "src/views/cards/CardSupport";
import CardUser from "src/views/cards/CardUser";
import CardVerticalRatings from "src/views/cards/CardVerticalRatings";
import CardWithCollapse from "src/views/cards/CardWithCollapse";

const decisionFactory = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h5">공장결정</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardImgTop />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardUser />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardWithCollapse />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardMobile />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardHorizontalRatings />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardAppleWatch />
      </Grid>
      <Grid item xs={12} md={8}>
        <CardMembership />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardInfluencer />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardVerticalRatings />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSupport />
      </Grid>
    </Grid>
  );
};
export default decisionFactory;
