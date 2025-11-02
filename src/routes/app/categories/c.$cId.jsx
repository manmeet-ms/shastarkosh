import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getSingleCategorySrv } from '@/services/category.service'
import { Loader2, ArrowLeft, Tag, Calendar, FolderOpen, FileText } from 'lucide-react'

export const Route = createFileRoute('/app/categories/c/$cId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { cId } = Route.useParams()
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['category', cId],
    queryFn: async () => {
      const response = await getSingleCategorySrv(cId)
      return response.data
    },
    enabled: !!cId,
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
        <Link to="/app/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <p className="font-semibold">Error loading category</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  const category = data || {}

  const getCategoryTypeLabel = (type) => {
    switch(type) {
      case 'ForumPost': return 'Forum Post Category'
      case 'ShastarInfo': return 'Shastar Category'
      case 'ResourceMaterial': return 'Resource Material Category'
      default: return 'Category'
    }
  }

  const getCategoryTypeColor = (type) => {
    switch(type) {
      case 'ForumPost': return 'bg-primary text-foreground '
      case 'ShastarInfo': return 'bg-primary text-foreground '
      case 'ResourceMaterial': return 'bg-primary text-foreground '
      default: return 'bg-primary text-foreground'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        to="/app/categories" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Categories
      </Link>

      {/* Category Header */}
      <div className="bg-card border rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex   items-center gap-3 mb-2">
              <FolderOpen className="bg-primary/20 rounded-full p-2 w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">{category.name}</h1>
            </div>
            
            {category.categoryType && (
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${
                getCategoryTypeColor(category.categoryType)
              }`}>
                <Tag className="w-3 h-3" />
                {getCategoryTypeLabel(category.categoryType)}
              </span>
            )}
          </div>
        </div>

        {category.description && (
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">Description</h2>
            <p className="text-base leading-relaxed">{category.description}</p>
          </div>
        )}

        {category.slug && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Slug:</span>{' '}
              <code className="bg-secondary px-2 py-1 rounded text-xs font-mono">
                {category.slug}
              </code>
            </p>
          </div>
        )}
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-muted-foreground">Created</h3>
          </div>
          <p className="text-lg font-medium">
            {category.createdAt ? new Date(category.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'N/A'}
          </p>
        </div>

        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-muted-foreground">Last Updated</h3>
          </div>
          <p className="text-lg font-medium">
            {category.updatedAt ? new Date(category.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'N/A'}
          </p>
        </div>

        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-muted-foreground">Category ID</h3>
          </div>
          <p className="text-xs font-mono break-all">{category._id}</p>
        </div>
      </div>

      {/* Related Content Section */}
      <div className="bg-card border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Related Content</h2>
        <div className="space-y-4">
          {category.categoryType === 'ForumPost' && (
            <div className="p-4 bg-secondary-foreground/5  border-accent-foreground/80 rounded-lg">
              <p className="text-sm text-secondary-foreground">
                This category is used for forum posts. Browse forum posts tagged with this category.
              </p>
              <Link 
                to="/app/forum" 
                className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-primary/80 hover:text-primary transition-colors   "
              >
                View Forum Posts →
              </Link>
            </div>
          )}
          
          {category.categoryType === 'ShastarInfo' && (
            <div className="p-4 bg-secondary-foreground/5  border-accent-foreground/80 rounded-lg">
              <p className="text-sm text-secondary-foreground">
                This category is used for shastars. Explore weapons and artifacts in this category.
              </p>
              <Link 
                to="/app/shastars" 
                className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-primary/80 hover:text-primary transition-colors   "
              >
                View Shastars →
              </Link>
            </div>
          )}
          
          {category.categoryType === 'ResourceMaterial' && (
            <div className="p-4 bg-secondary-foreground/5  border-accent-foreground/80 rounded-lg">
              <p className="text-sm text-secondary-foreground">
                This category is used for resource materials. Discover educational resources in this category.
              </p>
              <Link 
                to="/app/resources" 
                className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-primary/80 hover:text-primary transition-colors   "
              >
                View Resources →
              </Link>
            </div>
          )}

          {!category.categoryType && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-400">
                This category is not yet assigned to a specific content type.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
