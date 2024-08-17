import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type CN<T> = T & { className?: string }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ClassNameProps = {
  className?: string
}
