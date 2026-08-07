import React, { useState } from 'react';
import { BookOpen, Calendar, User, Clock, ArrowLeft, ArrowRight, Share2, Tag, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types';

export const BlogPage: React.FC = () => {
  const { blogPosts, selectedPost, setSelectedPost, setActiveView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(blogPosts.flatMap(p => p.tags)));

  const filteredPosts = blogPosts.filter(post => {
    if (selectedTag && !post.tags.includes(selectedTag)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q) || post.category.toLowerCase().includes(q);
    }
    return true;
  });

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <button
          onClick={() => setSelectedPost(null)}
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-700 hover:text-amber-600 transition-colors bg-white px-4 py-2 rounded-xl border border-neutral-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al listado de artículos</span>
        </button>

        <article className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xl">
          <img 
            src={selectedPost.image} 
            alt={selectedPost.title} 
            className="w-full h-80 sm:h-96 object-cover"
          />

          <div className="p-6 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
              <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full uppercase">
                {selectedPost.category}
              </span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-neutral-400" /> {selectedPost.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-neutral-400" /> Por {selectedPost.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-neutral-400" /> {selectedPost.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 font-display leading-tight">
              {selectedPost.title}
            </h1>

            <div className="prose prose-neutral max-w-none text-sm leading-relaxed text-neutral-700 whitespace-pre-line border-t border-neutral-100 pt-6">
              {selectedPost.content}
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-neutral-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Etiquetas:
              </span>
              {selectedPost.tags.map(t => (
                <span key={t} className="bg-neutral-100 text-neutral-700 font-semibold px-2.5 py-1 rounded-lg">
                  #{t}
                </span>
              ))}
            </div>

            {/* Wholesale CTA Inside Post */}
            <div className="p-6 rounded-2xl bg-neutral-900 text-white space-y-3">
              <h3 className="font-bold text-base text-amber-400">
                ¿Querés importar o comprar estos insumos para tu comercio?
              </h3>
              <p className="text-xs text-neutral-300">
                En GIANNIZI Imports contamos con stock real en nuestro depósito central y precios diferenciales por bulto cerrado.
              </p>
              <button
                onClick={() => setActiveView('shop')}
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors inline-block"
              >
                Ver Catálogo en Vivo
              </button>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Blog Header */}
      <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            Blog Oficial GIANNIZI Imports
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
            Novedades, Tendencias & Consejos
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Noticias sobre el mercado de bazar y papelería, consejos de organización y guías para maximizar las ventas de tu negocio.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Buscar artículos por tema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Tag chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
              selectedTag === null ? 'bg-neutral-900 text-amber-400' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Todos
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                selectedTag === tag ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <article 
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group"
          >
            <div className="h-52 overflow-hidden bg-neutral-100 relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-neutral-900 text-amber-400 font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md">
                {post.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-bold text-lg text-neutral-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-amber-600">
                <span>Leer artículo completo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
