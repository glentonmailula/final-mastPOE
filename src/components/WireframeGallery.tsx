export default function WireframeGallery() {
  return (
    <div style={{ fontFamily: 'var(--font-body)', background: '#f5f0ea', minHeight: '100vh', padding: '40px 24px' }}>
      {/* Page header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#a08060', textTransform: 'uppercase', marginBottom: 8 }}>
          An Evening in Provence — Menu Manager
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: '#2a1f12', marginBottom: 6 }}>
          Application Screen Designs
        </h1>
        <p style={{ fontSize: 13, color: '#7a6a55' }}>
          Mobile wireframes · React Native · 4 primary screens
        </p>
        <div style={{ width: 48, height: 3, background: '#c87d30', borderRadius: 2, margin: '16px auto 0' }} />
      </div>

      {/* Grid of screens */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, maxWidth: 1280, margin: '0 auto' }}>
        <ScreenFrame title="Screen 1" subtitle="Menu Overview" color="#c87d30">
          <Screen1 />
        </ScreenFrame>
        <ScreenFrame title="Screen 2" subtitle="Dish Detail View" color="#2d6a4f">
          <Screen2 />
        </ScreenFrame>
        <ScreenFrame title="Screen 3" subtitle="Add New Dish" color="#3a5a8c">
          <Screen3 />
        </ScreenFrame>
        <ScreenFrame title="Screen 4" subtitle="Edit Dish" color="#8b3a3a">
          <Screen4 />
        </ScreenFrame>
      </div>

      {/* Legend */}
      <div style={{ maxWidth: 1280, margin: '56px auto 0', padding: '24px 28px', background: '#fff', borderRadius: 16, border: '1px solid #ddd5c5' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: '#2a1f12', marginBottom: 16 }}>UI Element Legend</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {[
            { el: <RectEl fill="#d4e4ff" stroke="#5580c0" />, label: 'Text field / Input' },
            { el: <RectEl fill="#c87d30" stroke="#c87d30" text="#fff" label="Button" />, label: 'Primary button' },
            { el: <RectEl fill="#fff" stroke="#aaa" label="Button" />, label: 'Secondary button' },
            { el: <RectEl fill="#e8f5ec" stroke="#2d6a4f" text="#2d6a4f" label="Available" />, label: 'Status badge' },
            { el: <RectEl fill="#f5f0ea" stroke="#c87d30" label="▼ Category" />, label: 'Dropdown / Picker' },
            { el: <ListEl />, label: 'List row' },
            { el: <ToggleEl on />, label: 'Toggle switch (on)' },
            { el: <ToggleEl on={false} />, label: 'Toggle switch (off)' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {item.el}
              <span style={{ fontSize: 12, color: '#5a4a35' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p style={{ textAlign: 'center', marginTop: 32, fontSize: 11, color: '#a09080' }}>
        Wireframes · An Evening in Provence · 2026
      </p>
    </div>
  )
}

function RectEl({ fill = '#eee', stroke = '#999', text = '#333', label = '' }: { fill?: string; stroke?: string; text?: string; label?: string }) {
  return (
    <div style={{ width: 72, height: 26, background: fill, border: `1.5px solid ${stroke}`, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: text }}>{label || ' '}</span>
    </div>
  )
}
function ListEl() {
  return (
    <div style={{ width: 72, height: 26, background: '#faf7f2', border: '1px solid #ddd5c5', borderRadius: 5, display: 'flex', alignItems: 'center', padding: '0 6px', flexShrink: 0, gap: 4 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c87d30', flexShrink: 0 }} />
      <div style={{ flex: 1, height: 3, background: '#ccc', borderRadius: 2 }} />
    </div>
  )
}
function ToggleEl({ on }: { on: boolean }) {
  return (
    <div style={{ width: 36, height: 20, borderRadius: 10, background: on ? '#2d6a4f' : '#ccc', position: 'relative', flexShrink: 0 }}>
      <div style={{ width: 16, height: 16, borderRadius: 8, background: '#fff', position: 'absolute', top: 2, left: on ? 18 : 2, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </div>
  )
}

/* ─── Frame wrapper ─── */
function ScreenFrame({ title, subtitle, color, children }: { title: string; subtitle: string; color: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{title}</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#2a1f12', marginTop: 2 }}>{subtitle}</h2>
      </div>
      {/* Phone shell */}
      <div style={{
        width: '100%',
        maxWidth: 340,
        margin: '0 auto',
        background: '#1a1410',
        borderRadius: 40,
        padding: '14px 10px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.22)',
        border: '2px solid #333',
      }}>
        {/* Notch */}
        <div style={{ width: 90, height: 22, background: '#111', borderRadius: 12, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#333' }} />
          <div style={{ width: 30, height: 5, borderRadius: 3, background: '#333' }} />
        </div>
        {/* Screen */}
        <div style={{ background: '#1c1710', borderRadius: 28, overflow: 'hidden', border: '1px solid #2a2218' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/* ─── Shared mini-components ─── */
const WF = {
  Bg: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ background: '#1c1710', minHeight: 560, position: 'relative', ...style }}>{children}</div>
  ),
  TopBar: ({ left, center, right, light }: { left?: string; center?: string; right?: string; light?: boolean }) => (
    <div style={{ background: '#231e18', padding: '32px 14px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #3a3020' }}>
      <span style={{ fontSize: 11, color: '#c87d30', cursor: 'pointer' }}>{left}</span>
      <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: light ? '#f0e6d0' : '#c87d30' }}>{center}</span>
      <span style={{ fontSize: 11, color: '#c87d30', fontWeight: 700 }}>{right}</span>
    </div>
  ),
  Label: ({ children, color = '#a08060' }: { children: React.ReactNode; color?: string }) => (
    <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color, marginBottom: 4 }}>{children}</div>
  ),
  Input: ({ placeholder, value }: { placeholder?: string; value?: string }) => (
    <div style={{ background: '#231e18', border: '1.5px solid #3a5080', borderRadius: 8, padding: '7px 10px', marginBottom: 8 }}>
      <span style={{ fontSize: 11, color: value ? '#f0e6d0' : '#6a5a45' }}>{value || placeholder}</span>
    </div>
  ),
  Textarea: ({ placeholder }: { placeholder?: string }) => (
    <div style={{ background: '#231e18', border: '1.5px solid #3a5080', borderRadius: 8, padding: '7px 10px', marginBottom: 8, height: 52 }}>
      <span style={{ fontSize: 11, color: '#6a5a45' }}>{placeholder}</span>
    </div>
  ),
  Btn: ({ label, primary, danger, small }: { label: string; primary?: boolean; danger?: boolean; small?: boolean }) => (
    <div style={{
      background: primary ? '#c87d30' : danger ? 'rgba(192,64,42,0.15)' : '#2d2620',
      border: danger ? '1px solid rgba(192,64,42,0.5)' : primary ? 'none' : '1px solid #3d3528',
      borderRadius: small ? 6 : 10,
      padding: small ? '4px 10px' : '9px 0',
      textAlign: 'center',
      marginBottom: small ? 0 : 6,
    }}>
      <span style={{ fontSize: small ? 10 : 12, fontWeight: 700, color: primary ? '#1a1410' : danger ? '#c0402a' : '#a08060' }}>{label}</span>
    </div>
  ),
  Badge: ({ label, green, red }: { label: string; green?: boolean; red?: boolean }) => (
    <span style={{
      fontSize: 9, fontWeight: 700, borderRadius: 20, padding: '2px 8px',
      background: green ? 'rgba(74,124,89,0.2)' : red ? 'rgba(192,64,42,0.2)' : 'rgba(200,125,48,0.2)',
      color: green ? '#4a7c59' : red ? '#c0402a' : '#c87d30',
      border: `1px solid ${green ? 'rgba(74,124,89,0.5)' : red ? 'rgba(192,64,42,0.5)' : 'rgba(200,125,48,0.5)'}`,
      marginRight: 4,
    }}>{label}</span>
  ),
  Row: ({ name, price, available, prep }: { name: string; price: string; available: boolean; prep: string }) => (
    <div style={{ background: '#231e18', border: '1px solid #3d3528', borderRadius: 10, padding: '8px 10px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: '#f0e6d0', fontWeight: 600, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</p>
        <p style={{ fontSize: 9, color: '#7a6a55' }}>{prep} min</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, marginLeft: 8 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: '#c87d30' }}>{price}</span>
        <WF.Badge label={available ? 'On' : 'Off'} green={available} red={!available} />
      </div>
    </div>
  ),
  Divider: () => <div style={{ height: 1, background: '#3d3528', margin: '10px 0' }} />,
  Annot: ({ text, side = 'right', top }: { text: string; side?: 'left' | 'right'; top: number }) => (
    <div style={{ position: 'absolute', top, [side]: side === 'right' ? -130 : -130, width: 120, display: 'flex', alignItems: 'center', gap: 4, flexDirection: side === 'right' ? 'row' : 'row-reverse' }}>
      <div style={{ width: 24, height: 1, background: '#c87d30', flexShrink: 0 }} />
      <span style={{ fontSize: 9, color: '#c87d30', fontWeight: 600, lineHeight: 1.3, textAlign: side === 'right' ? 'left' : 'right' }}>{text}</span>
    </div>
  ),
}

/* ─── Screen 1: Menu List ─── */
function Screen1() {
  return (
    <WF.Bg>
      {/* Status bar */}
      <div style={{ background: '#231e18', padding: '8px 14px 0', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 9, color: '#7a6a55' }}>9:41</span>
        <span style={{ fontSize: 9, color: '#7a6a55' }}>●●●</span>
      </div>
      {/* Header */}
      <div style={{ background: '#231e18', padding: '8px 14px 10px', borderBottom: '1px solid #3a3020' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.15em', color: '#c87d30', marginBottom: 2 }}>AN EVENING IN PROVENCE</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#f0e6d0', lineHeight: 1.15 }}>Menu<br /><em style={{ fontWeight: 400 }}>Manager</em></p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#c87d30' }}>8</p>
            <p style={{ fontSize: 9, color: '#7a6a55' }}>dishes total</p>
            <p style={{ fontSize: 9, color: '#4a7c59' }}>7 available</p>
          </div>
        </div>
        {/* Category filter tabs */}
        <div>
          <p style={{ fontSize: 8, color: '#7a6a55', marginBottom: 4 }}>CATEGORY FILTER TABS</p>
          <div style={{ display: 'flex', gap: 5, overflowX: 'hidden' }}>
            {['All', 'Starters', 'Mains', 'Desserts', 'Drinks'].map((c, i) => (
              <div key={c} style={{ flexShrink: 0, background: i === 0 ? '#c87d30' : '#2d2620', borderRadius: 20, padding: '3px 8px' }}>
                <span style={{ fontSize: 9, fontWeight: 600, color: i === 0 ? '#1a1410' : '#7a6a55' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* List */}
      <div style={{ padding: '10px 10px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 11, color: '#c87d30' }}>🥗 Starters</span>
          <div style={{ flex: 1, height: 1, background: '#3d3528' }} />
          <span style={{ fontSize: 9, color: '#7a6a55' }}>2</span>
        </div>
        <WF.Row name="Bouillabaisse Provençale" price="R18.50" available prep="20" />
        <WF.Row name="Burrata & Heritage Tomato" price="R16.00" available prep="10" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '8px 0 6px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 11, color: '#c87d30' }}>🍽 Mains</span>
          <div style={{ flex: 1, height: 1, background: '#3d3528' }} />
          <span style={{ fontSize: 9, color: '#7a6a55' }}>2</span>
        </div>
        <WF.Row name="Duck Confit" price="R34.00" available prep="35" />
        <WF.Row name="Pan-Seared Salmon" price="R29.00" available={false} prep="25" />
      </div>
      {/* FAB */}
      <div style={{ position: 'absolute', bottom: 16, right: 14, width: 40, height: 40, borderRadius: '50%', background: '#c87d30', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(200,125,48,0.4)' }}>
        <span style={{ color: '#1a1410', fontSize: 22, lineHeight: 1 }}>+</span>
      </div>

    </WF.Bg>
  )
}

/* ─── Screen 2: Detail ─── */
function Screen2() {
  return (
    <WF.Bg>
      <div style={{ background: '#231e18', padding: '8px 14px 0', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 9, color: '#7a6a55' }}>9:41</span>
        <span style={{ fontSize: 9, color: '#7a6a55' }}>●●●</span>
      </div>
      <WF.TopBar left="← Back" center="Dish Detail" right="Edit" light />
      <div style={{ padding: '12px 12px 10px' }}>
        {/* Badges */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          <WF.Badge label="🍽 Mains" />
          <WF.Badge label="● Available" green />
        </div>
        {/* Dish name */}
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#f0e6d0', marginBottom: 4, lineHeight: 1.2 }}>Duck Confit</p>
        {/* Price */}
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#c87d30', marginBottom: 10 }}>R34.00</p>
        <WF.Divider />
        {/* Description */}
        <p style={{ fontSize: 10, color: '#7a6a55', lineHeight: 1.6, marginBottom: 12 }}>
          Slow-cooked duck leg, lentil du Puy, cherry jus, and wilted greens. Served with gratin dauphinois.
        </p>
        {/* Stat tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          {[{ l: 'PREP TIME', v: '35 min' }, { l: 'CATEGORY', v: 'Mains' }].map(t => (
            <div key={t.l} style={{ background: '#231e18', border: '1px solid #3d3528', borderRadius: 10, padding: '8px 10px' }}>
              <p style={{ fontSize: 8, color: '#7a6a55', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>{t.l}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: '#f0e6d0', fontWeight: 600 }}>{t.v}</p>
            </div>
          ))}
        </div>
        <WF.Btn label="Remove from Menu" danger />
        <WF.Btn label="Delete Dish" />
      </div>

    </WF.Bg>
  )
}

/* ─── Screen 3: Add Form ─── */
function Screen3() {
  return (
    <WF.Bg>
      <div style={{ background: '#231e18', padding: '8px 14px 0', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 9, color: '#7a6a55' }}>9:41</span>
        <span style={{ fontSize: 9, color: '#7a6a55' }}>●●●</span>
      </div>
      <WF.TopBar left="← Cancel" center="New Dish" right="Add" light />
      <div style={{ padding: '10px 12px' }}>
        <WF.Label>Dish Name *</WF.Label>
        <WF.Input placeholder="e.g. Bouillabaisse Provençale" />
        <WF.Label>Category *</WF.Label>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
          {['Starters', 'Mains', 'Desserts', 'Drinks'].map((c, i) => (
            <div key={c} style={{ background: i === 0 ? '#c87d30' : '#2d2620', borderRadius: 20, padding: '3px 8px', border: 'none' }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: i === 0 ? '#1a1410' : '#7a6a55' }}>{c}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 0 }}>
          <div>
            <WF.Label>Price (R) *</WF.Label>
            <WF.Input placeholder="0.00" />
          </div>
          <div>
            <WF.Label>Prep Time (min) *</WF.Label>
            <WF.Input placeholder="15" />
          </div>
        </div>
        <WF.Label>Description *</WF.Label>
        <WF.Textarea placeholder="Describe ingredients, preparation…" />
        <WF.Label>Availability Status</WF.Label>
        <div style={{ background: '#231e18', border: '1px solid #3d3528', borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <WFToggle on />
          <span style={{ fontSize: 10, color: '#4a7c59' }}>Available on menu</span>
        </div>
        <div style={{ background: '#c87d30', borderRadius: 10, padding: '9px 0', textAlign: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#1a1410' }}>Add to Menu</span>
        </div>
      </div>

    </WF.Bg>
  )
}

/* ─── Screen 4: Edit Form ─── */
function Screen4() {
  return (
    <WF.Bg>
      <div style={{ background: '#231e18', padding: '8px 14px 0', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 9, color: '#7a6a55' }}>9:41</span>
        <span style={{ fontSize: 9, color: '#7a6a55' }}>●●●</span>
      </div>
      <WF.TopBar left="← Cancel" center="Edit Dish" right="Update" light />
      <div style={{ padding: '10px 12px' }}>
        <WF.Label>Dish Name *</WF.Label>
        <WF.Input value="Duck Confit" />
        <WF.Label>Category *</WF.Label>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
          {['Starters', 'Mains', 'Desserts', 'Drinks'].map((c, i) => (
            <div key={c} style={{ background: i === 1 ? '#c87d30' : '#2d2620', borderRadius: 20, padding: '3px 8px' }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: i === 1 ? '#1a1410' : '#7a6a55' }}>{c}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <WF.Label>Price (R) *</WF.Label>
            <WF.Input value="34.00" />
          </div>
          <div>
            <WF.Label>Prep Time (min) *</WF.Label>
            <WF.Input value="35" />
          </div>
        </div>
        <WF.Label>Description *</WF.Label>
        <WF.Textarea placeholder="Slow-cooked duck leg, lentil du Puy…" />
        <WF.Label>Availability Status</WF.Label>
        <div style={{ background: '#231e18', border: '1px solid #3d3528', borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <WFToggle on />
          <span style={{ fontSize: 10, color: '#4a7c59' }}>Available on menu</span>
        </div>
        {/* Pre-filled indicator */}
        <div style={{ background: 'rgba(200,125,48,0.08)', border: '1px solid rgba(200,125,48,0.25)', borderRadius: 8, padding: '6px 10px', marginBottom: 8 }}>
          <span style={{ fontSize: 9, color: '#c87d30' }}>ℹ Fields pre-filled with existing dish data</span>
        </div>
        <div style={{ background: '#c87d30', borderRadius: 10, padding: '9px 0', textAlign: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#1a1410' }}>Update Dish</span>
        </div>
      </div>

    </WF.Bg>
  )
}

function WFToggle({ on }: { on: boolean }) {
  return (
    <div style={{ width: 32, height: 18, borderRadius: 9, background: on ? '#2d6a4f' : '#555', position: 'relative', flexShrink: 0 }}>
      <div style={{ width: 14, height: 14, borderRadius: 7, background: '#fff', position: 'absolute', top: 2, left: on ? 16 : 2 }} />
    </div>
  )
}



