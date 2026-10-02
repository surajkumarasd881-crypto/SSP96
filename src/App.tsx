import React, { useState } from 'react';
import { 
  Code2, Sparkles, Send, Github, Instagram, Mail, 
  ExternalLink, ArrowRight, BookOpen, User, Briefcase, 
  Layers, Terminal, Cpu, Globe, CheckCircle2, Plus, X, Camera
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

interface Blog {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  author: string;
}

const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Aura Watercolor Portfolio',
    category: 'Web Design & Frontend',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
    description: 'An immersive digital gallery and portfolio featuring soft watercolor washes, responsive glassmorphism, and smooth animations.',
    techStack: ['React', 'Tailwind CSS', 'TypeScript', 'Vite'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'proj-2',
    title: 'Chitrakoot Heritage Gallery',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1590059354472-f1790ba51d64?auto=format&fit=crop&q=80&w=800',
    description: 'A cultural heritage web application highlighting historical landmarks from Chitrakoot to Prayagraj with interactive maps.',
    techStack: ['React', 'Tailwind CSS', 'JavaScript', 'Leaflet API'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'proj-3',
    title: 'AI Prompt Studio & Assistant',
    category: 'AI & Web',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    description: 'A developer utility for crafting, testing, and optimizing AI prompts with real-time generation and syntax highlighting.',
    techStack: ['TypeScript', 'React', 'Gemini API', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'proj-4',
    title: 'Minimalist Creator Dashboard',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    description: 'A high-performance analytics and content management dashboard for digital creators with modular widget layout.',
    techStack: ['React', 'Tailwind CSS', 'Charts.js'],
    liveUrl: '#',
    githubUrl: '#'
  }
];

const initialBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'Architecting High-Performance React Web Apps',
    category: 'Web Development',
    date: 'May 14, 2026',
    readTime: '6 min read',
    excerpt: 'Best practices for state management, code splitting, and memoization in modern React applications.',
    content: 'Building performant React applications requires a disciplined approach to component lifecycles, memoization, and bundle optimization. In this article, we explore advanced hooks, selective re-rendering prevention, and Vite build configuration tuning.\n\nBy leveraging clean architecture principles, we ensure lightning-fast page loads and buttery-smooth user experiences across all devices.',
    author: 'Suraj Singh Pal'
  },
  {
    id: 'blog-2',
    title: 'The Art of Minimalist UI & Typography',
    category: 'Web Design',
    date: 'April 28, 2026',
    readTime: '4 min read',
    excerpt: 'How whitespace, contrast, and meticulous font pairing elevate digital interfaces into timeless works of art.',
    content: 'Design is not just what it looks like and feels like; design is how it works. Minimalist UI strips away unnecessary ornamentation to reveal the core essence of information.\n\nWhen paired with striking monospace typography and subtle grid lines, applications achieve an industrial yet deeply human aesthetic.',
    author: 'Suraj Singh Pal'
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  
  // Profile Photo state with localStorage persistence
  const [profileImage, setProfileImage] = useState<string>(() => {
    return localStorage.getItem('suraj_profile_image') || '/suraj.webp';
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('suraj_profile_image', base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Interactive state
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [newBlogModal, setNewBlogModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Web Development');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  
  // Contact Form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', project: 'Web Development', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Instagram editable handle
  const [instagramHandle, setInstagramHandle] = useState('@surajpal29x');
  const [isEditingInstagram, setIsEditingInstagram] = useState(false);
  const [tempInstagram, setTempInstagram] = useState(instagramHandle);

  // Name editable state
  const [userName, setUserName] = useState('Suraj Singh Pal');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const categories = ['All', 'Web Development', 'Web Design', 'AI & Web', 'Web App'];

  const filteredProjects = projectFilter === 'All' 
    ? initialProjects 
    : initialProjects.filter(p => p.category.toLowerCase().includes(projectFilter.toLowerCase()) || projectFilter === p.category);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', project: 'Web Development', message: '' });
      setContactSubmitted(false);
    }, 4000);
  };

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newExcerpt || !newContent) return;
    const newEntry: Blog = {
      id: `blog-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '3 min read',
      excerpt: newExcerpt,
      content: newContent,
      author: userName
    };
    setBlogs([newEntry, ...blogs]);
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setNewBlogModal(false);
  };

  return (
    <div className="bg-[#111113] text-[#e4e4e7] font-mono-code min-h-screen flex flex-col justify-between p-6 gap-6 selection:bg-[#5e5eff] selection:text-white relative overflow-x-hidden">
      
      {/* HEADER */}
      <header className="flex justify-between items-center border border-[#e4e4e7]/10 px-8 py-5 bg-[#161619]/80 backdrop-blur-md rounded-xl z-50">
        <div className="font-syne font-bold text-xl tracking-tight text-white flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#5e5eff] inline-block animate-pulse"></span>
          SSP / ARCHIVE '26
        </div>
        <nav className="hidden md:flex gap-8 text-[0.655rem] uppercase tracking-[0.15em] text-[#e4e4e7]/60">
          <a href="#about" className="hover:text-[#5e5eff] transition-colors">[01] PHILOSOPHY</a>
          <a href="#projects" className="hover:text-[#5e5eff] transition-colors">[02] ARCHIVE</a>
          <a href="#blogs" className="hover:text-[#5e5eff] transition-colors">[03] JOURNALS</a>
          <a href="#contact" className="hover:text-[#5e5eff] transition-colors">[04] INQUIRY</a>
        </nav>
        <div className="flex items-center gap-3">
          <a 
            href="#contact" 
            className="px-4 py-2 rounded-lg bg-[#5e5eff] text-white text-xs font-medium font-syne hover:bg-[#4a4ae6] transition-all shadow-md shadow-[#5e5eff]/20"
          >
            Execute Collaboration
          </a>
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* HERO PANEL */}
        <section id="about" className="lg:col-span-8 border border-[#e4e4e7]/10 p-8 sm:p-12 flex flex-col justify-between relative bg-gradient-to-br from-[#5e5eff]/5 via-transparent to-transparent rounded-2xl">
          <div className="absolute top-6 left-6 text-[0.6rem] text-[#e4e4e7]/40 tracking-wider">
            ID: SYSTEM_026_ALPHA // CHITRAKOOT TO PRAYAGRAJ
          </div>

          <div className="mt-12 space-y-6">
            <span className="text-[0.65rem] tracking-[0.25em] text-[#5e5eff] uppercase font-bold block">
              Mission Overview & Creator Profile
            </span>
            
            <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-white">
              Technical precision meets storytelling.
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-[#e4e4e7]/70 max-w-2xl font-mono-code">
              Hi, I'm <strong className="text-white">{userName}</strong>. A Web Developer and Creator based between Chitrakoot and Prayagraj, India, crafting high-performance web applications, minimalist UIs, and immersive digital experiences.
            </p>
          </div>

          {/* Profile DP Card inside Hero */}
          <div className="mt-12 pt-8 border-t border-[#e4e4e7]/10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#5e5eff]/30 group">
                <img src={profileImage} alt={userName} className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer">
                  <Camera size={16} />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div>
                <div className="font-syne font-bold text-white text-sm">{userName}</div>
                <div className="text-xs text-[#5e5eff]">Creator & Developer</div>
                <div className="text-[0.6rem] text-[#e4e4e7]/50 mt-0.5">Location: Chitrakoot to Prayagraj</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-[#1a1a1e] border border-[#e4e4e7]/10 hover:border-[#5e5eff] text-[#e4e4e7] transition-all">
                <Github size={16} />
              </a>
              <div className="flex items-center gap-2 bg-[#1a1a1e] border border-[#e4e4e7]/10 px-3 py-2 rounded-lg text-xs text-[#e4e4e7]">
                <Instagram size={14} className="text-[#5e5eff]" />
                {isEditingInstagram ? (
                  <div className="flex items-center gap-1">
                    <input 
                      type="text" 
                      value={tempInstagram} 
                      onChange={(e) => setTempInstagram(e.target.value)}
                      className="bg-black/40 text-xs px-2 py-0.5 rounded border border-[#5e5eff] text-white w-28 focus:outline-none"
                    />
                    <button 
                      onClick={() => { setInstagramHandle(tempInstagram); setIsEditingInstagram(false); }}
                      className="text-[#5e5eff] font-bold"
                    >
                      ✓
                    </button>
                  </div>
                ) : (
                  <span onClick={() => setIsEditingInstagram(true)} className="cursor-pointer hover:underline" title="Click to edit handle">
                    {instagramHandle}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CAPS PANEL (Capabilities / Skills) */}
        <section className="lg:col-span-4 grid grid-rows-4 gap-4">
          <div className="border border-[#e4e4e7]/10 p-5 rounded-xl bg-[#161619]/60 flex gap-4 items-start">
            <span className="text-[0.65rem] text-[#5e5eff] font-bold">[01]</span>
            <div>
              <h3 className="text-xs uppercase font-bold text-white mb-1 font-syne">Web Design</h3>
              <p className="text-[0.7rem] text-[#e4e4e7]/60 leading-normal">Modern, responsive and attractive website designs with a unique artistic touch.</p>
            </div>
          </div>

          <div className="border border-[#e4e4e7]/10 p-5 rounded-xl bg-[#161619]/60 flex gap-4 items-start">
            <span className="text-[0.65rem] text-[#5e5eff] font-bold">[02]</span>
            <div>
              <h3 className="text-xs uppercase font-bold text-white mb-1 font-syne">Frontend</h3>
              <p className="text-[0.7rem] text-[#e4e4e7]/60 leading-normal">Interactive websites with smooth animations and custom micro-interactions.</p>
            </div>
          </div>

          <div className="border border-[#e4e4e7]/10 p-5 rounded-xl bg-[#161619]/60 flex gap-4 items-start">
            <span className="text-[0.65rem] text-[#5e5eff] font-bold">[03]</span>
            <div>
              <h3 className="text-xs uppercase font-bold text-white mb-1 font-syne">Development</h3>
              <p className="text-[0.7rem] text-[#e4e4e7]/60 leading-normal">Complete full-stack websites for personal brands, creators and small businesses.</p>
            </div>
          </div>

          <div className="border border-[#e4e4e7]/10 p-5 rounded-xl bg-[#161619]/60 flex gap-4 items-start">
            <span className="text-[0.65rem] text-[#5e5eff] font-bold">[04]</span>
            <div>
              <h3 className="text-xs uppercase font-bold text-white mb-1 font-syne">Skill Set</h3>
              <p className="text-[0.7rem] text-[#e4e4e7]/60 leading-normal">HTML, CSS, JS, React, Tailwind, TypeScript, APIs, and AI Integrations.</p>
            </div>
          </div>
        </section>

      </main>

      {/* PROJECTS ARCHIVE SECTION */}
      <section id="projects" className="border border-[#e4e4e7]/10 p-8 rounded-2xl bg-[#161619]/40">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="text-[0.65rem] tracking-[0.2em] text-[#5e5eff] uppercase font-bold">Featured Works</div>
            <h2 className="font-syne text-2xl sm:text-3xl text-white mt-1">Project Archive</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setProjectFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all ${
                  projectFilter === cat 
                    ? 'bg-[#5e5eff] text-white font-bold' 
                    : 'bg-[#1a1a1e] border border-[#e4e4e7]/10 text-[#e4e4e7]/70 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="border border-[#e4e4e7]/10 rounded-xl overflow-hidden bg-[#1a1a1e]/80 hover:border-[#5e5eff] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[0.6rem] text-white font-mono-code">
                  {project.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-syne font-bold text-base text-white mb-2 group-hover:text-[#5e5eff] transition-colors">{project.title}</h3>
                  <p className="text-xs text-[#e4e4e7]/60 line-clamp-2 leading-relaxed mb-4">{project.description}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#e4e4e7]/10 text-xs text-[#5e5eff]">
                  <span className="flex items-center gap-1 font-semibold">Inspect Spec <ArrowRight size={14} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNALS & BLOGS */}
      <section id="blogs" className="border border-[#e4e4e7]/10 p-8 rounded-2xl bg-[#161619]/45">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="text-[0.65rem] tracking-[0.2em] text-[#5e5eff] uppercase font-bold">Engineering Notes</div>
            <h2 className="font-syne text-2xl sm:text-3xl text-white mt-1">Journals & Articles</h2>
          </div>
          <button 
            onClick={() => setNewBlogModal(true)}
            className="px-4 py-2 rounded-lg bg-[#1a1a1e] border border-[#5e5eff]/40 text-[#5e5eff] text-xs font-bold hover:bg-[#5e5eff] hover:text-white transition-all flex items-center gap-2 font-syne"
          >
            <Plus size={14} /> New Journal Entry
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
              onClick={() => setSelectedBlog(blog)}
              className="border border-[#e4e4e7]/10 p-6 rounded-xl bg-[#1a1a1e]/70 hover:border-[#5e5eff] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#e4e4e7]/50 mb-3">
                  <span className="text-[#5e5eff] font-bold">{blog.category}</span>
                  <span>{blog.date} · {blog.readTime}</span>
                </div>
                <h3 className="font-syne font-bold text-lg text-white mb-2 group-hover:text-[#5e5eff] transition-colors">{blog.title}</h3>
                <p className="text-xs text-[#e4e4e7]/70 leading-relaxed mb-4">{blog.excerpt}</p>
              </div>
              <div className="text-xs text-[#5e5eff] font-semibold flex items-center gap-1">Read Full Article <ArrowRight size={14} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT / INQUIRY SECTION */}
      <section id="contact" className="border border-[#e4e4e7]/10 p-8 sm:p-12 rounded-2xl bg-[#161619]/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[0.65rem] tracking-[0.2em] text-[#5e5eff] uppercase font-bold">Secure Transmission</span>
            <h2 className="font-syne text-3xl sm:text-4xl text-white mt-2">Initialize Collaboration</h2>
            <p className="text-xs text-[#e4e4e7]/60 mt-2">Send a direct message or inquiry. Let's build something exceptional together.</p>
          </div>

          {contactSubmitted ? (
            <div className="border border-green-500/30 bg-green-500/10 p-8 rounded-xl text-center space-y-3">
              <CheckCircle2 className="mx-auto text-green-400" size={36} />
              <h3 className="font-syne font-bold text-lg text-white">Transmission Successful</h3>
              <p className="text-xs text-[#e4e4e7]/70">Thank you for your message. Suraj will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-[#e4e4e7]/70 mb-1 font-syne">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name} 
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="John Doe" 
                    className="w-full bg-[#1a1a1e] border border-[#e4e4e7]/15 rounded-lg px-4 py-3 text-sm text-white focus:border-[#5e5eff] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-[#e4e4e7]/70 mb-1 font-syne">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={contactForm.email} 
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="john@example.com" 
                    className="w-full bg-[#1a1a1e] border border-[#e4e4e7]/15 rounded-lg px-4 py-3 text-sm text-white focus:border-[#5e5eff] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase text-[#e4e4e7]/70 mb-1 font-syne">Project Scope</label>
                <select 
                  value={contactForm.project}
                  onChange={(e) => setContactForm({ ...contactForm, project: e.target.value })}
                  className="w-full bg-[#1a1a1e] border border-[#e4e4e7]/15 rounded-lg px-4 py-3 text-sm text-white focus:border-[#5e5eff] focus:outline-none"
                >
                  <option>Web Development</option>
                  <option>Web Design</option>
                  <option>AI Integration</option>
                  <option>Full-Stack Application</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase text-[#e4e4e7]/70 mb-1 font-syne">Message</label>
                <textarea 
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Describe your project requirements..."
                  className="w-full bg-[#1a1a1e] border border-[#e4e4e7]/15 rounded-lg px-4 py-3 text-sm text-white focus:border-[#5e5eff] focus:outline-none resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 rounded-lg bg-[#5e5eff] text-white font-syne font-bold hover:bg-[#4a4ae6] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#5e5eff]/30"
              >
                Transmit Message <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border border-[#e4e4e7]/10 px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#161619]/80 rounded-xl text-[0.65rem] text-[#e4e4e7]/60">
        <div>
          PRAYAGRAJ, IN / <span className="text-white">ASMEDIA.COLLAB@GMAIL.COM</span>
        </div>
        <a href="#contact" className="font-syne text-sm text-white px-6 py-2 border border-[#5e5eff] rounded-lg hover:bg-[#5e5eff] transition-all">
          Execute Collaboration
        </a>
        <div>
          {userName} — © 2026 / <span className="text-white">ALL_RIGHTS_RESERVED</span>
        </div>
      </footer>

      {/* PROJECT INSPECT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161619] border border-[#e4e4e7]/20 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative space-y-6">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#1a1a1e] text-[#e4e4e7] hover:text-white"
            >
              <X size={20} />
            </button>
            <div className="h-64 rounded-xl overflow-hidden border border-[#e4e4e7]/10">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[0.65rem] text-[#5e5eff] font-bold uppercase">{selectedProject.category}</span>
              <h2 className="font-syne text-2xl text-white mt-1">{selectedProject.title}</h2>
              <p className="text-xs text-[#e4e4e7]/70 mt-3 leading-relaxed">{selectedProject.description}</p>
            </div>
            <div>
              <div className="text-xs uppercase text-[#e4e4e7]/50 mb-2 font-syne">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-md bg-[#1a1a1e] border border-[#e4e4e7]/10 text-xs text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-[#e4e4e7]/10">
              <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-3 rounded-lg bg-[#5e5eff] text-white text-center font-syne text-xs font-bold hover:bg-[#4a4ae6] transition-all flex items-center justify-center gap-2">
                Live Preview <ExternalLink size={14} />
              </a>
              <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg bg-[#1a1a1e] border border-[#e4e4e7]/10 text-white text-center font-syne text-xs font-bold hover:bg-[#222227] transition-all flex items-center justify-center gap-2">
                <Github size={14} /> Source
              </a>
            </div>
          </div>
        </div>
      )}

      {/* BLOG READ MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161619] border border-[#e4e4e7]/20 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#1a1a1e] text-[#e4e4e7] hover:text-white"
            >
              <X size={20} />
            </button>
            <div>
              <div className="flex items-center justify-between text-xs text-[#e4e4e7]/50 mb-2">
                <span className="text-[#5e5eff] font-bold">{selectedBlog.category}</span>
                <span>{selectedBlog.date} · {selectedBlog.readTime}</span>
              </div>
              <h1 className="font-syne text-2xl sm:text-3xl text-white">{selectedBlog.title}</h1>
              <div className="text-xs text-[#e4e4e7]/50 mt-1">By {selectedBlog.author}</div>
            </div>
            <div className="text-sm text-[#e4e4e7]/80 leading-relaxed whitespace-pre-line border-t border-b border-[#e4e4e7]/10 py-6 font-mono-code">
              {selectedBlog.content}
            </div>
            <button 
              onClick={() => setSelectedBlog(null)}
              className="w-full py-3 rounded-lg bg-[#1a1a1e] border border-[#e4e4e7]/10 text-white font-syne text-xs font-bold hover:bg-[#222227] transition-all"
            >
              Close Journal
            </button>
          </div>
        </div>
      )}

      {/* NEW BLOG MODAL */}
      {newBlogModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161619] border border-[#e4e4e7]/20 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative space-y-4">
            <button 
              onClick={() => setNewBlogModal(false)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#1a1a1e] text-[#e4e4e7] hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="font-syne text-xl text-white">Create New Journal Entry</h2>
            <form onSubmit={handleAddBlog} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-[#e4e4e7]/70 mb-1 font-syne">Title</label>
                <input 
                  type="text" 
                  required
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Journal Title..." 
                  className="w-full bg-[#1a1a1e] border border-[#e4e4e7]/15 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#5e5eff] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-[#e4e4e7]/70 mb-1 font-syne">Category</label>
                <input 
                  type="text" 
                  required
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Web Development" 
                  className="w-full bg-[#1a1a1e] border border-[#e4e4e7]/15 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#5e5eff] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-[#e4e4e7]/70 mb-1 font-syne">Excerpt</label>
                <input 
                  type="text" 
                  required
                  value={newExcerpt} 
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Short summary..." 
                  className="w-full bg-[#1a1a1e] border border-[#e4e4e7]/15 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#5e5eff] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-[#e4e4e7]/70 mb-1 font-syne">Content</label>
                <textarea 
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Full article content..."
                  className="w-full bg-[#1a1a1e] border border-[#e4e4e7]/15 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#5e5eff] focus:outline-none resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-3 rounded-lg bg-[#5e5eff] text-white font-syne text-xs font-bold hover:bg-[#4a4ae6] transition-all"
              >
                Publish Journal Entry
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
