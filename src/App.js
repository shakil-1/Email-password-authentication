import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase.init';


const auth = getAuth(app)
function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [registerd, setRegisterd] = useState(false);



  const handelSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {

      event.stopPropagation();


    }
    setValidated(true);
    event.preventDefault();
    if (registerd) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.log(error)
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
          verifyEmail();
        })
        .catch(error => {
          console.error(error);
        })

    }
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email verification sent');
      })
  }
  const handelOnChage = event => {
    setRegisterd(event.target.checked);
  }
  const handelEmail = event => {
    setEmail(event.target.value);
  }

  const handelPassword = event => {
    setPassword(event.target.value)

  }
  const handelPasswordReset = () =>{
sendPasswordResetEmail(auth, email)
.then(() =>{
  console.log('Passwrod reset');
})
.catch(error =>{
  console.log(error);
})
  }
  return (
    <div className='w-50 mx-auto border p-2 mt-3'>
      <h2>Please {registerd ? 'Login' : 'Register'}</h2>
      <Form noValidate validated={validated} onSubmit={handelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handelEmail} type="email" placeholder="Enter email" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handelPassword} type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onChange={handelOnChage} type="checkbox" label="Alrady Register" />
        </Form.Group>
        <Button onClick={handelPasswordReset} variant="link" className='text-decoration-none' >Forget password</Button><br /><br></br>
        <Button variant="primary" type="submit">
          {registerd ? 'Login' : 'Register'}
        </Button>
      </Form>
    </div>
  );
}

export default App;
