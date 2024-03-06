import React from 'react';  // Importing React library
import ReactDOM from 'react-dom/client';  // Importing ReactDOM for rendering
import './index.css';  // Importing CSS styles
import App from './App';  // Importing the root component of the application
import { store } from './store';  // Importing the Redux store
import { Provider } from 'react-redux';  // Importing the Redux Provider component

// Creating a root element using ReactDOM.createRoot() method
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the application inside the root element
root.render(
  <React.StrictMode>  {/*Enabling React Strict Mode to detect potential issues in the application*/}
    <Provider store={store}>  {/*Wrapping the entire application with Redux Provider to provide the Redux store to all components*/}
      <App />  {/* Rendering the root component of the application*/}
    </Provider>
  </React.StrictMode>
);

