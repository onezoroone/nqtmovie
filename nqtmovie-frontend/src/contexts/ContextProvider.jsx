/* eslint-disable react/prop-types */
import { createContext, useContext, useRef, useState } from "react";
const StateContext = createContext({
    role: null,
    use: null,
    toast: null,
    setUser: () => {},
    setRole: () => {},
})

export const ContextProvider =({children}) => {
    const toast = useRef(null);
    const [role, _setRole] = useState(localStorage.getItem('user'));
    const [user, _setUser] = useState(sessionStorage.getItem('user'));
    const [countRequests, setCountRequests] = useState(0);
    const [countReports, setCountReports] = useState(0);
    const setRole = (role) =>{
        _setRole(role)
        if(role) {
            localStorage.setItem('user', role);
        }else{
            localStorage.removeItem('user');
        }
    }

    const setUser = (user) =>{
        _setUser(user)
        if(user) {
            sessionStorage.setItem('user', user);
        }else{
            sessionStorage.removeItem('user');
        }
    }
    return(
        <StateContext.Provider value={{
            role,
            toast,
            user,
            countReports,
            countRequests,
            setUser,
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
