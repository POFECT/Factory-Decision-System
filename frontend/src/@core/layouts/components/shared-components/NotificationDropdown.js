// ** React Imports
import { useState, Fragment, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Badge from '@mui/material/Badge'
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiMenu from "@mui/material/Menu";
import MuiAvatar from "@mui/material/Avatar";
import MuiMenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

// ** Icons Imports
import BellOutline from "mdi-material-ui/BellOutline";

// ** Third Party Components
import PerfectScrollbarComponent from "react-perfect-scrollbar";

// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  "& .MuiMenu-paper": {
    width: 380,
    overflow: "hidden",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  "& .MuiMenu-list": {
    padding: 0,
  },
}));

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const styles = {
  maxHeight: 349,
  "& .MuiMenuItem-root:last-of-type": {
    border: 0,
  },
};

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles,
});

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)({
  width: "2.375rem",
  height: "2.375rem",
  fontSize: "1.125rem",
});

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: "1 1 100%",
  overflow: "hidden",
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  marginBottom: theme.spacing(0.75),
}));

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: "1 1 100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const NotificationDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]); // 새로운 상태 추가
  const [showBadge, setShowBadge] = useState(false); //알림 뱃지 상태 변경
  const [currentTime, setCurrentTime] = useState(new Date());

  // ** Hook
  const hidden = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowBadge(false); // 뱃지를 숨김
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  //알람 시간 보기 좋게 변경하는 코드
  const elapsedTime = (date) => {
    const start = new Date(date);
    const end = currentTime;
  
    const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    if (seconds < 60) return '방금 전';
  
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
  
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
  
    return `${start.toLocaleDateString()}`;
  };
  //Title 한글로 변경하는 코드
  const transformTitle = (originalTitle) => {
    if (originalTitle === "pass-standard") {
      return "가능통과공장기준 변경 알림";
    }
    return originalTitle;
  };
  //SubTitle 한글로 변경하는 코드
  const transformSubtitle = (originalSubtitle) => {
    if (originalSubtitle === "Delete") {
      return "가능통과공장기준이 삭제되었습니다.";
    } else if (originalSubtitle === "Update") {
      return "가능통과공장기준이 수정되었습니다.";
    }else if (originalSubtitle === "Insert") {
      return "가능통과공장기준이 추가되었습니다.";
    }
    return originalSubtitle;
  };

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8080/src/pages/alert/connect');
    
    // 이벤트 핸들러 등록
    //console.log("현재 연결 상태",eventSource.readyState)
    //console.log("eventSource ",eventSource)
    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      //console.log('Received SSE Event:', eventData);

      //알람 내용 변경
      const transformedTitle = transformTitle(eventData.title);
      const transformedSubtitle = transformSubtitle(eventData.subtitle);

      // 시간 형태 변경
      const timeDifference = elapsedTime(eventData.date);
      // 새로운 알람을 상태에 추가
      setNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications, { ...eventData, title: transformedTitle, subtitle: transformedSubtitle, elapsed: timeDifference }];
        //console.log('Updated Notifications:', updatedNotifications);
        setShowBadge(true);
        return updatedNotifications;
      });
    }

    // 에러 핸들러 등록
    eventSource.onerror = (error) => {
      //console.error('Error with SSE:', error);
    };

    return () => {
      eventSource.close();
    };
    
  }, []);



  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return (
        <Box sx={{ ...styles, overflowY: "auto", overflowX: "hidden" }}>
          {children}
        </Box>
      );
    } else {
      return (
        <PerfectScrollbar
          options={{ wheelPropagation: false, suppressScrollX: true }}
        >
          {children}
        </PerfectScrollbar>
      );
    }
  };

  return (
    <Fragment>
      <IconButton
          color="inherit"
          aria-haspopup="true"
          onClick={handleDropdownOpen}
          aria-controls="customized-menu"
          style={{ color: "white"}}
      >
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer',display: showBadge ? 'inline-block' : 'none','& .MuiBadge-badge': {
          paddingLeft: '50px',
          paddingTop: '20px',
        } }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
      >
      </Badge>
        <BellOutline />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disableRipple>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Chip
              size="small"
              label={`${notifications.length} New`}
              color="primary"
              sx={{
                height: 20,
                fontSize: "0.75rem",
                fontWeight: 500,
                borderRadius: "10px",
              }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleDropdownClose}>
              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    mx: 4,
                    flex: "1 1",
                    display: "flex",
                    overflow: "hidden",
                    flexDirection: "column",
                  }}
                >
                  <MenuItemTitle>{notification.title}</MenuItemTitle>
                  <MenuItemSubtitle variant="body2">
                    {notification.subtitle}
                  </MenuItemSubtitle>
                </Box>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  {notification.elapsed}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>
        {/* <MenuItem
          disableRipple
          sx={{
            py: 3.5,
            borderBottom: 0,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Button fullWidth variant="contained" onClick={handleDropdownClose}>
            Read All Notifications
          </Button>
        </MenuItem> */}
      </Menu>
    </Fragment>
  );
};

export default NotificationDropdown;
