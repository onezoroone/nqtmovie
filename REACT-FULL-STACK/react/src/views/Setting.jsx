import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

function Setting() {
    const {token, idUser, setUser, setToken, setIdUser} = useStateContext();
    const [data, setData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const nameRef = useRef();
    const emailRef = useRef();
    const passCurrentRef = useRef();
    const passwordRef = useRef();
    const passConfirmRef = useRef();
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);
    useEffect(() => {
        axiosClient.post(`/getInfor/${idUser}`)
        .then(response => (
            setData(response.data)
        ));
        document.title = 'Setting';
    }, [idUser])
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(file);
            setPreviewImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
    const handleClick = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
        .then(() => {
            setUser(null)
            setToken(null)
            setIdUser(null)
        })
    }
    const handleShowBox= () => {
        const box = document.getElementById('box-password');
        box.style.display = 'block'
    }
    if(!token){
        return <Navigate to="/" />
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('username', nameRef.current.value);
        formData.append('email', emailRef.current.value);
        formData.append('current_password', passCurrentRef.current.value);
        formData.append('password', passwordRef.current.value);
        formData.append('password_confirmation', passConfirmRef.current.value);
        setErrors(null);
        setMessage(null)
        axiosClient.post(`/updateInfor/${idUser}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })

        .then(message1 => {
            setMessage(message1.data.message);
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
    return (
        <div className="container mt-5">
            <form onSubmit={onSubmit}>
            {data && data.map((user) => (
            <div className="row" key={user.id}>
                    <div className="col-xs-12 col-lg-4 setting-user">
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="image-upload-container">
                                <input type="file" accept="image/*" id="image-upload-input" onChange={handleImageChange} />
                                <label htmlFor="image-upload-input" style={{backgroundImage: `url(${previewImage ? previewImage : `${window.location.origin}/api/images/uploads/${user.img}`})`}}>
                                    <span>Chọn ảnh</span>
                                </label>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            <button onClick={handleClick} className="btnLogout text-uppercase">Đăng xuất</button>
                        </div>
                    </div>
                    <div className="col-xs-12 col-lg-7 information-user">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label text-white">Username </label>
                            <input type="text" ref={nameRef} defaultValue={user.username} className="form-control" id="username" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-white">Email</label>
                            <input type="text" ref={emailRef} defaultValue={user.email} className="form-control" id="email" required/>
                        </div>
                        <div className="mb-3">
                            <button type="button" onClick={handleShowBox} className="btn btn-secondary">Đổi mật khẩu</button>
                        </div>
                        <div id="box-password" style={{display: 'none'}}>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-white">Current Password</label>
                                <input type="text" ref={passCurrentRef} className="form-control" id="password"/>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label className="form-label text-white">New Password</label>
                                    <input type="text" ref={passwordRef} className="form-control" id="password"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label text-white">Confirm Password</label>
                                        <input type="text" ref={passConfirmRef} className="form-control" placeholder="Password Confirmation"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {errors && <div> {Object.keys(errors).map(key => ( <p className="alert text-center p-2" style={{backgroundColor: 'red', color: 'white'}} key={key}>{errors[key][0]}</p>))}</div>}
                        {message && <div> <p className="alert text-center p-2" style={{backgroundColor: 'green', color: 'white'}} >{message}</p></div>}
                        <div className="mt-3">
                            <button type="submit" className="btn btn-primary">Lưu</button>
                        </div>
                    </div>
            </div>
            ))}
            </form>
        </div>
    );
}

export default Setting;
