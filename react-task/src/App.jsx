import Navbar from './component/Navbar'
import AboutUs from './component/About'
import Website1 from './component/react01'
import Website2 from './component/react02'
import Website3 from './component/react03'
import Website4 from './component/react04'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><AboutUs /></>
    },

    {
      path: "/react01",
      element: <><Navbar /><Website1 /></>
    },

    {
      path: "/react02",
      element: <><Navbar /><Website2 /></>
    },

    {
      path:"/react03",
      element:<><Navbar/><Website3/></>
    },

    {
      path:"/react04",
      element:<><Navbar/><Website4/></>
    },
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App