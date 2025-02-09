import { useEffect } from 'react'

const Input = ({ type, label, placeholder, className, pseudoRef }) => {
  useEffect(() => {
    console.log('REF', pseudoRef)
  })
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div className="mr-5 text-lg font-medium">{label}</div>
      <input
        type={type || 'text'}
        placeholder={placeholder}
        className="border border-black focus:outline-none px-2 py-1"
        ref={pseudoRef}
      />
    </div>
  )
}

export default Input
