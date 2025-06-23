import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/contactStore.ts'
import { MessageProvider } from './contexts/MessageProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MessageProvider>
         <App />
      </MessageProvider>
    </Provider>
  </StrictMode>
)
