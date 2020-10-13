import React, {useEffect, useState} from 'react'
import {auth} from '../firebase';
import {withRouter} from 'react-router-dom';
import Firestore from './Firestore';

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
            {
                user && (
                    /* enviamos como props para poder acceder al uid */
                    <Firestore user={user}/>
                )
            }
        </div>
    )
}

export default withRouter(Admin);
