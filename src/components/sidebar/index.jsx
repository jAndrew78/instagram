import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';


export default function Sidebar() {
  // regular destructuring
  // const { user } = useUser();

  // further destructuring specifics out of user
  const { 
    user: { fullName, username, userId }
  } = useUser();
  // console.log('fullName:', fullName, 'username:', username, 'userId:', userId);

  return (
    <>
      {/* <p>Sidebar</p> */}
      <div className='p-4'>
        <User username={username} fullName={fullName} />
        <Suggestions userId={userId} />
      </div>
    </>
  );
}
