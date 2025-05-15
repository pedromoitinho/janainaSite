import './SobreNos.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Whatsapp from './components/Whatsapp'
import { Link } from 'react-router-dom'
import Galera from './assets/Galera.png'

function SobreNos(){
    return(
        <div className="sobrenos-wrapper" style={{position: 'relative', minHeight: '100vh', paddingBottom: '300px'}}>
            <Navbar/>
            <div className="about-page">
                {/* Hero Section */}
                <section className="about-hero">
                    <div className="about-hero-content">
                        <h1>Nossa História</h1>
                        <div className="about-hero-line"></div>
                        <p>Comprometidos com a segurança e o bem-estar no ambiente de trabalho</p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="about-mission">
                    <div className="about-container">
                        <div className="about-card">
                            <div className="about-card-content">
                                <h2>Quem Somos</h2>
                                <p>A Vitais Consultoria surgiu da paixão pela segurança e bem-estar no ambiente de trabalho. Nossa equipe de especialistas em saúde ocupacional, segurança do trabalho e psicologia organizacional trabalha para criar ambientes empresariais mais saudáveis e produtivos.</p>
                                <p>Acreditamos que o capital humano é o maior ativo de qualquer organização, e investir na saúde e segurança dos colaboradores gera resultados expressivos para todos.</p>
                            </div>
                            <div className="about-card-image">
                                <div className="about-image-placeholder">
                                    <img src={Galera}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="about-values">
                    <div className="about-container">
                        <h2 className="about-section-title">Nossos Valores</h2>
                        <div className="about-values-grid">
                            <div className="about-value-card">
                                <div className="about-value-icon purpose-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                </div>
                                <h3>Propósito</h3>
                                <p>Promover ambientes de trabalho mais seguros e saudáveis, garantindo o bem-estar físico e mental dos colaboradores.</p>
                            </div>
                            <div className="about-value-card">
                                <div className="about-value-icon mission-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 8v4l3 3"></path>
                                    </svg>
                                </div>
                                <h3>Missão</h3>
                                <p>Oferecer soluções personalizadas em saúde e segurança ocupacional, desenvolvendo estratégias que atendam às necessidades específicas de cada cliente.</p>
                            </div>
                            <div className="about-value-card">
                                <div className="about-value-icon vision-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </div>
                                <h3>Visão</h3>
                                <p>Ser referência em consultoria de saúde e segurança ocupacional, reconhecida pela excelência técnica e impacto positivo nas organizações.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Commitment Section */}
                <section className="about-commitment">
                    <div className="about-container">
                        <div className="about-commitment-content">
                            <div className="about-commitment-header">
                                <svg className="about-commitment-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                <h2>Nosso Compromisso</h2>
                            </div>
                            <p>Estamos comprometidos em fornecer soluções de alta qualidade que não apenas atendam, mas superem as expectativas dos nossos clientes. Nossa abordagem consultiva e personalizada garante que cada empresa receba exatamente o que precisa para prosperar em um ambiente de trabalho seguro e saudável.</p>
                            <Link to="/forms" className="about-cta-button">Solicitar Orçamento</Link>
                        </div>
                    </div>
                </section>
            </div>
            <Whatsapp/>
            <Footer/>
        </div>
    )
}
export default SobreNos;