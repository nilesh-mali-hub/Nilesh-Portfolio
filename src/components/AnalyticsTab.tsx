import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Globe, 
  Search, 
  Smartphone, 
  Laptop, 
  Tv, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  Eye, 
  FileText,
  Calendar,
  MousePointerClick
} from 'lucide-react';

interface SummaryData {
  totalPageViews: number;
  uniqueVisitors: number;
  pages: { name: string; value: number }[];
  referrers: { name: string; value: number }[];
  keywords: { name: string; value: number }[];
  devices: { name: string; value: number }[];
  timeline: { date: string; pageviews: number; visitors: number }[];
}

export function AnalyticsTab() {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [leadCount, setLeadCount] = useState(0);

  const fetchAnalytics = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);
    
    try {
      const [analyticsRes, leadsRes] = await Promise.all([
        fetch('/api/analytics/summary'),
        fetch('/api/leads')
      ]);
      
      const analyticsData = await analyticsRes.json();
      const leadsData = await leadsRes.json();
      
      setData(analyticsData);
      setLeadCount(Array.isArray(leadsData) ? leadsData.length : 0);
    } catch (err) {
      console.error('Failed to load analytics summary:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-neutral-800 border-t-[#D1FF52] rounded-full animate-spin"></div>
          <p className="text-neutral-500 text-xs font-mono">Loading real-time visitor statistics...</p>
        </div>
      </div>
    );
  }

  const views = data?.totalPageViews || 0;
  const visitors = data?.uniqueVisitors || 0;
  
  // Calculate key metrics
  const avgActions = visitors > 0 ? (views / visitors).toFixed(1) : '0';
  const leadConversionRate = visitors > 0 ? ((leadCount / visitors) * 100).toFixed(1) : '0';

  // Get max timeline value for scaling our custom SVG chart
  const maxPageViews = data?.timeline 
    ? Math.max(...data.timeline.map(t => Math.max(t.pageviews, t.visitors, 10)), 10) 
    : 10;

  return (
    <div className="space-y-8">
      {/* Header section inside tab */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#D1FF52]" /> Website Visitor Insights
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            Analyze active traffic channels, target SEO keywords, and visitor behavior.
          </p>
        </div>
        <button
          onClick={() => fetchAnalytics(true)}
          disabled={refreshing}
          className="self-start sm:self-auto bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white font-mono text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#D1FF52] ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Logs'}
        </button>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl flex flex-col relative overflow-hidden group hover:border-neutral-700 transition-colors">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#D1FF52] opacity-[0.01] -mr-3 -mt-3 rounded-full"></div>
          <div className="flex justify-between items-start mb-3">
            <span className="text-neutral-400 text-xs font-semibold uppercase tracking-wider font-mono">Total Pageviews</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <span className="font-display font-bold text-3xl text-white mt-1">
            {views.toLocaleString()}
          </span>
          <span className="text-neutral-500 text-[10px] font-mono mt-1">All registered views</span>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl flex flex-col relative overflow-hidden group hover:border-neutral-700 transition-colors">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#D1FF52] opacity-[0.01] -mr-3 -mt-3 rounded-full"></div>
          <div className="flex justify-between items-start mb-3">
            <span className="text-neutral-400 text-xs font-semibold uppercase tracking-wider font-mono">Unique Visitors</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="font-display font-bold text-3xl text-white mt-1">
            {visitors.toLocaleString()}
          </span>
          <span className="text-neutral-500 text-[10px] font-mono mt-1">Unique IP / Client sessions</span>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl flex flex-col relative overflow-hidden group hover:border-neutral-700 transition-colors">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#D1FF52] opacity-[0.01] -mr-3 -mt-3 rounded-full"></div>
          <div className="flex justify-between items-start mb-3">
            <span className="text-neutral-400 text-xs font-semibold uppercase tracking-wider font-mono">SEO Lead Conversion</span>
            <div className="p-2 rounded-lg bg-[#D1FF52]/10 text-[#D1FF52]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <span className="font-display font-bold text-3xl text-[#D1FF52] mt-1">
            {leadConversionRate}%
          </span>
          <span className="text-neutral-500 text-[10px] font-mono mt-1">Leads from {visitors} visitors</span>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl flex flex-col relative overflow-hidden group hover:border-neutral-700 transition-colors">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#D1FF52] opacity-[0.01] -mr-3 -mt-3 rounded-full"></div>
          <div className="flex justify-between items-start mb-3">
            <span className="text-neutral-400 text-xs font-semibold uppercase tracking-wider font-mono">Engagement Multiplier</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <span className="font-display font-bold text-3xl text-white mt-1">
            {avgActions}
          </span>
          <span className="text-neutral-500 text-[10px] font-mono mt-1">Average pages per visitor</span>
        </div>
      </div>

      {/* Modern High-Performance Traffic Timeline Chart */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
          <div>
            <h3 className="font-bold text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D1FF52]" /> Traffic Trends (Last 7 Days)
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">Visualize user engagement and relative growth.</p>
          </div>
          <div className="flex gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span className="w-3 h-3 bg-[#D1FF52] rounded-sm inline-block"></span>
              Pageviews
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span className="w-3 h-3 bg-purple-500 rounded-sm inline-block"></span>
              Unique Visitors
            </span>
          </div>
        </div>

        {/* Custom pure SVG charts (Responsive, lightweight, clean) */}
        {data && data.timeline && data.timeline.length > 0 ? (
          <div className="relative pt-4">
            <div className="h-64 w-full flex items-end justify-between gap-2 sm:gap-4 md:gap-6 pt-6 border-b border-neutral-800 px-2 sm:px-4">
              {data.timeline.map((day, i) => {
                // Calculate height percentages relative to max value
                const pvHeight = `${(day.pageviews / maxPageViews) * 100}%`;
                const vHeight = `${(day.visitors / maxPageViews) * 100}%`;
                
                // Format Date nicely
                let formattedDay = '';
                try {
                  const dateObj = new Date(day.date);
                  formattedDay = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                } catch {
                  formattedDay = day.date;
                }

                return (
                  <div key={day.date} className="flex-1 flex flex-col items-center group/bar relative h-full justify-end">
                    
                    {/* Hover tooltip */}
                    <div className="absolute bottom-full mb-2 bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 shadow-2xl z-20 text-[11px] font-mono leading-relaxed opacity-0 pointer-events-none group-hover/bar:opacity-100 transition-opacity duration-200 whitespace-nowrap min-w-[120px]">
                      <p className="font-semibold text-white border-b border-neutral-800 pb-1 mb-1">{formattedDay}</p>
                      <p className="flex justify-between items-center gap-4">
                        <span className="text-neutral-400">Pageviews:</span> 
                        <span className="text-[#D1FF52] font-bold">{day.pageviews}</span>
                      </p>
                      <p className="flex justify-between items-center gap-4">
                        <span className="text-neutral-400">Visitors:</span> 
                        <span className="text-purple-400 font-bold">{day.visitors}</span>
                      </p>
                    </div>

                    {/* Bars Container */}
                    <div className="w-full flex items-end justify-center gap-1.5 h-full relative">
                      {/* Unique Visitors Bar (Purple) */}
                      <div 
                        style={{ height: vHeight }} 
                        className="w-4 sm:w-6 bg-purple-500/80 hover:bg-purple-400 transition-colors rounded-t-sm shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                      ></div>
                      
                      {/* Pageviews Bar (Yellow/Green) */}
                      <div 
                        style={{ height: pvHeight }} 
                        className="w-4 sm:w-6 bg-[#D1FF52]/80 hover:bg-[#D1FF52] transition-colors rounded-t-sm shadow-[0_0_10px_rgba(209,255,82,0.1)]"
                      ></div>
                    </div>

                    {/* Label */}
                    <span className="text-[10px] font-mono text-neutral-500 mt-2 rotate-45 sm:rotate-0 origin-top-left sm:origin-center pt-1">
                      {day.date.substring(5)} {/* MM-DD */}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Horizontal lines representation */}
            <div className="absolute left-0 right-0 top-6 border-t border-neutral-800/40 pointer-events-none"></div>
            <div className="absolute left-0 right-0 top-1/2 border-t border-neutral-800/40 pointer-events-none"></div>
            <div className="absolute left-0 right-0 bottom-0 border-t border-neutral-800/40 pointer-events-none"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 border border-dashed border-neutral-800 rounded-xl text-neutral-500 text-sm">
            No timeline data recorded yet. Visit some pages on the live site to record views!
          </div>
        )}
      </div>

      {/* Channels, Referrers, Keywords, & Devices breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Keywords block */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Search className="w-4 h-4 text-[#D1FF52]" /> Driving Keywords & Search Terms
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">Identified via Google Referral query strings and UTM terms.</p>
          </div>

          {data && data.keywords && data.keywords.length > 0 ? (
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-2 no-scrollbar">
              {data.keywords.map((kw, i) => (
                <div key={kw.name + i} className="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800/60 rounded-xl hover:border-neutral-700 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] text-neutral-400 font-mono">
                      #{i + 1}
                    </span>
                    <span className="text-white text-sm font-medium">{kw.name}</span>
                  </div>
                  <span className="text-[#D1FF52] bg-[#D1FF52]/10 px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono">
                    {kw.value} visits
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 border border-dashed border-neutral-800 rounded-xl">
              <p className="text-neutral-500 text-xs font-mono">No keyword queries captured yet.</p>
              <p className="text-[10px] text-neutral-600 mt-2 max-w-xs">
                To simulate keyword matching, append custom campaign tags like <code className="text-[#D1FF52] bg-neutral-900 px-1 py-0.5 rounded">?utm_term=branding+designer</code> to your link when navigating.
              </p>
            </div>
          )}
        </div>

        {/* Referrers block */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-400" /> Top Traffic Sources (Referrers)
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">Where your visitors are arriving from before viewing.</p>
          </div>

          {data && data.referrers && data.referrers.length > 0 ? (
            <div className="space-y-4 flex-1">
              {data.referrers.map((ref, i) => {
                const totalRefValue = data.referrers.reduce((acc, curr) => acc + curr.value, 0);
                const percent = Math.round((ref.value / (totalRefValue || 1)) * 100);

                return (
                  <div key={ref.name + i} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white truncate font-medium flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        {ref.name}
                      </span>
                      <span className="text-neutral-400">{ref.value} views ({percent}%)</span>
                    </div>
                    {/* Visual custom progress bar */}
                    <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden">
                      <div 
                        style={{ width: `${percent}%` }} 
                        className="bg-purple-500 h-full rounded-full"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-12 border border-dashed border-neutral-800 rounded-xl text-neutral-500 text-xs font-mono">
              No traffic sources logged yet.
            </div>
          )}
        </div>
      </div>

      {/* Pages and Device type breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Visited Pages block */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6">
          <div className="mb-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" /> Popular Visited Paths
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">Identified pages receiving the highest visitor volume.</p>
          </div>

          {data && data.pages && data.pages.length > 0 ? (
            <div className="space-y-3">
              {data.pages.map((page, i) => (
                <div key={page.name + i} className="flex justify-between items-center text-xs font-mono bg-neutral-900/40 px-3 py-2.5 rounded-lg border border-neutral-800/40">
                  <span className="text-white font-medium">{page.name}</span>
                  <span className="text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 font-bold">{page.value} hits</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-neutral-800 rounded-xl text-neutral-500 text-xs font-mono">
              No page paths recorded yet.
            </div>
          )}
        </div>

        {/* Devices breakdown */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" /> Client Device Profile
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">Breakdown of screen factors accessing the site.</p>
          </div>

          {data && data.devices && data.devices.length > 0 ? (
            <div className="flex flex-col sm:flex-row items-center gap-8 py-4 justify-around mt-4">
              {/* Left: graphical layout split */}
              <div className="flex flex-col gap-3 font-mono text-xs w-full sm:w-auto">
                {data.devices.map((dev, i) => {
                  const totalDevs = data.devices.reduce((acc, curr) => acc + curr.value, 0);
                  const pct = Math.round((dev.value / (totalDevs || 1)) * 100);
                  const isMobile = dev.name === 'mobile';
                  const isTablet = dev.name === 'tablet';
                  
                  return (
                    <div key={dev.name} className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isMobile ? 'bg-emerald-500/10 text-emerald-400' : isTablet ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
                        {isMobile ? <Smartphone className="w-4 h-4" /> : isTablet ? <Tv className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-white capitalize font-bold">{dev.name}</p>
                        <p className="text-[10px] text-neutral-400">{dev.value} devices ({pct}%)</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: progress ring visual emulation */}
              <div className="flex gap-1 items-end h-28 w-28 bg-neutral-900 border border-neutral-800 rounded-full items-center justify-center relative shadow-inner overflow-hidden">
                <div className="absolute inset-2 bg-neutral-950 border border-neutral-800/80 rounded-full flex flex-col items-center justify-center font-mono text-center">
                  <span className="text-[10px] text-neutral-500">Captured</span>
                  <span className="text-sm font-bold text-[#D1FF52]">
                    {data.devices.reduce((acc, curr) => acc + curr.value, 0)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-neutral-800 rounded-xl text-neutral-500 text-xs font-mono mt-4">
              No device profiles logged yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
