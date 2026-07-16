import { Link } from 'react-router-dom';
import { BentoCard } from '../components/BentoCard';
import { SectionHeading } from '../components/SectionHeading';
import { Badge } from '../components/Badge';
import { TimelineItem } from '../components/TimelineItem';
import { SoftwareIcon } from '../components/SoftwareIcon';
import { FloatingResumeButton } from '../components/FloatingResumeButton';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { ProjectCard } from '../components/ProjectCard';
import { ServiceCard } from '../components/ServiceCard';
import { IntroAnimation } from '../components/IntroAnimation';
import { Footer } from '../components/Footer';
import { 
  Smartphone, User, Mail, Instagram, Linkedin, 
  Pin, Figma, Scissors, Presentation, FileSpreadsheet, 
  FileText, Fingerprint, Search, Eye, Lightbulb, LayoutGrid,
  PenTool, MonitorPlay, Layers, Zap, ArrowUpRight, Megaphone, Globe, BookOpen, Video
} from 'lucide-react';
import { motion } from 'motion/react';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-20 overflow-x-hidden font-sans relative">
      <IntroAnimation />
      <div className="noise-overlay"></div>
      <FloatingResumeButton />
      {/* Header */}
      <header className="flex justify-between items-center py-8 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-3">
          <img src="https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
          <span className="font-display font-black text-xl tracking-tighter uppercase text-white">Nilesh Mali</span>
        </motion.div>
        
        <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#projects" className="hover:text-white transition-colors">Works</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <Link to="/contact" className="px-6 py-2.5 border border-neutral-800 rounded-full hover:bg-white hover:text-black hover:border-white transition-all text-white">Contact</Link>
        </motion.nav>

        {/* Mobile Nav toggle */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="md:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          <span className="mr-1">Menu</span>
          <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center gap-[3px]">
            <div className="w-3 h-[1.5px] bg-white"></div>
            <div className="w-3 h-[1.5px] bg-white"></div>
          </div>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10">
        
        {/* Top Hero Section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4"
        >
          
          {/* Left Column */}
          <div className="col-span-1 flex flex-col gap-4 order-2 md:order-1">
            <BentoCard className="p-8" staggered={true}>
              <div className="w-12 h-12 bg-[#D1FF52] rounded-full flex items-center justify-center mb-6 text-black">
                <span className="text-2xl filter drop-shadow-md">🚀</span>
              </div>
              <p className="text-[#D1FF52] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">About Me</p>
              <h2 className="font-display font-black text-3xl leading-none mb-4 text-white uppercase tracking-tighter">Graphic<br/>Designer.</h2>
              <p className="text-[12px] text-neutral-400 leading-relaxed">
                Creative graphic designer blending imagination with strategy. I specialize in branding, digital experiences, and visual storytelling that elevate brands and engage audiences across all platforms.
              </p>
            </BentoCard>
            <div className="flex flex-wrap gap-2 justify-start">
              <Badge colorClass="" icon={<Fingerprint className="w-5 h-5"/>} staggered={true}>Brand<br/>Identity</Badge>
              <Badge colorClass="" icon={<Search className="w-5 h-5"/>} staggered={true}>Attention<br/>to Detail</Badge>
              <Badge colorClass="" icon={<Eye className="w-5 h-5"/>} staggered={true}>Visual<br/>Design</Badge>
              <Badge colorClass="" icon={<Lightbulb className="w-5 h-5"/>} staggered={true}>Creative<br/>Strategy</Badge>
              <Badge colorClass="" icon={<LayoutGrid className="w-5 h-5"/>} staggered={true}>UI / UX</Badge>
            </div>
          </div>

          {/* Center Column - Hero Image */}
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } } }} 
            className="col-span-1 md:col-span-2 relative min-h-[400px] md:min-h-[500px] flex items-center justify-center order-1 md:order-2 mb-8 md:mb-0 group"
          >
            {/* Abstract Background Element (from theme) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"> 
              <div className="w-64 h-64 bg-[#D1FF52] opacity-10 blur-[100px] rounded-full"></div>
            </div>
            
            {/* Person Image */}
            <div className="relative z-10 w-full max-w-sm h-[500px] rounded-[2rem] border border-neutral-800 overflow-hidden">
              <HeroSlideshow />
              {/* Inner Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80 pointer-events-none"></div>
            </div>
            
            {/* Pill selector below image */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-6 z-20 bg-neutral-900 border border-neutral-800 rounded-full px-5 py-3 flex gap-2 shadow-lg"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#D1FF52]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <div className="col-span-1 flex flex-col gap-4 order-3">
            <BentoCard className="p-8" staggered={true}>
              <User className="w-6 h-6 mb-6 text-[#D1FF52]" />
              <h2 className="font-display font-black text-3xl leading-none mb-4 text-white tracking-tighter uppercase">Nilesh<br/>Mali</h2>
              <p className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">Available Globally</p>
            </BentoCard>
            
            <BentoCard className="p-8 flex flex-col items-center justify-center flex-1" staggered={true}>
              <p className="text-[10px] font-bold text-neutral-500 mb-4 tracking-[0.2em] uppercase self-start">/years exp.</p>
              <div className="relative w-32 h-32 flex items-center justify-center my-4">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#171717" strokeWidth="14" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="#D1FF52" strokeWidth="14" fill="none" strokeDasharray="251.2" strokeDashoffset="180" strokeLinecap="round" />
                </svg>
                <span className="font-display font-black text-5xl text-white relative z-10 ml-2 tracking-tighter">4+</span>
              </div>
            </BentoCard>
          </div>
        </motion.div>

        {/* Projects Section */}
        <div className="mt-28" id="projects">
          <SectionHeading delay={0.1}>Projects</SectionHeading>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mt-8 min-h-[800px] md:min-h-[600px]"
          >
            <ProjectCard 
              title="Aether OS" 
              category="UI/UX Concept" 
              imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" 
              staggered={true}
              className="md:col-span-2 md:row-span-2 h-full"
            />
            <ProjectCard 
              title="Neon Loom" 
              category="E-Commerce" 
              imageUrl="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop" 
              staggered={true}
              className="md:col-span-2 md:row-span-1 h-full min-h-[250px]"
            />
            <BentoCard className="md:col-span-1 md:row-span-1 p-6 bg-[#D1FF52] border-[#D1FF52] flex flex-col justify-between group cursor-pointer" staggered={true}>
              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-black self-end group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <span className="text-black font-display font-black text-2xl uppercase tracking-tighter mt-4 leading-tight">View<br/>Recent<br/>Work</span>
            </BentoCard>
            <ProjectCard 
              title="Echo Forms" 
              category="Web App" 
              imageUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" 
              staggered={true}
              className="md:col-span-1 md:row-span-1 h-full min-h-[250px]"
            />
          </motion.div>
        </div>
        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-28">
          <div className="flex flex-col">
            <SectionHeading delay={0.1}>Experience</SectionHeading>
            <div className="flex flex-col gap-8 w-full mt-4">
              <TimelineItem delay={0.2} year="2022-Now" title="Freelance Graphic Designer" subtitle="Global Clients & Agencies" />
              <TimelineItem delay={0.3} year="2021-2022" title="Visual Designer" subtitle="Creative Studio" />
            </div>
          </div>
          <div className="flex flex-col">
            <SectionHeading delay={0.2}>Education</SectionHeading>
            <div className="flex flex-col gap-8 w-full mt-4">
              <TimelineItem delay={0.3} year="2021-2024" title="Bachelor of Arts" subtitle="Graphic Design & Visual Communication" />
              <TimelineItem delay={0.4} year="2020-2021" title="Advanced UI/UX" subtitle="Design Academy" />
            </div>
          </div>
        </div>

        {/* Software Skills */}
        <div className="mt-28">
          <SectionHeading delay={0.1}>Software Skills</SectionHeading>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8 max-w-3xl mx-auto">
            <SoftwareIcon name="Ps" delay={0.1} />
            <SoftwareIcon name="Ai" delay={0.15} />
            <SoftwareIcon name="Xd" delay={0.2} />
            <SoftwareIcon name="Id" delay={0.25} />
            <SoftwareIcon icon={<Figma className="w-8 h-8" />} delay={0.3} />
            <SoftwareIcon icon={<Scissors className="w-8 h-8" />} delay={0.35} />
            <SoftwareIcon icon={<Presentation className="w-8 h-8" />} delay={0.4} />
            <SoftwareIcon icon={<FileSpreadsheet className="w-8 h-8" />} delay={0.45} />
            <SoftwareIcon icon={<FileText className="w-8 h-8" />} delay={0.5} />
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-28" id="services">
          <SectionHeading delay={0.1}>Services</SectionHeading>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
          >
            <ServiceCard 
              title="Brand Identity"
              description="Crafting distinctive and memorable visual identities that capture the essence of your business."
              icon={<PenTool className="w-6 h-6" />}
              staggered={true}
            />
            <ServiceCard 
              title="Social Media Design"
              description="Engaging social media graphics and templates tailored for your digital presence."
              icon={<Megaphone className="w-6 h-6" />}
              staggered={true}
            />
            <ServiceCard 
              title="Website UI"
              description="Designing intuitive, user-centric interfaces for web that deliver seamless digital experiences."
              icon={<Globe className="w-6 h-6" />}
              staggered={true}
            />
            <ServiceCard 
              title="Brochure"
              description="Professional and elegant print and digital brochure designs to showcase your products."
              icon={<BookOpen className="w-6 h-6" />}
              staggered={true}
            />
            <ServiceCard 
              title="Motion Graphics"
              description="Bringing ideas to life through dynamic and captivating motion graphics."
              icon={<Zap className="w-6 h-6" />}
              staggered={true}
            />
            <ServiceCard 
              title="Video Editing"
              description="Compelling video edits that tell your story and engage your audience."
              icon={<Video className="w-6 h-6" />}
              staggered={true}
            />
          </motion.div>
        </div>

        {/* Contact Layout */}
        <div className="mt-32">
          <SectionHeading delay={0.1}>Contact</SectionHeading>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[auto_auto_auto_auto] gap-4 mt-8"
          >
            
            {/* Pinterest */}
            <BentoCard className="md:col-start-1 md:row-start-1 md:row-span-4 bg-[#D1FF52] border-[#D1FF52] text-black p-8 flex flex-col justify-between min-h-[300px] md:min-h-[400px]" staggered={true}>
              <Pin className="w-8 h-8 mb-8" fill="currentColor" />
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] mb-4 uppercase text-black/60">Creative Work</p>
                <h3 className="font-display font-black text-4xl leading-[1.1] mb-8 tracking-tighter uppercase">Other<br/>Projects.</h3>
                <a href="#" className="bg-black text-[#D1FF52] font-bold text-xs py-3 px-6 rounded-full inline-block hover:scale-105 transition-transform uppercase tracking-[0.2em]">Pinterest</a>
              </div>
            </BentoCard>

            {/* Email */}
            <BentoCard className="md:col-start-2 md:col-span-2 md:row-start-1 p-8 flex items-center justify-between group hover:border-[#D1FF52] transition-colors cursor-pointer" staggered={true}>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] mb-2 uppercase text-neutral-500">Inquiries</p>
                <span className="font-display font-black text-xl sm:text-2xl text-white break-all tracking-tighter uppercase">work.nileshmali@gmail.com</span>
              </div>
              <Mail className="w-8 h-8 text-neutral-600 group-hover:text-[#D1FF52] transition-colors hidden sm:block" />
            </BentoCard>

            {/* LinkedIn */}
            <BentoCard className="md:col-start-4 md:row-start-1 md:row-span-2 p-8 flex flex-col justify-center min-h-[200px] group hover:border-[#D1FF52] transition-colors relative" staggered={true}>
              <a href="https://www.linkedin.com/in/nilesh-mali-a5997b28a/" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"><span className="sr-only">LinkedIn</span></a>
              <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D1FF52] transition-colors">
                <Linkedin className="w-6 h-6" fill="currentColor" />
              </div>
              <h3 className="font-display font-black text-2xl leading-tight text-white uppercase tracking-tighter">Nilesh<br/>Mali</h3>
              <p className="text-[10px] font-bold text-neutral-500 mt-3 uppercase tracking-widest group-hover:text-[#D1FF52] transition-colors">Connect on LinkedIn</p>
            </BentoCard>

            {/* Instagram */}
            <BentoCard className="md:col-start-2 md:col-span-2 md:row-start-2 md:row-span-2 p-6 flex flex-col sm:flex-row gap-6 min-h-[200px] relative group" staggered={true}>
              <a href="https://www.instagram.com/_nilesh._.mali_?" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"><span className="sr-only">Instagram</span></a>
              <div className="flex-1 flex flex-col justify-between min-h-[150px]">
                <div>
                  <div className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center mb-4 text-[#D1FF52] group-hover:bg-[#D1FF52] group-hover:text-black transition-colors">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-black uppercase text-2xl text-white tracking-tighter">@nileshmali</h3>
                </div>
                <div className="flex bg-neutral-950 text-white rounded-full text-[10px] font-bold overflow-hidden mt-4 sm:mt-0 w-max border border-neutral-800 uppercase tracking-widest relative z-20">
                  <a href="https://www.instagram.com/_nilesh._.mali_?" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 hover:bg-[#D1FF52] hover:text-black transition-colors">Follow</a>
                  <div className="px-4 py-2.5 bg-neutral-900 border-l border-neutral-800 text-neutral-400">1.2K</div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-3 sm:grid-cols-2 gap-2">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop" className="w-full h-16 sm:h-full object-cover rounded-[1rem] border border-neutral-800 grayscale hover:grayscale-0 transition-all" alt="Post" />
                <img src="https://images.unsplash.com/photo-1626544827763-d516dce335e4?q=80&w=200&auto=format&fit=crop" className="w-full h-16 sm:h-full object-cover rounded-[1rem] border border-neutral-800 grayscale hover:grayscale-0 transition-all" alt="Post" />
                <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=200&auto=format&fit=crop" className="w-full h-16 sm:h-full object-cover rounded-[1rem] border border-neutral-800 grayscale hover:grayscale-0 transition-all hidden sm:block" alt="Post" />
                <img src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=200&auto=format&fit=crop" className="w-full h-16 sm:h-full object-cover rounded-[1rem] border border-neutral-800 grayscale hover:grayscale-0 transition-all hidden sm:block" alt="Post" />
              </div>
            </BentoCard>

            {/* Twitter */}
            <BentoCard className="md:col-start-4 md:row-start-3 p-8 flex flex-col justify-center items-center text-center gap-4 hover:border-[#D1FF52] transition-colors cursor-pointer group" staggered={true}>
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-[#D1FF52] transition-colors">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
              </div>
              <span className="font-display font-black text-white uppercase tracking-tighter">Twitter</span>
            </BentoCard>

            {/* Mosque Photo Card */}
            <BentoCard className="md:col-start-2 md:row-start-4 p-2 h-[160px]" staggered={true}>
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 grayscale group-hover:grayscale-0" alt="Captured Moment" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-[10px] font-bold px-3 py-1.5 rounded-full text-white uppercase tracking-widest border border-white/10">
                  Captured Moment
                </div>
              </div>
            </BentoCard>

            {/* Behance */}
            <BentoCard className="md:col-start-3 md:col-span-2 md:row-start-4 p-8 flex items-center gap-6 group hover:border-[#D1FF52] transition-colors" staggered={true}>
              <div className="bg-white text-black p-3 rounded-full flex-shrink-0 w-12 h-12 flex items-center justify-center group-hover:bg-[#D1FF52] transition-colors">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.908 5.388 4.581h-7.32c.146 1.832 1.713 2.151 3.036 2.151 1.636 0 2.417-1.124 2.641-2.145l1.454.008zm-3.359-3.904c-.217-1.253-1.174-1.957-2.13-1.957-1.389 0-2.025 1.09-2.145 1.957h4.275zm-14.367-1.125c1.464 0 2.235-.916 2.235-2.046 0-1.159-.728-1.924-2.188-1.924h-4.048v3.97h4.001zm.557 5.029c1.676 0 2.502-.989 2.502-2.176 0-1.175-.809-2.228-2.585-2.228h-4.474v4.404h4.557zm1.443-4.102c1.493-.362 2.766-1.579 2.766-3.328 0-2.613-1.96-3.57-4.66-3.57h-6.106v15h6.634c3.155 0 5.215-1.503 5.215-4.185 0-2.224-1.466-3.418-3.849-3.917z"/></svg>
              </div>
              <div>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tighter">Nilesh Mali</h3>
                <p className="text-[10px] font-bold text-neutral-500 mt-1 uppercase tracking-widest">Behance</p>
              </div>
            </BentoCard>
            
          </motion.div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
}
