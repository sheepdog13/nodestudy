import GlobalStyles from "./styles/GlobalStyles";
import { Route, Routes } from "react-router-dom";
import LaindingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LaindingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
