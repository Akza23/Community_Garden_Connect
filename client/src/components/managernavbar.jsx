import { Link } from "react-router";

function ManagerNavbar() {
    function Logout() {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.clear();
            window.location.href = "/managerlogin";
        }
    }
    return (
        <nav className='manager-navbar'>
            <div className='manager-navbar-container'>
                <h2 id='h2'>🌿 Gardening</h2>
                <ul id='manager-item'>
                    <div className="manager-left-links">
                        <li className='manager-nav-item'><Link to='/managerhome'>Home</Link></li>
                        <li className='manager-nav-item'><Link to='/managerviewgardener'>Gardener</Link></li>
                        <li className='manager-nav-item dropdown'>
                            <Link to='' className='dropdown-toggle' role='button' data-bs-toggle="dropdown" aria-expanded="false">Garden</Link>
                            <ul className='dropdown-menu'>
                                <li><Link to="/addgarden" className='dropdown-item'>Add Garden</Link></li>
                                <li><Link to="/managerviewgarden" className='dropdown-item'>View Garden</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                            </ul>
                        </li>
                    </div>
                    <div className="manager-right-links">
                        <li className='manager-nav-item'><Link to='/managerprofile'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-pen-icon lucide-user-round-pen"><path d="M2 21a8 8 0 0 1 10.821-7.487" /><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /><circle cx="10" cy="8" r="5" /></svg></Link></li>
                        <li onClick={Logout} className='gardener-nav-item'><Link><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /></svg></Link></li>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default ManagerNavbar
