import { supabaseAdmin } from "@/lib/supabase/admin"
import { format } from "date-fns"
import { 
  Users, 
  Mail, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  LucideIcon
} from "lucide-react"

export const dynamic = "force-dynamic"

type WaitlistItem = {
  id: string
  name: string
  email: string
  use_case?: string
  created_at: string
}

type DemoItem = {
  id: string
  name: string
  email: string
  company?: string
  team_size?: string
  message?: string
  status: string
  created_at: string
}

type ContactItem = {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  created_at: string
}

type NewsletterItem = {
  id: string
  email: string
  is_active: boolean
  subscribed_at: string
}

async function getData() {
  const [waitlist, newsletter, contact, demo] = await Promise.all([
    supabaseAdmin.from("waitlist").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("newsletter_subscribers").select("*").order("subscribed_at", { ascending: false }),
    supabaseAdmin.from("contact_messages").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("demo_requests").select("*").order("created_at", { ascending: false }),
  ])

  return {
    waitlist: (waitlist.data || []) as WaitlistItem[],
    newsletter: (newsletter.data || []) as NewsletterItem[],
    contact: (contact.data || []) as ContactItem[],
    demo: (demo.data || []) as DemoItem[]
  }
}

export default async function AdminDashboard() {
  const data = await getData()

  const stats = [
    { label: "Waitlist", value: data.waitlist.length, icon: Users, color: "text-blue-400" },
    { label: "Newsletters", value: data.newsletter.length, icon: Mail, color: "text-purple-400" },
    { label: "Contacts", value: data.contact.length, icon: MessageSquare, color: "text-green-400" },
    { label: "Demos", value: data.demo.length, icon: Calendar, color: "text-orange-400" },
  ]

  return (
    <div className="min-h-screen bg-[#020205] pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-grotesk tracking-tight text-white uppercase italic">
              Command <span className="text-gradient-cyan">Center</span>
            </h1>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em] mt-2">Quantum Submissions Overview</p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">System Online</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content Tabs / Scroll Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Waitlist Table */}
          <SectionContainer title="Waitlist Submissions" icon={Users}>
            <div className="divide-y divide-white/5">
              {data.waitlist.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between group">
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.name}</div>
                    <div className="text-xs text-white/40 font-mono">{item.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                      {item.use_case || 'General'}
                    </div>
                    <div className="text-[9px] text-white/10 mt-1">
                      {format(new Date(item.created_at), 'MMM dd, HH:mm')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* Demo Requests */}
          <SectionContainer title="Demo Requests" icon={Calendar}>
            <div className="divide-y divide-white/5">
              {data.demo.map((item) => (
                <div key={item.id} className="py-4 space-y-2 group">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{item.name}</div>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-wider">
                    <span>{item.company}</span>
                    <span>{item.team_size} Team</span>
                  </div>
                  <p className="text-xs text-white/30 line-clamp-2 bg-white/5 p-2 rounded-lg italic">
                    &quot;{item.message}&quot;
                  </p>
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* Contact Messages */}
          <SectionContainer title="Messages" icon={MessageSquare}>
            <div className="divide-y divide-white/5">
              {data.contact.map((item) => (
                <div key={item.id} className="py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-white italic">&quot;{item.subject}&quot;</div>
                    <div className="text-[9px] text-white/20 font-mono">
                      {format(new Date(item.created_at), 'MMM dd, HH:mm')}
                    </div>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{item.message}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <Mail className="w-2 h-2 text-primary" />
                    </div>
                    <span className="text-[10px] text-white/40 font-mono">{item.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* Newsletter Subscribers */}
          <SectionContainer title="Newsletter Pulse" icon={Mail}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.newsletter.map((item) => (
                <div key={item.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-between group hover:border-primary/20 transition-all">
                  <div className="text-xs font-bold text-white truncate mb-2">{item.email}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
                        {item.is_active ? 'Active' : 'Unsubscribed'}
                      </span>
                    </div>
                    <span className="text-[8px] text-white/10 font-mono">
                        {format(new Date(item.subscribed_at), 'MM.dd.yy')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>

        </div>
      </div>
    </div>
  )
}

function SectionContainer({ title, icon: Icon, children }: { title: string, icon: LucideIcon, children: React.ReactNode }) {
  return (
    <div className="glass p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden flex flex-col max-h-[500px]">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-white/5">
          <Icon className="w-4 h-4 text-white/60" />
        </div>
        <h2 className="text-xl font-bold text-white font-grotesk tracking-tight uppercase italic">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
        {children}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const isPending = status === 'pending'
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[8px] font-mono uppercase tracking-widest bg-white/5 ${isPending ? 'text-orange-400' : 'text-green-400'}`}>
      {isPending ? <Clock className="w-2.5 h-2.5" /> : <CheckCircle2 className="w-2.5 h-2.5" />}
      {status}
    </div>
  )
}
