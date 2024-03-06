import React, { useEffect, useState } from "react";
import styled from "styled-components";
 
// import background from "../assets/background.jpg";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



function Login() {
  const [email, setEmail] = useState(""); // State variable for email input field
  const [password, setPassword] = useState(""); // State variable for password input field
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State variable for controlling Snackbar visibility
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // State variable for Snackbar severity
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State variable for Snackbar message
  const navigate = useNavigate(); // Getting navigation function from React Router

  // Function to handle login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password); // Signing in user with provided credentials
      setSnackbarSeverity("success"); // Setting Snackbar severity to success
      setSnackbarMessage("Login successful!"); // Setting Snackbar message
      setSnackbarOpen(true); // Opening the Snackbar
    } catch (error) {
      console.log(error.code); // Logging error code to console
      setSnackbarSeverity("error"); // Setting Snackbar severity to error
      setSnackbarMessage("Wrong email or password."); // Setting Snackbar message
      setSnackbarOpen(true); // Opening the Snackbar
    }
  };

  // Effect hook to check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/"); // If user is authenticated, navigate to home page
    });

    return () => unsubscribe(); // Cleanup function
  }, [navigate]);

  // Function to handle Snackbar close
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); // Closing the Snackbar
  };

  // Rendering the component
  return (
    <Container>
      <BackgroundImage /> {/* Rendering the BackgroundImage component */}
      <div className="content">
        <Header /> {/* Rendering the Header component */}
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3> {/* Title for login form */}
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              /> {/* Email input field */}
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              /> {/* Password input field */}
              <button onClick={handleLogin}>Login to your account</button> {/* Login button */}
            </div>
          </div>
        </div>
      </div>
      {/* Snackbar component for displaying login feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}


const Container = styled.div`
 
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;

export default Login;