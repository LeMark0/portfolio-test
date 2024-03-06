import { FC, PropsWithChildren } from 'react'

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return <div className="bg-slate-800 border-slate-600 rounded-lg">{children}</div>
}
