import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import { Route, Routes } from "react-router"
import "./App.css"
import AdminHome from "./components/adminhome"
import GardenerHome from "./components/gardenerhome"
import ManagerHome from "./components/managerhome"
import About from "./pages/about"
import AddGarden from "./pages/addgarden"
import AdminLogin from "./pages/adminlogin"
import AdminViewGarden from "./pages/adminviewgarden"
import AdminViewGardener from "./pages/adminviewgardener"
import AdminViewManager from "./pages/adminviewmanager"
import Contact from "./pages/contact"
import EditGarden from "./pages/editgarden"
import Gardener from "./pages/gardener"
import GardenerLogin from "./pages/gardenerlogin"
import GardenerProfile from "./pages/gardenerprofile"
import GardenerProfileEdit from "./pages/gardenerprofileedit"
import Index from "./pages/index"
import Manager from "./pages/manager"
import ManagerLogin from "./pages/managerlogin"
import ManagerProfile from "./pages/managerprofile"
import ManagerProfileEdit from "./pages/managerprofileedit"
import ManagerViewGarden from "./pages/managerviewgarden"
import ManagerViewGardener from "./pages/managerviewgardener"

function App() {
	return (
		<>
			{/* <Navbar/>
		<Section/> */}

			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />

				{/* ------------------------------ GARDENER -------------------------------- */}

				<Route path="/gardener" element={<Gardener />} />
				<Route path="/gardenerlogin" element={<GardenerLogin />} />
				<Route path="/gardenerhome" element={<GardenerHome />} />
				<Route path="/gardenerprofile" element={<GardenerProfile />} />
				<Route path="/gardenerprofileedit" element={<GardenerProfileEdit />} />

				{/* ------------------------------- MANAGER --------------------------------- */}

				<Route path="/manager" element={<Manager />} />
				<Route path="/managerlogin" element={<ManagerLogin />} />
				<Route path="/managerhome" element={<ManagerHome />} />
				<Route path="/managerprofile" element={<ManagerProfile />} />
				<Route path="/managerprofileedit" element={<ManagerProfileEdit />} />
				<Route path="/addgarden" element={<AddGarden />} />
				<Route path="/managerviewgarden" element={<ManagerViewGarden />} />
				<Route path="/editgarden/:id" element={<EditGarden />} />
				<Route path="/managerviewgardener" element={<ManagerViewGardener />} />

				{/* ----------------------------------- ADMIN ------------------------------- */}

				<Route path="/adminlogin" element={<AdminLogin />} />
				<Route path="/adminhome" element={<AdminHome />} />
				<Route path="/adminviewgardeners" element={<AdminViewGardener />} />
				<Route path="/adminviewmanagers" element={<AdminViewManager />} />
				<Route path="/adminviewgardens" element={<AdminViewGarden />} />
			</Routes>
		</>
	)
}

export default App