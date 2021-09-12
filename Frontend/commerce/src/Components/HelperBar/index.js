import { makeStyles } from '@material-ui/core/styles';

//STYLES
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '35px',
    backgroundColor: theme.palette.info.light,
    display: 'flex',
    position: 'fixed',
    top: 0,
    alignItems: 'center',
    padding: '2px 8px',
    justifyContent: 'flex-end',
    //CHANGE TO INHERIT
    boxSizing: 'border-box',
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: '0 1 100px',
    listStyleType: 'none',
    fontSize: '16px',
    color: theme.palette.info,
    textTransform: 'uppercase',
    cursor: 'pointer',
    '& > li': {
      '&:hover': {
        color: theme.palette.common.black,
        fontWeight: 'bold',
        textDecoration: 'underline',
      },
    },
  },
}));

const HelperBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ul className={classes.list}>
        <li>join</li>
        <li>sign in</li>
      </ul>
    </div>
  );
};

export default HelperBar;
