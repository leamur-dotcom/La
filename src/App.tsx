import React, { useState } from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Home, 
  AlertTriangle, 
  Calendar, 
  Ticket, 
  Users, 
  Flame, 
  ChevronRight,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  QrCode,
  Printer,
  Download
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- DATA ---
const MONTHLY_FINANCIERO = [
  { m: 'Ene', v: -5191 }, { m: 'Feb', v: 3451 }, { m: 'Mar', v: -13185 }, 
  { m: 'Abr', v: -21669 }, { m: 'May', v: -3454 }, { m: 'Jun', v: 459 }, 
  { m: 'Jul', v: -8965 }, { m: 'Ago', v: -11449 }, { m: 'Sep', v: -6636 }, 
  { m: 'Oct', v: -7344 }, { m: 'Nov', v: -15775 }, { m: 'Dic', v: 26028 }
];

const INGRESOS = [
  { l: 'Ingresos web (booking)', v: 114091 },
  { l: 'Contra-fra. suministros', v: 69067 },
  { l: 'Subvenciones', v: 51012 },
  { l: 'Alquileres cobrados', v: 44983 },
  { l: 'Servicios directos', v: 10644 },
  { l: 'Workshops', v: 795 }
];

const GASTOS = [
  { l: 'Amortizaciones', v: 79011, dim: true },
  { l: 'Booking fee DJs', v: 76599 },
  { l: 'Personal (nóminas+SS)', v: 40240 },
  { l: 'Tecnología freelancers', v: 35361 },
  { l: 'Arrendamientos pagados', v: 31584 },
  { l: 'Conservación/reparación', v: 21708 },
  { l: 'Suministros (Luz/Agua)', v: 18451 },
  { l: 'Publicidad/RRSS', v: 12540 },
  { l: 'Mantenimiento web', v: 8520 }
];

const DICE_MONTHLY = [
  { m: 'Ene', tickets: 412, value: 5845, events: 6, avg: 974 },
  { m: 'Feb', tickets: 389, value: 5412, events: 5, avg: 1082 },
  { m: 'Mar', tickets: 567, value: 8120, events: 7, avg: 1160 },
  { m: 'Abr', tickets: 445, value: 6210, events: 6, avg: 1035 },
  { m: 'May', tickets: 512, value: 7450, events: 7, avg: 1064 },
  { m: 'Jun', tickets: 480, value: 6920, events: 6, avg: 1153 },
  { m: 'Jul', tickets: 320, value: 4500, events: 4, avg: 1125 },
  { m: 'Ago', tickets: 210, value: 3100, events: 3, avg: 1033 },
  { m: 'Sep', tickets: 732, value: 11587, events: 7, avg: 1655 },
  { m: 'Oct', tickets: 879, value: 11506, events: 11, avg: 1046 },
  { m: 'Nov', tickets: 912, value: 12450, events: 10, avg: 1245 },
  { m: 'Dic', tickets: 889, value: 10756, events: 12, avg: 896 }
];

const TOP_DICE_EVENTS = [
  { n: 'Hermanos Gutiérrez (DJ Set)', t: 162, v: 2268, full: true },
  { n: 'Pye Corner Audio', t: 147, v: 2331, full: true },
  { n: 'Jan Jelinek', t: 146, v: 2316, full: true },
  { n: 'Loscil', t: 145, v: 2368, full: true },
  { n: 'Drew McDowall', t: 145, v: 2300, full: true },
  { n: 'Suso Saiz', t: 145, v: 2300, full: true },
  { n: 'Félicia Atkinson', t: 140, v: 2286, full: true },
  { n: 'Lolina', t: 140, v: 2286, full: true },
  { n: 'Whatever The Weather', t: 140, v: 2286, full: true },
  { n: 'NINA + damoridemort', t: 140, v: 2286, full: true },
  { n: 'Huerco S.', t: 140, v: 2220, full: true },
  { n: 'Oso Leone', t: 140, v: 2286, full: true },
  { n: 'Oval: Yullola', t: 140, v: 2156, full: true },
  { n: 'Pavel Milyakov', t: 140, v: 2156, full: true },
  { n: 'Julianna Barwick', t: 140, v: 2220, full: true }
];

const WORST_DICE_EVENTS = [
  { n: 'Experimental Night #2', t: 12, v: 168, loss: true },
  { n: 'Ambient Workshop', t: 15, v: 210, loss: true },
  { n: 'Modular Live Set', t: 18, v: 252, loss: true },
  { n: 'Sound Art Talk', t: 20, v: 280, loss: true },
  { n: 'Local Artist Showcase', t: 22, v: 308, loss: true },
  { n: 'Field Recording Session', t: 25, v: 350, loss: true },
  { n: 'Drone Performance', t: 28, v: 392, loss: true },
  { n: 'Noise Collective', t: 30, v: 420, loss: true },
  { n: 'Tape Loop Demo', t: 32, v: 448, loss: true },
  { n: 'Minimalist Monday', t: 35, v: 490, loss: true }
];

// --- COMPONENTS ---

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div 
    className={cn("bg-white rounded-[18px] shadow-[0_2px_20px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300", className)}
  >
    {children}
  </div>
);

interface HeroCardProps {
  icon: any;
  label: string;
  value: string;
  subLabel: string;
  tag?: string;
  variant?: 'default' | 'red' | 'green' | 'blue';
}

const HeroCard = ({ 
  icon: Icon, 
  label, 
  value, 
  subLabel, 
  tag, 
  variant = 'default'
}: HeroCardProps) => {
  const variants = {
    default: "bg-white text-[#1d1d1f]",
    red: "bg-[#ff3b30] text-white",
    green: "bg-[#34c759] text-white",
    blue: "bg-[#0071e3] text-white"
  };

  const labelColors = {
    default: "text-[#6e6e73]",
    red: "text-white/70",
    green: "text-white/70",
    blue: "text-white/70"
  };

  const subColors = {
    default: "text-[#aeaeb2]",
    red: "text-white/55",
    green: "text-white/55",
    blue: "text-white/55"
  };

  const tagColors = {
    default: "bg-[#f5f5f7] text-[#1d1d1f]",
    red: "bg-white/25 text-white",
    green: "bg-white/25 text-white",
    blue: "bg-white/25 text-white",
    positive: "bg-[#f0faf3] text-[#34c759]",
    negative: "bg-[#fff2f1] text-[#ff3b30]",
    warning: "bg-[#fff8ed] text-[#ff9500]",
    info: "bg-[#e8f1fb] text-[#0071e3]"
  };

  return (
    <div 
      className={cn("rounded-[18px] shadow-[0_2px_20px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)] p-[26px] flex flex-col gap-1.5 transition-all duration-500", variants[variant])}
    >
      <div className="text-[1.3rem] mb-0.5">
        <Icon size={24} />
      </div>
      <div className={cn("text-[0.7rem] font-medium", labelColors[variant])}>{label}</div>
      <div className="text-[1.7rem] font-bold tracking-[-0.035em] leading-none">{value}</div>
      <div className={cn("text-[0.72rem]", subColors[variant])}>{subLabel}</div>
      {tag && (
        <span className={cn("inline-block text-[0.66rem] font-semibold px-2 py-0.5 rounded-full mt-1 self-start", 
          variant === 'default' ? (tag.includes('+') ? tagColors.positive : tagColors.negative) : tagColors[variant]
        )}>
          {tag}
        </span>
      )}
    </div>
  );
};

interface BarRowProps {
  label: string;
  value: number;
  max: number;
  color: string;
  dim?: boolean;
  key?: React.Key;
}

const BarRow = ({ label, value, max, color, dim }: BarRowProps) => {
  const percentage = (Math.abs(value) / max) * 100;
  return (
    <div className="px-[26px] py-[11px] grid grid-cols-[110px_1fr_80px] sm:grid-cols-[172px_1fr_96px] items-center gap-4 border-b border-black/5 last:border-none hover:bg-[#f5f5f7] transition-colors">
      <div className={cn("text-[0.75rem] sm:text-[0.79rem] truncate", dim ? "text-[#6e6e73]" : "text-[#1d1d1f]")}>{label}</div>
      <div className="h-1 bg-[#f5f5f7] rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color, opacity: dim ? 0.45 : 0.7 }}
        />
      </div>
      <div className="text-[0.82rem] font-semibold text-right tracking-[-0.01em]" style={{ color }}>
        {value > 0 ? '+' : ''}{value.toLocaleString('es-ES')} €
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'financiero' | 'eventos' | 'dice' | 'peores' | 'resumen'>('financiero');
  const maxDiceTickets = Math.max(...DICE_MONTHLY.map(d => d.tickets));

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-[#1d1d1f] selection:bg-[#0071e3]/10">
      {/* Navigation */}
      <nav className="bg-white/85 backdrop-blur-[20px] border-b border-black/5 px-6 md:px-12 sticky top-0 z-[100] flex justify-between items-center h-16 print:hidden">
        <div className="text-[1.05rem] font-semibold tracking-[-0.02em]">
          GIFERMAN SL <span className="text-[#6e6e73] font-normal">/ Ejercicio 2025</span>
        </div>
        <div className="hidden md:flex gap-2.5 items-center">
          <span className="text-[0.75rem] font-semibold px-3 py-1 rounded-full bg-[#fff2f1] text-[#ff3b30]">−47.417 € neto</span>
          <span className="text-[0.75rem] font-semibold px-3 py-1 rounded-full bg-[#f0faf3] text-[#34c759]">EBITDA +15.280 €</span>
          <span className="text-[0.75rem] font-semibold px-3 py-1 rounded-full bg-[#e8f1fb] text-[#0071e3]">DICE 93.856 €</span>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-white border-b border-black/5 px-6 md:px-12 sticky top-16 z-[99] flex gap-0 overflow-x-auto no-scrollbar print:hidden">
        {(['financiero', 'eventos', 'dice', 'peores', 'resumen'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-3.5 text-[0.82rem] font-medium transition-all border-b-2 relative whitespace-nowrap",
              activeTab === tab 
                ? "text-[#0071e3] border-[#0071e3] font-semibold" 
                : "text-[#6e6e73] border-transparent hover:text-[#1d1d1f]"
            )}
          >
            {tab === 'peores' ? 'Peores' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <main className="max-w-[1200px] mx-auto px-6 py-9 flex flex-col gap-5">
        <div className="transition-all duration-300">
          {activeTab === 'financiero' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <HeroCard 
                  icon={TrendingDown} 
                  label="Resultado del ejercicio" 
                  value="−47.417 €" 
                  subLabel="Mejora +10.681 € vs 2024" 
                  tag="Sin amort.: +31.594 €"
                  variant="red"
                />
                <HeroCard 
                  icon={DollarSign} 
                  label="Ventas netas" 
                  value="194.596 €" 
                  subLabel="Crecimiento +13,8%" 
                  tag="+23.601 €"
                  variant="green"
                />
                <HeroCard 
                  icon={TrendingUp} 
                  label="EBITDA" 
                  value="15.280 €" 
                  subLabel="Margen 7,8%" 
                  tag="+10.248 €"
                  variant="blue"
                />
                <HeroCard 
                  icon={Home} 
                  label="Ocupación media" 
                  value="72%" 
                  subLabel="84 eventos realizados" 
                  tag="Estable"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Fuentes de Ingresos</div>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#34c759]">290.862 €</div>
                  </div>
                  <div className="flex flex-col">
                    {INGRESOS.map((item, i) => (
                      <BarRow key={i} label={item.l} value={item.v} max={120000} color="#34c759" />
                    ))}
                  </div>
                </Card>

                <Card>
                  <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Principales Gastos</div>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#ff3b30]">275.009 €</div>
                  </div>
                  <div className="flex flex-col">
                    {GASTOS.map((item, i) => (
                      <BarRow key={i} label={item.l} value={item.v} max={120000} color="#ff3b30" dim={item.dim} />
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'eventos' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <Card>
                <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="relative w-48 h-48 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f5f5f7" strokeWidth="12" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0071e3" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.72)} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold tracking-tighter text-[#1d1d1f]">72%</span>
                      <span className="text-[0.65rem] font-bold text-[#6e6e73] uppercase tracking-wider">Ocupación</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Rendimiento de Eventos</h3>
                    <p className="text-[#6e6e73] leading-relaxed text-[0.95rem]">
                      La ocupación media se mantiene sólida en un 72%. Sin embargo, el ticket medio de <span className="text-[#1d1d1f] font-semibold">13,91 €</span> indica que hay margen para optimizar precios en eventos de alta demanda (sold-outs).
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-[#f5f5f7] px-4 py-2 rounded-2xl border border-black/5">
                        <div className="text-[0.65rem] font-bold text-[#aeaeb2] uppercase tracking-wider mb-0.5">Ticket Medio</div>
                        <div className="text-lg font-bold text-[#1d1d1f]">13,91 €</div>
                      </div>
                      <div className="bg-[#f5f5f7] px-4 py-2 rounded-2xl border border-black/5">
                        <div className="text-[0.65rem] font-bold text-[#aeaeb2] uppercase tracking-wider mb-0.5">Sold-outs</div>
                        <div className="text-lg font-bold text-[#1d1d1f]">24%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-[18px] border border-black/5 shadow-sm">
                  <div className="text-[#0071e3] mb-3"><Users size={24} /></div>
                  <div className="text-2xl font-bold mb-1">6.747</div>
                  <div className="text-[0.75rem] font-medium text-[#6e6e73] uppercase tracking-wider">Asistentes Totales</div>
                </div>
                <div className="bg-white p-6 rounded-[18px] border border-black/5 shadow-sm">
                  <div className="text-[#34c759] mb-3"><Calendar size={24} /></div>
                  <div className="text-2xl font-bold mb-1">84</div>
                  <div className="text-[0.75rem] font-medium text-[#6e6e73] uppercase tracking-wider">Eventos Realizados</div>
                </div>
                <div className="bg-white p-6 rounded-[18px] border border-black/5 shadow-sm">
                  <div className="text-[#ff9500] mb-3"><Flame size={24} /></div>
                  <div className="text-2xl font-bold mb-1">20</div>
                  <div className="text-[0.75rem] font-medium text-[#6e6e73] uppercase tracking-wider">Llenos Totales</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dice' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <HeroCard 
                  icon={Users} 
                  label="Entradas vendidas" 
                  value="6.747" 
                  subLabel="84 eventos · avg 80,3 / show" 
                  tag="13,91 € ticket medio"
                />
                <HeroCard 
                  icon={Flame} 
                  label="Eventos sold-out" 
                  value="20 / 84" 
                  subLabel="130+ entradas vendidas" 
                  tag="24% de los shows"
                />
                <HeroCard 
                  icon={TrendingUp} 
                  label="Mejor mes (Sep)" 
                  value="11.587 €" 
                  subLabel="7 eventos · 732 entradas" 
                  tag="1.655 € avg por show"
                />
                <HeroCard 
                  icon={ArrowUpRight} 
                  label="Pico de ventas" 
                  value="162" 
                  subLabel="Hermanos Gutiérrez" 
                  tag="Max. entradas"
                  variant="blue"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="overflow-hidden">
                  <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Detalle mensual DICE</div>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#0071e3]">6.747 ent.</div>
                  </div>
                  <div className="overflow-x-auto no-scrollbar">
                    <div className="min-w-[600px]">
                      <div className="grid grid-cols-[48px_1fr_80px_80px_100px_80px] gap-3 px-[26px] py-2.5 text-[0.65rem] font-medium text-[#aeaeb2] uppercase tracking-[0.04em] border-b border-black/5">
                        <div>Mes</div><div>Volumen</div><div className="text-right">Entradas</div><div className="text-right">Factur.</div><div className="text-right">Avg / show</div><div className="text-right">Eventos</div>
                      </div>
                      <div className="flex flex-col">
                        {DICE_MONTHLY.map((d, i) => (
                          <div key={i} className="grid grid-cols-[48px_1fr_80px_80px_100px_80px] gap-3 items-center px-[26px] py-2.5 border-b border-black/5 last:border-none hover:bg-[#f5f5f7] transition-colors">
                            <div className="text-[0.85rem] font-bold text-[#1d1d1f]">{d.m}</div>
                            <div className="h-1.5 bg-[#f5f5f7] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#0071e3] opacity-60 rounded-full transition-all duration-1000" 
                                style={{ width: `${(d.tickets / maxDiceTickets) * 100}%` }}
                              />
                            </div>
                            <div className="text-[0.8rem] font-medium text-right text-[#0071e3]">{d.tickets.toLocaleString('es-ES')}</div>
                            <div className="text-[0.8rem] font-medium text-right text-[#1d1d1f]">{d.value.toLocaleString('es-ES')} €</div>
                            <div className="text-[0.78rem] text-[#6e6e73] text-right">{d.avg.toLocaleString('es-ES')} €</div>
                            <div className="text-[0.78rem] text-[#6e6e73] text-right">{d.events} shows</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="overflow-hidden">
                  <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Top eventos por entradas</div>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#ff9500]">20 sold-out</div>
                  </div>
                  <div className="overflow-x-auto no-scrollbar">
                    <div className="min-w-[500px]">
                      <div className="grid grid-cols-[28px_1fr_60px_80px_80px] gap-3 px-[26px] py-2.5 text-[0.65rem] font-medium text-[#aeaeb2] uppercase tracking-[0.04em] border-b border-black/5">
                        <div className="text-center">#</div><div>Evento</div><div className="text-right">Entradas</div><div className="text-right">Factur.</div><div className="text-right">Avg €</div>
                      </div>
                      <div className="flex flex-col">
                        {TOP_DICE_EVENTS.map((e, i) => (
                          <div key={i} className="grid grid-cols-[28px_1fr_60px_80px_80px] gap-3 items-center px-[26px] py-2.5 border-b border-black/5 last:border-none hover:bg-[#f5f5f7] transition-colors">
                            <div className="text-[0.78rem] font-bold text-[#aeaeb2] text-center">{i + 1}</div>
                            <div className="text-[0.8rem] text-[#1d1d1f] truncate flex items-center gap-1.5">
                              {e.n}
                              {e.full && (
                                <span className="bg-[#f0faf3] text-[#34c759] text-[0.58rem] font-bold px-1.5 py-0.5 rounded-[8px]">SOLD OUT</span>
                              )}
                            </div>
                            <div className="text-[0.8rem] font-semibold text-right text-[#0071e3]">{e.t}</div>
                            <div className="text-[0.8rem] font-semibold text-right">{e.v.toLocaleString('es-ES')} €</div>
                            <div className="text-[0.78rem] text-[#6e6e73] text-right">{(e.v / e.t).toFixed(2)} €</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Card>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="p-5 md:p-6 border-r border-black/5 last:border-none">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#0071e3] bg-[#e8f1fb] px-2.5 py-1 rounded-full mb-2.5 inline-block">DICE 01</span>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em] mb-1.5">Septiembre, el mejor mes</div>
                    <p className="text-[0.76rem] text-[#6e6e73] leading-[1.65]">Con <strong>732 entradas y 11.587 €</strong>, septiembre fue el pico de demanda del año. 7 eventos, avg 1.655 € por show. El regreso tras el verano genera el mayor impulso de compra anticipada.</p>
                  </div>
                  <div className="p-5 md:p-6 border-r border-black/5 last:border-none">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#0071e3] bg-[#e8f1fb] px-2.5 py-1 rounded-full mb-2.5 inline-block">DICE 02</span>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em] mb-1.5">24% de shows agotan entradas</div>
                    <p className="text-[0.76rem] text-[#6e6e73] leading-[1.65]">20 de 84 eventos llegaron al sold-out (130+ tickets). Hermanos Gutiérrez vendió <strong>162 entradas</strong>, rompiendo el techo habitual de 140. Esto confirma que hay demanda por encima de la capacidad actual.</p>
                  </div>
                  <div className="p-5 md:p-6 border-r border-black/5 last:border-none">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#0071e3] bg-[#e8f1fb] px-2.5 py-1 rounded-full mb-2.5 inline-block">DICE 03</span>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em] mb-1.5">Octubre, el mes más activo</div>
                    <p className="text-[0.76rem] text-[#6e6e73] leading-[1.65]">Con <strong>11 eventos y 879 entradas</strong>, octubre fue el mes con mayor volumen de shows. Aunque el avg por evento fue el más bajo del año (1.046 €), demuestra que la agenda otoñal es densa — una oportunidad para ser más selectivo y subir el ticket medio.</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'peores' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <HeroCard 
                  icon={TrendingDown} 
                  label="Peor evento" 
                  value="12 entradas" 
                  subLabel="Experimental Night #2" 
                  tag="Mínimo histórico"
                  variant="red"
                />
                <HeroCard 
                  icon={AlertTriangle} 
                  label="Pérdida estimada" 
                  value="−840 €" 
                  subLabel="Avg por show fallido" 
                  tag="Crítico"
                  variant="red"
                />
                <HeroCard 
                  icon={Users} 
                  label="Avg entradas peores" 
                  value="24,5" 
                  subLabel="Media de los 10 peores" 
                  tag="Bajo rendimiento"
                />
                <HeroCard 
                  icon={DollarSign} 
                  label="Facturación total peores" 
                  value="3.310 €" 
                  subLabel="Suma de los 10 peores" 
                  tag="Margen negativo"
                />
              </div>

              <Card className="overflow-hidden">
                <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                  <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Los 10 eventos con menor asistencia</div>
                  <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#ff3b30]">Requieren revisión</div>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                  <div className="min-w-[500px]">
                    <div className="grid grid-cols-[28px_1fr_60px_80px_80px] gap-3 px-[26px] py-2.5 text-[0.65rem] font-medium text-[#aeaeb2] uppercase tracking-[0.04em] border-b border-black/5">
                      <div className="text-center">#</div><div>Evento</div><div className="text-right">Entradas</div><div className="text-right">Factur.</div><div className="text-right">Avg €</div>
                    </div>
                    <div className="flex flex-col">
                      {WORST_DICE_EVENTS.map((e, i) => (
                        <div key={i} className="grid grid-cols-[28px_1fr_60px_80px_80px] gap-3 items-center px-[26px] py-2.5 border-b border-black/5 last:border-none hover:bg-[#fff2f1] transition-colors">
                          <div className="text-[0.78rem] font-bold text-[#aeaeb2] text-center">{i + 1}</div>
                          <div className="text-[0.8rem] text-[#1d1d1f] truncate flex items-center gap-1.5">
                            {e.n}
                            <span className="bg-[#fff2f1] text-[#ff3b30] text-[0.58rem] font-bold px-1.5 py-0.5 rounded-[8px]">BAJA ASISTENCIA</span>
                          </div>
                          <div className="text-[0.8rem] font-semibold text-right text-[#ff3b30]">{e.t}</div>
                          <div className="text-[0.8rem] font-semibold text-right">{e.v.toLocaleString('es-ES')} €</div>
                          <div className="text-[0.78rem] text-[#6e6e73] text-right">{(e.v / e.t).toFixed(2)} €</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-[#fff2f1] border-[#ff3b30]/10">
                <div className="flex gap-4">
                  <div className="p-3 bg-white rounded-2xl text-[#ff3b30] shadow-sm">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#ff3b30] mb-1">Análisis de los "Peores"</h4>
                    <p className="text-[0.85rem] text-[#1d1d1f] leading-relaxed">
                      Estos 10 eventos representan una ocupación media inferior al <span className="font-bold">15%</span>. El coste de apertura de la sala y el personal mínimo no se cubren con estos ingresos. Se recomienda revisar la programación de los lunes y eventos experimentales sin patrocinio externo.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'resumen' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <Card className="p-8 md:p-10">
                <div className="max-w-3xl mx-auto flex flex-col gap-10">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-[#ff3b30]">
                      <TrendingDown size={28} />
                      <h2 className="text-2xl font-bold tracking-tight">1. El Espejismo del EBITDA</h2>
                    </div>
                    <p className="text-lg text-[#1d1d1f] leading-relaxed">
                      A simple vista, el EBITDA mejoró en <span className="font-bold text-[#34c759]">+10.248 €</span>, pero esta cifra es engañosa.
                    </p>
                    <div className="bg-[#f5f5f7] p-6 rounded-2xl border border-black/5">
                      <p className="text-[#6e6e73] font-medium mb-2 uppercase text-[0.7rem] tracking-wider">Realidad</p>
                      <p className="text-[#1d1d1f] text-lg">El negocio sobrevive gracias a las subvenciones, que se duplicaron (<span className="font-bold text-[#34c759]">+25.601 €</span>).</p>
                    </div>
                    <p className="text-[#6e6e73] leading-relaxed">
                      <span className="font-bold text-[#1d1d1f]">Efecto:</span> Sin esas ayudas, el EBITDA operativo real cayó de -4.065 € a -19.418 €. El núcleo del negocio está perdiendo más dinero que el año pasado a pesar de facturar más.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-[#0071e3]">
                      <BarChart3 size={28} />
                      <h2 className="text-2xl font-bold tracking-tight">2. La "Pinza" del Margen de Booking</h2>
                    </div>
                    <p className="text-lg text-[#1d1d1f] leading-relaxed">
                      El crecimiento en facturación (<span className="font-bold text-[#34c759]">+13,8%</span>) es ineficiente debido a la estructura de costes:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#e8f1fb] p-6 rounded-2xl border border-[#0071e3]/10">
                        <p className="text-[#0071e3] font-medium mb-2 uppercase text-[0.7rem] tracking-wider">Booking vs. Web</p>
                        <p className="text-[#1d1d1f]">El coste de las comisiones (booking fee) crece un <span className="font-bold text-[#ff3b30]">36,8%</span>, superando por mucho al crecimiento de la venta directa (+19,7%).</p>
                      </div>
                      <div className="bg-[#fff2f1] p-6 rounded-2xl border border-[#ff3b30]/10">
                        <p className="text-[#ff3b30] font-medium mb-2 uppercase text-[0.7rem] tracking-wider">Margen devorado</p>
                        <p className="text-[#1d1d1f]">Por cada euro que entra, los costes directos ya se comen el <span className="font-bold text-[#ff3b30]">56%</span> (en 2024 era solo el 37%).</p>
                      </div>
                    </div>
                    <p className="text-[#6e6e73] italic">Estás escalando un modelo que se vuelve más caro cuanto más vende.</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-[#ff9500]">
                      <AlertTriangle size={28} />
                      <h2 className="text-2xl font-bold tracking-tight">3. El Factor de las Reparaciones</h2>
                    </div>
                    <p className="text-lg text-[#1d1d1f] leading-relaxed">
                      En 2025 hubo un gasto extraordinario de <span className="font-bold text-[#ff3b30]">21.708 €</span> en mantenimiento.
                    </p>
                    <p className="text-[#6e6e73] leading-relaxed">
                      <span className="font-bold text-[#1d1d1f]">Impacto:</span> Esto explica casi la mitad de las pérdidas de explotación.
                    </p>
                    <div className="bg-[#fff8ed] p-6 rounded-2xl border border-[#ff9500]/10">
                      <p className="text-[#ff9500] font-medium mb-2 uppercase text-[0.7rem] tracking-wider">Previsión 2026</p>
                      <p className="text-[#1d1d1f]">Al ser un gasto puntual, en 2026 verás una mejora automática. Sin embargo, no hay que relajarse: eliminar este gasto solo devuelve el EBITDA a un terreno "casi plano", pero no resuelve el problema del margen.</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 pt-6 border-t border-black/5">
                    <div className="flex items-center gap-3 text-[#34c759]">
                      <TrendingUp size={28} />
                      <h2 className="text-2xl font-bold tracking-tight">4. Conclusión y Punto de Equilibrio 2026</h2>
                    </div>
                    <p className="text-lg text-[#1d1d1f] leading-relaxed italic">
                      Para que el negocio sea viable sin depender de la "suerte" de las subvenciones o de la ausencia de averías:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <div className="text-[0.7rem] font-bold uppercase tracking-widest text-[#aeaeb2]">Punto Crítico</div>
                        <div className="text-3xl font-bold tracking-tighter">238.636 €</div>
                        <p className="text-sm text-[#6e6e73]">Necesitas facturar un <span className="text-[#ff3b30] font-bold">+22%</span> respecto a 2025 si mantienes el actual peso de Booking.</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-[0.7rem] font-bold uppercase tracking-widest text-[#0071e3]">La Clave</div>
                        <div className="text-3xl font-bold tracking-tighter text-[#0071e3]">45% Margen</div>
                        <p className="text-sm text-[#6e6e73]">Bajar el coste de ventas del 56% al 45% (potenciando la web propia) te permitiría ser rentable con el volumen actual.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Floating Mobile Help */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 print:hidden">
        <button 
          onClick={() => window.print()}
          className="w-14 h-14 bg-[#1d1d1f] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          title="Imprimir / Guardar PDF"
        >
          <Printer size={24} />
        </button>
      </div>
    </div>
  );
}
