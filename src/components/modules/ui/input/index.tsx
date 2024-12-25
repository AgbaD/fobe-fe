import { ReactNode } from 'react'
import './index.scss'

interface BaseInputProps {
  className?: string
  placeholder?: string
  label?: string
  type?: string
  children?: ReactNode
  textarea?: boolean
  value?: string
  name?: string
  errorMessage?: string
  required?: boolean
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export default function BaseInput({
  className,
  placeholder,
  label,
  type,
  children,
  textarea,
  name,
  value,
  errorMessage,
  required,
  onChange,
  onKeyDown,
  ...props
}: BaseInputProps) {
  return (
    <label className={`base-input ${className}`}>
      <span className="label text--2xs">{label?.replace(/_/g, ' ')}</span>
      <div className="input-container">
        {textarea ? (
          <textarea
            className="textarea input"
            value={value}
            name={name}
            required={required}
            placeholder={placeholder?.replace(/_/g, ' ')}
            onChange={onChange}
            {...props}
          ></textarea>
        ) : (
          <input
            className={`input ${errorMessage ? 'error-input' : ''}`}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder?.replace(/_/g, ' ')}
            onChange={onChange}
            {...props}
          />
        )}
        <div className="input-icons">{children}</div>
      </div>
      <p className="error-message text--2xs">{errorMessage}</p>
    </label>
  )
}
