import { motion } from 'motion/react';
import { ExternalLink, TrendingUp, Users, Target } from 'lucide-react';

export default function Portfolio() {
  const projects = [
    {
      title: 'E-commerce Growth Engine',
      client: 'FashionHub',
      results: '+300% Revenue Increase',
      desc: 'Implemented a full-funnel SEO and Paid Ads strategy that scaled FashionHub from $10k to $40k monthly revenue in 6 months.',
      image: 'https://picsum.photos/seed/ecommerce/800/600',
      category: 'SEO & PPC'
    },
    {
      title: 'AI-Powered Lead Gen',
      client: 'TechFlow SaaS',
      results: '45% Lower Cost Per Lead',
      desc: 'Leveraged AI automation and predictive modeling to optimize lead generation workflows for a B2B SaaS platform.',
      image: 'https://picsum.photos/seed/saas/800/600',
      category: 'AI Marketing'
    },
    {
      title: 'Social Media Viral Campaign',
      client: 'EcoFriendly Co.',
      results: '1M+ Organic Reach',
      desc: 'Created a viral content series that built a community of 50k followers and drove significant brand awareness.',
      image: 'https://picsum.photos/seed/social/800/600',
      category: 'Content Marketing'
    },
    {
      title: 'Global SEO Expansion',
      client: 'TravelWise',
      results: 'Dominating 500+ Keywords',
      desc: 'Executed a multi-lingual SEO strategy that helped TravelWise expand into 5 new international markets.',
      image: 'https://picsum.photos/seed/travel/800/600',
      category: 'SEO'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Success Stories</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Real results for real businesses. Explore how we've helped our clients achieve extraordinary growth.
          </p>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1">
                <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2">
                      View Full Case Study <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">{project.category}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{project.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed">{project.desc}</p>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Result</p>
                      <p className="text-slate-900 font-bold">{project.results}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Client</p>
                      <p className="text-slate-900 font-bold">{project.client}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
