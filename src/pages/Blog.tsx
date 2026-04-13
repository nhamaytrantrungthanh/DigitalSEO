import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author_name: string;
  created_at: string;
  slug: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setPosts(data || []);
      } catch (error: any) {
        console.error('Error fetching posts:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Marketing Insights</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stay ahead of the curve with our latest thoughts on SEO, AI, and digital strategy.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                    {post.excerpt || 'Read our latest insights on this topic...'}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.created_at ? format(new Date(post.created_at), 'MMM d, yyyy') : 'N/A'}
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {post.author_name || 'Admin'}
                      </div>
                    </div>
                    <Link to={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
            {posts.length === 0 && (
              <div className="col-span-full text-center py-20 text-slate-500">
                No blog posts published yet. Check back soon!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
