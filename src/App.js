import { useContext, useEffect, useState } from 'react'
import './App.scss'
import { ThemeContext } from './context/ThemeContext'
import { DARK_THEME, LIGHT_THEME } from './constants/themeConstants'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import MoonIcon from './assets/icons/moon.svg'
import SunIcon from './assets/icons/sun.svg'
import BaseLayout from './layouts/BaseLayout'
import { privateRoutes, authRoutes } from './routes/routes'

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext) 
  const [isLogin, setIsLogin] = useState()
  useEffect(() => {
    setIsLogin(localStorage.getItem('accessToken') ? true : false)
  })

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [theme])

  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            {privateRoutes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isLogin ? (
                      route.element
                    ) : (
                      <>
                        <Navigate
                          to="/login
                          "
                        />
                      </>
                    )
                  }
                ></Route>
              )
            })}
          </Route>
          <Route>
            {authRoutes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                ></Route>
              )
            })}
          </Route>
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
            alt="theme-icon"
          />
        </button>
      </Router>
    </>
  )
}

export default App
