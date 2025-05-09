import './App.css'
import janainaImg from './assets/janaina.png'
import assesoriaImg from './assets/assessoria.png'
import psicologiaImg from './assets/psicologia.png'
import saudeImg from './assets/saude.png'
import segurancaImg from './assets/segurança.png'
import treinamentosImg from './assets/treinamentos.png'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import seta from './assets/seta.png'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function App() {
  const servicosRef = useRef<HTMLDivElement>(null)
  const solucoesRef = useRef<HTMLDivElement>(null)
  const [visibleServicos, setVisibleServicos] = useState(false)
  const [visibleSolucoes, setVisibleSolucoes] = useState(false)

  useEffect(() => {
    const observerOptions = { threshold: 0.2 }
    
    // Observer for servicosText
    const servicosObserver = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleServicos(true)
      },
      observerOptions
    )
    
    // Observer for solucoesDiv
    const solucoesObserver = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleSolucoes(true)
      },
      observerOptions
    )
    
    if (servicosRef.current) servicosObserver.observe(servicosRef.current)
    if (solucoesRef.current) solucoesObserver.observe(solucoesRef.current)
    
    return () => {
      servicosObserver.disconnect()
      solucoesObserver.disconnect()
    }
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
              <Link to="/orcamento" id='buttonOrcamento'>Começar agora</Link>
          </div>
        </div>

        <div
          className={`servicosText${visibleServicos ? ' visible' : ''}`}
          ref={servicosRef}
          id="servicos"
        >
            <h1 className='servicosTitle'>Venha conhecer nossos <span className='servicosTitle' id='servicoAmarelo'>serviços</span></h1>
            <div className="servicosCards">
              {[
                {
                  img: assesoriaImg,
                  title: 'Assessoria Técnica',
                  btn: 'Saiba mais'
                },
                {
                  img: psicologiaImg,
                  title: 'Psicologia Organizacional e do Trabalho',
                  btn: 'Saiba mais'
                },
                {
                  img: saudeImg,
                  title: 'Saúde Ocupacional',
                  btn: 'Saiba mais'
                },
                {
                  img: segurancaImg,
                  title: 'Segurança do Trabalho',
                  btn: 'Saiba mais'
                },
                {
                  img: treinamentosImg,
                  title: 'Treinamentos Comportamentais',
                  btn: 'Saiba mais'
                }
              ].map((card, idx) => (
                <div className="servicoCard" key={idx}>
                  <img
                    src={card.img}
                    alt={card.title}
                    className="servicoCardImg"
                    id={`img${card.title.split(' ')[0]}`}
                  />
                  <div className="servicoCardContent">
                    <h2>
                      <span className="servicoCardTitleBg">{card.title}</span>
                    </h2>
                    <Link to={`/servicos/${card.title.toLowerCase().replace(/\s+/g, '-')}`} className="servicoCardBtn">
                      {card.btn}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
        </div>
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
                text: "Assegure-se de que sua empresa esteja em conformidade com as normas e regulamentos, evitando custos e complicações legais desnecessárias.",
                img: seta
              },
              {
                title: "Crie um ambiente mais seguro e saudável",
                text: "Implementar práticas de segurança e saúde no trabalho reduz riscos, melhora o bem-estar dos colaboradores e fortalece a cultura organizacional.",
                img: seta
              },
              {
                title: "Aumente a produtividade",
                text: "Ambientes bem estruturados e com foco na saúde e segurança resultam em equipes mais motivadas, engajadas e produtivas.",
                img: seta
              },
              {
                title: "Engaje sua equipe",
                text: "Investir no bem-estar e segurança dos colaboradores aumenta o comprometimento e fortalece a relação de confiança dentro da empresa.",
                img: seta
              },
              {
                title: "Economize com menos afastamento",
                text: "A adoção de práticas preventivas reduz a ocorrência de acidentes e doenças ocupacionais, diminuindo os custos com afastamentos e seguro.",
                img: seta
              },
              {
                title: "Mantenha sua empresa em dia com a fiscalização",
                text: "Estar em conformidade com as exigências legais garante que sua empresa evite multas e surpresas durante auditorias e fiscalizações.",
                img: seta
              }
            ].map((solution, idx) => (
              <div className="solucaoCard" key={idx}>
                <div className="solucaoLogo">
                  <img src={solution.img} alt={solution.title} />
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
      <Footer />
    </>
  )
}

export default App;
