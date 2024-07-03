import { CityProvider } from './contexts/CityProvider';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing'
import Product from './pages/Product';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout'
import PageNotFound from './pages/PageNotFound';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';


function App() {

  return(
    <CityProvider>
      
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/product' element={<Product/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='applayout' element={<AppLayout />}>
          <Route index element={<Navigate to={'cities'} replace >
            <CityList />
          </Navigate>}/>
          <Route path='cities' element={<CityList />}/>
          <Route path='countries' element={<CountryList/>}/>
          <Route path='city/:id' element={<City/>} />
          <Route path='form' element={<Form />} />
        </Route>
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
      </BrowserRouter>

    </CityProvider>
  )
}

export default App
