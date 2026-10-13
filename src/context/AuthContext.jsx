import React, {createContext, useContext, useState, useEffect} from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();
export  function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
const [currentUser, setCurrentuser] = useState(null);
const [loading, setLoading] = useState(true)
useEffect(() =>{
  const unsubscribe = onAuthStateChanged(auth, (user) =>{
    setCurrentuser(user);
    setLoading(false);
  })
  return unsubscribe;
}, []);

const value = {
currentUser,
loading
}

return(
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
)
}
