"use client"

import type React from "react"
import { useState } from "react"
import emailjs from 'emailjs-com';
import { FormStep } from "./FormStep"
import { ProgressBar } from "./ProgressBar"
import "./MultiStepForm.css"

type FormData = {
  // Etapa 1
  nome: string
  email: string
  telefone: string
  // Etapa 2
  nomeEmpresa: string
  cnpjEmpresa: string
  totalEmpregados: string
  // Etapa 3
  setor: string
  funcoes: string
  orcamentoServico: string
}

type FormErrors = {
  [key in keyof FormData]?: string
}

export function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    nomeEmpresa: "",
    cnpjEmpresa: "",
    totalEmpregados: "",
    setor: "",
    funcoes: "",
    orcamentoServico: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isComplete, setIsComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const updateFields = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }))

    // Clear errors for updated fields
    const updatedErrors = { ...errors }
    Object.keys(fields).forEach((key) => {
      delete updatedErrors[key as keyof FormData]
    })
    setErrors(updatedErrors)
  }

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    if (step === 1) {
      // Validate Nome
      if (!formData.nome.trim()) {
        newErrors.nome = "Nome é obrigatório"
        isValid = false
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email.trim()) {
        newErrors.email = "Email é obrigatório"
        isValid = false
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email inválido"
        isValid = false
      }

      // Validate Telefone
      const phoneRegex = /^\d+$/
      if (!formData.telefone.trim()) {
        newErrors.telefone = "Telefone é obrigatório"
        isValid = false
      } else if (!phoneRegex.test(formData.telefone)) {
        newErrors.telefone = "Telefone deve conter apenas números"
        isValid = false
      }
    } else if (step === 2) {
      // Validate Nome da Empresa
      if (!formData.nomeEmpresa.trim()) {
        newErrors.nomeEmpresa = "Nome da empresa é obrigatório"
        isValid = false
      }

      // Validate CNPJ
      const cnpjRegex = /^\d+$/
      if (!formData.cnpjEmpresa.trim()) {
        newErrors.cnpjEmpresa = "CNPJ é obrigatório"
        isValid = false
      } else if (!cnpjRegex.test(formData.cnpjEmpresa)) {
        newErrors.cnpjEmpresa = "CNPJ deve conter apenas números"
        isValid = false
      }

      // Validate Total de Empregados
      const numberRegex = /^\d+$/
      if (!formData.totalEmpregados.trim()) {
        newErrors.totalEmpregados = "Total de empregados é obrigatório"
        isValid = false
      } else if (!numberRegex.test(formData.totalEmpregados)) {
        newErrors.totalEmpregados = "Total de empregados deve ser um número"
        isValid = false
      }
    } else if (step === 3) {
      // Validate Setor
      if (!formData.setor.trim()) {
        newErrors.setor = "Setor é obrigatório"
        isValid = false
      }

      // Validate Funções
      if (!formData.funcoes.trim()) {
        newErrors.funcoes = "Funções é obrigatório"
        isValid = false
      }

      // Validate Orçamento
      if (!formData.orcamentoServico.trim()) {
        newErrors.orcamentoServico = "Orçamento para serviço é obrigatório"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const sendEmail = async () => {
    setIsLoading(true);
    try {
      const serviceID = 'EnvioJanaina';
      const templateID = 'template_t803u9n';
      const publicKey = 'xbPRtqWAp6ps4WSbR';

      const templateParams = {
        ...formData,
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      alert('Formulário enviado com sucesso! Você receberá uma confirmação em seu email.');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep((prev) => prev + 1)
      } else {
        // Formulário completo
        sendEmail();
        setIsComplete(true)
      }
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 3) {
      if (validateStep(step)) {
        sendEmail();
        setIsComplete(true)
      }
    } else {
      nextStep()
    }
  }

  return (
    <div className="multi-step-form">
      <div className="form-header">
        <h1 className="form-title">Formulário de Orçamento</h1>
        <p className="form-description">Preencha todas as informações em 3 etapas</p>
      </div>
      <div className="form-content">
        <ProgressBar currentStep={step} totalSteps={3} />

        {isLoading && <div className="loading-indicator">Enviando...</div>}

        {isComplete ? (
          <div className="form-complete">
            <div className="complete-icon">✓</div>
            <h3 className="complete-title">Formulário Concluído!</h3>
            <p className="complete-description">
              Em breve o orçamento será enviado por email.
            </p>
            <button
              className="button primary-button"
              onClick={() => {
                setIsComplete(false)
                setStep(1)
                setFormData({
                  nome: "",
                  email: "",
                  telefone: "",
                  nomeEmpresa: "",
                  cnpjEmpresa: "",
                  totalEmpregados: "",
                  setor: "",
                  funcoes: "",
                  orcamentoServico: "",
                })
              }}
            >
              Novo Formulário
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-step-container">
              {step === 1 && (
                <FormStep
                  title="Informações Pessoais"
                  description="Preencha seus dados básicos de contato"
                  fields={[
                    { id: "nome", label: "Nome Completo", type: "text", value: formData.nome, error: errors.nome },
                    { id: "email", label: "E-mail", type: "text", value: formData.email, error: errors.email },
                    {
                      id: "telefone",
                      label: "Telefone",
                      type: "text",
                      value: formData.telefone,
                      error: errors.telefone,
                    },
                  ]}
                  updateFields={updateFields}
                />
              )}

              {step === 2 && (
                <FormStep
                  title="Informações da Empresa"
                  description="Informe os dados da sua empresa"
                  fields={[
                    {
                      id: "nomeEmpresa",
                      label: "Nome da Empresa",
                      type: "text",
                      value: formData.nomeEmpresa,
                      error: errors.nomeEmpresa,
                    },
                    {
                      id: "cnpjEmpresa",
                      label: "CNPJ da Empresa",
                      type: "text",
                      value: formData.cnpjEmpresa,
                      error: errors.cnpjEmpresa,
                    },
                    {
                      id: "totalEmpregados",
                      label: "Total de Empregados",
                      type: "text",
                      value: formData.totalEmpregados,
                      error: errors.totalEmpregados,
                    },
                  ]}
                  updateFields={updateFields}
                />
              )}

              {step === 3 && (
                <FormStep
                  title="Informações Adicionais"
                  description="Compartilhe detalhes sobre sua necessidade"
                  fields={[
                    { id: "setor", label: "Setor", type: "text", value: formData.setor, error: errors.setor },
                    { id: "funcoes", label: "Funções", type: "text", value: formData.funcoes, error: errors.funcoes },
                    {
                      id: "orcamentoServico",
                      label: "Orçamento para qual serviço",
                      type: "text",
                      value: formData.orcamentoServico,
                      error: errors.orcamentoServico,
                    },
                  ]}
                  updateFields={updateFields}
                />
              )}
            </div>

            <div className="form-footer">
              <button type="button" className="button secondary-button" onClick={prevStep} disabled={step === 1}>
                Anterior
              </button>
              <button type="submit" className="button primary-button">
                {step === 3 ? "Concluir" : "Próximo"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}