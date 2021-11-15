import useUser from '../hooks/use-user';


export default function Sidebar() {
  // regular destructuring
  // const { user } = useUser();

  // further destructuring specifics out of user
  const { 
    user: { fullName, username, userId }
  } = useUser();
  // console.log('fullName:', fullName, 'username:', username, 'userId:', userId);

  return (
    <p>Sidebar</p>
  );
}
