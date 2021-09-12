import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import BaseLayout from "./Containers/Base";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/styles";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:8000/product/products")
      .then((res) => {
        const { data } = res;
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BaseLayout />
      </ThemeProvider>
    </div>
  );
}

export default App;
