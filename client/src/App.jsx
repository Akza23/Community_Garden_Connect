import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import { Route, Routes } from "react-router"
import "./App.css"
import Contact from "./pages/contact"
import About from "./pages/about"
import Gardener from "./pages/gardener"
import GardenerLogin from "./pages/gardenerlogin"
import Index from "./pages/index"
import Manager from "./pages/manager"
import GardenerHome from "./components/gardenerhome"
import GardenerProfile from "./pages/gardenerprofile"
import ManagerLogin from "./pages/managerlogin"

function App() {
	return (
		<>
			{/* <Navbar/>
		<Section/> */}
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/gardener" element={<Gardener />} />
				<Route path="/gardenerlogin" element={<GardenerLogin />} />
				<Route path="/gardenerhome" element={<GardenerHome/>}/>
				<Route path="/gardenerprofile" element={<GardenerProfile/>}/>
				<Route path="/manager" element={<Manager />} />
				<Route path="/managerlogin" element={<ManagerLogin/>}/>
			</Routes>
		</>
	)
}

export default App
