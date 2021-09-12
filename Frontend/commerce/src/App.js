import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import BaseLayout from './Containers/Base';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  useEffect(() => {
    axios
      .get('http://localhost:8000/product/products')
      .then((res) => {
        const { data } = res;
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route
              path="/"
              render={() => (
                <BaseLayout>
                  <div>Content</div>
                </BaseLayout>
              )}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
