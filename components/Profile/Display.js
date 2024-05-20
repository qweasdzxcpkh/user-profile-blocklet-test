import {
  Skeleton,
  Avatar,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MailIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/PhoneOutlined';
import useMediaQueryStyles from '../../hooks/useMediaQueryStyles';
import pcStyles from './Display.module.scss';
import mobileStyles from './Display.mobile.module.scss';

const Display = ({ user, loading, onEdit }) => {
  const styles = useMediaQueryStyles(mobileStyles, pcStyles);
  if (loading) {
    return (
      <Box className={styles.container}>
        <Box className={styles.baseInfo}>
          <Skeleton variant="circular" className={styles.baseInfoAvatar} />
          <Box className={styles.baseInfoInfos}>
            <Skeleton variant="text" sx={{ width: '50%' }} className={styles.skeletonText} />
            <Skeleton variant="text" sx={{ width: '40%' }} className={styles.skeletonText} />
          </Box>
        </Box>
        <Skeleton variant="text" sx={{ width: '70%' }} className={styles.skeletonText} />
        <Skeleton variant="text" sx={{ width: '70%' }} className={styles.skeletonText} />
      </Box>
    );
  }
  return (
    <Box className={styles.container}>
      <Box className={styles.baseInfo}>
        <Avatar className={styles.baseInfoAvatar}>{user.name?.[0]}</Avatar>
        <div className={styles.baseInfoInfos}>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="h6">@{user.handle}</Typography>
        </div>
      </Box>
      <List>
        <ListItem>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={user.email} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary={user.phoneNumber} />
        </ListItem>
      </List>
      <Button onClick={onEdit}>Edit profile</Button>
    </Box>
  );
};
export default Display;
