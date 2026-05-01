import { useState, useRef, useEffect } from 'react'
import { ExternalLink, FolderOpen } from 'lucide-react'
import ProjectModal from './ProjectModal'

const projects = [
  {
    category: 'web', c1: '#2563eb', c2: '#1e40af', mock: 'wide', wide: true,
    cat: 'WooCommerce / E-Commerce',
    title: 'Amity Staffing',
    desc: 'Custom WooCommerce store with a bespoke mini cart plugin, streamlined checkout, and a fully responsive shopping experience.',
    fullDesc: 'Amity Staffing needed a robust e-commerce presence with a custom mini cart experience that matched their brand. We built a custom WooCommerce mini cart plugin from scratch with live cart updates, smooth animations, and a frictionless checkout flow. The site is fully responsive and optimised for Core Web Vitals.',
    year: '2024', client: 'Amity Staffing', role: 'WordPress + WooCommerce Dev',
    tags: ['WooCommerce', 'Custom Plugin', 'E-Commerce', 'Responsive Design'],
    techStack: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'CSS3'],
    liveUrl: 'https://www.amitystaffing.com',
    results: [
      { value: '100%', label: 'Custom mini cart' },
      { value: 'Fast', label: 'Core Web Vitals' },
      { value: 'Live', label: 'Production site' },
    ],
  },
  {
    category: 'web', c1: '#16a34a', c2: '#15803d', mock: 'default',
    cat: 'Multilingual / Payment Gateway',
    title: 'Triggers.sa',
    desc: 'Multilingual WooCommerce store with Arabic and English support, integrated payment gateway, and a mobile-first responsive layout.',
    fullDesc: 'Triggers.sa is a Saudi Arabia-based e-commerce platform requiring full Arabic (RTL) and English (LTR) multilingual support. We implemented a seamless language switcher, integrated a regional payment gateway for Saudi customers, and ensured the entire layout adapts correctly for both RTL and LTR reading directions.',
    year: '2024', client: 'Triggers.sa, Saudi Arabia', role: 'WordPress + WooCommerce + Multilang',
    tags: ['Multilingual', 'RTL Support', 'Payment Gateway', 'WooCommerce'],
    techStack: ['WordPress', 'WooCommerce', 'WPML', 'PHP', 'Payment API'],
    liveUrl: 'https://triggers.sa',
    results: [
      { value: '2',    label: 'Languages (AR + EN)' },
      { value: 'RTL',  label: 'Arabic support' },
      { value: 'Live', label: 'Production site' },
    ],
  },
  {
    category: 'web', c1: '#7c3aed', c2: '#4f46e5', mock: 'wide',
    cat: 'WordPress Redesign + AI Integration',
    title: 'IBCC SmallBizPlace',
    desc: 'Full website redesign for the Innovation Black Chamber of Commerce with an AI chat module, event management, and MemberPress configuration.',
    fullDesc: 'IBCC (Innovation Black Chamber of Commerce) based in Killeen, Texas needed a complete redesign of their SmallBizPlace platform. We delivered a modern WordPress redesign, integrated an AI chat module to assist members with business queries 24/7, configured MemberPress for tiered membership access, and set up a full event management system for their workshops and networking events. The platform now serves hundreds of Black-owned and veteran-owned businesses across Texas.',
    year: '2024', client: 'IBCC, Killeen Texas', role: 'WordPress Redesign + AI + MemberPress',
    tags: ['WordPress', 'AI Chat Module', 'MemberPress', 'Event Management'],
    techStack: ['WordPress', 'MemberPress', 'AI Chat API', 'PHP', 'JavaScript'],
    liveUrl: 'https://ibcc.smallbizplace.com',
    results: [
      { value: 'AI',   label: 'Chat module live' },
      { value: '100%', label: 'Membership system' },
      { value: 'Live', label: 'Production site' },
    ],
  },
  {
    category: 'web', c1: '#f59e0b', c2: '#d97706', mock: 'default',
    cat: 'WooCommerce / Blog / E-Commerce',
    title: 'Energy Luck',
    desc: 'WordPress blog and WooCommerce store for a US-based holistic energy healer with payment gateway, service bookings, and crystal product listings.',
    fullDesc: 'Energy Luck is the platform of Uriel Maksumov, a US-based holistic energy healer offering spiritual healing services and crystal products. We built a WordPress site combining a content-rich blog with a full WooCommerce store for products (crystal necklaces, bracelets, generators) and service bookings (life coaching, meditation sessions). Payment gateway integration handles transactions from $200 to $1,700. The site has been featured in Preferred Health Magazine and Brainz Magazine.',
    year: '2024', client: 'Energy Luck, USA', role: 'WordPress + WooCommerce + Blog',
    tags: ['WordPress', 'WooCommerce', 'Blog', 'Payment Gateway', 'E-Commerce'],
    techStack: ['WordPress', 'WooCommerce', 'PHP', 'Stripe', 'Yoast SEO'],
    liveUrl: 'https://www.energyluck.com',
    results: [
      { value: '$1.7K', label: 'Max product value' },
      { value: 'Blog',  label: 'Content + store' },
      { value: 'Live',  label: 'Production site' },
    ],
  },
  {
    category: 'web', c1: '#ec4899', c2: '#be185d', mock: 'brand', letter: 'W',
    cat: 'WooCommerce Customisation',
    title: 'Wig World Shop',
    desc: 'Feature-rich WooCommerce store with custom variation products, mini cart, and live product preview functionality for a wig retailer.',
    fullDesc: 'Wig World Shop needed a WooCommerce store that could handle complex product variations (hair type, length, colour, texture) with a seamless shopping experience. We built custom variation product displays, a bespoke mini cart with live updates, and a product preview functionality so customers can visualise wigs before adding to cart. The store works with human hair wigs, heat-resistant synthetics, and custom-made pieces.',
    year: '2024', client: 'Wig World Shop', role: 'WooCommerce Advanced Customisation',
    tags: ['WooCommerce', 'Variation Products', 'Custom Mini Cart', 'Product Preview'],
    techStack: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'CSS3'],
    liveUrl: 'https://wigworldshop.com',
    results: [
      { value: '100%', label: 'Custom variations' },
      { value: 'Live', label: 'Product preview' },
      { value: 'Live', label: 'Production site' },
    ],
  },
  {
    category: 'web', c1: '#0f172a', c2: '#1e3a5f', mock: 'wide',
    cat: 'Fully Custom WordPress Theme + GSAP',
    title: 'ATX Web Designs',
    desc: 'Fully custom WordPress theme built from PSD to HTML, with Advanced Custom Fields (ACF), GSAP animations, and a conversion-focused layout.',
    fullDesc: 'ATX Web Designs is a strategic digital partner for business growth — offering conversion-engineered websites, automation, and AI-powered tools. We built their site from scratch: PSD to pixel-perfect HTML, a fully custom WordPress theme (no page builders), Advanced Custom Fields (ACF) for flexible content management, and GSAP-powered animations throughout for a premium, high-performance feel. Every section was crafted to drive lead quality and engagement.',
    year: '2024', client: 'ATX Web Designs, USA', role: 'Custom WordPress Theme + ACF + GSAP',
    tags: ['Custom Theme', 'PSD to HTML', 'ACF', 'GSAP Animation', 'WordPress'],
    techStack: ['WordPress', 'ACF Pro', 'GSAP', 'PHP', 'JavaScript', 'CSS3'],
    liveUrl: 'https://www.atxwebdesigns.com',
    results: [
      { value: '100%', label: 'Custom theme' },
      { value: 'GSAP', label: 'Pro animations' },
      { value: 'Live', label: 'Production site' },
    ],
  },
  {
    category: 'mobile', c1: '#10b981', c2: '#06b6d4', mock: 'mobile',
    cat: 'Mobile Responsive Design',
    title: 'Healthcare Website',
    desc: 'Fully responsive healthcare website with appointment booking, doctor profiles, and local SEO optimisation.',
    fullDesc: 'The client needed a website that worked flawlessly on mobile as over 80% of their patients browse on phones. We built a mobile-first responsive site with an online appointment booking system, Google Maps integration, and local SEO. Appointment bookings increased significantly within the first two months.',
    year: '2023', client: 'Healthcare Client, Mohali', role: 'Responsive Design + SEO',
    tags: ['Responsive Design', 'WordPress', 'Local SEO', 'Booking System'],
    techStack: ['WordPress', 'PHP', 'Google Maps API', 'CSS Grid'],
    liveUrl: '',
    results: [
      { value: '80%+',  label: 'Mobile traffic' },
      { value: 'Top 3', label: 'Local search rank' },
      { value: '60%',   label: 'More bookings' },
    ],
  },
]

function CardThumbnail({ liveUrl, c1, c2, mock, letter }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const wrapRef = useRef(null)
  const iframeRef = useRef(null)

  // Compute scale so the 1280px-wide iframe fills the container width exactly
  useEffect(() => {
    const el = wrapRef.current
    const iframe = iframeRef.current
    if (!el || !iframe) return

    const update = () => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      const scale = w / 1280
      iframe.style.transform = `scale(${scale})`
      // height of iframe at natural size that fills the container
      iframe.style.height = `${h / scale}px`
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  if (!liveUrl || failed) {
    return (
      <div className="work-placeholder" style={{ '--c1': c1, '--c2': c2 }}>
        <Mock mock={mock} letter={letter} />
      </div>
    )
  }

  return (
    <div className="card-thumb-wrap">
      {!loaded && (
        <div className="work-placeholder card-thumb-loading" style={{ '--c1': c1, '--c2': c2 }}>
          <div className="card-thumb-spinner" />
        </div>
      )}
      <div className="card-browser-chrome">
        <div className="card-browser-dots">
          <span /><span /><span />
        </div>
        <div className="card-browser-bar">{liveUrl.replace('https://', '').replace('http://', '')}</div>
      </div>
      <div className="card-iframe-wrap" ref={wrapRef}>
        <iframe
          ref={iframeRef}
          src={liveUrl}
          className="card-iframe"
          title="preview"
          scrolling="no"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          tabIndex={-1}
        />
      </div>
    </div>
  )
}

function Mock({ mock, letter }) {
  if (mock === 'brand') return <div className="work-mock work-mock-brand"><div className="mock-logo-big">{letter}</div><div className="mock-brand-lines"><span /><span /></div></div>
  if (mock === 'wide') return <div className="work-mock work-mock-wide"><div className="mock-sidebar" /><div className="mock-main"><div className="mock-chart" /><div className="mock-stats-row"><span /><span /><span /></div></div></div>
  if (mock === 'mobile') return <div className="work-mock work-mock-mobile"><div className="mock-phone"><div className="mock-phone-screen"><div className="mock-ph-header" /><div className="mock-ph-content"><span /><span /><span /></div></div></div></div>
  return <div className="work-mock"><div className="mock-bar" /><div className="mock-lines"><span /><span /><span /></div><div className="mock-card-row"><span /><span /></div></div>
}

export default function Work() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const filters = ['all', 'web', 'mobile']
  const visible = projects.filter(p => filter === 'all' || p.category === filter)

  return (
    <section className="work section" id="work">
      <div className="container">
        <div className="section-label reveal-up">Portfolio</div>
        <h2 className="display-title reveal-up">Selected <span className="text-accent">Work.</span></h2>

        <div className="work-filter reveal-up" style={{ marginTop: '2.5rem' }}>
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All Projects' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="work-grid">
          {visible.map((project) => {
            const { c1, c2, cat, title, desc, mock, letter, wide, liveUrl } = project
            return (
              <div
                key={title}
                className={`work-card revealed${wide && filter === 'all' ? ' work-card-wide' : ''}`}
                onClick={() => setSelected(project)}
                style={{ cursor: 'pointer' }}
              >
                <div className="work-img">
                  <CardThumbnail liveUrl={liveUrl} c1={c1} c2={c2} mock={mock} letter={letter} />
                  <div className="work-overlay">
                    <span className="work-view"><ExternalLink size={14} /> View Project</span>
                  </div>
                </div>
                <div className="work-info">
                  <span className="work-cat">{cat}</span>
                  <h3>{title}</h3>
                  <p className="work-desc">{desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="work-cta reveal-up">
          <a href="#contact" className="btn btn-ghost btn-lg magnetic">
            <FolderOpen size={15} /> See All Projects
          </a>
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
