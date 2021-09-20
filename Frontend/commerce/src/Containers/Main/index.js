import BannerImage from '../../Assets/Images/banner.jpg';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Products from '../Products';
import { Link } from 'react-scroll';

//STYLES
const useStyles = makeStyles((theme) => ({
  banner: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      height: '500px',
      display: 'block',
      position: 'relative',
      '&::after': {
        content: '""',
        background: `url(${BannerImage})`,
        backgroundRepeat: 'no-repeat',
        width: '100%',
        backgroundSize: 'cover',
        opacity: 0.4,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        zIndex: -1,
      },
    },
  },
  button: {
    fontFamily: 'Lilita One, cursive',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    animation: `$myEffect 2500ms ${theme.transitions.easing.easeInOut}`,
  },
  bannerText: {
    whiteSpace: 'no-wrap',
    fontFamily: 'Lilita One, cursive',
    fontSize: '20px',
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%,-10%)',
    color: theme.palette.secondary.dark,
    animation: `$myEffect 2000ms ${theme.transitions.easing.easeInOut}`,
    [theme.breakpoints.up('sm')]: {
      fontSize: '25px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '40px',
    },
  },
  '@keyframes myEffect': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  container: {
    position: 'relative',
    backgroundColor: '#EFEFEF',
    height: '400px',
  },
  outerContainer: {
    position: 'relative',
    backgroundColor: '#EFEFEF',
    zIndex: 0,
  },
  center: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
}));

const Main = () => {
  const classes = useStyles();
  return (
    <section className={classes.outerContainer}>
      <div className={classes.banner}>
        <Link activeClass="active" to="products" spy={true} smooth={true}>
          <Button
            className={classes.button}
            endIcon={<ArrowDownwardIcon />}
            color="secondary"
            variant={'contained'}
          >
            Shop
          </Button>
        </Link>
        <h2 className={classes.bannerText}>Shop for the latest golden shoes</h2>
      </div>
      <div id="products">
        <div className={classes.center}>
          <Products />
        </div>
      </div>
    </section>
  );
};

export default Main;
