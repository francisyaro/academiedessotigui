import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-primary/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-ivory text-dark-bg hover:bg-white',
    secondary: 'bg-dark-surface text-ivory border border-border-color hover:bg-dark-bg',
    gold: 'gold-gradient text-dark-bg hover:brightness-110 gold-glow-hover font-semibold',
    outline: 'border-2 border-gold-primary text-gold-light hover:bg-gold-primary hover:text-dark-bg',
    ghost: 'text-gray-text hover:text-white hover:bg-dark-surface/50'
  }

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
