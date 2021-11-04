import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const { firebase } = useContext(FirebaseContext);
  
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if(authUser) {
        // if user -> store user in local storage
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // if !user -> clear local storage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    // cleanup
    return () => listener();
  }, [firebase])

  return { user };
}
