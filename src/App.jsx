import Calendar from "./components/Calendar"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

const AddEvent = lazy(() => import('./pages/addEvent'))
const DeleteEvent = lazy(() => import('./pages/deleteEvent'))

function App() {

  return (
  
    <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Calendar />}/>
    <Route path="/addevent" element={<AddEvent/>}/>
    <Route path="/deleteevent" element={<DeleteEvent/>}/>
    </Routes>
    </BrowserRouter>
    </Suspense>
  )
}

export default App
