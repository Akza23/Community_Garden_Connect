import { Link } from "react-router";
import "../style/gardener.css";

function GardenerNavbar() {
    function Logout() {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.clear();
            window.location.href = "/gardenerlogin";
        }
    }
    return (
        <nav className='gardener-navbar'>
            <div className='gardener-container'>
                <h2>🌿 Gardening</h2>
                <ul id='gardener-item'>
                    <div className="gardener-left-links">
                        <li className='gardener-nav-item'><Link to='/gardenerhome'>Home</Link></li>
                        <li className='gardener-nav-item'><Link to='/gardenerviewgarden'>View Garden</Link></li>
                    </div>
                    <div className="gardener-right-links">
                        <li className='gardener-nav-item'><Link to='/gardenerprofile'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-pen-icon lucide-user-round-pen"><path d="M2 21a8 8 0 0 1 10.821-7.487" /><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /><circle cx="10" cy="8" r="5" /></svg></Link></li>
                        <li onClick={Logout} className='gardener-nav-item'><Link><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /></svg></Link></li>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default GardenerNavbar
