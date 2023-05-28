/*-------------------------------------------------------------------
|  🐼 React FC Input
|
|  🐯 Purpose: RE-USEABLE INPUT COMPOENT
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/

import cn from 'classnames'
import { findInputError, isFormInvalid } from '../utils'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'

export const Input = ({
  name,
  label,
  type,
  id,
  placeholder,
  validation,
  multiline,
  multiType,
  className,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const inputErrors = findInputError(errors, name)
  const isInvalid = isFormInvalid(inputErrors)

  const [passwordType, setPasswordType] = useState(type)

  const input_tailwind = 'bg-white p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60'
  const view_password = 'relative right-auto'

  return (
    <div className={cn('flex flex-col w-full gap-2', className)}>
      <div className="flex justify-between">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error.message}
              key={inputErrors.error.message}
            />
          )}
        </AnimatePresence>
      </div>
      {multiline ? (
        <textarea
          id={id}
          type={type}
          className={cn(input_tailwind, 'min-h-[10rem] max-h-[20rem] resize-y')}
          placeholder={placeholder}
          {...register(name, validation)}
        ></textarea>
      ) : (
        <>
          {multiType ? (
            <>
              <div className={cn(input_tailwind) + 'relative flex flex-row'}>
                <input
                  id={id}
                  type={passwordType}
                  className="w-[100%] focus:outline-none "
                  placeholder={placeholder}
                  {...register(name, validation)}
                />
                {passwordType === 'password' ? (
                  <button
                    className={cn(view_password)}
                    onClick={() => {
                      setPasswordType('text')
                    }}
                  >
                    <FaEye />
                  </button>
                ) : (
                  <button
                    className={cn(view_password)}
                    onClick={() => {
                      setPasswordType('password')
                    }}
                  >
                    <FaEyeSlash />
                  </button>
                )}
              </div>
            </>
          ) : (
            <input
              id={id}
              type={type}
              className={cn(input_tailwind)}
              placeholder={placeholder}
              {...register(name, validation)}
            />
          )}
        </>
      )}
    </div>
  )
}

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  )
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}
