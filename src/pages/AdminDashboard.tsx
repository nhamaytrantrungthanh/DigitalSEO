import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, Timestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: any;
  category: string;
  slug: string;
}

export default function AdminDashboard() {
  const { isAdmin, user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<Post>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
    }
  }, [isAdmin]);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(fetchedPosts);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const postData = {
      ...currentPost,
      updatedAt: Timestamp.now(),
      authorId: user.uid,
      authorName: user.displayName,
      slug: currentPost.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || '',
    };

    try {
      if (currentPost.id) {
        await updateDoc(doc(db, 'posts', currentPost.id), postData);
      } else {
        await addDoc(collection(db, 'posts'), {
          ...postData,
          createdAt: Timestamp.now(),
        });
      }
      setIsEditing(false);
      setCurrentPost({});
      fetchPosts();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'posts');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteDoc(doc(db, 'posts', id));
      fetchPosts();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'posts');
    }
  };

  if (!isAdmin) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-slate-600">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <button
          onClick={() => {
            setCurrentPost({ published: false, category: 'SEO' });
            setIsEditing(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          New Post
        </button>
      </div>

      {isEditing ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input
                type="text"
                required
                value={currentPost.title || ''}
                onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={currentPost.category || 'SEO'}
                  onChange={e => setCurrentPost({ ...currentPost, category: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>SEO</option>
                  <option>Content Marketing</option>
                  <option>Paid Ads</option>
                  <option>Social Media</option>
                  <option>AI Marketing</option>
                </select>
              </div>
              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentPost.published || false}
                    onChange={e => setCurrentPost({ ...currentPost, published: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-slate-700">Published</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Content (Markdown)</label>
              <textarea
                required
                rows={10}
                value={currentPost.content || ''}
                onChange={e => setCurrentPost({ ...currentPost, content: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                Save Post
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Title</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{post.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{post.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {post.createdAt?.toDate ? format(post.createdAt.toDate(), 'MMM d, yyyy') : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setCurrentPost(post);
                        setIsEditing(true);
                      }}
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No posts found. Create your first post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
