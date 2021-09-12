import HelperBar from '../../Components/HelperBar';
import TopNav from '../../Components/TopNav';
import { topBarHeight, topNavBarHeight } from '../../Constants';
import { makeStyles } from '@material-ui/core/styles';

//STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    // TODO CHANGE
    boxSizing: 'border-box',
    paddingTop: '15px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      padding: '15px',
    },
  },
  content: {
    width: 'min(100%, 1200px)',
    marginTop: `calc(${topBarHeight} + ${topNavBarHeight})`,
  },
}));

const BaseLayout = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <div>
      <HelperBar />
      <TopNav />
      <div className={classes.container}>
        <main className={classes.content}>{children}</main>
      </div>
    </div>
  );
};

export default BaseLayout;
