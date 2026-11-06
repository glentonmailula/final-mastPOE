export type Category = 'Starters' | 'Mains' | 'Desserts' | 'Drinks'

export interface MenuItem {
  id: string
  name: string
  category: Category
  price: number
  description: string
  available: boolean
  preparationTime: number
}

export const CATEGORIES: Category[] = [
  'Starters',
  'Mains',
  'Desserts',
  'Drinks',
]

export const COURSE_FILTERS = [
  { value: 'All', label: 'All' },
  { value: 'Starters', label: 'Starter' },
  { value: 'Mains', label: 'Main Course' },
  { value: 'Desserts', label: 'Dessert' },
] as const

export const CATEGORY_LABELS: Record<Category, string> = {
  Starters: 'Starter',
  Mains: 'Main Course',
  Desserts: 'Dessert',
  Drinks: 'Drinks',
}