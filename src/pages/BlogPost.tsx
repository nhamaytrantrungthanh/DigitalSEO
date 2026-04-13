import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Post {
  title: string;
  content: string;
  category: string;
  authorName: string;
  createdAt: any;
}

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data() as Post);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `posts/${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Post Not Found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-slate-100 mb-10">
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="font-medium text-slate-900">{post.authorName || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {post.createdAt?.toDate ? format(post.createdAt.toDate(), 'MMMM d, yyyy') : 'N/A'}
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Share2 size={20} />
            </button>
          </div>

          <div className="prose prose-slate prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
