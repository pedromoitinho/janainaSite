import './App.css'
import janainaImg from './assets/janaina.png'
import assesoriaImg from './assets/assessoria.png'
import psicologiaImg from './assets/psicologia.png'
import saudeImg from './assets/saude.png'
import segurancaImg from './assets/segurança.png'
import treinamentosImg from './assets/treinamentos.png'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useRef, useEffect, useState } from 'react'

function App() {
  const servicosRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (servicosRef.current) observer.observe(servicosRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <div className="app-content">
        <div className='heroDiv'>
          <img src={janainaImg} id='heroImage'/>
          <div className='heroText'>
              <h1>Sua visão, nossa estratégia</h1>
          </div>
          <div className='heroButton'>
              <a id='buttonOrcamento'>Começar agora</a>
          </div>
        </div>

        <div
          className={`servicosText${visible ? ' visible' : ''}`}
          ref={servicosRef}
        >
            <h1 className='servicosTitle'>Venha conhecer nossos <span className='servicosTitle' id='servicoAmarelo'>serviços</span></h1>
            <div className="servicosCards">
              {[
                {
                  img: assesoriaImg,
                  title: 'Assessoria',
                  btn: 'Saiba mais'
                },
                {
                  img: psicologiaImg,
                  title: 'Psicologia',
                  btn: 'Saiba mais'
                },
                {
                  img: saudeImg,
                  title: 'Saúde',
                  btn: 'Saiba mais'
                },
                {
                  img: segurancaImg,
                  title: 'Segurança',
                  btn: 'Saiba mais'
                },
                {
                  img: treinamentosImg,
                  title: 'Treinamentos',
                  btn: 'Saiba mais'
                }
              ].map((card, idx) => (
                <div className="servicoCard" key={idx}>
                  <img
                    src={card.img}
                    alt={card.title}
                    className="servicoCardImg"
                    id={`img${card.title.replace(/\s/g, '')}`}
                  />
                  <div className="servicoCardContent">
                    <h2>
                      <span className="servicoCardTitleBg">{card.title}</span>
                    </h2>
                    <a className="servicoCardBtn">{card.btn}</a>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App;
