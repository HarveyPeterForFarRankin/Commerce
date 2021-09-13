import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { topBarHeight } from '../../Constants';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Auth from '../../Helpers/auth';
import useProfileData from '../../HOOKS/useUserData';
import { AuthContext } from '../../App';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  root: {
    boxSizing: 'border-box',
    backgroundColor: '#f5f5f5',
  },
  grow: {
    position: 'fixed',
    width: '100%',
    top: topBarHeight,
    flexGrow: 1,
    zIndex: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  icon: {
    height: '28px',
    width: '28px',
  },
  fbIcon: {
    color: '#4267B2',
  },
  twIcon: {
    color: '#1DA1F2',
  },
  text: {
    color: theme.palette.primary.main,
  },
  section: {
    justifyContent: 'flex-end',
    display: 'flex',
    width: '130px',
    '& > p': {
      marginRight: '25px',
      fontWeight: 'bold',
      color: theme.palette.primary.dark,
      fontSize: '20px',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [userName, setUsername] = useState('');
  const [user] = useContext(AuthContext);

  useEffect(() => {
    const { first_name } = user;
    if (!!user) {
      setUsername(first_name);
    }
  }, [user]);

  return (
    <div className={classes.grow}>
      <AppBar classes={{ root: classes.root }} position="static">
        <Toolbar className={classes.flex}>
          <Typography classes={{ root: classes.text }} variant="h5" noWrap>
            Golden Shoe
          </Typography>
          <div className={classes.section}>
            {userName && <p>{userName}</p>}

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <ShoppingCartIcon className={classes.icon} />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
