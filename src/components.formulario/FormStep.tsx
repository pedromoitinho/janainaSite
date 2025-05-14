"use client"

import type React from "react"
import "./FormStep.css"

type Field = {
  id: string
  label: string
  type: string
  value: string
  error?: string
}

type FormStepProps = {
  title: string
  description: string
  fields: Field[]
  updateFields: (fields: Record<string, string>) => void
}

export function FormStep({ title, description, fields, updateFields }: FormStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({ [e.target.id]: e.target.value })
  }

  return (
    <div className="form-step">
      <div className="step-header">
        <h3 className="step-title">{title}</h3>
        <p className="step-description">{description}</p>
      </div>

      <div className="step-fields">
        {fields.map((field) => (
          <div key={field.id} className="field-container">
            <label htmlFor={field.id} className="field-label">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              name={field.id}
              value={field.value}
              onChange={handleChange}
              className={`field-input ${field.error ? "field-error" : ""}`}
              placeholder={`Digite ${field.label.toLowerCase()}`}
            />
            {field.error && <div className="error-message">{field.error}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
