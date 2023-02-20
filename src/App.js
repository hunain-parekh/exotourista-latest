// import logo from './logo.svg';
import './App.css';
import SearchResult from './components/SearchResult';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ProductDetails from './components/ProductDetails';
import BookingDetails from './components/BookingDetails';
import BookingConfirmation from './components/BookingConfirmation';

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<SearchResult />} path="/" />
            <Route element={<ProductDetails />} path="/hotel/details/:productID" />
            <Route element={<BookingDetails />} path="/hotel/bookingDetails/:productID" />
            <Route element={<BookingConfirmation />} path="/hotel/bookingConfirm" />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
