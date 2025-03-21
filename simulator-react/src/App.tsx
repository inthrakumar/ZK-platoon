import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';

type Props = {}

const App = (props: Props) => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
        ) 
    );

    return <RouterProvider router={router} />;
}

export default App;

