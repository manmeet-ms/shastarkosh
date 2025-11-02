import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from "react";
import { globalSearchSrv } from '../services/search.service';
import { Loader2, Search, FileText, Sword, BookOpen, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppHeader } from '../components/Header/AppHeader';

export const Route = createFileRoute('/search/results')({
  component: RouteComponent,
  validateSearch: (search) => ({
    q: search.q || '',
    type: search.type || 'all'
  })
})

function RouteComponent() {
  const { q, type } = Route.useSearch();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState(type || 'all');

  useEffect(() => {
    if (q) {
      const fetchResults = async () => {
        try {
          setLoading(true);
          const data = await globalSearchSrv(q, activeFilter);
          setResults(data.results || []);
        } catch (err) {
          console.error("Search failed:", err);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    }
  }, [q, activeFilter]);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'post': return <FileText className="w-4 h-4" />;
      case 'shastar': return <Sword className="w-4 h-4" />;
      case 'resource': return <BookOpen className="w-4 h-4" />;
      case 'category': return <FolderOpen className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'post': return 'bg-blue-100 text-blue-800';
      case 'shastar': return 'bg-purple-100 text-purple-800';
      case 'resource': return 'bg-green-100 text-green-800';
      case 'category': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getItemLink = (item) => {
    switch(item.type) {
      case 'post': return `/app/forum/${item._id}`;
      case 'shastar': return `/app/shastars/${item._id}`;
      case 'resource': return `/app/resources/${item._id}`;
      case 'category': return `/app/categories/c/${item._id}`;
      default: return '#';
    }
  };

  if (!q) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-2">No search query</h2>
        <p className="text-muted-foreground">Please enter a search term to find content.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto  ">
      <AppHeader/>
      <div className="mb-6 px-4 pt-12 ">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          Found {results.length} results for <span className="font-semibold">&apos;{q}&apos;</span>
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: 'all', label: 'All' },
          { value: 'posts', label: 'Posts' },
          { value: 'shastars', label: 'Shastars' },
          { value: 'resources', label: 'Resources' },
          { value: 'categories', label: 'Categories' }
        ].map(filter => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Results */}
      {!loading && results.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground">Try different keywords or filters.</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-4">
          {results.map((item) => (
            <Link
              key={item._id}
              to={getItemLink(item)}
              className="block border rounded-lg p-4 hover:shadow-md transition-shadow bg-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      getTypeColor(item.type)
                    }`}>
                      {getTypeIcon(item.type)}
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">
                    {item.title || item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description || item.content || 'No description available'}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-xs bg-secondary px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
