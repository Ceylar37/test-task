import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import BlockPage from "./pages/BlockPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import Header from "./components/Header";

function App() {

    const navigate = useNavigate()
    useEffect(() => {
        navigate(`/block/latest`)
    }, [])

    return (
        <div className='appWrapper'>
            <Header/>
            <Routes>
                <Route path={'block'} element={<Navigate to={'/block/latest'}/>}/>
                <Route path={'block'} element={<BlockPage/>}>
                    <Route path={':id'} element={<BlockPage/>}/>
                </Route>
                <Route path={'*'} element={<Navigate to={'/block/latest'}/>}/>
            </Routes>
        </div>
    );
}

export default App;
