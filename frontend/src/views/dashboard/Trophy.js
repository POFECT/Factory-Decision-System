// ** MUI Imports
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { styled, useTheme } from "@mui/material/styles";

const TriangleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

const Trophy = () => {
  const theme = useTheme();
  const imageSrc =
    theme.palette.mode === "light" ? "triangle-light.png" : "triangle-dark.png";

  return (
    <Card sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h5">2023.12</Typography>
        <Typography variant="body2" sx={{ letterSpacing: "0.25px" }}>
          Number of order information subject to factory decision{" "}
        </Typography>
        <Typography variant="h5" sx={{ my: 4, color: "primary.main" }}>
          625(number of case)
        </Typography>
        <Button
          size="small"
          variant="contained"
          style={{ whiteSpace: "nowrap" }}
        >
          주문 확인
        </Button>
        <TriangleImg
          alt="triangle background"
          src={`/images/misc/${imageSrc}`}
        />
        <TrophyImg alt="trophy" src="/images/misc/trophy.png" />
      </CardContent>
    </Card>
  );
};

export default Trophy;
