import { ThemeProvider } from "./components/themeProvider"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Departments } from "./pages/Departments";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/departments" element={<Departments/>}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App