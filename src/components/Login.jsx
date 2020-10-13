import React, {useState, useCallback} from 'react'
import {auth, db} from '../firebase';
import {withRouter} from 'react-router-dom';

//withRouter nos permite empujar al usuario a diferentes rutas 

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)

    // va a estar en true porque por defecto va a ser el formulario de REGISTRO
    const [esRegistro, setEsRegistro] = useState(true)

    const procesarDatos = (e) => {
        e.preventDefault()
        if(!email.trim()) {
            //console.log("Ingrese Email")
            setError('Ingrese Email')
            return
        }
        if(!pass.trim()) {
            //console.log("Ingrese Password")
            setError('Ingrese Password')
            return
        }
        if(pass.length < 6) {
            //console.log("Ingrese password mayor a 6 caracteres")
            setError('Ingrese password de 6 o más caracteres')
            return
        }
        //console.log("Pasando todas las validaciones")
        setError(null)

        if(esRegistro){
            registrarUsuario()
        } else {
            login()
        }
    }

    const login = useCallback(async() => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            //console.log(res.user)
            setEmail('')
            setPass('')
            setError(null)
            //aca enviamaos al usuario a la ruta de admin
            props.history.push('/admin')

        } catch (error) {
            //sconsole.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }
            if(error.code === 'auth/user-not-found'){
                setError('Email no registrado')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta')
            }
        }
    }, [email, pass, props.history])

    const registrarUsuario = useCallback(async() => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })
            setEmail('')
            setPass('')
            setError(null)
            //aca enviamaos al usuario a la ruta de admin
            props.history.push('/admin')
            //console.log(res.user)
        } catch (error){
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }
            if(error.code === 'auth/email-already-in-use'){
                setError('Email ya utilizado')
            }
        }
    },[email, pass, props.history])


    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de Usuarios' : 'Login de acceso'
                }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            // si existe algo en error va a mostrar lo del ()
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <input 
                            type="email" 
                            className="form-control  mb-2"
                            placeholder="Ingrese un email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-3"
                            placeholder="Ingrese un password"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        <button className="btn btn-dark btn-lg btn-block"
                            type="submit">
                            {
                                esRegistro ? 'Registrarse' : 'Acceder'
                            }
                        </button>
                        <button className="btn btn-info btn-sm btn-block"
                            type="button"
                            onClick={ () => setEsRegistro(!esRegistro)}>
                            {
                                esRegistro ? 'Ya estas registrado?' : 'No tienes una cuenta?'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login);
