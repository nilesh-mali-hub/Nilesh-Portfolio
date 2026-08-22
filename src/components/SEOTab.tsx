import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Save, 
  RefreshCw, 
  Search, 
  Share2, 
  FileCode, 
  Check, 
  Sparkles, 
  Copy,
  Eye,
  Sliders,
  ShieldCheck
} from 'lucide-react';

interface SEOConfig {
  siteTitle?: string;
  metaDescription?: string;
  focusKeywords?: string;
  googleVerificationId?: string;
  ogImageUrl?: string;
  canonicalDomain?: string;
  authorName?: string;
  isIndexingEnabled?: boolean;
}

export function SEOTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [seoData, setSeoData] = useState<SEOConfig>({
    siteTitle: 'Nilesh Mali | Graphic Designer, Creative Developer & Brand Identity Specialist',
    metaDescription: 'Nilesh Mali is a professional Graphic Designer & Creative Developer based in India. Specializing in Brand Identity, Social Media Creatives, UI/UX Design, Custom Websites, and AI-powered Visual Content.',
    focusKeywords: 'Nilesh Mali, Graphic Designer India, Brand Identity Designer, UI/UX Designer, Creative Developer, Logo Designer, Social Media Graphics, Portfolio Website, Freelance Graphic Designer Rajasthan, Abu Road Designer',
    googleVerificationId: 'h9kB-6SF_IHCD-DKwQmTWZgGhDdt0mZkXLwjzAEsvFg',
    ogImageUrl: 'https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png',
    canonicalDomain: typeof window !== 'undefined' ? window.location.origin : 'https://nileshmali2026.netlify.app',
    authorName: 'Nilesh Mali',
    isIndexingEnabled: true,
  });

  useEffect(() => {
    fetch('/api/seo')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setSeoData(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seoData),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      }
    } catch (err) {
      console.error('Failed to save SEO configuration:', err);
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  // SEO Health Calculations
  const titleLen = (seoData.siteTitle || '').length;
  const descLen = (seoData.metaDescription || '').length;
  const isTitleOptimal = titleLen >= 40 && titleLen <= 70;
  const isDescOptimal = descLen >= 120 && descLen <= 165;
  const hasKeywords = (seoData.focusKeywords || '').split(',').length >= 4;
  const hasVerification = Boolean(seoData.googleVerificationId && seoData.googleVerificationId.trim().length > 5);

  let score = 0;
  if (isTitleOptimal) score += 25; else if (titleLen > 20) score += 15;
  if (isDescOptimal) score += 25; else if (descLen > 50) score += 15;
  if (hasKeywords) score += 20; else score += 10;
  if (hasVerification) score += 15;
  if (seoData.ogImageUrl) score += 15;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-neutral-500">
        <RefreshCw className="w-6 h-6 animate-spin text-[var(--accent-color)]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)]">
              <Globe className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold font-display uppercase tracking-tight text-white">
              SEO & Search Engine Optimization
            </h2>
          </div>
          <p className="text-xs text-neutral-400">
            Optimize your portfolio for Google rankings, social media share cards, rich snippets, and crawler indexing.
          </p>
        </div>

        {/* SEO Score Badge */}
        <div className="flex items-center gap-3 bg-neutral-950 px-4 py-3 rounded-xl border border-neutral-800 shrink-0">
          <div className="text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">SEO Health Score</p>
            <p className="text-lg font-bold font-mono text-[var(--accent-color)]">{score} / 100</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[var(--accent-color)] flex items-center justify-center text-[var(--accent-color)] font-bold text-xs">
            {score}%
          </div>
        </div>
      </div>

      {/* SEO Live Preview Cards (Google SERP + Social Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Google SERP Preview */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-blue-400" />
              Google Search Result (Desktop Preview)
            </span>
            <span className="text-[10px] font-mono text-neutral-500">Live Simulation</span>
          </div>

          <div className="p-4 rounded-xl bg-white text-black font-sans shadow-sm border border-neutral-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src={seoData.ogImageUrl || 'https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png'} 
                  alt="Favicon" 
                  className="w-4 h-4 object-contain"
                />
              </div>
              <div className="leading-tight overflow-hidden">
                <p className="text-xs text-[#202124] font-medium truncate">Nilesh Mali Portfolio</p>
                <p className="text-[11px] text-[#4d5156] font-mono truncate">{seoData.canonicalDomain || 'https://nileshmali.com'}</p>
              </div>
            </div>

            <h3 className="text-base sm:text-lg text-[#1a0dab] font-medium hover:underline cursor-pointer line-clamp-1 leading-snug">
              {seoData.siteTitle || 'Creative Portfolio | Nilesh Mali'}
            </h3>

            <p className="text-xs sm:text-sm text-[#4d5156] mt-1 line-clamp-2 leading-relaxed">
              {seoData.metaDescription || 'Nilesh Mali is a freelance Graphic Designer & Creative Developer...'}
            </p>
          </div>
        </div>

        {/* Social Media Share Preview (WhatsApp / LinkedIn / Twitter) */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
              Social Card Preview (WhatsApp / LinkedIn)
            </span>
            <span className="text-[10px] font-mono text-neutral-500">OpenGraph Preview</span>
          </div>

          <div className="rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-lg">
            <div className="aspect-video w-full bg-neutral-900 relative flex items-center justify-center overflow-hidden border-b border-neutral-800">
              <img 
                src={seoData.ogImageUrl || 'https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png'} 
                alt="Social Share Thumbnail" 
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white">
                1200 x 630
              </div>
            </div>
            <div className="p-3.5 space-y-1 bg-neutral-900/60">
              <p className="text-[10px] font-mono uppercase text-neutral-500 truncate">
                {new URL(seoData.canonicalDomain || 'https://nileshmali.com').hostname}
              </p>
              <p className="text-xs font-bold text-white line-clamp-1">
                {seoData.siteTitle || 'Creative Portfolio | Nilesh Mali'}
              </p>
              <p className="text-[11px] text-neutral-400 line-clamp-2">
                {seoData.metaDescription || 'Explore portfolio projects and design services by Nilesh Mali.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Edit Form */}
      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h3 className="text-sm font-bold font-display uppercase tracking-wider text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--accent-color)]" />
            Meta Tags & Keyword Configuration
          </h3>
          <span className="text-[10px] font-mono text-neutral-500">Auto-saved to API</span>
        </div>

        {/* Site Title */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
              Global Meta Title
            </label>
            <span className={`text-[11px] font-mono ${isTitleOptimal ? 'text-emerald-400' : 'text-amber-400'}`}>
              {titleLen} / 60 characters {isTitleOptimal ? '(Optimal)' : '(Aim for 50-60)'}
            </span>
          </div>
          <input 
            type="text" 
            value={seoData.siteTitle || ''}
            onChange={(e) => setSeoData({ ...seoData, siteTitle: e.target.value })}
            placeholder="Nilesh Mali | Graphic Designer, Creative Developer & Brand Identity Specialist"
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent-color)]"
            required
          />
        </div>

        {/* Meta Description */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
              Meta Description
            </label>
            <span className={`text-[11px] font-mono ${isDescOptimal ? 'text-emerald-400' : 'text-amber-400'}`}>
              {descLen} / 160 characters {isDescOptimal ? '(Optimal)' : '(Aim for 120-160)'}
            </span>
          </div>
          <textarea 
            rows={3}
            value={seoData.metaDescription || ''}
            onChange={(e) => setSeoData({ ...seoData, metaDescription: e.target.value })}
            placeholder="Brief, high-impact summary of your services and design expertise that appears in search results."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-[var(--accent-color)] resize-none"
            required
          />
        </div>

        {/* Target Focus Keywords */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
            Target Focus Keywords (Comma-Separated)
          </label>
          <input 
            type="text" 
            value={seoData.focusKeywords || ''}
            onChange={(e) => setSeoData({ ...seoData, focusKeywords: e.target.value })}
            placeholder="Graphic Designer, Brand Identity, UI/UX Designer, Logo Design India, Abu Road..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent-color)] font-mono text-xs"
          />
          <p className="text-[11px] text-neutral-500 mt-1">
            Separate target high-intent search keywords with commas.
          </p>
        </div>

        {/* Google Site Verification & Open Graph Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Google Site Verification Code
            </label>
            <input 
              type="text" 
              value={seoData.googleVerificationId || ''}
              onChange={(e) => setSeoData({ ...seoData, googleVerificationId: e.target.value })}
              placeholder="e.g. h9kB-6SF_IHCD-DKwQmTWZgGhDdt0mZkXLwjzAEsvFg"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--accent-color)] font-mono text-xs"
            />
            <p className="text-[10px] text-neutral-500 mt-1">
              From Google Search Console HTML Tag verification.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              OpenGraph Social Share Image URL
            </label>
            <input 
              type="url" 
              value={seoData.ogImageUrl || ''}
              onChange={(e) => setSeoData({ ...seoData, ogImageUrl: e.target.value })}
              placeholder="https://res.cloudinary.com/..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--accent-color)] font-mono text-xs"
            />
            <p className="text-[10px] text-neutral-500 mt-1">
              Direct banner or logo URL (recommended 1200 x 630 px).
            </p>
          </div>
        </div>

        {/* Indexing status toggle */}
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-color)]" />
              <span>Search Engine Indexing (`robots: index, follow`)</span>
            </p>
            <p className="text-[11px] text-neutral-400">
              Allow Googlebot and Bingbot to crawl and rank all public pages.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={seoData.isIndexingEnabled !== false}
              onChange={(e) => setSeoData({ ...seoData, isIndexingEnabled: e.target.checked })}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-color)]"></div>
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
          {saveSuccess ? (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <Check className="w-4 h-4" /> SEO settings updated successfully!
            </span>
          ) : (
            <span className="text-xs text-neutral-500">Changes apply immediately across pages.</span>
          )}

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[var(--accent-color)] text-[var(--accent-fg)] font-display font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-[var(--accent-color)]/20 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : 'Save SEO Configuration'}</span>
          </button>
        </div>
      </form>

      {/* Quick Crawler Resources & Testing Tools */}
      <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
        <h3 className="text-sm font-bold font-display uppercase tracking-wider text-white flex items-center gap-2">
          <FileCode className="w-4 h-4 text-[var(--accent-color)]" />
          Crawler Files & Search Engine Links
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Sitemap.xml */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono">/sitemap.xml</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">Active</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">XML index of all portfolio pages for search engine crawlers.</p>
            </div>
            <div className="flex items-center gap-2">
              <a 
                href="/sitemap.xml" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 py-1.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(`${window.location.origin}/sitemap.xml`, 'sitemap')}
                className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs transition-colors cursor-pointer"
                title="Copy URL"
              >
                {copiedLink === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Robots.txt */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono">/robots.txt</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">Active</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">Directs web crawlers and prevents indexing of the secret admin panel.</p>
            </div>
            <div className="flex items-center gap-2">
              <a 
                href="/robots.txt" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 py-1.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(`${window.location.origin}/robots.txt`, 'robots')}
                className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs transition-colors cursor-pointer"
                title="Copy URL"
              >
                {copiedLink === 'robots' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Google Verification File */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono">/google91850d01e3b06185.html</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">Active</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">Google Search Console verification file uploaded to root directory.</p>
            </div>
            <div className="flex items-center gap-2">
              <a 
                href="/google91850d01e3b06185.html" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 py-1.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span>Verify File</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(`${window.location.origin}/google91850d01e3b06185.html`, 'gver')}
                className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs transition-colors cursor-pointer"
                title="Copy URL"
              >
                {copiedLink === 'gver' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Google Search Console link */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Google Search Console</span>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded">Tool</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">Submit your sitemap and monitor clicks, impressions, and index status.</p>
            </div>
            <a 
              href="https://search.google.com/search-console" 
              target="_blank" 
              rel="noreferrer"
              className="py-1.5 px-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <span>Open Search Console</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
