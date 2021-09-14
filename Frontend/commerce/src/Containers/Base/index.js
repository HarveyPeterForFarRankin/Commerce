import HelperBar from '../../Components/HelperBar';
import TopNav from '../../Components/TopNav';
import { topBarHeight, topNavBarHeight } from '../../Constants';
import { makeStyles } from '@material-ui/core/styles';

//STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    // TODO CHANGE
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    marginTop: `calc(${topBarHeight} + ${topNavBarHeight})`,
  },
  footer: {
    height: '200px',
    backgroundColor: 'rgb(202,202,202, 0.3)',
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
