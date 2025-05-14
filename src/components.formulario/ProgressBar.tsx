import "./ProgressBar.css"

type ProgressBarProps = {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="progress-container">
      <div className="step-indicators">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="step-indicator-container">
            <div className={`step-indicator ${index + 1 <= currentStep ? "active" : ""}`}>{index + 1}</div>
            <span className="step-label">{index === 0 ? "Pessoal" : index === 1 ? "Empresa" : "Adicional"}</span>
          </div>
        ))}
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
      </div>
    </div>
  )
}
