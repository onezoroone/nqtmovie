import { createContext, useContext, useState } from "react";
const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
})

// eslint-disable-next-line react/prop-types
export const ContextProvider =({children}) => {
    const [user, _setUser] = useState(localStorage.getItem('user'));
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [idUser, _setIdUser] = useState(localStorage.getItem('id'));
    const [image, _setImage] = useState(localStorage.getItem('image'));
    const [data, _setData] = useState(null);
    const [dataComic, _setDataComic] = useState();
    const [notification, _setNotification] = useState([]);
    const setToken = (token) =>{
        _setToken(token)
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    const setUser = (user) =>{
        _setUser(user)
        if(user) {
            localStorage.setItem('user', user);
        }else{
            localStorage.removeItem('user');
        }
    }
    const setIdUser = (idUser) =>{
        _setIdUser(idUser)
        if(idUser) {
            localStorage.setItem('id', idUser);
        }else{
            localStorage.removeItem('id');
        }
    }
    const setImage = (image) =>{
        _setImage(image)
        if(image) {
            localStorage.setItem('image', image);
        }else{
            localStorage.removeItem('image');
        }
    }
    const setData = (data) =>{
        _setData(data)
        if(data) {
            localStorage.setItem('data', data);
        }else{
            localStorage.removeItem('data');
        }
    }
    const setDataComic = (dataComic) =>{
        _setDataComic(dataComic)
        if(dataComic) {
            localStorage.setItem('dataComic', dataComic);
        }else{
            localStorage.removeItem('dataComic');
        }
    }
    const setNotification = (message, toastClass, iconToast) => {
        const newToast = {
            message,
            toastClass,
            iconToast
          };
        _setNotification(prevToasts => [...prevToasts, newToast]);
        setTimeout(() => {
            _setNotification(prevToasts => prevToasts.filter(toast => toast !== newToast));
        }, 5000)
    }
    return(
        <StateContext.Provider value={{
            idUser,
            user,
            token,
            data,
            dataComic,
            notification,
            image,
            setUser,
            setToken,
            setIdUser,
            setData,
            setDataComic,
            setNotification,
            setImage,
        }}>
            {children}
        </StateContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext)
