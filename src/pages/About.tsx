import { motion } from 'motion/react';
import { CheckCircle2, Award, Users, Target, Rocket, Lightbulb } from 'lucide-react';

export default function About() {
  const values = [
    { icon: <Target className="text-blue-600" />, title: 'Results Driven', desc: 'We focus on metrics that matter—ROI, conversions, and growth.' },
    { icon: <Lightbulb className="text-yellow-600" />, title: 'Innovation First', desc: 'Staying ahead of trends with AI and cutting-edge marketing tech.' },
    { icon: <Users className="text-green-600" />, title: 'Client Centric', desc: 'Your success is our success. We build long-term partnerships.' },
  ];

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              We Help Brands Navigate the <span className="text-blue-600">Digital Frontier</span>
            </h1>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Founded in 2020, DigitalPro has been at the forefront of the digital marketing revolution. We don't just follow trends; we set them. Our team of experts combines data science with creative flair to deliver unparalleled results.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Whether you're a startup looking for your first 1,000 customers or an enterprise aiming to dominate your niche, we have the tools and expertise to make it happen.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Team member" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium">Trusted by 500+ professionals</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <img 
              src="https://picsum.photos/seed/marketing/800/600" 
              alt="Marketing Team" 
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Award size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">#1</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Marketing Agency 2024</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-slate-100 bg-slate-50 text-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission */}
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <Rocket className="w-16 h-16 text-blue-500 mx-auto mb-8 animate-bounce" />
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl text-slate-300 leading-relaxed italic">
              "To empower businesses with the most advanced marketing technology and creative strategies, ensuring sustainable growth in an ever-evolving digital landscape."
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[120px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
