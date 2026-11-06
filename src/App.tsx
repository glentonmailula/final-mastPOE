import { useState } from 'react'
import MenuList from './components/MenuList'
import MenuForm from './components/MenuForm'
import MenuDetail from './components/MenuDetail'
import WireframeGallery from './components/WireframeGallery'
import type { MenuItem } from './types'

const INITIAL_ITEMS: MenuItem[] = [
  { id: '1', name: 'Bouillabaisse Provençale', category: 'Starters', price: 18.5, description: 'Classic Provençal fish stew with saffron broth, rouille, and grilled sourdough.', available: true, preparationTime: 20 },
  { id: '2', name: 'Duck Confit', category: 'Mains', price: 34, description: 'Slow-cooked duck leg, lentil du Puy, cherry jus, and wilted greens.', available: true, preparationTime: 35 },
  { id: '3', name: 'Tarte Tatin', category: 'Desserts', price: 12.5, description: 'Caramelised Granny Smith apple tart with crème fraîche and salted caramel drizzle.', available: true, preparationTime: 15 },
  { id: '4', name: 'Burrata & Heritage Tomato', category: 'Starters', price: 16, description: 'Creamy burrata, heirloom tomatoes, aged balsamic, Ligurian olive oil, micro basil.', available: true, preparationTime: 10 },
  { id: '5', name: 'Pan-Seared Salmon', category: 'Mains', price: 29, description: 'Atlantic salmon, celeriac purée, samphire, lemon-caper beurre blanc.', available: false, preparationTime: 25 },
  { id: '6', name: 'Elderflower Panna Cotta', category: 'Desserts', price: 10, description: 'Set cream with elderflower cordial, fresh gooseberry compote, and tuile.', available: true, preparationTime: 5 },
  { id: '7', name: 'Château Reserve Rouge', category: 'Drinks', price: 14, description: 'Full-bodied Bordeaux blend, notes of dark cherry, cedar, and tobacco.', available: true, preparationTime: 2 },
  { id: '8', name: 'House Digestif', category: 'Drinks', price: 9, description: 'Rotating artisanal spirit selection, served neat or on ice.', available: true, preparationTime: 2 },
]

export type Screen = 'list' | 'detail' | 'add' | 'edit'

export default function App() {
  const [mode, setMode] = useState<'wireframes' | 'app'>('wireframes')
  const [items, setItems] = useState<MenuItem[]>(INITIAL_ITEMS)
  const [screen, setScreen] = useState<Screen>('list')
  const [selected, setSelected] = useState<MenuItem | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [notice, setNotice] = useState('')

  const showNotice = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3000)
  }

  // Add a menu item
  const handleAdd = (item: MenuItem) => {
    setItems(prev => [...prev, item])
    setScreen('list')
    showNotice('Menu item added successfully.')
  }

  // Update a menu item
  const handleUpdate = (item: MenuItem) => {
    setItems(prev => prev.map(existing =>
      existing.id === item.id ? item : existing
    ))
    setSelected(item)
    setScreen('detail')
    showNotice('Menu item updated successfully.')
  }

  // Delete a menu item
  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
    setSelected(null)
    setScreen('list')
    showNotice('Menu item deleted successfully.')
  }

  // Change availability
  const handleToggleAvailable = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, available: !item.available }
        : item
    ))

    setSelected(prev =>
      prev?.id === id
        ? { ...prev, available: !prev.available }
        : prev
    )

    showNotice('Menu availability updated.')
  }

  // View item details
  const handleView = (item: MenuItem) => {
    setSelected(item)
    setScreen('detail')
  }

  // Navigate backwards
  const handleBack = () => {
    if (screen === 'detail' || screen === 'add') {
      setScreen('list')
    } else if (screen === 'edit') {
      setScreen('detail')
    }
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>

      {/* Mode selection */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          padding: '10px 16px',
          background: mode === 'wireframes' ? '#ede8e0' : '#1a1410',
        }}
      >
        <div style={{ display: 'flex', borderRadius: 24, padding: 3, gap: 2 }}>
          {(['wireframes', 'app'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '7px 16px',
                borderRadius: 20,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
                background: mode === m
                  ? (m === 'wireframes' ? '#2a1f12' : '#c87d30')
                  : 'transparent',
                color: mode === m ? '#fff' : '#888',
              }}
            >
              {m === 'wireframes' ? '📐 Screen Designs' : '📱 Live App'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: 50 }}>
        {mode === 'wireframes' ? (
          <WireframeGallery />
        ) : (
          <div
            className="min-h-screen flex items-start justify-center"
            style={{ background: 'var(--color-canvas)' }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{
                maxWidth: 430,
                minHeight: '100vh',
                background: 'var(--color-canvas)',
                boxShadow: '0 0 80px rgba(0,0,0,0.6)',
              }}
            >

              {/* Success and error messages */}
              {notice && (
                <div
                  role="status"
                  style={{
                    position: 'fixed',
                    top: 65,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 200,
                    background: '#4a7c59',
                    color: '#fff',
                    padding: '12px 20px',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {notice}
                </div>
              )}

              {screen === 'list' && (
                <MenuList
                  items={items}
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onView={handleView}
                  onAdd={() => setScreen('add')}
                  onToggleAvailable={handleToggleAvailable}
                  onNotify={showNotice}
                />
              )}

              {screen === 'detail' && selected && (
                <MenuDetail
                  item={items.find(i => i.id === selected.id) ?? selected}
                  onBack={handleBack}
                  onEdit={() => setScreen('edit')}
                  onDelete={handleDelete}
                  onToggleAvailable={handleToggleAvailable}
                  onNotify={showNotice}
                />
              )}

              {screen === 'add' && (
                <MenuForm
                  onSave={handleAdd}
                  onBack={handleBack}
                  onNotify={showNotice}
                />
              )}

              {screen === 'edit' && selected && (
                <MenuForm
                  item={items.find(i => i.id === selected.id) ?? selected}
                  onSave={handleUpdate}
                  onBack={handleBack}
                  onNotify={showNotice}
                />
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  )
}