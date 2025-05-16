import './App.css'
import janainaImg from './assets/janaina.png'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Services from './components/Services'
import Whatsapp from './components/Whatsapp'
import LogoScroller from './components/LogoScroller'
import ImageCarousel from './components/ImageCarousel'

type Solution = {
  title: string;
  text: string;
  icon?: React.ReactNode; // SVG as JSX
  img?: string;          // Image path as string
};

function App() {
  const solucoesRef = useRef<HTMLDivElement>(null)
  const [visibleSolucoes, setVisibleSolucoes] = useState(false)

  useEffect(() => {
    const observerOptions = { threshold: 0.2 }

    // Observer for solucoesDiv
    const solucoesObserver = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleSolucoes(true)
      },
      observerOptions
    )

    if (solucoesRef.current) solucoesObserver.observe(solucoesRef.current)

    return () => {
      solucoesObserver.disconnect()
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="app-content">
        <div className='heroDiv'>
          <img src={janainaImg} id='heroImage' alt="Vitais Consultoria - Especialistas em segurança do trabalho e saúde ocupacional" />
          <div className='heroText'>
            <h1>Sua visão, nossa estratégia</h1>
            <h2 className='subtitle-seo'>Segurança do Trabalho e Psicologia Organizacional em Feira de Santana</h2>
          </div>
          <div className='heroButton'>
            <Link to="/forms" id='buttonOrcamento'>Começar agora</Link>
          </div>
        </div>
        <LogoScroller />
        <Services />
        <ImageCarousel />

        <div
          className={`solucoesDiv${visibleSolucoes ? ' visible' : ''}`}
          ref={solucoesRef}
          id="sobre"
        >
          <h1>Nossas <span id='solucoesAmarelo'>soluções</span>:</h1>
          <div className="solucoesCards">
            {[
              {
                title: "Evite multas e problemas legais",
                text: "Garanta que sua empresa esteja em conformidade com as normas regulamentadoras e evite penalidades.",
                icon: <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              },
              {
                title: "Ambiente mais seguro e saudável",
                text: "Promova um ambiente de trabalho que prioriza a saúde e segurança dos colaboradores.",
                icon: <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              },
              {
                title: "Aumente a produtividade",
                text: "Colaboradores mais produtivos e engajados com os objetivos da empresa.",
                icon: <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              },
              {
                title: "Engaje sua equipe",
                text: "Fortalecimento da relação de confiança dentro da empresa.",
                icon: <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              },
              {
                title: "Economize com planejamentos",
                text: "Reduza custos com afastamentos, substituições e processos trabalhistas através de ações preventivas.",
                icon: <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" x2="9.01" y1="9" y2="9" />
                  <line x1="15" x2="15.01" y1="9" y2="9" />
                </svg>
              },
              {
                title: "Sua empresa em dia com a fiscalização",
                text: "Esteja sempre preparado para fiscalizações com documentação e processos adequados.",
                icon: <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" x2="8" y1="13" y2="13" />
                  <line x1="16" x2="8" y1="17" y2="17" />
                  <line x1="10" x2="8" y1="9" y2="9" />
                </svg>
              }
            ].map((solution: Solution, idx) => (
              <div className="solucaoCard" key={idx}>
                <div className="solucaoLogo">
                  {solution.icon ? (
                    solution.icon // Render SVG directly
                  ) : (
                    <img src={solution.img} alt={solution.title} />
                  )}
                </div>
                <div className="solucaoContent">
                  <h3>{solution.title}</h3>
                  <p>{solution.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Whatsapp />
      <Footer />
    </>
  )
}

export default App;
