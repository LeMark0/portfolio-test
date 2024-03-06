import { Dropdown } from 'flowbite-react'
import { useMemo } from 'react'

type Props = {
  options: { value: string; label: string }[]
  value?: string
  label?: string
  onChange: (value: string | null) => void
  className?: string
}

export const DropdownSelect = ({ options = [], value, label, onChange }: Props) => {
  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  )

  const defaultLabel = label ?? 'Select'
  const defaultOption = { value: null, label: defaultLabel }

  return (
    <Dropdown label={selectedOption ? selectedOption.label : defaultLabel}>
      {[defaultOption, ...options].map((option) => (
        <Dropdown.Item key={option.label} onClick={() => onChange(option.value)}>
          {option.label}
        </Dropdown.Item>
      ))}
    </Dropdown>
  )
}
