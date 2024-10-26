import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>
  //  </StrictMode>,
)
