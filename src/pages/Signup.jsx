import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
  const [formValues, setFormValues] = useState({  // State to manage form input values
      email: "",
      password: "",
  });
  const [signUpSuccess, setSignUpSuccess] = useState(false);  // State to track successful sign-up
  const navigate = useNavigate();  // Hook for navigation in React Router

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {  // Listening for authentication state changes
          if (currentUser) {  // If user is authenticated
              setSignUpSuccess(true);  // Set sign-up success to true
              navigate("/");  // Redirect user to home page
          }
      });
      return () => unsubscribe();  // Clean up function
  }, [navigate]);  // Dependency array for useEffect hook

  const handleSignIn = async () => {  // Function to handle sign-up process
      try {
          const { email, password } = formValues;  // Destructuring email and password from form values
          await createUserWithEmailAndPassword(firebaseAuth, email, password);  // Creating user with email and password
      } catch (error) {  // Catching errors, if any
          console.log(error);  // Logging errors to console
      }
  };

  return (
      <Container showPassword={showPassword}>  {/* Container component with showPassword prop */}
          <BackgroundImage />  {/* Background image component */}
          <div className="content">  {/* Content wrapper */}
              <Header login />  {/* Header component with login prop */}
              <div className="body flex column a-center j-center">  {/* Body container */}
                  <div className="text flex column">  {/* Text container */}
                      <h1>Unlimited movies, TV shows and more.</h1>  {/* Heading */}
                      <h4>Watch anywhere. Cancel anytime.</h4>  {/* Subheading */}
                      <h6>Ready to watch? Enter your email to create or restart membership.</h6>  {/* Instruction */}
                  </div>
                  <div className="form">  {/* Form container */}
                      <input  // Email input field
                          type="email"
                          placeholder="Email address"
                          name="email"
                          value={formValues.email}
                          onChange={(e) =>
                              setFormValues({
                                  ...formValues,
                                  [e.target.name]: e.target.value,
                              })
                          }
                      />
                      {showPassword && (  // Conditionally render password input field
                          <input
                              type="password"
                              placeholder="Password"
                              name="password"
                              value={formValues.password}
                              onChange={(e) =>
                                  setFormValues({
                                      ...formValues,
                                      [e.target.name]: e.target.value,
                                  })
                              }
                          />
                      )}
                      {!showPassword && (  // Conditionally render button to toggle password visibility
                          <button onClick={() => setShowPassword(true)}>Get Started</button>
                      )}
                  </div>
                  {showPassword && <button onClick={handleSignIn}>Sign Up</button>}  {/* Button to sign up */}
                  {signUpSuccess && <p>Sign up successful!</p>}  {/* Success message upon successful sign-up */}
              </div>
          </div>
      </Container>
  );
}


const Container = styled.div`
  position: relative;
  .content {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      height: 100vh;
      width: 100vw;
      display: grid;
      grid-template-rows: 15vh 85vh;
      .body {
          gap: 1rem;
          .text {
              gap: 1rem;
              text-align: center;
              font-size: 1.5rem;
              h1 {
                  padding: 0 25rem;
              }
          }
          .form {
              display: grid;
              grid-template-columns: ${({ showPassword }) =>
                  showPassword ? "1fr 1fr" : "2fr 1fr"};
              width: 50%;
              input {
                  color: black;
                  border: none;
                  padding: 1rem;
                  font-size: 1.2rem;
                  border: 1px solid black;
                  &:focus {
                      outline: none;
                  }
              }
              button {
                  padding: 0.5rem 1rem;
                  background-color: #e50914;
                  border: none;
                  cursor: pointer;
                  color: white;
                  font-weight: bolder;
                  font-size: 1.05rem;
              }
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
`;

export default Signup;
