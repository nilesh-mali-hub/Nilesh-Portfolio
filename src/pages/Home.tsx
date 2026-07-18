import { Link } from 'react-router-dom';
import { BentoCard } from '../components/BentoCard';
import { SectionHeading } from '../components/SectionHeading';
import { Badge } from '../components/Badge';
import { TimelineItem } from '../components/TimelineItem';
import { SoftwareIcon } from '../components/SoftwareIcon';
import { FloatingResumeButton } from '../components/FloatingResumeButton';
import { AIAssistantWidget } from '../components/AIAssistantWidget';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { ProjectCard } from '../components/ProjectCard';
import { ServiceCard } from '../components/ServiceCard';
import { IntroAnimation } from '../components/IntroAnimation';
import { Footer } from '../components/Footer';
import { Marquee } from '../components/Marquee';
import { NoiseOverlay } from '../components/NoiseOverlay';
import { ProfileCard } from '../components/ProfileCard';
import { TechStackCard } from '../components/TechStackCard';
import { ExperienceCard } from '../components/ExperienceCard';
import { GraduationCap } from 'lucide-react';
import { 
  Smartphone, User, Mail, Instagram, Linkedin, 
  Pin, Figma, Fingerprint, Search, Eye, Lightbulb, LayoutGrid,
  PenTool, MonitorPlay, Layers, Zap, ArrowUpRight, Megaphone, Globe, BookOpen, Video,
  Scissors, Presentation, FileText
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
    <div className="min-h-screen bg-neutral-950 text-white pt-[100px] pb-20 overflow-x-hidden font-sans relative">
      <IntroAnimation />
      <NoiseOverlay />
      <FloatingResumeButton />
      <AIAssistantWidget />
      {/* Header removed and moved to App.tsx */}

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
              <h2 className="font-display font-bold text-3xl leading-none mb-4 text-white uppercase tracking-tighter">Graphic<br/>Designer.</h2>
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
            <ProfileCard 
              name="Nilesh Mali"
              avatarUrl="https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png"
              bio="Creative designer & developer crafting digital experiences that blend aesthetics with functionality."
              location="Available Globally"
            />
            
            <BentoCard className="p-8 flex flex-col items-center justify-center flex-1" staggered={true}>
              <p className="text-[10px] font-bold text-neutral-500 mb-4 tracking-[0.2em] uppercase self-start">/years exp.</p>
              <div className="relative w-32 h-32 flex items-center justify-center my-4">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#171717" strokeWidth="14" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="#D1FF52" strokeWidth="14" fill="none" strokeDasharray="251.2" strokeDashoffset="180" strokeLinecap="round" />
                </svg>
                <span className="font-display font-bold text-5xl text-white relative z-10 ml-2 tracking-tighter">4+</span>
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
            <BentoCard className="md:col-span-1 md:row-span-1 p-6 bg-[#D1FF52] border-[#D1FF52] flex flex-col justify-between group cursor-pointer relative" staggered={true}>
              <a href="https://www.behance.net/nileshmali25" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"><span className="sr-only">Behance Portfolio</span></a>
              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-black self-end group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <span className="text-black font-display font-bold text-2xl uppercase tracking-tighter mt-4 leading-tight">View<br/>Recent<br/>Work</span>
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
        <div className="mt-28">
          <SectionHeading delay={0.1}>Journey</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <ExperienceCard 
              title="Experience"
              items={[
                { year: "2025-Now", title: "Graphic Designer", subtitle: "Redes Creation" },
                { year: "2025", title: "Graphic Design Intern", subtitle: "Redes Creation" },
                { year: "2024-Now", title: "Founder", subtitle: "BM Graphics & Media" }
              ]} 
            />
            <ExperienceCard 
              title="Education"
              icon={<GraduationCap className="w-5 h-5" />}
              items={[
                { year: "2022-2025", title: "Bachelor of Arts", subtitle: "" },
                { year: "2023-2024", title: "UI/UX", subtitle: "Design Academy" }
              ]} 
            />
          </div>
        </div>

        {/* Software Skills */}
        <div className="mt-28">
          <SectionHeading delay={0.1}>Software Skills</SectionHeading>
          <div className="flex flex-nowrap justify-start md:justify-center overflow-x-auto gap-2 sm:gap-4 mt-8 max-w-5xl mx-auto pb-4 px-4 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <SoftwareIcon name="Ps" delay={0.1} />
            <SoftwareIcon name="Ai" delay={0.15} />
            <SoftwareIcon name="Xd" delay={0.2} />
            <SoftwareIcon name="Id" delay={0.25} />
            <SoftwareIcon icon={<Figma className="w-8 h-8" />} delay={0.3} />
            <SoftwareIcon icon={<Scissors className="w-8 h-8" />} delay={0.35} />
            <SoftwareIcon icon={<Presentation className="w-8 h-8" />} delay={0.4} />
            <SoftwareIcon icon={<FileText className="w-8 h-8" />} delay={0.5} />
            <SoftwareIcon icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M10.651 0C10.265.019 9.4.272 8.584.657c-.816.39-3.696 2.161-3.752 6.536c.072 4.145 3.847 11.191 6.397 13.455c0 0-4.141-6.952-4.439-13.013C6.488 1.575 10.651 0 10.651 0m2.679 0s4.159 1.575 3.861 7.635c-.299 6.061-4.439 13.013-4.439 13.013c2.547-2.264 6.324-9.31 6.396-13.455c-.057-4.375-2.936-6.146-3.752-6.536C14.58.272 13.715.019 13.33 0m-1.38.019a1.1 1.1 0 0 0-.555.144C9.864.99 8.909 3.982 9.177 8.66c.185 3.242 1.009 7.291 2.422 11.988h.7c1.413-4.697 2.24-8.742 2.425-11.984c.268-4.677-.688-7.674-2.219-8.501a1.1 1.1 0 0 0-.555-.144M7.017 1.066S2.543 2.909 3.431 8.225c.884 5.32 5.588 10.995 6.986 12.2c.503.457-5.777-6.548-6.386-12.699c-.291-2.323.39-4.9 2.986-6.66m9.966 0c2.595 1.76 3.276 4.337 2.985 6.66c-.608 6.151-6.888 13.156-6.386 12.699c1.398-1.205 6.103-6.88 6.987-12.2c.888-5.316-3.586-7.159-3.586-7.159m-6.815 20.78L10.647 24h2.599l.488-2.154z" /></svg>} delay={0.55} />
            <SoftwareIcon icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12s12-5.373 12-12S18.627 0 12 0M6.962 7.68c.754 0 1.337.549 1.405 1.2c.069.583-.171 1.097-.822 1.406c-.343.171-.48.172-.549.069c-.034-.069 0-.137.069-.206c.617-.514.617-.926.548-1.508c-.034-.378-.308-.618-.583-.618c-1.2 0-2.914 2.674-2.674 4.629c.103.754.549 1.646 1.509 1.646c.308 0 .65-.103.96-.24c.5-.264.799-.47 1.097-.8c-.073-.885.704-2.046 1.851-2.046c.515 0 .926.205.96.583c.068.514-.377.582-.514.582s-.378-.034-.378-.17c-.034-.138.309-.07.275-.378c-.035-.206-.24-.274-.446-.274c-.72 0-1.131.994-1.029 1.611c.035.275.172.549.447.549c.205 0 .514-.31.617-.755c.068-.308.343-.514.583-.514c.102 0 .17.034.205.171v.138c-.034.137-.137.548-.102.651c0 .069.034.171.17.171c.092 0 .436-.18.777-.459c.117-.59.253-1.298.253-1.357c.034-.24.137-.48.617-.48c.103 0 .171.034.205.171v.138l-.136.617c.445-.583 1.097-.994 1.508-.994c.172 0 .309.102.309.274c0 .103 0 .274-.069.446c-.137.377-.309.96-.412 1.474c0 .137.035.274.207.274s.685-.206 1.096-.754l.007-.004c-.002-.068-.007-.134-.007-.202c0-.411.035-.754.104-.994c.068-.274.411-.514.617-.514c.103 0 .205.069.205.171c0 .035 0 .103-.034.137c-.137.446-.24.857-.24 1.269c0 .24.034.582.102.788c0 .034.035.069.07.069c.068 0 .548-.445.89-1.028c-.308-.206-.48-.549-.48-.96c0-.72.446-1.097.858-1.097c.343 0 .617.24.617.72c0 .308-.103.65-.274.96h.102a.77.77 0 0 0 .584-.24a.3.3 0 0 1 .134-.117c.335-.425.83-.74 1.41-.74c.48 0 .924.205.959.582c.068.515-.378.618-.515.618l-.002-.002c-.138 0-.377-.035-.377-.172s.309-.068.274-.376c-.034-.206-.24-.275-.446-.275c-.686 0-1.13.891-1.028 1.611c.034.275.171.583.445.583c.206 0 .515-.308.652-.754c.068-.274.343-.514.583-.514c.103 0 .17.034.205.171c0 .069 0 .206-.137.652c-.17.308-.171.48-.137.617c.034.274.171.48.309.583c.034.034.068.102.068.102c0 .069-.034.138-.137.138c-.034 0-.068 0-.103-.035c-.514-.205-.72-.548-.789-.891c-.205.24-.445.377-.72.377c-.445 0-.89-.411-.96-.926a1.6 1.6 0 0 1 .075-.649c-.203.13-.422.203-.623.203h-.17c-.447.652-.927 1.098-1.27 1.303a.9.9 0 0 1-.377.104c-.068 0-.171-.035-.205-.104c-.095-.152-.156-.392-.193-.667c-.481.527-1.145.805-1.453.805c-.343 0-.548-.206-.582-.55v-.376c.102-.754.377-1.2.377-1.337a.074.074 0 0 0-.069-.07c-.24 0-1.028.824-1.166 1.373l-.103.445c-.068.309-.377.515-.582.515c-.103 0-.172-.035-.206-.172v-.137l.046-.233c-.435.31-.87.508-1.075.508c-.308 0-.48-.172-.514-.412c-.206.274-.445.412-.754.412c-.352 0-.696-.24-.862-.593c-.244.275-.523.553-.852.764c-.48.309-1.028.549-1.68.549c-.582 0-1.097-.309-1.371-.583c-.412-.377-.651-.96-.686-1.509c-.205-1.68.823-3.84 2.4-4.8c.378-.205.755-.343 1.132-.343m9.77 3.291c-.104 0-.172.172-.172.343c0 .274.137.583.309.755a1.7 1.7 0 0 0 .102-.583c0-.343-.137-.515-.24-.515z" /></svg>} delay={0.6} />
            <SoftwareIcon icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.998 12L2 16c0 1.886 0 2.328.586 2.914S4.114 19.5 6 19.5h8c1.886 0 2.828 0 3.414-.586S18 17.886 18 16m-8.002-4l11.998-6M9.998 12L2 8c0-1.386 0-2.328.586-2.914S4.114 4.5 6 4.5h8c1.886 0 2.828 0 3.414.586S18 6.614 18 8m-8.002 4l11.998 6" /></svg>} delay={0.65} />
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
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[auto_auto_auto] gap-4 mt-8"
          >
            
            {/* Tech Stack */}
            <TechStackCard className="md:col-start-1 md:row-start-1 md:row-span-3 min-h-[300px] md:min-h-[400px]" />

            {/* Email */}
            <BentoCard className="md:col-start-2 md:col-span-2 md:row-start-1 p-8 flex items-center justify-between group hover:border-[#D1FF52] transition-colors cursor-pointer" staggered={true}>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] mb-2 uppercase text-neutral-500">Inquiries</p>
                <span className="font-display font-bold text-xl sm:text-2xl text-white break-all tracking-tighter uppercase">work.nileshmali@gmail.com</span>
              </div>
              <Mail className="w-8 h-8 text-neutral-600 group-hover:text-[#D1FF52] transition-colors hidden sm:block" />
            </BentoCard>

            {/* LinkedIn */}
            <BentoCard className="md:col-start-4 md:row-start-1 md:row-span-2 p-8 flex flex-col justify-center min-h-[200px] group hover:border-[#D1FF52] transition-colors relative" staggered={true}>
              <a href="https://www.linkedin.com/in/nilesh-mali-a5997b28a/" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"><span className="sr-only">LinkedIn</span></a>
              <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D1FF52] transition-colors">
                <Linkedin className="w-6 h-6" fill="currentColor" />
              </div>
              <h3 className="font-display font-bold text-2xl leading-tight text-white uppercase tracking-tighter">Nilesh<br/>Mali</h3>
              <p className="text-[10px] font-bold text-neutral-500 mt-3 uppercase tracking-widest group-hover:text-[#D1FF52] transition-colors">Connect on LinkedIn</p>
            </BentoCard>

            <BentoCard className="md:col-start-2 md:col-span-2 md:row-start-2 md:row-span-2 p-8 flex items-center gap-6 group hover:border-[#D1FF52] transition-colors relative" staggered={true}>
              <a href="https://www.behance.net/nileshmali25" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"><span className="sr-only">Behance</span></a>
              <div className="bg-white text-black p-3 rounded-full flex-shrink-0 w-12 h-12 flex items-center justify-center group-hover:bg-[#D1FF52] transition-colors">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.908 5.388 4.581h-7.32c.146 1.832 1.713 2.151 3.036 2.151 1.636 0 2.417-1.124 2.641-2.145l1.454.008zm-3.359-3.904c-.217-1.253-1.174-1.957-2.13-1.957-1.389 0-2.025 1.09-2.145 1.957h4.275zm-14.367-1.125c1.464 0 2.235-.916 2.235-2.046 0-1.159-.728-1.924-2.188-1.924h-4.048v3.97h4.001zm.557 5.029c1.676 0 2.502-.989 2.502-2.176 0-1.175-.809-2.228-2.585-2.228h-4.474v4.404h4.557zm1.443-4.102c1.493-.362 2.766-1.579 2.766-3.328 0-2.613-1.96-3.57-4.66-3.57h-6.106v15h6.634c3.155 0 5.215-1.503 5.215-4.185 0-2.224-1.466-3.418-3.849-3.917z"/></svg>
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tighter">Nilesh Mali</h3>
                <p className="text-[10px] font-bold text-neutral-500 mt-1 uppercase tracking-widest">Behance</p>
              </div>
            </BentoCard>

            {/* Mosque Photo Card */}
            <BentoCard className="md:col-start-4 md:row-start-3 p-2 h-full min-h-[160px]" staggered={true}>
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 grayscale group-hover:grayscale-0" alt="Captured Moment" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-[10px] font-bold px-3 py-1.5 rounded-full text-white uppercase tracking-widest border border-white/10">
                  Captured Moment
                </div>
              </div>
            </BentoCard>
            
          </motion.div>
        </div>
        
        <Marquee />
        <Footer />
      </main>
    </div>
  );
}
