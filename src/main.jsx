import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    /* Prevent horizontal scroll on mobile */
    overflow-x: hidden;
  }

  body {
    margin: 0;
    font-family: 'Roboto Slab', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #000C36;
    overflow-x: hidden;

    /* Mobile-specific improvements */
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    touch-action: manipulation;
  }

  /* Improve touch targets on mobile */
  button, input, select, textarea {
    touch-action: manipulation;
  }

  /* Prevent zoom on input focus for iOS */
  @media (max-width: 480px) {
    input, textarea, select {
      font-size: 16px !important;
    }
  }
`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
)
