import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';


export default function SignUp() {

  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = username === '' || password === '' || emailAddress === '';

  const handleSignUp = async (e) => {
    e.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if(!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        await createdUserResult.user.updateProfile({
          displayName: username
        });

        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          // displayName: username,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          // followers: [],
          dateCreated: Date.now()
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setError('Username already exists');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);


  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">

      {/* LEFT SIDE - IPHONE IMAGE */}
      <div className="flex w-3/5">
        <img src="/assets/images/iphone-with-profile.png" alt="Iphone with Instagram App" />
      </div>

      {/* RIGHT SIDE - Sign Up FORM, ETC */}
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary rounded mb-4">

          {/* INSTAGRAM LOGO */}
          <h1 className="flex justify-center w-full">
            <img src="/assets/logo.png" alt="Instagram Logo" className="mt-2 w-6/12 mb-4" />
          </h1>

          {/* ERROR MSG */}
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          {/* Sign Up FORM */}
          <form onSubmit={handleSignUp} method="POST">

            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />

            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />

            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email Address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />

            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            
            <button
              disabled={isInvalid}
              type="submit"
              className={`
                bg-blue-medium text-white w-full rounded h-8 font-bold
                ${isInvalid && "opacity-50"}
              `}
            >
              Sign Up
            </button>

          </form>
        </div>

        {/* SIGN UP LINK */}
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Already have an account? {' '}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Sign In
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
};
