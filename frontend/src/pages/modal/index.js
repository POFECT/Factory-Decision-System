import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

// import LinearProgress from "@mui/joy/LinearProgress";
// import Typography from "@mui/joy/Typography";
// import { useCountUp } from "use-count-up";

// import { styled } from "@mui/material/styles";
// import LinearProgress, {
//   linearProgressClasses,
// } from "@mui/material/LinearProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper", //"#7A7A7D",
  // border: "2px solid #000",
  // boxShadow: 24,
  p: 4,
};

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor:
//       theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
//   },
// }));

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);

    const test = timer();

    setTimeout(function () {
      // 5초 후 실행
      setOpen(false);
      clearInterval(test);
      setProgress(10);
    }, 5000);
  };

  const timer = () => {
    const id = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 500);
    return id;
  };

  const handleClose = () => setOpen(false);

  // const { value } = useCountUp({
  //   isCounting: true,
  //   duration: 5,
  //   easing: "linear",
  //   start: 0,
  //   end: 75,
  //   onComplete: () => ({
  //     shouldRepeat: true,
  //     delay: 2,
  //     // Add any additional properties you need here
  //   }),
  // });

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            {...props}
            style={{ height: 10, borderRadius: 5 }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const [progress, setProgress] = useState(10);

  useEffect(() => {}, []);
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .css-4irqhx-MuiBackdrop-root-MuiModal-backdrop": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Box sx={style}>
          <img src="/images/2.gif" alt="Your GIF" style={{ width: "100%" }} />
          <LinearProgressWithLabel value={progress} />
        </Box>
      </Modal>
    </div>
  );
}
