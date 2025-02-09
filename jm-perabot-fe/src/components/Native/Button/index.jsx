const Button = ({ children, className, onClick }) => {
  return (
    <div
      className={`bg-black flex items-center p-2 text-white cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Button
