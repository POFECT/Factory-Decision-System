import { Typography, Button } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button as MuiButton,
} from "@mui/material";

const EssentialModal = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ width: "100%" }}
      maxWidth="xl"
    >
      <div
        style={{
          width: "600px",
          maxHeight: "100vh",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <Typography
          style={{ marginTop: "20px", padding: "0 20px 0 20px" }}
          variant="h4"
        >
          필수재 기준 추가
        </Typography>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            size="small"
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#E29E21" }}
          >
            저장
          </Button>
          <Button
            size="small"
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#0A5380" }}
            onClick={() => {
              handleClose();
            }}
          >
            닫기
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default EssentialModal;
