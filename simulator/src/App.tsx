import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
 import Test from './pages/Test';

type Props = {}

const App = (props: Props) => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/test' element={<Test/>}/>
            </Route>
        ) 
    );

    return <RouterProvider router={router} />;
}

export default App;

