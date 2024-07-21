import { BrowserRouter, Route, Routes as RRRoutes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

export default function Routes() {
  return (
    <BrowserRouter>
      <RRRoutes>
        <Route path="/" element={<LandingPage />} />
      </RRRoutes>
    </BrowserRouter>
  );
}
