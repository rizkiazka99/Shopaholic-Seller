import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import { AuthComponents, MainComponents, Navbar } from './components';
import { getSellerById } from "./axios/sellerAxios.js";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [seller, setSeller] = useState({});
  const [loading, setLoading] = useState(false);

  const loginCbHandler = (result) => {
    setLoginStatus(result);
  }

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setLoginStatus(true);
      setLoading(true);
      getSellerById(localStorage.getItem('id'), (result) => {
        setSeller(result);
        setLoading(false);
      });
    } else {
      setLoginStatus(false);
    }
  }, [ loginStatus ]);

  return (
    <>
      { !loginStatus ? <AuthComponents loginCbHandler={loginCbHandler}></AuthComponents>
            : <div className='container-main'>
                <Navbar
                  loginCbHandler={loginCbHandler}
                  seller={seller}
                  loading={loading}
                />
                <MainComponents></MainComponents>
            </div> }
    </>
  );
}

export default App;
