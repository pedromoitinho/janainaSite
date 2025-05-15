import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Nav.css'
import Logo from '../assets/logoJanaina.png'

function Navbar() {
    const [menuState, setMenuState] = useState('closed')
    const location = useLocation()
    const navigate = useNavigate()

    const openMenu = () => setMenuState('open')
    const closeMenu = () => {
        setMenuState('closing')
        setTimeout(() => setMenuState('closed'), 300)
    }

    // Smooth scroll to section
    const handleServicosClick = async () => {
        closeMenu()
        if (location.pathname !== '/') {
            navigate('/')
            // Wait for navigation to finish, then scroll
            setTimeout(() => {
                const el = document.getElementById('services')
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            }, 350) // Wait for page transition and menu close animation
        } else {
            const el = document.getElementById('services')
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }

    return (
        <nav className="navBarDiv">
            <div className="navLogo">
                <Link to="/" id='logoButton'>
                    <img src={Logo} />
                </Link>
            </div>
            <button
                className={`hamburger${menuState === 'open' ? ' open' : ''}`}
                aria-label="Abrir menu"
                onClick={() => menuState === 'open' ? closeMenu() : openMenu()}
            >
                <span />
                <span />
                <span />
            </button>
            <div className={`navLinks ${menuState}`}>
                <button className="nav-link-button" onClick={handleServicosClick}>Serviços</button>
                <Link to="/about" onClick={closeMenu}>Sobre Nós</Link>
                <Link to="/forms" id='orcamento' onClick={closeMenu}>Orçamento</Link>
            </div>
        </nav>
    )
}

export default Navbar