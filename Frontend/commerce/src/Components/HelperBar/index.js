import { makeStyles } from '@material-ui/core/styles';
import { useContext, useState } from 'react';
import { topBarHeight } from '../../Constants';
import Login from '../Login';
import Popover from '@material-ui/core/Popover';
import { AuthContext } from '../../App';

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
    flex: '0 1 110px',
    listStyleType: 'none',
    fontSize: '14px',
    color: theme.palette.common.black,
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontWeight: 'bold',
    '& > li': {
      '&:hover': {
        color: theme.palette.primary.dark,
        textDecoration: 'underline',
      },
    },
  },
}));

const HelperBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, isUser, isAuthenticated] = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;
  const id = open ? 'simple-popover' : undefined;

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
        <li>join</li>
        {isAuthenticated ? <li>Logout</li> : <li onClick={handleClick}>Sign-in</li>}
      </ul>
    </div>
  );
};

export default HelperBar;
