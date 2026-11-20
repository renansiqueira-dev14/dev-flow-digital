import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'
import './improvements.css'
import './desktop-layout.css'

const root = document.getElementById('root')
const application = <React.StrictMode><BrowserRouter basename={import.meta.env.BASE_URL}><App /></BrowserRouter></React.StrictMode>
if (root.hasChildNodes()) hydrateRoot(root, application)
else createRoot(root).render(application)
