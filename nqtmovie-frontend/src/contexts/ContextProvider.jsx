/* eslint-disable react/prop-types */
import { createContext, useContext, useRef, useState } from "react";
const StateContext = createContext({
    role: null,
    avatar: null,
    toast: null,
    setAvatar: () => {},
    setRole: () => {},
})

export const ContextProvider =({children}) => {
    const toast = useRef(null);
    const [role, _setRole] = useState(localStorage.getItem('role'));
    const [avatar, _setAvatar] = useState(localStorage.getItem('avatar'));
    const [countRequests, setCountRequests] = useState(0);
    const [countReports, setCountReports] = useState(0);
    const setRole = (role) =>{
        _setRole(role)
        if(role) {
            localStorage.setItem('role', role);
        }else{
            localStorage.removeItem('role');
        }
    }

    const setAvatar = (avatar) =>{
        _setAvatar(avatar)
        if(avatar) {
            localStorage.setItem('avatar', avatar);
        }else{
            localStorage.removeItem('avatar');
        }
    }
    return(
        <StateContext.Provider value={{
            role,
            toast,
            avatar,
            countReports,
            countRequests,
            setAvatar,
            setRole,
            setCountRequests,
            setCountReports
        }}>
            {children}
        </StateContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext)
