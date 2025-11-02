import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getCategoriesSrv } from '@/services/category.service'
import { useState } from 'react'
import { Loader2, FolderOpen, Filter } from 'lucide-react'

export const Route = createFileRoute('/app/categories/')({  component: RouteComponent,
})

function RouteComponent() {
  const [filterType, setFilterType] = useState('all')
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategoriesSrv()
      return response.data
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <p className="font-semibold">Error loading categories</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  const categories = data || []
  
  // Filter categories by type
  const filteredCategories = filterType === 'all' 
    ? categories 
    : categories.filter(cat => cat.categoryType === filterType)

  // Group by categoryType
  const groupedCategories = filteredCategories.reduce((acc, cat) => {
    const type = cat.categoryType || 'uncategorized'
    if (!acc[type]) acc[type] = []
    acc[type].push(cat)
    return acc
  }, {})

  const categoryTypes = [
    { value: 'all', label: 'All Categories', count: categories.length },
    { value: 'ForumPost', label: 'Forum Posts', count: categories.filter(c => c.categoryType === 'ForumPost').length },
    { value: 'ShastarInfo', label: 'Shastars', count: categories.filter(c => c.categoryType === 'ShastarInfo').length },
    { value: 'ResourceMaterial', label: 'Resources', count: categories.filter(c => c.categoryType === 'ResourceMaterial').length },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-muted-foreground">
          Browse all {categories.length} categories across different content types
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        {categoryTypes.map(type => (
          <button
            key={type.value}
            onClick={() => setFilterType(type.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === type.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            {type.label}
            <span className="ml-2 text-xs opacity-75">({type.count})</span>
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">No categories found</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedCategories).map(([type, cats]) => (
            <div key={type}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                {type === 'ForumPost' && 'Forum Post Categories'}
                {type === 'ShastarInfo' && 'Shastar Categories'}
                {type === 'ResourceMaterial' && 'Resource Categories'}
                {type === 'uncategorized' && 'Uncategorized'}
                <span className="text-sm text-muted-foreground">({cats.length})</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cats.map(category => (
                  <Link
                    key={category._id}
                    to="/app/categories/c/$cId"
                    params={{ cId: category._id }}
                    className="block p-4 border rounded-lg hover:shadow-md transition-shadow bg-card"
                  >
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    )}
                    {category.slug && (
                      <p className="text-xs text-muted-foreground mt-2 font-mono">
                        /{category.slug}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}