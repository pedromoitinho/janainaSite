import { useState } from 'react'
import './Nav.css'
import Logo from '../assets/logoJanaina.png'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="navBarDiv">
            <div className="navLogo">
                <a id='logoButton'><img src={Logo} /></a>
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
                <a href="#servicos">Serviços</a>
                <a href="#sobre">Sobre Nós</a>
                <a href="#orcamento" id='orcamento'>Orçamento</a>
            </div>
        </nav>
    )
}

export default Navbar;