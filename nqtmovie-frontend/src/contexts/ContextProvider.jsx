/* eslint-disable react/prop-types */
import { createContext, useContext, useRef, useState } from "react";
const StateContext = createContext({
    toast: null,
    user: null,
    countRequests: 0,
    countReports: 0,
    setUser: () => {},
    setCountRequests: () => {},
    setCountReports: () => {}
})

export const ContextProvider =({children}) => {
    const toast = useRef(null);
    const [user, _setUser] = useState(localStorage.getItem('user'));
    const [countRequests, setCountRequests] = useState(0);
    const [countReports, setCountReports] = useState(0);
    const setUser = (user) =>{
        _setUser(user)
        if(user) {
            localStorage.setItem('user', user);
        }else{
            localStorage.removeItem('user');
        }
    }
    return(
        <StateContext.Provider value={{
            toast,
            user,
            countReports,
            countRequests,
            setUser,
            setCountRequests,
            setCountReports
        }}>
            {children}
        </StateContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext)
