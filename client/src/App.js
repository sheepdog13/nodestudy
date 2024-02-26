import GlobalStyles from "./styles/GlobalStyles";
import { Route, Routes } from "react-router-dom";
import LaindingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import { ThemeProvider } from "styled-components";
import { dark, light } from "./styles/theme";
import { useSelector } from "react-redux";
import PostPage from "./components/views/PostPage/PostPage";

function App() {
  const isDark = useSelector((state) => state.darkmode.isDark);
  const theme = isDark ? dark : light;
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<LaindingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/post/:failename" element={<PostPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
