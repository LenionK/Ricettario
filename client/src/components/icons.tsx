import type { ReactNode } from 'react'

type IconProps = {
  size?: number
  className?: string
}

function Icon({ size = 24, className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function BowlIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 11h18a9 9 0 0 1-18 0Z" />
      <path d="M8 22h8" />
      <path d="M8 3c-1 1.2 1 2.4 0 4.5" />
      <path d="M12 3c-1 1.2 1 2.4 0 4.5" />
      <path d="M16 3c-1 1.2 1 2.4 0 4.5" />
    </Icon>
  )
}

export function UsersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </Icon>
  )
}
