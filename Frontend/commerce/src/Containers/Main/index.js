import BannerImage from '../../Assets/Images/banner.jpg';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Products from '../Products';

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
    position: 'absolute',
    bottom: '50px',
    left: '50px',
    animation: `$myEffect 2500ms ${theme.transitions.easing.easeInOut}`,
  },
  bannerText: {
    padding: 0,
    margin: 0,
    position: 'absolute',
    bottom: '100px',
    left: '50px',
    color: theme.palette.secondary.dark,
    animation: `$myEffect 2000ms ${theme.transitions.easing.easeInOut}`,
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
        <Button
          className={classes.button}
          endIcon={<ArrowForwardIcon />}
          color="secondary"
          variant={'contained'}
        >
          Shop
        </Button>
        <h2 className={classes.bannerText}>Shop for the latest golden shoes</h2>
      </div>
      <div className={classes.center}>
        <Products />
      </div>
    </section>
  );
};

export default Main;
