import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import Section from "./components/herosection"
import Index from './pages/index';
import Gardener from "./pages/gardener"
import {Routes, Route} from 'react-router'

function App() {
	return (
		<>
		{/* <Navbar/>
		<Section/> */}
		<Routes>
		<Route path="/" element={<Index />}/>
		<Route path="/gardener" element={<Gardener/>}/>
		</Routes>
		</>
	)
}

export default App
