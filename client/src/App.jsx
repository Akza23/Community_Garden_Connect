import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Route, Routes } from "react-router";
import { Toaster, toast } from 'sonner';
import "./App.css";
import AdminHome from "./components/adminhome";
import GardenerHome from "./components/gardenerhome";
import ManagerHome from "./components/managerhome";
import About from "./pages/about";
import AddEvent from "./pages/addevent";
import AddGarden from "./pages/addgarden";
import AddTask from "./pages/addtask";
import AdminLogin from "./pages/adminlogin";
import AdminViewGarden from "./pages/adminviewgarden";
import AdminViewGardener from "./pages/adminviewgardener";
import AdminViewManager from "./pages/adminviewmanager";
import Contact from "./pages/contact";
import EditEvent from "./pages/editevent";
import EditGarden from "./pages/editgarden";
import Gardener from "./pages/gardener";
import GardenerChat from "./pages/gardenerchat";
import GardenerForgotPassword from "./pages/gardenerforgotpassword";
import GardenerLogin from "./pages/gardenerlogin";
import GardenerProfile from "./pages/gardenerprofile";
import GardenerProfileEdit from "./pages/gardenerprofileedit";
import GardenerResetPassword from "./pages/gardenerresetpassword";
import GardenerViewEvent from "./pages/gardenerviewevent";
import GardenerViewGarden from "./pages/gardenerviewgarden";
import GardenerViewTask from "./pages/gardenerviewtask";
import Index from "./pages/index";
import Manager from "./pages/manager";
import ManagerLogin from "./pages/managerlogin";
import ManagerProfile from "./pages/managerprofile";
import ManagerProfileEdit from "./pages/managerprofileedit";
import ManagerViewChat from "./pages/managerviewchat";
import ManagerViewEvent from "./pages/managerviewevent";
import ManagerViewGarden from "./pages/managerviewgarden";
import ManagerViewGardener from "./pages/managerviewgardener";
import ManagerViewTask from "./pages/mangerviewtask";

function App() {
	return (
		<>
			{/* <Navbar/>
		<Section/> */}

			<Toaster position="top-right" richColors />
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />

				{/* ------------------------------ GARDENER -------------------------------- */}

				<Route path="/gardener" element={<Gardener />} />
				<Route path="/gardenerlogin" element={<GardenerLogin />} />
				<Route path="/gardenerhome" element={<GardenerHome />} />
				<Route path="/gardenerforgotpass" element={<GardenerForgotPassword />} />
				<Route path="/gardenerresetpass" element={<GardenerResetPassword />} />
				<Route path="/gardenerprofile" element={<GardenerProfile />} />
				<Route path="/gardenerprofileedit" element={<GardenerProfileEdit />} />
				<Route path="/gardenerviewgarden" element={<GardenerViewGarden />} />
				<Route path="/gardenerviewtask" element={<GardenerViewTask />} />
				<Route path="/gardenerchat" element={<GardenerChat />} />
				<Route path="/gardenerviewevent" element={<GardenerViewEvent />} />

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
				<Route path="/addtask" element={<AddTask />} />
				<Route path="/managerviewtask" element={<ManagerViewTask />} />
				<Route path="/managerviewchat" element={<ManagerViewChat />} />
				<Route path="/addevent" element={<AddEvent />} />
				<Route path="/managerviewevent" element={<ManagerViewEvent />} />
				<Route path="/editevent/:id" element={<EditEvent />} />

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