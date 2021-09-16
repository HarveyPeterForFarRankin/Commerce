import { makeStyles } from '@material-ui/core/styles';
import { useContext, useState } from 'react';
import { topBarHeight } from '../../Constants';
import Login from '../Login';
import Popover from '@material-ui/core/Popover';
import { AuthContext } from '../../App';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

//STYLES
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: topBarHeight,
    backgroundColor: 'rgb(202,202,202, 0.3)',
    display: 'flex',
    position: 'fixed',
    zIndex: 1,
    top: 0,
    alignItems: 'center',
    padding: '2px 8px',
    justifyContent: 'flex-end',
    //CHANGE TO INHERIT
    boxSizing: 'border-box',
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: '0 1 200px',
    listStyleType: 'none',
    fontSize: '14px',
    color: theme.palette.common.black,
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontWeight: 'bold',
    alignItems: 'center',
    '& > li': {
      '&:hover': {
        color: theme.palette.primary.dark,
        textDecoration: 'underline',
      },
    },
  },
  fbIcon: {
    color: '#4267B2',
  },
  twIcon: {
    color: '#1DA1F2',
  },
}));

const HelperBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser, isAuthenticated, setAuthenticated] = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;
  const id = open ? 'simple-popover' : undefined;

  const logout = () => {
    //remove token and reload page
    localStorage.removeItem('cart');
    localStorage.removeItem('token');
    window.location.reload(false);
  };

  return (
    <div className={classes.root}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Login />
      </Popover>
      <ul className={classes.list}>
        <li>
          <TwitterIcon className={classes.fbIcon} />
        </li>
        <li>
          <FacebookIcon className={classes.twIcon} />
        </li>
        <li>join</li>
        {isAuthenticated ? (
          <li onClick={logout}>Logout</li>
        ) : (
          <li onClick={handleClick}>Sign-in</li>
        )}
      </ul>
    </div>
  );
};

export default HelperBar;
