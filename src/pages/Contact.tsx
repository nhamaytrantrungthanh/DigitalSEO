import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Let's Connect</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Ready to scale your business? Drop us a message and let's discuss your digital strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Email Us</p>
                    <p className="text-slate-900">hello@digitalpro.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Call Us</p>
                    <p className="text-slate-900">+1 (555) 000-0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Visit Us</p>
                    <p className="text-slate-900">123 Marketing Ave, Digital City, DC 12345</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">Follow Us</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <select className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  <option>General Inquiry</option>
                  <option>SEO Services</option>
                  <option>Paid Ads Strategy</option>
                  <option>AI Automation</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
              >
                Send Message
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
