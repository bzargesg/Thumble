import React from "react";
import ReactDOM from "react-dom";
import Login from './components/Login';
import RestrictedElement from './components/RestrictedElement';
import { BrowserRouter as Router } from 'react-router-dom';
import { Can, PermissionsProvider, Switch as PermissionsSwitch } from './components/PermissionsProvider';

const App  = () => {
    return (
    <React.StrictMode>
        <Router>
            <PermissionsProvider>
                <div className="app">
                    <Login />
                    <PermissionsSwitch>
                    <Can permissions={"user.write"}>
                        <RestrictedElement message="Spoopy" />
                    </Can>
                    <Can>
                        <RestrictedElement message="scurred" />
                    </Can>
                    </PermissionsSwitch>
                </div>
            </PermissionsProvider>
        </Router>
    </React.StrictMode>);
}

ReactDOM.render(<App />, document.getElementById("app"));
