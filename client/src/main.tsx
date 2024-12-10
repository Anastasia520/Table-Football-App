import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { StoreProvider } from './app/providers/StoreProvider/index.ts'
import { ErrorBoundary } from './app/providers/ErrorBoundary/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StoreProvider>
  </StrictMode>,
)
