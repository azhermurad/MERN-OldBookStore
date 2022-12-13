import MainLayout from './components/layout/MainLayout';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CardPage from './pages/CardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserProfilePage from './pages/UserProfilePage';
import ShippigPage from './pages/ShippingPage';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path='/products/:id'
                        element={<ProductDetailsPage />}
                    />
                    <Route path='/card'>
                        <Route index element={<CardPage />} />
                        <Route path=':id' element={<CardPage />} />
                    </Route>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<SignupPage />} />
                    <Route path='/profile' element={<UserProfilePage />} />
                    <Route path='/shipping' element={<ShippigPage/>}/>
                    <Route path='*' element={'Error Page'} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
// "//"
