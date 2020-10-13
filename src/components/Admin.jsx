import React, {useEffect, useState} from 'react'
import {auth} from '../firebase';
import {withRouter} from 'react-router-dom';

const Admin = (props) => {

    const [user, setUser] = useState()

    useEffect(() => {
        if(auth.currentUser){
            console.log('existe un usuario')
            setUser(auth.currentUser)
        } else {
            console.log('no existe el usuario')
            props.history.push('/login')
        }
    }, [props.history])

    return (
        <div>
            <h1>Ruta protejida</h1>
            {
                user && (
                    <h3>{user.email}</h3>
                )
            }
        </div>
    )
}

export default withRouter(Admin);
