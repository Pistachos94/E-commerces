import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import ProductPurch from './pages/ProductPurch'
import MyNavBar from './components/MyNavBar'
import LoadingScreen from './components/LoadingScreen'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from './store/slices/products.slice'
import ProtectedRoutes from './components/ProtectedRoutes'
import { Container } from 'react-bootstrap'

function App() {
  const isLoading = useSelector(state => state.loading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  return (
    <HashRouter>
      <MyNavBar />
      {isLoading && <LoadingScreen />}
      <Container className='mt-5' >
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<ProductPurch />} />
          </Route>
        </Routes>
      </Container>
    </HashRouter>

  )
}

export default App
