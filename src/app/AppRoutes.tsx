import { Routes, Route } from "react-router-dom";
import HelloPage from "../features/hello/pages/HelloPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HelloPage />} />
    </Routes>
  );
}
