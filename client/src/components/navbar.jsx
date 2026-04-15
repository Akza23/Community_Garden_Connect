import { Link } from 'react-router';
function Navbar() {
    return (
        <nav className='navbar'>
            <div className='container'>
                <h2 id='h2'>🌿 Gardening</h2>
                <ul id='item'>
                    <li className='nav-item'><Link to='/'>Home</Link></li>
                    <li className='nav-item'><Link to='/about'>About</Link></li>
                    <li className='nav-item'><Link to='/contact'>Contact</Link></li>
                    <li className='nav-item dropdown'>
                        <Link to='' className='dropdown-toggle' role='button' data-bs-toggle="dropdown" aria-expanded="false">Sign in</Link>
                        <ul className='dropdown-menu'>
                            <li><Link to="/gardenerlogin" className='dropdown-item'>Gardener</Link></li>
                            <li><Link to="/managerlogin" className='dropdown-item'>Manager</Link></li>
                            <li><Link to="/adminlogin" className='dropdown-item'>Admin</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                        </ul>
                    </li>
                    <li className='nav-item dropdown'>
                        <Link to='' className='dropdown-toggle' role='button' data-bs-toggle="dropdown" aria-expanded="false">Sign up</Link>
                        <ul className='dropdown-menu'>
                            <li><Link to="/gardener" className='dropdown-item'>Gardener</Link></li>
                            <li><Link to="/manager" className='dropdown-item'>Manager</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;