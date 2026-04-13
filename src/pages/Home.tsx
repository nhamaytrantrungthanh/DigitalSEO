import { motion } from 'motion/react';
import { ArrowRight, BarChart3, Globe, Megaphone, Zap, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const services = [
    { icon: <Globe className="text-blue-500" />, title: 'SEO Optimization', desc: 'Rank higher and drive organic traffic with data-driven SEO strategies.' },
    { icon: <Megaphone className="text-purple-500" />, title: 'Content Marketing', desc: 'Compelling stories that engage your audience and build brand authority.' },
    { icon: <BarChart3 className="text-green-500" />, title: 'Paid Advertising', desc: 'Maximize ROI with precision-targeted PPC and social media ad campaigns.' },
    { icon: <Cpu className="text-orange-500" />, title: 'AI Solutions', desc: 'Leverage cutting-edge AI tools to automate and scale your marketing efforts.' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
              Elevate Your Brand with <span className="text-blue-600">AI-Driven</span> Marketing
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              We combine creative strategy with advanced data analytics to help businesses scale in the digital age. From SEO to AI automation, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/portfolio" className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group">
                View Case Studies
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all text-center">
                Book a Consultation
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/2 w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Expertise</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive digital marketing solutions tailored to your business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-100 text-sm uppercase tracking-wider">Clients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2M+</div>
              <div className="text-blue-100 text-sm uppercase tracking-wider">Leads Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100 text-sm uppercase tracking-wider">Retention Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10x</div>
              <div className="text-blue-100 text-sm uppercase tracking-wider">Average ROI</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
