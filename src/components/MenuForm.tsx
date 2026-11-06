import { useState } from 'react'
import type { MenuItem } from '../types'
import { CATEGORIES } from '../types'

interface Props {
  item?: MenuItem
  onSave: (item: MenuItem) => void
  onBack: () => void
  onNotify: (message: string) => void
}

export default function MenuForm({
  item,
  onSave,
  onBack,
  onNotify,
}: Props) {

  const isEdit = !!item

  const [name, setName] = useState(item?.name ?? '')
  const [category, setCategory] = useState(item?.category ?? 'Starters')
  const [price, setPrice] = useState(item ? String(item.price) : '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [prepTime, setPrepTime] = useState(
    item ? String(item.preparationTime) : ''
  )
  const [available, setAvailable] = useState(item?.available ?? true)

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validate all form fields
  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = 'Please enter a dish name.'
    }

    if (!description.trim()) {
      newErrors.description = 'Please enter a dish description.'
    }

    const numericPrice = Number(price)

    if (
      price.trim() === '' ||
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      newErrors.price = 'Please enter a valid price greater than zero.'
    }

    const numericPrepTime = Number(prepTime)

    if (
      prepTime.trim() === '' ||
      !Number.isInteger(numericPrepTime) ||
      numericPrepTime <= 0
    ) {
      newErrors.prepTime = 'Preparation time must be a positive whole number.'
    }

    return newErrors
  }

  // Save the menu item
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validate()

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      onNotify('Please correct the errors in the form.')
      return
    }

    const savedItem: MenuItem = {
      id: item?.id ?? String(Date.now()),
      name: name.trim(),
      category,
      price: Number(price),
      description: description.trim(),
      preparationTime: Number(prepTime),
      available,
    }

    onSave(savedItem)
  }

  // Update a field and clear its error
 const updateField = (field: string) => {
  setErrors(previous => ({
    ...previous,
    [field]: '',
  }))
}

  return (
    <div
      className="flex flex-col"
      style={{ minHeight: '100vh' }}
    >

      {/* Header */}
      <div
        className="flex items-center justify-between px-5 pt-14 pb-4"
        style={{ background: 'var(--color-surface)' }}
      >

        <button
          type="button"
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-amber)',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          ← Cancel
        </button>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 18,
            color: 'var(--color-cream)',
          }}
        >
          {isEdit ? 'Edit Dish' : 'New Dish'}
        </h2>

        <button
          type="button"
          onClick={() => {
            const form = document.getElementById('menu-item-form')
            if (form instanceof HTMLFormElement) {
              form.requestSubmit()
            }
          }}
          style={{
            background: 'var(--color-amber)',
            border: 'none',
            color: '#1a1410',
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            borderRadius: 8,
            padding: '6px 14px',
          }}
        >
          {isEdit ? 'Update' : 'Add'}
        </button>

      </div>

      {/* Form */}
      <form
        id="menu-item-form"
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto px-6 py-6"
        style={{ background: 'var(--color-canvas)' }}
      >

        {/* Dish name */}
        <Field label="Dish Name" error={errors.name}>
          <input
            type="text"
            value={name}
            onChange={event => {
              setName(event.target.value)
              updateField('name')
            }}
            placeholder="Enter dish name"
            maxLength={60}
            style={inputStyle}
          />
        </Field>

        {/* Category */}
        <Field label="Category">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: 'none',
                  cursor: 'pointer',
                  background:
                    category === cat
                      ? 'var(--color-amber)'
                      : 'var(--color-surface-raised)',
                  color:
                    category === cat
                      ? '#1a1410'
                      : 'var(--color-cream-dim)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </Field>

        {/* Price and preparation time */}
        <div className="grid grid-cols-2 gap-3">

          <Field label="Price (R)" error={errors.price}>
            <input
              type="number"
              value={price}
              onChange={event => {
                setPrice(event.target.value)
                updateField('price')
              }}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              style={inputStyle}
            />
          </Field>

          <Field label="Prep Time (min)" error={errors.prepTime}>
            <input
              type="number"
              value={prepTime}
              onChange={event => {
                setPrepTime(event.target.value)
                updateField('prepTime')
              }}
              placeholder="15"
              min="1"
              step="1"
              style={inputStyle}
            />
          </Field>

        </div>

        {/* Description */}
        <Field label="Description" error={errors.description}>
          <textarea
            value={description}
            onChange={event => {
              setDescription(event.target.value)
              updateField('description')
            }}
            placeholder="Describe the dish and its ingredients..."
            rows={4}
            maxLength={300}
            style={{
              ...inputStyle,
              resize: 'none',
              lineHeight: 1.6,
            }}
          />
        </Field>

        {/* Availability */}
        <Field label="Status">
          <button
            type="button"
            onClick={() => setAvailable(value => !value)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >

            <div
              style={{
                width: 40,
                height: 22,
                borderRadius: 11,
                background: available
                  ? 'var(--color-green)'
                  : 'var(--color-surface-raised)',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: '#fff',
                  position: 'absolute',
                  top: 2,
                  left: available ? 20 : 2,
                }}
              />
            </div>

            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: available
                  ? 'var(--color-green)'
                  : 'var(--color-cream-dim)',
              }}
            >
              {available ? 'Available on menu' : 'Hidden from menu'}
            </span>

          </button>
        </Field>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl font-bold text-base"
          style={{
            fontFamily: 'var(--font-body)',
            background: 'var(--color-amber)',
            color: '#1a1410',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            letterSpacing: '0.02em',
          }}
        >
          {isEdit ? 'Update Dish' : 'Add to Menu'}
        </button>

      </form>
    </div>
  )
}

// Reusable input styling
const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 12,
  padding: '12px 14px',
  color: 'var(--color-cream)',
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  outline: 'none',
}

// Reusable form field component
function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-4">

      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--color-cream-dim)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: 8,
        }}
      >
        {label}
      </label>

      {children}

      {error && (
        <p
          role="alert"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'var(--color-red)',
            marginTop: 4,
          }}
        >
          {error}
        </p>
      )}

    </div>
  )
}