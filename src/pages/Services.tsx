import { motion } from 'motion/react';
import { Search, PenTool, TrendingUp, Share2, BrainCircuit, BarChart } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Search className="text-blue-600" />,
      title: 'SEO & Organic Growth',
      desc: 'Comprehensive keyword research, on-page optimization, and technical SEO to dominate search results.',
      features: ['Technical SEO Audits', 'Keyword Strategy', 'Backlink Building', 'Local SEO']
    },
    {
      icon: <TrendingUp className="text-green-600" />,
      title: 'Paid Advertising (PPC)',
      desc: 'High-converting ad campaigns across Google, Meta, and LinkedIn with continuous optimization.',
      features: ['Google Ads Management', 'Social Media Ads', 'Remarketing', 'Conversion Tracking']
    },
    {
      icon: <PenTool className="text-purple-600" />,
      title: 'Content Strategy',
      desc: 'Engaging content that resonates with your audience and drives them through the sales funnel.',
      features: ['Blog Management', 'Copywriting', 'Video Scripts', 'Email Marketing']
    },
    {
      icon: <BrainCircuit className="text-orange-600" />,
      title: 'AI Marketing Solutions',
      desc: 'Leveraging AI for personalization, automation, and predictive analytics to scale faster.',
      features: ['AI Content Generation', 'Chatbot Integration', 'Predictive Modeling', 'Workflow Automation']
    },
    {
      icon: <Share2 className="text-pink-600" />,
      title: 'Social Media Management',
      desc: 'Building vibrant communities and brand presence across all major social platforms.',
      features: ['Community Management', 'Influencer Outreach', 'Content Calendar', 'Social Listening']
    },
    {
      icon: <BarChart className="text-indigo-600" />,
      title: 'Data & Analytics',
      desc: 'Deep dives into your marketing data to uncover insights and drive strategic decisions.',
      features: ['Custom Dashboards', 'User Behavior Analysis', 'ROI Reporting', 'A/B Testing']
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Services</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We provide a full suite of digital marketing services designed to help your business thrive online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{service.desc}</p>
              <ul className="space-y-3">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-blue-600 rounded-[3rem] p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Not sure what you need?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Schedule a free 30-minute strategy session and we'll help you map out your digital growth.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors">
            Book Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
