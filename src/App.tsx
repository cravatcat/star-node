import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"
import { routes } from "./config/routes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
