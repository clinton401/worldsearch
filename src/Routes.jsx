import React from 'react'
import { Route, Routes as Router } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Details from './Pages/Details/Details'
import NotFound from './Pages/NotFound/NotFound'

function Routes() {
  return (
    <>
          <Router>
              <Route path='/' element={<Home/>}/>
              <Route path='/country/:id' element={<Details/>}/>
              <Route path="*" element={<NotFound/>}/>
      </Router>
    </>
  )
}

export default Routes
