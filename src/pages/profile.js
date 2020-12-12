import React from 'react';
// import { userService } from '../services';
import { getCookie } from '../utils/cookie';

const Profile = () => {
  //   const [name, setName] = useState('');
  //   const [email, setEmail] = useState('');
  // const [userDataLoading, setUserDataLoading] = useState(false);

  const username = JSON.parse(getCookie('userData'));

  //   useEffect(() => {
  //     setUserDataLoading(true);
  //     userService
  //       .getUserById(userId)
  //       .then((res) => {
  //         setName(res.data.name);
  //         setEmail(res.data.email);
  //       })
  //       .catch((err) => {
  //         return console.log(err);
  //       })
  //       .finally(() => {
  //         setUserDataLoading(false);
  //       });
  //   }, [userId]);

  return (
    <div>
      <h1> My Profile!</h1>
      <div>
        <p>{`Name Profile: ${username}`}</p>
        {/* <p>{`email : ${email}`}</p> */}
      </div>
      {/* {userDataLoading ? (
        <span>Loading...</span>
      ) : (

      )} */}
    </div>
  );
};

export default Profile;
