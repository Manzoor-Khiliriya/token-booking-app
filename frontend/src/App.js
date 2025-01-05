import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import PlaceForm from './components/placeForm/PlaceForm';
import DoctorDetails from './components/doctorDetails/DoctorDetails';
import Profile from './pages/Profile';
import BookToken from './components/bookToken/BookToken';
import UserRegister from './components/userRegister/UserRegister';
import UserLogin from './components/userLogin/UserLogin';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<UserLogin />} />
        <Route path='/userRegister' element={<UserRegister />} />
        <Route path='/place' element={<PlaceForm />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/doctor/:doctorId' element={<DoctorDetails />} />
        <Route path='/book-token/:doctorId' element={<BookToken />} />
      </Routes>
    </div>
  );
}

export default App;
