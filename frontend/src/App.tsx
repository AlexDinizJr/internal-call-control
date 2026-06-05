import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "../src/routes/Routes";
import { fallbackRoutes } from "./routes/FallbackRoute";

export default function App() {

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Routes>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {fallbackRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </Router>
  )
}
