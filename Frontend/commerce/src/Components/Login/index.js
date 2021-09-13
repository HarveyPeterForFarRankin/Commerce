import { Button, TextField, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useContext, useState } from 'react';
import { loginAPI } from '../../API/Auth';
import Auth from '../../Helpers/auth';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import { AuthContext } from '../../App';

const AuthHelper = new Auth();

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '400px',
    height: '300px',
    backgroundColor: '#fffff',
    padding: '15px',
  },
  login: {
    textTransform: 'uppercase',
    fontSize: '24px',
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedin] = useState(false);
  const classes = useStyles();
  const [user, setUser, isAuthenticated, setAuthenticated] = useContext(AuthContext);

  const login = async () => {
    setLoading(true);
    try {
      const response = await loginAPI(username, password);
      setLoading(false);
      const {
        data: { token, user },
        status,
      } = response;
      if (status === 200) {
        setLoggedin(true);
        setAuthenticated(true);
        setUser(user);
        AuthHelper.setToken(token);
        clearInputs();
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const clearInputs = () => {
    setPassword('');
    setUsername('');
  };

  return (
    <div className={classes.container}>
      <h4 className={classes.login}>Login</h4>
      <TextField
        label="email"
        required
        variant="outlined"
        helperText="Please enter your email"
        fullWidth
        value={username}
        type="email"
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="password"
        required
        helperText="Please enter your password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={login} variant="contained" color="secondary">
        Log in
      </Button>
      <Snackbar
        autoHideDuration={6000}
        variant="success"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={loggedIn}
        onClose={() => setLoggedin(false)}
        message="Succesfully logged in"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setLoggedin(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <MuiAlert elevation={6} severity="success">
          Succesfully Logged in
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Login;
