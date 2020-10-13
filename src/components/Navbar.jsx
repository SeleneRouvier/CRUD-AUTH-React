import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {auth} from '../firebase';
import {withRouter} from 'react-router-dom';

const Navbar = (props) => {

    // con esta funcion cada vez que el usuario cierra sesion lo enviamos a la ruta login
    const cerrarSesion = () => {
        //signOut nos permite cerrar la sesion activa
        auth.signOut()
            .then(() => {
                props.history.push('/login')
            })
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
                AUTH
            </Link>
            <div className="d-flex">
                <NavLink className="btn btn-dark mr-2" to="/" exact>
                    Inicio
                </NavLink>
                {
                    props.firebaseUser !== null ? (
                        <NavLink className="btn btn-dark mr-2" to="/admin">
                            Admin
                        </NavLink>
                    ) : null
                }
                
                {
                    props.firebaseUser !== null ? (
                        <button 
                            className="btn btn-dark"
                            onClick={() => cerrarSesion()}
                            >Cerrar Sesión</button>
                    ) :(
                       <NavLink className="btn btn-dark mr-2" to="/login">
                            Login
                        </NavLink> 
                    )
                }
                
            </div>
            
        </div>
    )
}

export default withRouter(Navbar);
