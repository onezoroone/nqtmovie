import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passConfirmRef = useRef();
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);
    const onSubmit = (ev) => {
        ev.preventDefault();
        setIsLoading(true)
        const payload = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passConfirmRef.current.value,
        }
        setErrors(null);
        axiosClient.post('/signup', payload)
        .then(message1 => {
            setMessage(message1.data.message);
            setIsLoading(false)
        })
        .catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                if(response.data.errors){
                    setErrors(response.data.errors)
                }
            }
        })
    }
    useEffect(() => {
        document.title = 'Sign up';
    },[])
    return (
        <section className="sign-in-page">
            <video autoPlay muted loop className="myvideo" playsInline>
                <source src="https://ik.imagekit.io/vi6fma9xb/register.mp4?updatedAt=1698501171653" type="video/mp4" />
            </video>
            <div className="container">
                <div className="row justify-content-center align-items-center height-self-center">
                    <div className=" align-self-center col-md-12 col-lg-7 form-padding">
                        <div className="sign-user_card ">
                            <div className="sign-in-page-data">
                                <div className="sign-in-from w-100 m-auto">
                                    <h3 className="mb-3 text-center text-white">Sign Up</h3>
                                    <form onSubmit={onSubmit} id="formSignUp">
                                        <div className="row">
                                            <div className="form-group col-md-6 mb-3">
                                                <label className="text-white">Username</label>
                                                <input ref={nameRef} type="text" className="form-control mb-0 btn-border text-white" name="user" id="username" placeholder="Enter Username" required />
                                            </div>
                                            <div className="form-group col-md-6 mb-3">
                                                <label className="text-white">E-mail</label>
                                                <input ref={emailRef} type="email" className="form-control mb-0 btn-border text-white" name="email" id="email" placeholder="Enter Email" required />
                                            </div>
                                            <div className="form-group col-md-6 mb-3">
                                                <label  className="text-white">Password</label>
                                                <input ref={passwordRef} type="text" className="form-control mb-0 btn-border text-white" name="pass" id="pass1" placeholder="Password" required />
                                            </div>
                                            <div className="form-group col-md-6 mb-3">
                                                <label className="text-white">Confirm Password</label>
                                                <input ref={passConfirmRef} type="text" className="form-control mb-0 btn-border text-white" id="pass2" placeholder="Password Confirmation" required />
                                            </div>
                                        </div>
                                        {errors && <div> {Object.keys(errors).map(key => ( <p className="alert text-center p-2" style={{backgroundColor: 'red', color: 'white'}} key={key}>{errors[key][0]}</p>))}</div>}
                                        {message && <div> <p className="alert text-center p-2" style={{backgroundColor: 'green', color: 'white'}} >{message}</p></div>}
                                        {isLoading ? (
                                            <button type="submit" name="signup" className="btn btn-primary my-2 text-white" disabled style={{position:'relative'}}>
                                                    <span className="loader" style={{left:'45%'}}></span><span style={{color: 'transparent'}}>Đăng ký</span>
                                            </button>
                                            ) : (
                                            <button type="submit" name="signin" className="btn btn-primary my-2 text-white">Đăng ký</button>
                                            )}
                                    </form>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="d-flex justify-content-center links text-white">
                                 Already have an account?  <Link to="/login" className="register">Log In</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;
