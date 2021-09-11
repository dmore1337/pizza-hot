import React from 'react';
import { Route } from 'react-router-dom';

import {Header, Footer} from "./components";
import {Home, Cart} from "./pages";

function App( ) {

    return (
        <div className="page">

            <Header/>

            <div className="page__content">
                <Route path="/" component={Home} exact/>
                <Route path="/cart" component={Cart} exact/>
            </div>

            <Footer/>
        </div>
    );
}

export default App;
