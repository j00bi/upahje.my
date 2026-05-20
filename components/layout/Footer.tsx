import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display-md mb-4" style={{ color: 'var(--color-primary)' }}>
              UpahJe.my
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-canvas-soft)' }}>
              Malaysia's creative marketplace. Connect with talented professionals for all your creative needs.
            </p>
            <div className="flex gap-3">
              {['IG', 'FB', 'TW'].map((social) => (
                <button
                  key={social}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: 'var(--color-canvas-soft)', color: 'var(--color-ink)' }}
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* For Clients */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--color-canvas)' }}>
              For Clients
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-canvas-soft)' }}>
              <li><Link href="/jobs" className="hover:underline">Find Talent</Link></li>
              <li><Link href="/categories" className="hover:underline">Browse Categories</Link></li>
              <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
              <li><Link href="/how-it-works" className="hover:underline">How It Works</Link></li>
            </ul>
          </div>

          {/* For Talent */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--color-canvas)' }}>
              For Talent
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-canvas-soft)' }}>
              <li><Link href="/jobs" className="hover:underline">Find Work</Link></li>
              <li><Link href="/talent" className="hover:underline">Create Profile</Link></li>
              <li><Link href="/resources" className="hover:underline">Resources</Link></li>
              <li><Link href="/success-stories" className="hover:underline">Success Stories</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--color-canvas)' }}>
              Categories
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-canvas-soft)' }}>
              <li><Link href="/categories/photography" className="hover:underline">📷 Photography</Link></li>
              <li><Link href="/categories/videography" className="hover:underline">🎬 Videography</Link></li>
              <li><Link href="/categories/content-creator" className="hover:underline">✍️ Content Creator</Link></li>
              <li><Link href="/categories/graphic-design" className="hover:underline">🖼️ Graphic Design</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t flex justify-between items-center flex-wrap gap-4" style={{ borderColor: 'rgba(232, 235, 230, 0.2)' }}>
          <p className="text-sm" style={{ color: 'var(--color-canvas-soft)' }}>
            © 2026 UpahJe.my. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm" style={{ color: 'var(--color-canvas-soft)' }}>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}