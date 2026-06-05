import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "../src/routes/Routes";
import { fallbackRoutes } from "./routes/FallbackRoute";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

export default function App() {

  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            {fallbackRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
