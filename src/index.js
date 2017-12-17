import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import reduxThunk from 'redux-thunk';
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import App from './components/App';
import Home from "../src/components/home/home";
import About from "../src/components/about/about";
import Contact from "../src/components/contact/contact";
import Header from "../src/components/header/header";
import Footer from "../src/components/footer/footer";
import Signin from "../src/components/auth/signin";
import Signout from "../src/components/auth/signout";
import Signup from "../src/components/auth/signup";
import ChangePassword from "../src/components/auth/changePassword";

import requireAuthentication from './components/auth/require_authentication';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const userData = localStorage.getItem('userData');
const authInfo = localStorage.getItem('authInfo');

if(authInfo && userData){
  // we need to update our state her
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="container">
                <Header></Header>
                <Switch>
                    <Route exact path='/' component={App} />>
                    <Route path='/home' component={requireAuthentication(Home)} />
                    <Route path='/changePassword' component={requireAuthentication(ChangePassword)} />
                    <Route path='/about' component={About} />
                    <Route path='/contact' component={Contact} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signout" component={Signout} />
                    <Route path="/signup" component={Signup} />
                </Switch>
                <Footer></Footer>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
