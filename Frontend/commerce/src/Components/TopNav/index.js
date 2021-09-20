import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { topBarHeight } from '../../Constants';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Auth from '../../Helpers/auth';
import { AuthContext } from '../../App';
import { useHistory } from 'react-router';
import { getCart } from '../../API/Products';
import Popover from '@material-ui/core/Popover';
import Cart from '../Cart';
import useCart from '../../HOOKS/useCart';

const AuthHelper = new Auth();

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

  text: {
    fontFamily: 'Lilita One, cursive',
    color: theme.palette.primary.main,
    fontSize: '40px',
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
  logoWrapper: {
    cursor: 'pointer',
  },
  cartPopup: {
    boxSizing: 'border-box',
    padding: '15px',
    width: '400px',
    height: '400px',
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [userName, setUsername] = useState('');
  const [user, setUser, isAuthenticated, setAutheticated, cart, setCart] =
    useContext(AuthContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [setCartData] = useCart();

  useEffect(() => {
    const { first_name } = user;
    if (!!user) {
      setUsername(first_name);
    }
  }, [user]);

  useEffect(() => {
    //update cart
    if (isAuthenticated) {
      handleSetCartData();
    }
  }, [isAuthenticated]);

  const handleSetCartData = async () => {
    if (!!user.id) {
      const response = await getCart(user.id);
      const { data } = response;
      const { id } = data[0];
      localStorage.setItem('cart', id);
      setCartData(id);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const routeToMain = () => {
    const { push } = history;
    push('/');
  };

  const open = !!anchorEl;
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.grow}>
      <AppBar classes={{ root: classes.root }} position="static">
        <Toolbar className={classes.flex}>
          <div className={classes.logoWrapper} onClick={routeToMain}>
            <Typography classes={{ root: classes.text }} variant="h5" noWrap>
              Golden Shoe
            </Typography>
          </div>
          <div className={classes.section}>
            {userName && <p>{userName}</p>}

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon onClick={handleClick} className={classes.icon} />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
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
        <Cart items={cart} />
      </Popover>
    </div>
  );
}
