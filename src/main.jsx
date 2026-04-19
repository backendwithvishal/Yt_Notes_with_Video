import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <div className="flex lg:hidden flex-col items-center justify-center h-screen text-center px-6 gap-3">
      <h2 className="text-xl font-semibold">Desktop only</h2>
      <p className="text-gray-500">Please open this app on a laptop or PC.</p>
    </div>


    <div className='hidden lg:block'>
      <App />
    </div>
  </StrictMode>,
)
