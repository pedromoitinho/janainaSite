import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import Logo from '../assets/logoJanaina.png'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="navBarDiv">
            <div className="navLogo">
                <Link to="/" id='logoButton'><img src={Logo} /></Link>
            </div>
            <button
                className="hamburger"
                aria-label="Abrir menu"
                onClick={() => setMenuOpen((open) => !open)}
            >
                <span />
                <span />
                <span />
            </button>
            <div className={`navLinks${menuOpen ? ' open' : ''}`}>
                <Link to="/#servicos" onClick={() => setMenuOpen(false)}>Serviços</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>Sobre Nós</Link>
                <Link to="/orcamento" id='orcamento' onClick={() => setMenuOpen(false)}>Orçamento</Link>
            </div>
        </nav>
    )
}

export default Navbar;