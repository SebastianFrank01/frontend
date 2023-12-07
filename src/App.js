import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import About from './components/About';
import NavBar from './components/NavBar';
import Login from './components/Login';
import { logout } from './services/apiService';
import ProtectedRoute from './components/ProtectedRoute';
import RouteLookUp from './components/RouteLookUp';
import RatingList from './components/RatingList';
import RouteInfo from './components/RouteInfo';
import RatingSubmit from './components/RatingSubmit'
import ViewStats from './components/ViewStats'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            loading: true
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/isauth/')
            .then(response => {
                if (response.ok) {
                    this.setState({ loading : false, isAuthenticated : true});
                    console.log("is auth no way", this.state.loading);
                }
                })
    }

    handleLoginSuccess = () => {
        this.setState({ isAuthenticated: true });
    };

    handleLogout = () => {
        // Call API service to logout
        logout().then(() => {
            this.setState({ isAuthenticated: false });
        });
    };

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }
        return (
            <div className="bg">
                <div className="row justify-content-center">

                    <div className="col-lg-6 col-sm-6 bg-dark text-light">

            <Router>
                <NavBar isAuthenticated={this.state.isAuthenticated} onLogout={this.handleLogout} />
                <Routes>
                    <Route path="/login" element={<Login onLoginSuccess={this.handleLoginSuccess} />} />
                    <Route path="/" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>


                                    <RatingSubmit/>


                        </ProtectedRoute>
                    }/>
                    <Route path="/Lookup" element={<RouteInfo/>}/>
                    <Route path="/ViewStats" element={<ViewStats/>}/>
                </Routes>
            </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
