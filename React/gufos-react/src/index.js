import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//pages
import App from './pages/Home/App.js';
import Categorias from './pages/Categorias/categorias';
import NaoEncontrado from "./pages/NaoEncontrado/NaoEncontrado";
import Login from './pages/Login/Login';
import Eventos from './pages/Eventos/Eventos';

//routes
import { Route, Link, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";

import * as serviceWorker from './serviceWorker';

const RotaPrivada = ({component: Component}) =>(
    <Route 
        render={ props =>
            localStorage.getItem("usuario-gufos") !== null  ?
            (
                // tres pontinhos = trazer tudo oq tem dentro das props para dentro do component
                <Component {...props}/>
            ) : (
                <Redirect
                    to={{pathname: "/login", state: {from: props.location}}}
                />
            )
        }
    />
)

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App}/>
                <RotaPrivada path='/categorias' component={Categorias}/>
                <RotaPrivada path='/eventos' component={Eventos}/>
                <Route path='/login' component={Login}/>
                <Route component={NaoEncontrado}/>
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
