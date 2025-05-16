import './Services.css';
import React, { useState, useEffect } from 'react';
import assesoriaImg from '../assets/assessoria.png'
import psicologiaImg from '../assets/psicologia.png'
import saudeImg from '../assets/saude.png'
import segurancaImg from '../assets/segurança.png'
import treinamentosImg from '../assets/treinamentos.png'
import { Link } from 'react-router-dom';

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
  id?: string;
  details?: string; // Add this for detailed modal content
  services?: string[];
  benefits?: string[];// Add this for bullet points in modal
}

// Create a function to generate IDs from titles
const createIdFromTitle = (title: string): string => {
  return `img${title.replace(/\s+/g, '').replace(/[^\w\s]/gi, '')}`;
};

const services: Service[] = [
  {
    title: "Segurança do Trabalho",
    description: "Desenvolvimento e implementação de programas personalizados para gestão de riscos e prevenção de acidentes.",
    image: segurancaImg,
    link: "#",
    id: "imgProgramasDeSeguranca",
    details: "Soluções em segurança do trabalho, com foco na gestão de documentos e treinamentos. Conformidade com a legislação vigente e contribuição para a prevenção de acidentes<hr/>",
    services: [
      '<span style="font-weight:bold; position:relative; right:15px;">Documentos de SST</span>',
      'LTCAT - Laudo Técnico das Condições Ambientais do Trabalho',
      'PGR - Programa de Gerenciamento de Risco',
      'PPP - Perfil Profissiográfico Previdenciário',
      'AET - Análise Ergonômica do Trabalho',
      '<span style="font-weight:bold; position:relative; right:15px;">Treinamentos Obrigatórios</span>',
      'NR 05 - Prevenção de Acidentes e Assédio - CIPA',
      'NR 06 - Uso de EPIs',
      'NR 10 - Segurança em Instalações e Serviços em Eletricidade',
      'NR 12 - Segurança em Maquinas e Equipamentos',
      'NR 17 - Ergonomia',
      'NR 18 - Segurança na Indústria da Construção',
      'NR 33 - Espaços Confinados',
      'NR 35 - Trabalho em Altura',
      '<span style="font-weight:bold; position:relative; right:15px;">SST no eSocial</span>',
      'S-2210 - Acidente de Trabalho',
      'S-2220 - Exames Médicos',
      'S-2240 - Riscos Ocupacionais'

    ],
    benefits: [
      "Conformidade com as Normas Regulamentadoras",
      "Treinamentos para Prevenção de Riscos e Capacitação de Equipes",
      "Organização dos Documentos de Segurança do Trabalho",
      "Gestão da Segurança do Trabalho, Melhorando a Qualidade de Vida no Trabalho"
    ]
  },
  {
    title: "Psicologia Organizacional",
    description: "Soluções completas para garantir a segurança e bem-estar dos colaboradores no ambiente de trabalho.",
    image: psicologiaImg,
    link: "#",
    id: "imgSegurancaDoTrabalho",
    details: "Aplicação de avaliações psicossociais para promover o bem-estar mental dos colaboradores.<hr/>",
    services: [
      'Avaliação Psicossocial',
      'Mentoria para Líderes',
      'Pesquisas Organizacionais',
    ],
    benefits: [
      "Melhoria da Performance e do Clima Organizacional",
      "Identificação e Prevenção de Riscos Psicossociais",
      "Apoio à Conformidade Legal no GRO"
    ]
  },
  {
    title: "Saúde Ocupacional",
    description: "Programas de saúde ocupacional para promover o bem-estar e prevenir doenças relacionadas ao trabalho.",
    image: saudeImg,
    link: "#",
    id: "imgGestaoOcupacional",
    details: "Programas de prevenção e acompanhamento médico, garantindo o bem-estar dos colaboradores e a conformidade com as exigências legais.<hr/>",
    services: [
      'PCMSO - Programa de Controle Médico de Saúde Ocupacional',
      'ASO - Atestado de Saúde Ocupacional',
      'PCA - Programa de Conservação Auditiva',
      'PPR - Programa de Proteção Respiratória'
    ],
    benefits: [
      "Redução de Afastamentos e Doenças Ocupacionais",
      "Acompanhamento Preventivo da Saúde dos Colaboradores",
      "Ambiente de Trabalho Mais Seguro e Saudável"
    ]
  },
  {
    title: "Assessoria Técnica",
    description: "Consultoria especializada para adequação às normas regulamentadoras e legislação vigente.",
    image: assesoriaImg,
    link: "#",
    id: "imgAssessoriaTecnica",
    details: "Assessoria técnica para suporte na gestão, garantindo o correto atendimento às normas regulamentadoras e otimizando processos internos.<hr/>",
    services: [
      'Visitas de Profissionais Especializados',
      'Inspeções Sobre Segurança no Trabalho',
      'Suporte na Implementação de Programas como PGR, PCMSO, PCA e PPR',
      'Treinamentos e Apoio em Fiscalizações'
    ],
    benefits: [
      "Correção Imediata de Falhas",
      "Redução de Não Conformidades em Fiscalizações",
      "Acompanhamento Técnico Presencial",
      "Otimização de Processos"
    ]
  },
  {
    title: "Treinamentos Corporativos",
    description: "Capacitação e desenvolvimento de equipes para promover uma cultura de segurança e prevenção.",
    image: treinamentosImg,
    link: "#",
    id: "imgTreinamentosCorporativos",
    details: "Treinamentos focados no desenvolvimento de soft skills. As capacitações são personalizadas de acordo com as demandas da empresa e direcionadas para líderes e equipes.<hr/>",
    services: [
      '<span style="font-weight:bold; position:relative; right:15px;">Treinamentos com Soft Skills:</span>',
      'Método o Poder da Conexão',
      'Método Sinergia Estratégica',
      '<span style="font-weight:bold; position:relative; right:15px;">Palestras Comportamentais:</span>',
      'Feedback',
      'Ética Profissional',
      'Relação Intrapessoal e Interpessoal',
      'Inteligência Emocional',
      'Gestão de Conflitos',
      'Comunicação Assertiva Não Violenta'
    ],
    benefits: [
      "Desenvolvimento de habilidades socioemocionais",
      "Melhoria da comunicação interna e trabalho em equipe",
      "Aumento da produtividade e engajamento dos colaboradores com as práticas de SST",
      "Redução de conflitos e melhoria do ambiente corporativo"
    ]
  },
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Function to open modal with specific service
  const openModal = (service: Service, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedService(service);

    // Save current scroll position
    const scrollY = window.scrollY;

    // Add styles to lock scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  };

  // Function to close modal
  const closeModal = () => {
    // Get the scroll position from body top position
    const scrollY = document.body.style.top;

    // Remove scroll locking styles
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';

    // Restore scroll position
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);

    setSelectedService(null);
  };

  // Add this useEffect for cleanup
  useEffect(() => {
    // This function will be returned and run when the component unmounts
    // or before the effect runs again if selectedService were in its dependency array.
    // Here, it's primarily for unmount cleanup if a modal was open.
    return () => {
      if (document.body.style.position === 'fixed') { // Check if modal was likely open
        // Restore body styles to default to prevent interference with other pages
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        // Do not try to restore scroll here, ScrollToTop will handle the new page
      }
    };
  }, []); // Empty dependency array means this cleanup runs only on unmount

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="header">
          <h2 className="title">
            Venha conhecer nossos <span className="highlight">serviços</span>
          </h2>
          <p className="subtitle">
            Soluções personalizadas para atender às necessidades do seu negócio
          </p>
        </div>
        <div className="grid">
          {services.map((service, index) => (
            <div key={index} className="card">
              <div className="image-container">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="image"
                  id={service.id || createIdFromTitle(service.title)}
                />
              </div>
              <div className="content">
                <h3 className="card-title">{service.title}</h3>
                <p className="description">{service.description}</p>
                <button
                  onClick={(e) => openModal(service, e)}
                  className="link"
                >
                  Saiba Mais
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal window */}
      {selectedService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <h2 className="modal-title">{selectedService.title}</h2>
            <div className="modal-image-container">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="modal-image"
              />
            </div>
            <div className="modal-body">
              <p
                className="modal-description"
                dangerouslySetInnerHTML={{ __html: selectedService.details || '' }}
              ></p>
              {selectedService.services && (
                <div className="modal-benefits">
                  <h3>Serviços:</h3>
                  <ul>
                    {selectedService.services.map((service, index) => {
                      // Determine if this item should have no bullet
                      const hasNoBulletStyle = service.includes('font-weight:bold');
                      return (
                        <li
                          key={index}
                          className={hasNoBulletStyle ? 'no-bullet' : ''}
                          dangerouslySetInnerHTML={{ __html: service }}
                        ></li>
                      );
                    })}
                  </ul>
                  <hr />
                </div>
              )}
              {selectedService.benefits && (
                <div className="modal-benefits">
                  <h3>Benefícios:</h3>
                  <ul>
                    {selectedService.benefits.map((benefit, index) => {
                      // Determine if this item should have no bullet
                      const hasNoBulletStyle = benefit.includes('font-weight:bold');
                      return (
                        <li
                          key={index}
                          className={hasNoBulletStyle ? 'no-bullet' : ''}
                          dangerouslySetInnerHTML={{ __html: benefit }}
                        ></li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="modal-cta">
                <p>Entre em contato para mais informações sobre este serviço.</p>
                <Link
                  to="/forms"
                  className="modal-button"
                  onClick={() => closeModal()}
                >
                  Solicitar Orçamento
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
