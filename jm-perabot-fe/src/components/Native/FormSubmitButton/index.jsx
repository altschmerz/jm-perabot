import { useForm } from 'react-hook-form'

const FormSubmitButton = ({ children, className, isForm, onClick }) => {
  const { handleSubmit } = useForm()

  return (
    <div
      className={`bg-black flex items-center p-2 text-white cursor-pointer ${className}`}
      onClick={onClick}
      // onClick={handleSubmit(onClick)}
    >
      {children}
    </div>
  )
}

export default FormSubmitButton
