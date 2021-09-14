import { sliderWidth } from '../../Constants';
import { makeStyles } from '@material-ui/styles';
import { Category, CategoryOutlined } from '@material-ui/icons';

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
    activeCategory: {
      color: '#993428',
      backgroundColor: '#ECECEC',
    },
  },
}));

// this would be stored in the db
const categories = ['sport', 'summer', 'smart', 'casual', 'comfort'];

const Slider = ({ closeNav, categoryClick, activeCategory, ...props }) => {
  const classes = useStyles();
  return (
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
  );
};

export default Slider;
