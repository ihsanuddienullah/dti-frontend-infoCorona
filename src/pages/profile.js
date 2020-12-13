import React, { useEffect, useState } from 'react';
// import { userService } from '../services';
import { CommonLoading } from 'react-loadingg';
import { productService } from '../services';
import { getCookie } from '../utils/cookie';
import { ProductComp } from '../components';

const Profile = () => {
  //   const [name, setName] = useState('');
  //   const [email, setEmail] = useState('');
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [products, setProduct] = useState([]);

  const username = JSON.parse(getCookie('userData'));

  useEffect(() => {
    setUserDataLoading(true);
    productService
      .getProduct(50, 0, '')
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUserDataLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   setUserDataLoading(true);
  //   userService
  //     .getUserById(userId)
  //     .then((res) => {
  //       setName(res.data.name);
  //       setEmail(res.data.email);
  //     })
  //     .catch((err) => {
  //       return console.log(err);
  //     })
  //     .finally(() => {
  //       setUserDataLoading(false);
  //     });
  // }, [userId]);

  return (
    <div>
      {/* <h1> My Profile!</h1>
      <div>
        <p>{`Name Profile: ${username}`}</p>
        <p>{`email : ${email}`}</p>
      </div>
        {userDataLoading ? (
        <span>Loading...</span>
      ) : (

      )}  */}
      <h1>Product</h1>
      <p>
        User :
        {username}
      </p>
      {userDataLoading ? (
        <CommonLoading />
      ) : (
        <div>
          {products.map((e) => {
            return <ProductComp data={e} key={e.id} />;
          })}
          {/* <p>{`name : ${name}`}</p>
          <p>{`email : ${email}`}</p> */}
        </div>
      )}
    </div>
  );
};

export default Profile;
