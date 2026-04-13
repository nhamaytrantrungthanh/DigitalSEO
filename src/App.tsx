import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <footer className="bg-slate-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6 block">
                    DigitalPro
                  </span>
                  <p className="text-slate-400 max-w-sm">
                    Empowering brands with data-driven marketing strategies and AI-powered solutions. Your partner in digital excellence.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                  <ul className="space-y-4 text-slate-400">
                    <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
                    <li><a href="/portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
                    <li><a href="/blog" className="hover:text-white transition-colors">Insights</a></li>
                    <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-6">Newsletter</h4>
                  <p className="text-sm text-slate-400 mb-4">Get the latest marketing tips delivered to your inbox.</p>
                  <form className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full"
                    />
                    <button className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                      Join
                    </button>
                  </form>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                © {new Date().getFullYear()} DigitalPro. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
