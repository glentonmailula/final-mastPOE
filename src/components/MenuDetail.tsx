import type { MenuItem } from '../types'
import { CATEGORY_LABELS } from '../types'

interface Props {
  item: MenuItem
  onBack: () => void
  onEdit: () => void
  onDelete: (id: string) => void
  onToggleAvailable: (id: string) => void
  onNotify: (message: string) => void
}

const CATEGORY_EMOJI: Record<string, string> = {
  Starters: '🥗',
  Mains: '🍽',
  Desserts: '🍮',
  Drinks: '🥤',
}

export default function MenuDetail({
  item,
  onBack,
  onEdit,
  onDelete,
  onToggleAvailable,
  onNotify,
}: Props) {

  // Confirm before deleting a dish
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    )

    if (confirmed) {
      onDelete(item.id)
    } else {
      onNotify('Deletion cancelled.')
    }
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
          ← Back
        </button>

        <button
          onClick={onEdit}
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-cream)',
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            cursor: 'pointer',
            borderRadius: 8,
            padding: '7px 16px',
          }}
        >
          ✎ Edit Dish
        </button>

      </div>

      {/* Dish information */}
      <div
        className="flex-1 px-6 py-6"
        style={{ background: 'var(--color-canvas)' }}
      >

        {/* Category and availability */}
        <div className="flex items-center gap-2 flex-wrap mb-5">

          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              fontFamily: 'var(--font-body)',
              background: 'rgba(212,136,58,0.15)',
              color: 'var(--color-amber)',
              border: '1px solid rgba(212,136,58,0.3)',
            }}
          >
            {CATEGORY_EMOJI[item.category]}{' '}
            {CATEGORY_LABELS[item.category]}
          </span>

          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              fontFamily: 'var(--font-body)',
              background: item.available
                ? 'rgba(74,124,89,0.15)'
                : 'rgba(192,64,42,0.15)',
              color: item.available
                ? 'var(--color-green)'
                : 'var(--color-red)',
              border: `1px solid ${
                item.available
                  ? 'rgba(74,124,89,0.4)'
                  : 'rgba(192,64,42,0.4)'
              }`,
            }}
          >
            {item.available ? '● Available' : '● Off Menu'}
          </span>

        </div>

        {/* Dish name */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 27,
            fontWeight: 700,
            color: 'var(--color-cream)',
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          {item.name}
        </h2>

        {/* Dish price */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 24,
            fontWeight: 600,
            color: 'var(--color-amber)',
            marginBottom: 20,
          }}
        >
          R{item.price.toFixed(2)}
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'var(--color-border)',
            marginBottom: 20,
          }}
        />

        {/* Description */}
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--color-amber)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 8,
          }}
        >
          Description
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: 'var(--color-cream-dim)',
            lineHeight: 1.7,
            marginBottom: 25,
          }}
        >
          {item.description}
        </p>

        {/* Dish statistics */}
        <div className="grid grid-cols-2 gap-3 mb-8">

          <StatTile
            label="Preparation Time"
            value={`${item.preparationTime} minutes`}
          />

          <StatTile
            label="Category"
            value={CATEGORY_LABELS[item.category]}
          />

          <StatTile
            label="Price"
            value={`R${item.price.toFixed(2)}`}
          />

          <StatTile
            label="Availability"
            value={item.available ? 'Available' : 'Unavailable'}
          />

        </div>

        {/* Availability button */}
        <button
          onClick={() => onToggleAvailable(item.id)}
          className="w-full py-3 rounded-xl text-sm font-semibold mb-3"
          style={{
            fontFamily: 'var(--font-body)',
            background: item.available
              ? 'rgba(192,64,42,0.12)'
              : 'rgba(74,124,89,0.12)',
            color: item.available
              ? 'var(--color-red)'
              : 'var(--color-green)',
            border: `1px solid ${
              item.available
                ? 'rgba(192,64,42,0.4)'
                : 'rgba(74,124,89,0.4)'
            }`,
            cursor: 'pointer',
          }}
        >
          {item.available
            ? 'Remove from Menu'
            : 'Add Back to Menu'}
        </button>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          className="w-full py-3 rounded-xl text-sm font-semibold"
          style={{
            fontFamily: 'var(--font-body)',
            background: 'transparent',
            color: 'var(--color-red)',
            border: '1px solid var(--color-red)',
            cursor: 'pointer',
          }}
        >
          Delete Dish
        </button>

      </div>
    </div>
  )
}

// Reusable information card
function StatTile({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >

      <p
        style={{
          fontSize: 11,
          color: 'var(--color-cream-dim)',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 5,
        }}
      >
        {label}
      </p>

      <p
        style={{
          fontSize: 15,
          color: 'var(--color-cream)',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
        }}
      >
        {value}
      </p>

    </div>
  )
}