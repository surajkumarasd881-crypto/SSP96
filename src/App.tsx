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
    <div className="bg-[#F8F7F4] text-[#1A1A1A] font-sans min-h-screen flex flex-col p-8 md:p-12 selection:bg-[#B45F06] selection:text-[#F8F7F4]">
      
      {/* HEADER */}
      <header className="border-b border-[#1A1A1A] pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="font-mono-space text-[0.65rem] tracking-[0.15em] opacity-70 uppercase mb-1">[00] IDENTITY</div>
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)}
                className="font-serif-editorial text-2xl font-semibold bg-white border border-[#B45F06] px-2 py-0.5 rounded text-[#1A1A1A] focus:outline-none"
              />
              <button 
                onClick={() => { setUserName(tempName); setIsEditingName(false); }}
                className="px-3 py-1 bg-[#1A1A1A] text-white text-xs font-mono-space rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <h2 
              onClick={() => setIsEditingName(true)} 
              className="font-serif-editorial font-semibold text-2xl sm:text-3xl m-0 cursor-pointer hover:text-[#B45F06] transition-colors"
              title="Click to edit name"
            >
              {userName}
            </h2>
          )}
        </div>

        <nav className="flex gap-8">
          <a href="#about" className="no-underline text-[#1A1A1A] text-[0.7rem] font-mono-space tracking-wider hover:text-[#B45F06] transition-colors">[01] PHILOSOPHY</a>
          <a href="#projects" className="no-underline text-[#1A1A1A] text-[0.7rem] font-mono-space tracking-wider hover:text-[#B45F06] transition-colors">[02] ARCHIVE</a>
          <a href="#blogs" className="no-underline text-[#1A1A1A] text-[0.7rem] font-mono-space tracking-wider hover:text-[#B45F06] transition-colors">[03] JOURNALS</a>
          <a href="#contact" className="no-underline text-[#1A1A1A] text-[0.7rem] font-mono-space tracking-wider hover:text-[#B45F06] transition-colors">[04] INQUIRY</a>
        </nav>

        <a 
          href="#contact"
          className="bg-[#1A1A1A] text-[#F8F7F4] border-none py-3 px-6 font-mono-space text-xs uppercase tracking-wider cursor-pointer hover:bg-[#B45F06] transition-all no-underline"
        >
          EXECUTE COLLABORATION
        </a>
      </header>

      {/* MAIN HERO & SPECIALIZATION */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-16 flex-grow">
        <section className="lg:col-span-2 hero space-y-6">
          <span className="font-mono-space text-[0.65rem] tracking-[0.15em] opacity-70 uppercase block">MISSION // 2026</span>
          <h1 className="font-serif-editorial text-6xl sm:text-8xl m-0 leading-[0.9] tracking-tight">
            Technical precision meets storytelling.
          </h1>
          <p className="font-sans text-xl sm:text-2xl max-w-[42ch] leading-relaxed opacity-85">
            I craft high-performance web applications, minimalist UIs, and immersive digital experiences from the foundation up in Chitrakoot & Prayagraj, India.
          </p>

          {/* Profile DP Card widget */}
          <div className="pt-6 flex items-center gap-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#1A1A1A] group">
              <img src={profileImage} alt={userName} className="w-full h-full object-cover" />
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer text-[0.6rem]">
                <Camera size={16} />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <div className="space-y-1">
              <div className="font-mono-space text-xs font-bold">{userName}</div>
              <div className="font-mono-space text-[0.65rem] text-[#B45F06]">Web Developer & Creator</div>
              <div className="flex items-center gap-3 pt-1 text-xs">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#1A1A1A] hover:text-[#B45F06]"><Github size={16} /></a>
                <div className="flex items-center gap-1 font-mono-space text-[0.7rem]">
                  <Instagram size={14} className="text-[#B45F06]" />
                  {isEditingInstagram ? (
                    <div className="flex items-center gap-1">
                      <input 
                        type="text" 
                        value={tempInstagram} 
                        onChange={(e) => setTempInstagram(e.target.value)}
                        className="bg-white text-xs px-2 py-0.5 rounded border border-[#1A1A1A] w-28 focus:outline-none"
                      />
                      <button onClick={() => { setInstagramHandle(tempInstagram); setIsEditingInstagram(false); }} className="text-[#B45F06] font-bold">✓</button>
                    </div>
                  ) : (
                    <span onClick={() => setIsEditingInstagram(true)} className="cursor-pointer hover:underline">{instagramHandle}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="border border-[#1A1A1A] p-8 bg-white/50 backdrop-blur-sm">
            <span className="font-mono-space text-[0.65rem] tracking-[0.15em] opacity-70 uppercase block">SPECIALIZATION</span>
            <ul className="list-none p-0 font-mono-space text-[0.8rem] mt-8 space-y-0">
              <li className="border-t border-[#1A1A1A] py-4 flex justify-between items-center">[01] WEB DESIGN <span className="text-[#B45F06]">→</span></li>
              <li className="border-t border-[#1A1A1A] py-4 flex justify-between items-center">[02] FRONTEND <span className="text-[#B45F06]">→</span></li>
              <li className="border-t border-[#1A1A1A] py-4 flex justify-between items-center">[03] DEVELOPMENT <span className="text-[#B45F06]">→</span></li>
              <li className="border-t border-b border-[#1A1A1A] py-4 flex justify-between items-center">[04] AI INTEGRATION <span className="text-[#B45F06]">→</span></li>
            </ul>
          </div>
        </section>
      </main>

      {/* FEATURED ARCHIVE (PROJECTS) */}
      <section id="projects" className="py-16 border-t border-[#1A1A1A]/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <span className="font-mono-space text-[0.65rem] tracking-[0.15em] opacity-70 uppercase block mb-1">FEATURED ARCHIVE</span>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl m-0">Selected Projects</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setProjectFilter(cat)}
                className={`px-3 py-1.5 font-mono-space text-xs uppercase cursor-pointer border ${
                  projectFilter === cat 
                    ? 'bg-[#1A1A1A] text-[#F8F7F4] border-[#1A1A1A]' 
                    : 'bg-transparent text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="border border-[#1A1A1A] p-6 bg-white/60 hover:bg-white transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="h-56 overflow-hidden mb-6 border border-[#1A1A1A]/20">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div>
                <span className="font-mono-space text-[0.65rem] text-[#B45F06] uppercase tracking-wider block mb-2">{project.category}</span>
                <h3 className="font-serif-editorial text-2xl font-semibold m-0 mb-3 group-hover:text-[#B45F06] transition-colors">{project.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed mb-4">{project.description}</p>
                <div className="font-mono-space text-xs text-[#B45F06] flex items-center gap-1 font-bold">INSPECT SPECIFICATION →</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNALS SECTION */}
      <section id="blogs" className="py-16 border-t border-[#1A1A1A]/20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="font-mono-space text-[0.65rem] tracking-[0.15em] opacity-70 uppercase block mb-1">EDITORIAL JOURNALS</span>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl m-0">Thoughts & Articles</h2>
          </div>
          <button 
            onClick={() => setNewBlogModal(true)}
            className="bg-transparent border border-[#1A1A1A] py-2 px-4 font-mono-space text-xs uppercase cursor-pointer hover:bg-[#1A1A1A] hover:text-[#F8F7F4] transition-all flex items-center gap-2"
          >
            <Plus size={14} /> New Article
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
              onClick={() => setSelectedBlog(blog)}
              className="border border-[#1A1A1A] p-6 bg-white/60 hover:bg-white transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between font-mono-space text-[0.65rem] opacity-70 uppercase mb-3">
                  <span className="text-[#B45F06] font-bold">{blog.category}</span>
                  <span>{blog.date} · {blog.readTime}</span>
                </div>
                <h3 className="font-serif-editorial text-2xl font-semibold m-0 mb-3 group-hover:text-[#B45F06] transition-colors">{blog.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed mb-4">{blog.excerpt}</p>
              </div>
              <div className="font-mono-space text-xs text-[#B45F06] font-bold">READ ARTICLE →</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT / INQUIRY SECTION */}
      <section id="contact" className="py-16 border-t border-[#1A1A1A]/20 max-w-2xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="font-mono-space text-[0.65rem] tracking-[0.15em] opacity-70 uppercase block mb-1">TRANSMISSION</span>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl m-0">Initialize Collaboration</h2>
        </div>

        {contactSubmitted ? (
          <div className="border border-[#1A1A1A] bg-white p-8 text-center space-y-3">
            <CheckCircle2 className="mx-auto text-[#B45F06]" size={36} />
            <h3 className="font-serif-editorial text-2xl font-semibold">Transmission Successful</h3>
            <p className="font-mono-space text-xs opacity-80">Thank you. Suraj will review your inquiry shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono-space text-xs uppercase mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={contactForm.name} 
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="John Doe" 
                  className="w-full bg-white border border-[#1A1A1A] p-3 font-sans text-sm focus:outline-none focus:border-[#B45F06]"
                />
              </div>
              <div>
                <label className="block font-mono-space text-xs uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={contactForm.email} 
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="john@example.com" 
                  className="w-full bg-white border border-[#1A1A1A] p-3 font-sans text-sm focus:outline-none focus:border-[#B45F06]"
                />
              </div>
            </div>
            <div>
              <label className="block font-mono-space text-xs uppercase mb-2">Project Scope</label>
              <select 
                value={contactForm.project}
                onChange={(e) => setContactForm({ ...contactForm, project: e.target.value })}
                className="w-full bg-white border border-[#1A1A1A] p-3 font-sans text-sm focus:outline-none focus:border-[#B45F06]"
              >
                <option>Web Development</option>
                <option>Web Design</option>
                <option>AI Integration</option>
                <option>Full-Stack Application</option>
              </select>
            </div>
            <div>
              <label className="block font-mono-space text-xs uppercase mb-2">Message</label>
              <textarea 
                rows={4}
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Describe your project requirements..."
                className="w-full bg-white border border-[#1A1A1A] p-3 font-sans text-sm focus:outline-none focus:border-[#B45F06] resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-[#1A1A1A] text-[#F8F7F4] border-none py-4 font-mono-space text-xs uppercase tracking-wider cursor-pointer hover:bg-[#B45F06] transition-all"
            >
              Send Transmission
            </button>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-[#1A1A1A] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <span className="font-mono-space text-[0.65rem] opacity-75 uppercase">PRAYAGRAJ, INDIA</span>
        <span className="font-mono-space text-[0.65rem] opacity-75 uppercase">© 2026 {userName.toUpperCase()} — ALL RIGHTS RESERVED</span>
        <span className="font-mono-space text-[0.65rem] opacity-75 uppercase">ASMEDIA.COLLAB@GMAIL.COM</span>
      </footer>

      {/* PROJECT INSPECT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F8F7F4] border border-[#1A1A1A] max-w-2xl w-full p-8 relative space-y-6">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 bg-transparent border border-[#1A1A1A] cursor-pointer hover:bg-[#1A1A1A] hover:text-white"
            >
              <X size={20} />
            </button>
            <div className="h-64 overflow-hidden border border-[#1A1A1A]">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-mono-space text-[0.65rem] text-[#B45F06] uppercase tracking-wider">{selectedProject.category}</span>
              <h2 className="font-serif-editorial text-3xl font-semibold m-0 mt-1">{selectedProject.title}</h2>
              <p className="text-sm opacity-80 mt-3 leading-relaxed">{selectedProject.description}</p>
            </div>
            <div>
              <div className="font-mono-space text-xs uppercase mb-2 opacity-70">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 border border-[#1A1A1A] font-mono-space text-xs bg-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4 border-t border-[#1A1A1A]">
              <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-[#1A1A1A] text-[#F8F7F4] font-mono-space text-xs uppercase text-center no-underline hover:bg-[#B45F06]">
                Live Preview ↗
              </a>
              <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="px-6 py-3 border border-[#1A1A1A] font-mono-space text-xs uppercase text-center no-underline hover:bg-[#1A1A1A] hover:text-white">
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}

      {/* BLOG READ MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F8F7F4] border border-[#1A1A1A] max-w-2xl w-full p-8 relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-6 right-6 p-2 bg-transparent border border-[#1A1A1A] cursor-pointer hover:bg-[#1A1A1A] hover:text-white"
            >
              <X size={20} />
            </button>
            <div>
              <div className="flex justify-between font-mono-space text-[0.65rem] opacity-70 uppercase mb-2">
                <span className="text-[#B45F06] font-bold">{selectedBlog.category}</span>
                <span>{selectedBlog.date} · {selectedBlog.readTime}</span>
              </div>
              <h1 className="font-serif-editorial text-3xl font-semibold m-0">{selectedBlog.title}</h1>
              <div className="font-mono-space text-xs opacity-70 mt-1">By {selectedBlog.author}</div>
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-line border-t border-b border-[#1A1A1A]/20 py-6 font-sans opacity-90">
              {selectedBlog.content}
            </div>
            <button 
              onClick={() => setSelectedBlog(null)}
              className="w-full py-3 border border-[#1A1A1A] bg-transparent font-mono-space text-xs uppercase cursor-pointer hover:bg-[#1A1A1A] hover:text-white"
            >
              Close Article
            </button>
          </div>
        </div>
      )}

      {/* NEW BLOG MODAL */}
      {newBlogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F8F7F4] border border-[#1A1A1A] max-w-xl w-full p-8 relative space-y-4">
            <button 
              onClick={() => setNewBlogModal(false)}
              className="absolute top-6 right-6 p-2 bg-transparent border border-[#1A1A1A] cursor-pointer hover:bg-[#1A1A1A] hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="font-serif-editorial text-2xl font-semibold m-0">Publish New Article</h2>
            <form onSubmit={handleAddBlog} className="space-y-4">
              <div>
                <label className="block font-mono-space text-xs uppercase mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Article Title..." 
                  className="w-full bg-white border border-[#1A1A1A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#B45F06]"
                />
              </div>
              <div>
                <label className="block font-mono-space text-xs uppercase mb-1">Category</label>
                <input 
                  type="text" 
                  required
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Web Development" 
                  className="w-full bg-white border border-[#1A1A1A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#B45F06]"
                />
              </div>
              <div>
                <label className="block font-mono-space text-xs uppercase mb-1">Excerpt</label>
                <input 
                  type="text" 
                  required
                  value={newExcerpt} 
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Short summary..." 
                  className="w-full bg-white border border-[#1A1A1A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#B45F06]"
                />
              </div>
              <div>
                <label className="block font-mono-space text-xs uppercase mb-1">Content</label>
                <textarea 
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Full article body..."
                  className="w-full bg-white border border-[#1A1A1A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#B45F06] resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-[#1A1A1A] text-[#F8F7F4] font-mono-space text-xs uppercase cursor-pointer hover:bg-[#B45F06]"
              >
                Publish
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
