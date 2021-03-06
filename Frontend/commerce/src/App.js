import './App.css';
import { createContext, useEffect, useState } from 'react';
import BaseLayout from './Containers/Base';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Containers/Main';
import { checkToken } from './API/Auth';
import Product from './Containers/Product';
export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [fetchingLogin, setFetching] = useState(true);
  const [cart, setCart] = useState({});

  useEffect(() => {
    //try log in
    checkToken()
      .then((res) => {
        const {
          status,
          data: { first_name, id },
        } = res;
        if (status === 200) {
          setAuthenticated(true);
          setUser({
            first_name,
            id: id,
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
          value={[user, setUser, isAuthenticated, setAuthenticated, cart, setCart]}
        >
          <ThemeProvider theme={theme}>
            <Router>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <BaseLayout>
                      <Main />
                    </BaseLayout>
                  )}
                />
                <Route
                  path="/product/:key"
                  render={() => (
                    <BaseLayout>
                      <Product />
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
