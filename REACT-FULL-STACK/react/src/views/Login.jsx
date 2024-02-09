import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {setUser, setToken, setIdUser, setImage} = useStateContext();
    const onSubmit = (ev) => {
        ev.preventDefault();
        setIsLoading(true)
        const payload = {
            login: emailRef.current.value,
            password: passwordRef.current.value,
        }
        setErrors({})
        axiosClient.post('/login', payload)
        .then(({data}) => {
            const userInfor = data.user;
            const userJSON = JSON.stringify(userInfor);
            setUser(userJSON)
            setToken(data.token)
            setIdUser(data.user.id)
            setImage(data.user.img)
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false)
            const response = err.response;
            if(response && response.status === 422){
                if(response.data.errors) {
                    setErrors(response.data.errors)
                }else{
                setErrors({
                    email: [response.data.message]
                })
            }
            }
        })
    }
    useEffect(() => {
        document.title = 'Login';
        import ('../assets/css/login.css');
    }, [])
    return (
        <section className="sign-in-page">
            <video autoPlay muted loop className="myvideo" playsInline>
                <source src="https://ik.imagekit.io/vi6fma9xb/login.mp4?updatedAt=1698146388361" type="video/mp4" />
            </video>
            <div className="container" type="position: relative; z-index: 1;">
                <div className="row justify-content-center align-items-center height-self-center">
                    <div className="col-lg-5 col-md-12 align-self-center form-padding">
                        <div className="sign-user_card ">
                            <div className="sign-in-page-data">
                                <div className="sign-in-from w-100 m-auto">
                                    <h3 className="mb-3 text-center text-white">Đăng nhập</h3>
                                    <form className="mt-4" onSubmit={onSubmit}>
                                        <div className="form-group mb-3">
                                            <input type="text" ref={emailRef} name="account" className="form-control mb-0 text-white" id="exampleInputEmail2" placeholder="Enter username" required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input type="password" ref={passwordRef} className="form-control mb-0 text-white" name="pass" id="exampleInputPassword2" placeholder="Password" required />
                                        </div>
                                        {errors && <div> {Object.keys(errors).map(key => ( <p className="alert text-center p-2" style={{backgroundColor: 'red', color: 'white'}} key={key}>{errors[key][0]}</p>))}</div>}
                                        <div className="sign-info">

                                            {isLoading ? (
                                            <button type="submit" name="signin" className="btn btn-primary" disabled style={{position:'relative'}}>
                                                    <span className="loader" style={{left:'45%'}}></span><span style={{color: 'transparent'}}>Đăng nhập</span>
                                            </button>
                                            ) : (
                                            <button type="submit" name="signin" className="btn btn-primary">Đăng nhập</button>
                                            )}
                                            <div className="custom-control custom-checkbox d-inline-block">
                                                <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                <label className="custom-control-label">Lưu tài khoản</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="d-flex justify-content-center links">
                                    Bạn chưa có tài khoản? <Link to="/signup" className="text-primary register">Đăng ký</Link>
                                </div>
                                <div className="d-flex justify-content-center links">
                                    <Link to="/recovery" className="f-link">Quên mật khẩu?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
