import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout'
import Homepage from './components/Homepage'
import Watchpage from './components/Watchpage'
import SearchPage from './components/SearchPage'
import {ThemeProvider} from './context/Context'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SuggestionVideoCard from './components/SuggestionVideoCard'

const App = () => {
  const [theme, setTheme] = useState('light');
  const darkTheme = () => {
    setTheme('dark');
  };
  const lightTheme = () => {
    setTheme('light');
  };
  useEffect(()=>{
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(theme);
  },[theme]);


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '',
          element: <Homepage/>,
        },
        {
          path: '/watchpage',
          element: <Watchpage/>
        },
        {
          path: '/watchpage',
          element: <SuggestionVideoCard/>
        },
        {
          path:'/searchpage',
          element: <SearchPage/>
        }
      ]
    }
  ])
  return (
    <>
    <ThemeProvider value={{theme, darkTheme, lightTheme}}>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
    </>
  )
}

export default App