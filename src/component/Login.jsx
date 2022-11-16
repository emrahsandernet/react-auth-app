import React ,{ useState }from 'react'
import './Login.css'
import Button from './UI/Button'
import axios from 'axios'
import { Circles   } from  'react-loader-spinner'
export const Login = () => {
    const [email,setEmail] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [isValid,setIsValid] = useState(false);
    const [emailIsValid,setEmailIsValid] = useState(false);
    const [password,setPassword] = useState('');
    const [accessToken,setaccessToken] = useState('');
    const BASE_URL= 'https://rest.mavifinds.com/'
    const LOGIN_URL = 'api/auth/login'

    const formSubmitHandler = (event) => {
        event.preventDefault();


    };
    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
      

    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
       

    }
    const onSubmit = () => {
        console.log(email);
        console.log(password);
        if (email.length > 0) {
            setIsValid(true)
            axios({
                method:'post',
                url:BASE_URL+LOGIN_URL,
                data:{
                    'email':email,
                    'password':password

                }
            })
            .then(response=>{
                setaccessToken(response.data.authorisation.access_token)
                console.log(response.data.status)
                if (response.data.status === 'success') {
                    setIsValid(false)
                    
                }
                
            }).catch(
                function (error) {
                  console.log('Show error notification!')
                  console.log(error.message)
                  setIsValid(false)
                  setEmailIsValid(true)
                  setErrorMessage(error.message)

                 
                }
              )
        }
        else{
            setIsValid(false)
            setEmailIsValid(true)
            setErrorMessage('Email required !')
            

        }
        
        
    }

    return (
        <form onSubmit={formSubmitHandler}>
        <div className='form-control '>
            <label>Email</label>
            {emailIsValid ? <p>{errorMessage}</p> : ""}
            <input type="text" onChange={emailChangeHandler}/>
            <label>Password</label>
            <input  type="password" onChange={passwordChangeHandler}/>
        </div>
        {!isValid ? <Button type="submit" onClick= {onSubmit}>Login</Button> : 
        <Button type="submit" >
            <Circles
            height="21"
            width="39"
            color="white"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
        </Button> }
        
        </form>
    )
}
