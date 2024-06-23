
import './App.css';
import Home from './components/home'
import { Route, Routes } from 'react-router-dom';
import AuthRootComponent from './components/auth';
import PrivateRoute from './utils/router/privateRouter';
//interface Forecast {
//    date: string;
//    temperatureC: number;
//    temperatureF: number;
//    summary: string;
//}

function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path='/' element={<Home />} />
                </Route>
                <Route path='login' element={<AuthRootComponent />} />
                <Route path='register' element={<AuthRootComponent />} />
            </Routes>
            {/*<Routes>*/}
            {/*    <Route path='/' element={<Home />} />*/}
            {/*    <Route path='login' element={<AuthRootComponent />} />*/}
            {/*    <Route path='register' element={<AuthRootComponent />} />*/}
            {/*</Routes>*/}
        </div>
    );
}

//    async function populateWeatherData() {
//        const response = await fetch('weatherforecast');
//        const data = await response.json();
//        setForecasts(data);
//    }
//}

export default App;