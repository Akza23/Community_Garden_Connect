import { Link } from "react-router"

function GardenerNavbar() {
    return (
        <nav className='navbar'>
            <div className='container'>
                <h2 id='h2'>🌿 Gardening</h2>
                <ul id='item'>
                    <li className='nav-item'><Link to='/gardenerhome'>Home</Link></li>
                    <li className='nav-item'><Link to='/about'>About</Link></li>
                    <li className='nav-item'><Link to='/gardenerprofile'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-pen-icon lucide-user-round-pen"><path d="M2 21a8 8 0 0 1 10.821-7.487"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="8" r="5"/></svg></Link></li>
                    {/* <li className='nav-item dropdown'>
                        <Link to='' className='dropdown-toggle' role='button' data-bs-toggle="dropdown" aria-expanded="false">Sign in</Link>
                        <ul className='dropdown-menu'>
                            <li><Link to="/gardenerlogin" className='dropdown-item'>Gardener</Link></li>
                            <li><Link to="" className='dropdown-item'>Manager</Link></li>
                            <li><Link to="" className='dropdown-item'>Organization</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                        </ul>
                    </li>
                    <li className='nav-item dropdown'>
                        <Link to='' className='dropdown-toggle' role='button' data-bs-toggle="dropdown" aria-expanded="false">Sign up</Link>
                        <ul className='dropdown-menu'>
                            <li><Link to="/gardener" className='dropdown-item'>Gardener</Link></li>
                            <li><Link to="/manager" className='dropdown-item'>Manager</Link></li>
                            <li><Link to="" className='dropdown-item'>Organization</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                        </ul>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}

export default GardenerNavbar
