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
    backgroundColor: 'rgb(211, 209, 209)',
    borderTop: `1px solid rgb(206, 202, 202)`,
    padding: '15px',
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
      <div className={classes.footer}></div>
    </div>
  );
};

export default BaseLayout;
