import { sliderWidth } from '../../Constants';
import { makeStyles } from '@material-ui/styles';

//STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    boxSizing: 'border-box',
    width: sliderWidth,
    height: '100%',
    backgroundColor: '#EFEFEF',
  },
}));

const Slider = ({ closeNav, ...props }) => {
  const classes = useStyles();
  return <div className={classes.container}></div>;
};

export default Slider;
