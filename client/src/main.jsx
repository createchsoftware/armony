import React from 'react'
import ReactDOM from 'react-dom/client'
import ChatBot from 'react-chatbotify'
import App from './App.jsx'
import './index.css'
import { CarritoProvider } from './components/ui/Carrito.jsx'
import * as promptsChatbot from './data/chatbot.json'
import * as opcionesChatbot from '../configChatbot.json'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <CarritoProvider>
      <ChatBot
        flow={promptsChatbot}
        options={opcionesChatbot}
      />
      <App />
    </CarritoProvider>

  </React.StrictMode>,
)
