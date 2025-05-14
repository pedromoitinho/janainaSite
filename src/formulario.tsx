import './formulario.css'
import { MultiStepForm } from "./components.formulario/MultiStepForm"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Whatsapp from './components/Whatsapp';

function Formulario(){
    return(
        <>
            <Navbar />
            <div className="form-page">
                <div className="form-hero">
                    <div className="form-hero-content">
                        <h1>Solicite seu orçamento</h1>
                        <div className="form-hero-line"></div>
                        <p>Preencha o formulário para receber uma proposta personalizada</p>
                    </div>
                </div>
                
                <main className="form-container">
                    <div className="form-card">
                        <div className="form-intro">
                            <h2>Estamos aqui para ajudar</h2>
                            <p>Nossos especialistas irão analisar suas necessidades e preparar uma proposta sob medida para sua empresa.</p>
                        </div>
                        <MultiStepForm />
                    </div>
                </main>
            </div>
            <Whatsapp />
            <Footer />
        </>
    )
}
export default Formulario;