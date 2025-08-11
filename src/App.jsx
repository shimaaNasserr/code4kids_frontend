import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import route from './routes/RouteList'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <RouterProvider router={route}></RouterProvider>
   </>
  )
}

export default App
