import { createContext, useReducer ,useEffect} from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  // logic to be implemented

     
  switch(action.type)
  {
      case 'LOGIN':
          return {user:action.payload}
      
      case 'LOGOUT':
           return {user:null}
      
     default : 
            return state

  }

};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatchs] = useReducer(authReducer, {
    user: null,
  });

  useEffect(()=>{

    const data=localStorage.getItem('user');
    if(data)
    {
      const parsed=JSON.parse(data);
     // console.log(parsed);
      dispatchs({type:'LOGIN',payload:parsed})
    }
    
   
 },[])  

  return (
    <AuthContext.Provider value={{ ...state, dispatchs }}>
      {children}
    </AuthContext.Provider>
  );
};
