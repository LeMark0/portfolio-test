import { Tabs as BaseTabs } from 'flowbite-react'

type Props = {
  options: string[]
  value: Props['options'][0]
  onChange: (value: Props['value']) => void
}

export const Tabs = ({ options, value, onChange }: Props) => {
  return (
    <BaseTabs
      aria-label="Tabs"
      style="pills"
      onActiveTabChange={(index: number) => {
        onChange(options[index])
      }}
    >
      {options.map((option) => (
        <BaseTabs.Item
          key={option}
          active={value === option}
          title={option}
          onClick={() => onChange(option)}
        />
      ))}
    </BaseTabs>
  )
}
