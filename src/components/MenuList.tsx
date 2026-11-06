import type { MenuItem } from '../types'
import { CATEGORIES, CATEGORY_LABELS } from '../types'

const CATEGORY_EMOJI: Record<string, string> = {
  Starters: '🥗',
  Mains: '🍽',
  Desserts: '🍮',
  Drinks: '🥤',
  All: '📋',
}

interface Props {
  items: MenuItem[]
  filterCategory: string
  setFilterCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  onView: (item: MenuItem) => void
  onAdd: () => void
  onToggleAvailable: (id: string) => void
  onNotify: (message: string) => void
}

export default function MenuList({
  items,
  filterCategory,
  setFilterCategory,
  searchQuery,
  setSearchQuery,
  onView,
  onAdd,
  onToggleAvailable,
}: Props) {

  // Search and filter menu items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim())

    const matchesCategory =
      filterCategory === 'All' ||
      item.category === filterCategory

    return matchesSearch && matchesCategory
  })

  // Group items by category
  const grouped = CATEGORIES.reduce<Record<string, MenuItem[]>>(
    (groups, category) => {
      const categoryItems = filteredItems.filter(
        item => item.category === category
      )

      if (categoryItems.length > 0) {
        groups[category] = categoryItems
      }

      return groups
    },
    {}
  )

  // Calculate menu statistics
  const totalItems = items.length

  const averagePrice =
    totalItems > 0
      ? items.reduce((total, item) => total + item.price, 0) / totalItems
      : 0

  const availableItems = items.filter(item => item.available).length

  const courseCounts = {
    Starters: items.filter(item => item.category === 'Starters').length,
    Mains: items.filter(item => item.category === 'Mains').length,
    Desserts: items.filter(item => item.category === 'Desserts').length,
  }

  // Clear search and filters
  const clearFilters = () => {
    setSearchQuery('')
    setFilterCategory('All')
  }

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>

      {/* Header */}
      <div
        className="px-6 pt-14 pb-6"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="flex items-start justify-between mb-1">
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{
                color: 'var(--color-amber)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                letterSpacing: '0.15em',
              }}
            >
              An Evening in Provence
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--color-cream)',
                lineHeight: 1.15,
              }}
            >
              Menu<br />
              <em style={{ fontWeight: 400 }}>Manager</em>
            </h1>
          </div>

          <div className="text-right">
            <div
              style={{
                fontSize: 28,
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: 'var(--color-amber)',
              }}
            >
              {totalItems}
            </div>

            <div
              style={{
                fontSize: 11,
                color: 'var(--color-cream-dim)',
                fontFamily: 'var(--font-body)',
              }}
            >
              dishes total
            </div>

            <div
              style={{
                fontSize: 11,
                color: 'var(--color-green)',
                fontFamily: 'var(--font-body)',
                marginTop: 2,
              }}
            >
              {availableItems} available
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div style={{ marginTop: 20 }}>
          <input
            type="search"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            placeholder="Search for a dish..."
            aria-label="Search menu items by name"
            style={{
              width: '100%',
              padding: '13px 15px',
              borderRadius: 12,
              border: '1px solid var(--color-border)',
              background: 'var(--color-canvas)',
              color: 'var(--color-cream)',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              outline: 'none',
            }}
          />
        </div>

        {/* Category filters */}
        <div
          className="flex gap-2 mt-4 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none' }}
        >
          {['All', ...CATEGORIES].map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                fontFamily: 'var(--font-body)',
                background:
                  filterCategory === category
                    ? 'var(--color-amber)'
                    : 'var(--color-surface-raised)',
                color:
                  filterCategory === category
                    ? '#1a1410'
                    : 'var(--color-cream-dim)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {CATEGORY_EMOJI[category]}{' '}
              {category === 'All'
                ? 'All'
                : CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
            </button>
          ))}
        </div>

        {/* Clear filters */}
        {(searchQuery !== '' || filterCategory !== 'All') && (
          <button
            onClick={clearFilters}
            style={{
              marginTop: 12,
              background: 'transparent',
              border: 'none',
              color: 'var(--color-amber)',
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ✕ Clear search and filters
          </button>
        )}
      </div>

      {/* Menu statistics */}
      <div
        className="px-4 py-4"
        style={{ background: 'var(--color-canvas)' }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            color: 'var(--color-cream)',
            marginBottom: 12,
            fontWeight: 600,
          }}
        >
          Menu Statistics
        </h2>

        <div className="grid grid-cols-2 gap-3">

          <StatisticCard
            label="Total Items"
            value={String(totalItems)}
          />

          <StatisticCard
            label="Average Price"
            value={`R${averagePrice.toFixed(2)}`}
          />

          <StatisticCard
            label="Starters"
            value={String(courseCounts.Starters)}
          />

          <StatisticCard
            label="Main Courses"
            value={String(courseCounts.Mains)}
          />

          <StatisticCard
            label="Desserts"
            value={String(courseCounts.Desserts)}
          />

        </div>
      </div>

      {/* Menu items */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{ background: 'var(--color-canvas)' }}
      >

        {filteredItems.length === 0 && (
          <div
            className="text-center py-16"
            style={{
              color: 'var(--color-cream-dim)',
              fontFamily: 'var(--font-body)',
            }}
          >
            <p style={{ fontSize: 28, marginBottom: 10 }}>🔍</p>
            <p>No menu items found.</p>
            <p className="text-xs mt-2">
              Try another search or clear your filters.
            </p>
          </div>
        )}

        {Object.entries(grouped).map(([category, categoryItems]) => (
          <div key={category} className="mb-6">

            {(filterCategory === 'All' || searchQuery.trim() !== '') && (
              <div className="flex items-center gap-2 mb-3">

                <span
                  style={{
                    fontSize: 13,
                    color: 'var(--color-amber)',
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontWeight: 600,
                  }}
                >
                  {CATEGORY_EMOJI[category]}{' '}
                  {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
                </span>

                <div
                  className="flex-1"
                  style={{
                    height: 1,
                    background: 'var(--color-border)',
                  }}
                />

                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--color-cream-dim)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {categoryItems.length}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {categoryItems.map(item => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onView={onView}
                  onToggleAvailable={onToggleAvailable}
                />
              ))}
            </div>

          </div>
        ))}

        <div style={{ height: 96 }} />
      </div>

      {/* Add menu item button */}
      <div
        className="fixed"
        style={{
          bottom: 28,
          right: 0,
          left: 0,
          maxWidth: 430,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: 24,
          pointerEvents: 'none',
        }}
      >
        <button
          onClick={onAdd}
          aria-label="Add a new menu item"
          style={{
            pointerEvents: 'all',
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'var(--color-amber)',
            color: '#1a1410',
            border: 'none',
            fontSize: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 24px rgba(212,136,58,0.4)',
          }}
        >
          +
        </button>
      </div>

    </div>
  )
}

// Reusable statistics card
function StatisticCard({
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
          fontSize: 20,
          color: 'var(--color-amber)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
        }}
      >
        {value}
      </p>
    </div>
  )
}

// Reusable menu card
function MenuCard({
  item,
  onView,
  onToggleAvailable,
}: {
  item: MenuItem
  onView: (item: MenuItem) => void
  onToggleAvailable: (id: string) => void
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        cursor: 'pointer',
      }}
      onClick={() => onView(item)}
    >
      <div className="flex-1 min-w-0">

        <p
          className="truncate"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 15,
            fontWeight: 600,
            color: item.available
              ? 'var(--color-cream)'
              : 'var(--color-cream-dim)',
          }}
        >
          {item.name}
        </p>

        <p
          className="text-xs mt-0.5 truncate"
          style={{
            color: 'var(--color-cream-dim)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {item.preparationTime} min · {item.description.slice(0, 52)}
          {item.description.length > 52 ? '…' : ''}
        </p>

      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">

        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 15,
            color: 'var(--color-amber)',
          }}
        >
          R{item.price.toFixed(2)}
        </span>

        <button
          onClick={event => {
            event.stopPropagation()
            onToggleAvailable(item.id)
          }}
          className="px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{
            fontFamily: 'var(--font-body)',
            background: item.available
              ? 'rgba(74,124,89,0.2)'
              : 'rgba(192,64,42,0.2)',
            color: item.available
              ? 'var(--color-green)'
              : 'var(--color-red)',
            border: `1px solid ${
              item.available
                ? 'var(--color-green)'
                : 'var(--color-red)'
            }`,
            cursor: 'pointer',
          }}
        >
          {item.available ? 'On' : 'Off'}
        </button>

      </div>
    </div>
  )
}