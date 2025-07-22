import { Link } from 'react-router';
function Navbar() {
    return (
        <nav className='navbar'>
            <div className='container'>
                <h2 id='h2'>🌿 Gardening</h2>
                <ul id='item'>
                    <li className='nav-item'><Link to='/'>Home</Link></li>
                    <li className='nav-item'><Link to=''>About</Link></li>
                    <li className='nav-item'><Link to=''>Contact</Link></li>
                    <li className='nav-item dropdown'>
                        <Link to='' className='dropdown-toggle' role='button' data-bs-toggle="dropdown" aria-expanded="false">Sign in</Link>
                        <ul className='dropdown-menu'>
                            <li><Link to="" className='dropdown-item'>Gardener</Link></li>
                            <li><Link to="" className='dropdown-item'>Manager</Link></li>
                        
                        
                            <li><Link to="" className='dropdown-item'>Organization</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                        </ul>
                    </li>
                    <li className='nav-item dropdown'>
                        <Link to='' className='dropdown-toggle' role='button' data-bs-toggle="dropdown" aria-expanded="false">Sign up</Link>
                        <ul className='dropdown-menu'>
                            <li><Link to="/gardener" className='dropdown-item'>Gardener</Link></li>
                            <li><Link to="" className='dropdown-item'>Manager</Link></li>
                            <li><Link to="" className='dropdown-item'>Organization</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;