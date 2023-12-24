import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper", //"#7A7A7D",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CapacityModal = (props) => {
  const [modal, setModal] = useState({ open: false, time: 0 });
  const [progress, setProgress] = useState(10);
  const [intervalId, setIntervalId] = useState(0);

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: "100%",
            mr: 1,
          }}
        >
          <LinearProgress
            variant="determinate"
            {...props}
            style={{ borderRadius: 5 }}
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

  const progressTimer = (time) => {
    const id = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, (time * 1000) / 10);
    return id;
  };

  useEffect(() => {
    if (props.modal.open !== undefined && props.modal.time !== undefined) {
      setModal(props.modal);
      if (props.modal.open) {
        setProgress(10);
        const interval = progressTimer(props.modal.time);
        setIntervalId(interval);
      } else {
        clearInterval(intervalId);
      }
    }
  }, [props.modal]);

  return (
    <>
      <Modal
        open={modal.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .css-4irqhx-MuiBackdrop-root-MuiModal-backdrop": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Box sx={style}>
          <img src="/images/2.gif" alt="GIF" style={{ width: "100%" }} />
          <LinearProgressWithLabel value={progress} />
        </Box>
      </Modal>
    </>
  );
};

export default CapacityModal;
