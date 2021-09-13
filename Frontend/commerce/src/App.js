import './App.css';
import { createContext, useEffect, useState } from 'react';
import BaseLayout from './Containers/Base';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Containers/Main';
import { checkToken } from './API/Auth';
export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [fetchingLogin, setFetching] = useState(true);

  useEffect(() => {
    //try log in
    checkToken()
      .then((res) => {
        // this needs to be finshed
        const {
          status,
          data: { first_name },
        } = res;
        if (status === 200) {
          setAuthenticated(true);
          setUser({
            first_name,
          });
        }
        setFetching(false);
      })
      .catch((err) => setFetching(false));
  }, []);

  if (fetchingLogin) {
    return <div>loading</div>;
  } else {
    return (
      <div className="App">
        <AuthContext.Provider
          value={[user, setUser, isAuthenticated, setAuthenticated]}
        >
          <ThemeProvider theme={theme}>
            <Router>
              <Switch>
                <Route
                  path="/"
                  render={() => (
                    <BaseLayout>
                      <Main />
                    </BaseLayout>
                  )}
                />
              </Switch>
            </Router>
          </ThemeProvider>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
