import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
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
import { Marquee } from '../components/Marquee';
import { NoiseOverlay } from '../components/NoiseOverlay';
import { ProfileCard } from '../components/ProfileCard';
import { TechStackCard } from '../components/TechStackCard';
import { ExperienceCard } from '../components/ExperienceCard';
import { Testimonials } from '../components/Testimonials';
import { ServicesSection } from '../components/ServicesSection';
import { GraduationCap } from 'lucide-react';
import { 
  Smartphone, User, Mail, Instagram, Linkedin, 
  Pin, Figma, Fingerprint, Search, Eye, Lightbulb, LayoutGrid,
  PenTool, MonitorPlay, Layers, Zap, ArrowUpRight, Megaphone, Globe, BookOpen, Video,
  Scissors, Presentation, FileText, Image as ImageIcon
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

const IconMap: Record<string, any> = {
  Figma, Scissors, Presentation, FileText, Code: LayoutGrid, Image: ImageIcon,
};

export default function App() {
  const [hero, setHero] = useState<any>(null);
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/hero').then(res => res.json()),
      fetch('/api/experience').then(res => res.json()),
      fetch('/api/skills').then(res => res.json()),
      fetch('/api/contact').then(res => res.json()),
    ])
    .then(([heroData, expData, skillsData, contactData]) => {
      setHero(heroData);
      setExperience(Array.isArray(expData) ? expData : []);
      setSkills(Array.isArray(skillsData) ? skillsData : []);
      setContact(contactData);
    })
    .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-[100px] pb-20 overflow-x-hidden font-sans relative">
      <SEO 
        title="Creative Portfolio & Branding Design"
        description="Nilesh Mali is a freelance Graphic Designer & Creative Developer specializing in Brand Identity, UI/UX design, custom websites, and creative marketing campaigns."
      />
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
              <h2 className="font-display font-bold text-3xl leading-none mb-4 text-white uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: hero?.title ? hero.title.replace(/ /g, '<br/>') : 'Graphic<br/>Designer.' }}></h2>
              <p className="text-[12px] text-neutral-400 leading-relaxed">
                {hero?.subtitle || 'Creative graphic designer blending imagination with strategy. I specialize in branding, digital experiences, and visual storytelling that elevate brands and engage audiences across all platforms.'}
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
              items={experience.length > 0 ? experience.map((exp: any) => ({
                year: exp.year || exp.duration || exp.image,
                title: exp.role || exp.title,
                subtitle: exp.company || exp.description
              })) : [
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
            {skills.length > 0 ? skills.map((skill: any, idx: number) => {
              const iconKey = skill.icon || skill.image || skill.title;
              const IconComp = IconMap[iconKey];
              return (
                <SoftwareIcon 
                  key={skill.id} 
                  name={IconComp ? undefined : (skill.name || skill.title || iconKey?.substring(0,2))} 
                  icon={IconComp ? <IconComp className="w-8 h-8" /> : undefined}
                  delay={0.1 + (idx * 0.05)} 
                />
              );
            }) : (
              <>
                <SoftwareIcon name="Ps" delay={0.1} />
                <SoftwareIcon name="Ai" delay={0.15} />
                <SoftwareIcon name="Xd" delay={0.2} />
                <SoftwareIcon name="Id" delay={0.25} />
                <SoftwareIcon icon={<Figma className="w-8 h-8" />} delay={0.3} />
                <SoftwareIcon icon={<Scissors className="w-8 h-8" />} delay={0.35} />
                <SoftwareIcon icon={<Presentation className="w-8 h-8" />} delay={0.4} />
                <SoftwareIcon icon={<FileText className="w-8 h-8" />} delay={0.5} />
              </>
            )}
          </div>
        </div>

        {/* Services Section */}
        <ServicesSection />

        {/* Testimonials Section */}
        <Testimonials />

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
              <a href={`mailto:${contact?.email || 'work.nileshmali@gmail.com'}`} className="absolute inset-0 z-10"><span className="sr-only">Email</span></a>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] mb-2 uppercase text-neutral-500">Inquiries</p>
                <span className="font-display font-bold text-xl sm:text-2xl text-white break-all tracking-tighter uppercase">{contact?.email || 'work.nileshmali@gmail.com'}</span>
              </div>
              <Mail className="w-8 h-8 text-neutral-600 group-hover:text-[#D1FF52] transition-colors hidden sm:block" />
            </BentoCard>

            {/* LinkedIn */}
            <BentoCard className="md:col-start-4 md:row-start-1 md:row-span-2 p-8 flex flex-col justify-center min-h-[200px] group hover:border-[#D1FF52] transition-colors relative" staggered={true}>
              <a href={contact?.linkedin || "https://www.linkedin.com"} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"><span className="sr-only">LinkedIn</span></a>
              <div className="bg-[#0A66C2] text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Linkedin className="w-6 h-6" fill="currentColor" />
              </div>
              <h3 className="font-display font-bold text-2xl leading-tight text-white uppercase tracking-tighter">Let's<br/>Connect</h3>
              <p className="text-[10px] font-bold text-neutral-500 mt-3 uppercase tracking-widest group-hover:text-[#D1FF52] transition-colors">LinkedIn</p>
            </BentoCard>

            {/* Behance */}
            <BentoCard className="md:col-start-2 md:col-span-2 md:row-start-2 md:row-span-2 p-8 flex items-center gap-6 group hover:border-[#D1FF52] transition-colors relative" staggered={true}>
              <a href={contact?.behance || "https://www.behance.net/nileshmali25"} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"><span className="sr-only">Behance</span></a>
              <div className="bg-[#1769ff] text-white p-3 rounded-full flex-shrink-0 w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.908 5.388 4.581h-7.32c.146 1.832 1.713 2.151 3.036 2.151 1.636 0 2.417-1.124 2.641-2.145l1.454.008zm-3.359-3.904c-.217-1.253-1.174-1.957-2.13-1.957-1.389 0-2.025 1.09-2.145 1.957h4.275zm-14.367-1.125c1.464 0 2.235-.916 2.235-2.046 0-1.159-.728-1.924-2.188-1.924h-4.048v3.97h4.001zm.557 5.029c1.676 0 2.502-.989 2.502-2.176 0-1.175-.809-2.228-2.585-2.228h-4.474v4.404h4.557zm1.443-4.102c1.493-.362 2.766-1.579 2.766-3.328 0-2.613-1.96-3.57-4.66-3.57h-6.106v15h6.634c3.155 0 5.215-1.503 5.215-4.185 0-2.224-1.466-3.418-3.849-3.917z"/></svg>
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tighter">Portfolio</h3>
                <p className="text-[10px] font-bold text-neutral-500 mt-1 uppercase tracking-widest">Behance</p>
              </div>
            </BentoCard>

            {/* Instagram */}
            <BentoCard className="md:col-start-4 md:row-start-3 p-8 flex flex-col justify-center h-full min-h-[160px] group hover:border-[#D1FF52] transition-colors relative" staggered={true}>
              <a href={contact?.instagram || "https://instagram.com"} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"><span className="sr-only">Instagram</span></a>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#C13584] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-white uppercase tracking-tighter">Visuals</h3>
              <p className="text-[10px] font-bold text-neutral-500 mt-1 uppercase tracking-widest">Instagram</p>
            </BentoCard>
            
          </motion.div>
        </div>
        
        <Marquee />
      </main>
    </div>
  );
}
