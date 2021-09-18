import { sliderWidth } from '../../Constants';
import { makeStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';

//STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    boxSizing: 'border-box',
    width: sliderWidth,
    height: '100%',
    backgroundColor: '#EFEFEF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
    '& > li': {
      transition: 'all .6s',
      cursor: 'pointer',
      padding: '15px',
      fontWeight: 'bold',
      width: '100%',
      textTransform: 'uppercase',
      listStyleType: 'none',
      position: 'relative',
      '&:hover': {
        color: '#993428',
        backgroundColor: '#ECECEC',
      },
    },
  },
  activeCategory: {
    color: '#993428',
    backgroundColor: '#ECECEC',
  },
  banner: {
    boxSizing: 'border-box',
    textAlign: 'center',
    padding: ' 15px 0',
    fontSize: '24px',
    fontWeight: 'bold',
  },
}));

// this would be stored in the db
const categories = ['sport', 'summer', 'smart', 'casual', 'comfort'];

const Slider = ({ closeNav, categoryClick, activeCategory, ...props }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.banner}>Cartegories</div>
      <Divider />
      <ul className={classes.container}>
        {categories.map((category) => {
          return (
            <li
              className={`${activeCategory === category && classes.activeCategory}`}
              onClick={() => categoryClick(category)}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Slider;
