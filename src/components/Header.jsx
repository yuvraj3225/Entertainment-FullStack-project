import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

export default function Header(props) {
    const navigate = useNavigate() // useNavigate hook from react-router-dom to navigate between pages
  return (
       //Container component with styled-components for styling
      <Container className="flex a-center j-between">  
        <div className="logo">
            <img src={logo} alt="logo" /> 
        </div>
        {/* // Button component with onClick event handler to navigate to either login or signup page based on the login prop */}
        <button onClick={()=> navigate (props.login ? "/login" : "/signup")}>
            {props.login ? "Log In": "Sign In"} 
            {/* // Conditional rendering of button text based on the login prop */}
        </button>
    </Container>

  )
}
const Container = styled.div`
padding: 0 2rem;

overflow: hidden; 
.logo {
  img {
    height: 5rem;
    mix-blend-mode:   lighten ;
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
`