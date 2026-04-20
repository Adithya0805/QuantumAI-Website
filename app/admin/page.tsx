import { supabaseAdmin } from '@/lib/supabase/admin'
import { format } from 'date-fns'
import { 
  Users, 
  Mail, 
  MessageSquare, 
  Zap, 
  TrendingUp, 
  Download,
  CheckCircle2,
  Clock,
  Calendar
} from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getStats() {
  const [waitlist, contact, newsletter, demo] = await Promise.all([
    supabaseAdmin.from('waitlist').select('*', { count: 'exact' }),
    supabaseAdmin.from('contact_messages').select('*', { count: 'exact' }),
    supabaseAdmin.from('newsletter_subscribers').select('*', { count: 'exact' }),
    supabaseAdmin.from('demo_requests').select('*', { count: 'exact' }),
  ])

  return {
    waitlist: { data: waitlist.data || [], count: waitlist.count || 0 },
    contact: { data: contact.data || [], count: contact.count || 0 },
    newsletter: { data: newsletter.data || [], count: newsletter.count || 0 },
    demo: { data: demo.data || [], count: demo.count || 0 },
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: 'Waitlist', count: stats.waitlist.count, icon: Users, color: 'text-cyan-400' },
    { label: 'Demo Requests', count: stats.demo.count, icon: Zap, color: 'text-purple-400' },
    { label: 'Messages', count: stats.contact.count, icon: MessageSquare, color: 'text-orange-400' },
    { label: 'Subscribers', count: stats.newsletter.count, icon: Mail, color: 'text-emerald-400' },
  ]

  return (
    <div className="min-h-screen bg-[#050508] text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold font-grotesk tracking-tight text-white/90">
              Nexus <span className="text-primary">Control</span>
            </h1>
            <p className="text-white/40 text-sm font-mono mt-1">QUANTUMAI INFRASTRUCTURE MONITOR v1.0.4</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest hover:bg-white/10 transition-all">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Live Status: Synced
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.label} className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-white/5 ${card.color}`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <TrendingUp className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-3xl font-bold font-mono text-white/90">{card.count}</p>
              <p className="text-xs font-mono uppercase tracking-widest text-white/30 mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Recent Waitlist */}
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" /> Recent Waitlist
            </h2>
            <div className="space-y-4">
              {stats.waitlist.data.slice(0, 5).map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div>
                    <p className="text-sm font-medium text-white/90">{item.name || 'Anonymous'}</p>
                    <p className="text-xs text-white/30">{item.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-white/20 uppercase">
                      {item.created_at ? format(new Date(item.created_at), 'MMM dd, HH:mm') : 'N/A'}
                    </p>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full uppercase">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
              {stats.waitlist.count === 0 && <p className="text-center text-white/20 py-8 italic">No entries yet.</p>}
            </div>
          </div>

          {/* Recent Demo Requests */}
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" /> Demo Inbound
            </h2>
            <div className="space-y-4">
              {stats.demo.data.slice(0, 5).map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div>
                    <p className="text-sm font-medium text-white/90">{item.name}</p>
                    <p className="text-xs text-white/30">{item.company} • {item.team_size}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-purple-400 uppercase flex items-center justify-end gap-1">
                      <Calendar className="w-3 h-3" /> {item.preferred_date || 'TBD'}
                    </p>
                    <span className="text-[9px] font-mono text-white/20 uppercase border border-white/20 px-2 py-0.5 rounded-full">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
              {stats.demo.count === 0 && <p className="text-center text-white/20 py-8 italic">No requests yet.</p>}
            </div>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-400" /> Secure Messages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.contact.data.slice(0, 6).map((item: any) => (
              <div key={item.id} className="p-5 rounded-2xl bg-black/40 border border-white/5 relative group">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  <p className="text-[9px] font-mono text-white/20 uppercase">
                    {item.created_at ? format(new Date(item.created_at), 'MMM dd') : 'N/A'}
                  </p>
                </div>
                <h3 className="text-sm font-bold text-white/90 truncate mb-1">{item.subject}</h3>
                <p className="text-xs text-white/40 line-clamp-2 mb-4">"{item.message}"</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                  <p className="text-[10px] font-medium text-white/60">{item.name}</p>
                  <button className="text-[10px] text-primary hover:underline font-mono">ENCRYPTED</button>
                </div>
              </div>
            ))}
            {stats.contact.count === 0 && <div className="col-span-full text-center text-white/20 py-8 italic border border-dashed border-white/10 rounded-2xl">Inbox Zero reached.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
