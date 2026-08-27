import React from 'react';

export const LargeButton = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'success'
  size = 'lg',        // 'md' | 'lg' | 'xl'
  icon: Icon,
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel,
  subtext,
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 touch-manipulation select-none";

  const sizeStyles = {
    md: "px-5 py-3 text-sm gap-2 min-h-[44px]",
    lg: "px-6 py-3.5 text-base gap-2.5 min-h-[52px]",
    xl: "px-8 py-4.5 text-lg gap-3 min-h-[60px] w-full",
  };

  const variantStyles = {
    primary: "bg-sky-600 hover:bg-sky-700 text-white shadow-sm border border-sky-700",
    secondary: "bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm",
    accent: "bg-teal-600 hover:bg-teal-700 text-white shadow-sm border border-teal-700",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm border border-red-700",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border border-emerald-700",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700 border border-transparent",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className={`${size === 'xl' ? 'w-6 h-6' : 'w-5 h-5'} shrink-0`} />}
      <div className="flex flex-col items-center">
        <span className="leading-snug">{children}</span>
        {subtext && <span className="text-xs font-normal opacity-90 mt-0.5">{subtext}</span>}
      </div>
    </button>
  );
};
