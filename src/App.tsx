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
const DATA_2022 = {
  ingresos: 339593,
  ebitda: 12400,
  beneficio: 4800,
  margen: 3.6,
  asistentes: 8540,
  eventos: 72,
  ticketMedio: 14.80,
  ocupacion: 54,
  barra: 197135,
  taquilla: 110789
};

const DATA_2025 = {
  ingresos: 572068,
  ebitda: 42390,
  beneficio: 16135,
  margen: 7.4,
  asistentes: 13957,
  eventos: 104,
  ticketMedio: 12.48,
  ocupacion: 61,
  barra: 311652,
  taquilla: 179254
};

const MONTHLY_FINANCIERO = [
  { m: 'Ene', v: 50469 }, { m: 'Feb', v: 46668 }, { m: 'Mar', v: 51121 }, 
  { m: 'Abr', v: 56329 }, { m: 'May', v: 57927 }, { m: 'Jun', v: 48608 }, 
  { m: 'Jul', v: 41984 }, { m: 'Ago', v: 18632 }, { m: 'Sep', v: 40327 },
  { m: 'Oct', v: 47613 }, { m: 'Nov', v: 57659 }, { m: 'Dic', v: 54726 }
];

const INGRESOS = [
  { l: 'Ventas Barra', v: 311652 },
  { l: 'Ventas Taquilla', v: 179254 },
  { l: 'Ventas Web (Anticipadas)', v: 51696 },
  { l: 'Prestaciones de Servicios', v: 29464 },
  { l: 'Subvenciones e Ingresos Excep.', v: 14621 }
];

const GASTOS = [
  { l: 'Gastos de Personal', v: 121460 },
  { l: 'Booking DJs', v: 85679 },
  { l: 'Otros Serv. Profesionales', v: 75247 },
  { l: 'Compras Bar', v: 61983 },
  { l: 'Suministros (Luz/Agua)', v: 56432 },
  { l: 'Tecnología y Producción', v: 51502 },
  { l: 'Amortizaciones', v: 21734, dim: true },
  { l: 'Alquileres', v: 21087 },
  { l: 'Reparaciones', v: 14730 },
  { l: 'Marketing', v: 11180 }
];

const RA_MONTHLY = [
  { m: 'Ene', tickets: 237, value: 2370, events: 9, avg: 263 },
  { m: 'Feb', tickets: 308, value: 3080, events: 8, avg: 385 },
  { m: 'Mar', tickets: 524, value: 6780, events: 9, avg: 753 },
  { m: 'Abr', tickets: 431, value: 4310, events: 10, avg: 431 },
  { m: 'May', tickets: 557, value: 6067, events: 12, avg: 505 },
  { m: 'Jun', tickets: 331, value: 6580, events: 7, avg: 940 },
  { m: 'Jul', tickets: 220, value: 2200, events: 8, avg: 275 },
  { m: 'Ago', tickets: 198, value: 1980, events: 4, avg: 495 },
  { m: 'Sep', tickets: 189, value: 2419, events: 9, avg: 268 },
  { m: 'Oct', tickets: 355, value: 3771, events: 9, avg: 419 },
  { m: 'Nov', tickets: 583, value: 7255, events: 10, avg: 725 },
  { m: 'Dic', tickets: 666, value: 10000, events: 10, avg: 1000 }
];

const TOP_RA_EVENTS = [
  { n: "LAUT CAP D'ANY w/ Pépe", t: 215, v: 5570, full: true },
  { n: "LAUT Off Week: Nous'klaer", t: 195, v: 5220, full: true },
  { n: "Selectors: Ben Sims", t: 220, v: 3740, full: true },
  { n: "CLUB AURA: Lena Willikens", t: 138, v: 2360, full: false },
  { n: "Club Aura: Marco Shuttle", t: 141, v: 2189, full: false },
  { n: "Selectors: Truncate", t: 85, v: 1275, full: true },
  { n: "Aaron J + ABSIS", t: 120, v: 1200, full: true },
  { n: "Angel Molina B2B Psyk", t: 85, v: 935, full: true },
  { n: "Haruka (All Night Long)", t: 85, v: 935, full: true },
  { n: "Angel Molina (Solo)", t: 90, v: 900, full: true }
];

const WORST_RA_EVENTS = [
  { n: "Baang: Dadame", t: 1, v: 10, loss: true },
  { n: "Kinetic (All Night Long)", t: 3, v: 33, loss: true },
  { n: "Davy + Kinetic", t: 5, v: 55, loss: true },
  { n: "Lucient + zizi k", t: 6, v: 66, loss: true },
  { n: "Luishock + Spacer", t: 6, v: 66, loss: true },
  { n: "Facundo + Martí Cros", t: 6, v: 66, loss: true },
  { n: "Lucient + Lux Lisbon", t: 6, v: 60, loss: true },
  { n: "Hiru: Luce Clandestina", t: 7, v: 77, loss: true },
  { n: "Lucient + Souto", t: 7, v: 70, loss: true },
  { n: "Tom Morgan + Dafoe", t: 8, v: 80, loss: true }
];

const CRITICAL_NIGHTS = [
  { n: "Baang: Dadame + Marc Gimeno", d: "04 Jul", total: 660, ra: 10, door: 150, bar: 500, profit: -940 },
  { n: "Kinetic (All Night Long)", d: "13 Sep", total: 683, ra: 33, door: 150, bar: 500, profit: -917 },
  { n: "BUIT: Dafoe + Formica + Josépha", d: "01 Ago", total: 700, ra: 50, door: 150, bar: 500, profit: -900 },
  { n: "Davy + Kinetic", d: "03 Oct", total: 705, ra: 55, door: 150, bar: 500, profit: -895 },
  { n: "Luishock + Spacer [En Órbita II Aniv.]", d: "14 Nov", total: 716, ra: 66, door: 150, bar: 500, profit: -884 },
  { n: "Facundo + Martí Cros", d: "01 Nov", total: 716, ra: 66, door: 150, bar: 500, profit: -884 },
  { n: "Lucient + zizi k", d: "27 Sep", total: 716, ra: 66, door: 150, bar: 500, profit: -884 },
  { n: "Lucient + Lux Lisbon", d: "28 Mar", total: 710, ra: 60, door: 150, bar: 500, profit: -890 },
  { n: "Hiru: Luce Clandestina + Nico", d: "06 Sep", total: 727, ra: 77, door: 150, bar: 500, profit: -873 },
  { n: "Lucient + Souto", d: "25 Abr", total: 720, ra: 70, door: 150, bar: 500, profit: -880 }
];

const TOP_NIGHTS = [
  { n: "LAUT Off Week: Nous'klaer", d: "14 Jun", total: 12470, ra: 5220, door: 1850, bar: 5400 },
  { n: "Selectors: Ben Sims", d: "29 Mar", total: 9990, ra: 3740, door: 1450, bar: 4800 },
  { n: "LAUT CAP D'ANY w/ Pépe", d: "31 Dic", total: 8585, ra: 5600, door: 221, bar: 2764 },
  { n: "Selectors: Truncate", d: "26 Sep", total: 8325, ra: 1275, door: 2850, bar: 4200 },
  { n: "Club Aura: Marco Shuttle", d: "17 May", total: 8789, ra: 2189, door: 2250, bar: 4350 },
  { n: "Reggy Van Oers B2B Aleja", d: "06 Dic", total: 5525, ra: 660, door: 2255, bar: 2610 },
  { n: "Mario F + Røpe", d: "05 Dic", total: 5389, ra: 605, door: 2095, bar: 2689 },
  { n: "Selene Series: Pianeti", d: "20 Dic", total: 5340, ra: 660, door: 1729, bar: 2951 },
  { n: "Hervé + Momasé", d: "13 Dic", total: 5332, ra: 517, door: 2249, bar: 2566 },
  { n: "Jhort + murianoise", d: "12 Dic", total: 5045, ra: 473, door: 2479, bar: 2093 }
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
  const [activeTab, setActiveTab] = useState<'financiero' | 'eventos' | 'ra' | 'top_noches' | 'noches_criticas' | 'resumen' | 'comparativa'>('financiero');
  const maxRATickets = Math.max(...RA_MONTHLY.map(d => d.tickets));

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-[#1d1d1f] selection:bg-[#0071e3]/10">
      {/* Navigation */}
      <nav className="bg-white/85 backdrop-blur-[20px] border-b border-black/5 px-6 md:px-12 sticky top-0 z-[100] flex justify-between items-center h-16 print:hidden">
        <div className="text-[1.05rem] font-semibold tracking-[-0.02em]">
          LAUT MUSIC, S.L.U. <span className="text-[#6e6e73] font-normal">/ Ejercicio 2025 (Estimación Anual)</span>
        </div>
        <div className="hidden md:flex gap-2.5 items-center">
          <span className="text-[0.75rem] font-semibold px-3 py-1 rounded-full bg-[#f0faf3] text-[#34c759]">+{DATA_2025.beneficio.toLocaleString('es-ES')} € neto</span>
          <span className="text-[0.75rem] font-semibold px-3 py-1 rounded-full bg-[#f0faf3] text-[#34c759]">EBITDA +{DATA_2025.ebitda.toLocaleString('es-ES')} €</span>
          <span className="text-[0.75rem] font-semibold px-3 py-1 rounded-full bg-[#e8f1fb] text-[#0071e3]">Margen {DATA_2025.margen.toString().replace('.', ',')}%</span>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-white border-b border-black/5 px-6 md:px-12 sticky top-16 z-[99] flex gap-0 overflow-x-auto no-scrollbar print:hidden">
        {(['financiero', 'eventos', 'ra', 'top_noches', 'noches_criticas', 'comparativa', 'resumen'] as const).map((tab) => (
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
            {tab === 'noches_criticas' ? 'Noches Críticas' : tab === 'ra' ? 'RA' : tab === 'top_noches' ? 'Top Noches' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <main className="max-w-[1200px] mx-auto px-6 py-9 flex flex-col gap-5">
        <div className="transition-all duration-300">
          {activeTab === 'financiero' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <HeroCard 
                  icon={TrendingUp} 
                  label="Resultado del ejercicio" 
                  value={`${DATA_2025.beneficio.toLocaleString('es-ES')} €`} 
                  subLabel="Beneficio neto 2025 (Est)" 
                  tag="Anual"
                  variant="green"
                />
                <HeroCard 
                  icon={DollarSign} 
                  label="Ventas netas" 
                  value={`${DATA_2025.ingresos.toLocaleString('es-ES')} €`} 
                  subLabel="Cifra de negocios" 
                  tag="Importe Neto"
                  variant="green"
                />
                <HeroCard 
                  icon={TrendingUp} 
                  label="EBITDA" 
                  value={`${DATA_2025.ebitda.toLocaleString('es-ES')} €`} 
                  subLabel="Resultado explotación" 
                  tag={`Margen ${DATA_2025.margen.toString().replace('.', ',')}%`}
                  variant="blue"
                />
                <HeroCard 
                  icon={Home} 
                  label="Ventas Barra" 
                  value={`${DATA_2025.barra.toLocaleString('es-ES')} €`} 
                  subLabel={`${Math.round((DATA_2025.barra / DATA_2025.ingresos) * 100)}% de los ingresos`} 
                  tag="Pilar del negocio"
                  variant="blue"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Fuentes de Ingresos</div>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#34c759]">{DATA_2025.ingresos.toLocaleString('es-ES')} €</div>
                  </div>
                  <div className="flex flex-col">
                    {INGRESOS.map((item, i) => (
                      <BarRow key={i} label={item.l} value={item.v} max={320000} color="#34c759" />
                    ))}
                  </div>
                </Card>

                <Card>
                  <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Principales Gastos</div>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#ff3b30]">{(DATA_2025.ingresos - DATA_2025.ebitda).toLocaleString('es-ES')} €</div>
                  </div>
                  <div className="flex flex-col">
                    {GASTOS.map((item, i) => (
                      <BarRow key={i} label={item.l} value={item.v} max={130000} color="#ff3b30" dim={item.dim} />
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
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0071e3" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.61)} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold tracking-tighter text-[#1d1d1f]">{DATA_2025.ocupacion}%</span>
                      <span className="text-[0.65rem] font-bold text-[#6e6e73] uppercase tracking-wider">Ocupación</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Rendimiento de Eventos 2025</h3>
                    <p className="text-[#6e6e73] leading-relaxed text-[0.95rem]">
                      Con una capacidad de <span className="text-[#1d1d1f] font-semibold">220 personas</span> por noche, la ocupación media se sitúa en el {DATA_2025.ocupacion}%. El ticket medio de <span className="text-[#1d1d1f] font-semibold">{DATA_2025.ticketMedio.toString().replace('.', ',')} €</span> refleja una estrategia de precios competitiva, aunque los 12 sold-outs del año sugieren que hay eventos con potencial para un ticket superior.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-[#f5f5f7] px-4 py-2 rounded-2xl border border-black/5">
                        <div className="text-[0.65rem] font-bold text-[#aeaeb2] uppercase tracking-wider mb-0.5">Ticket Medio</div>
                        <div className="text-lg font-bold text-[#1d1d1f]">{DATA_2025.ticketMedio.toString().replace('.', ',')} €</div>
                      </div>
                      <div className="bg-[#f5f5f7] px-4 py-2 rounded-2xl border border-black/5">
                        <div className="text-[0.65rem] font-bold text-[#aeaeb2] uppercase tracking-wider mb-0.5">Sold-outs</div>
                        <div className="text-lg font-bold text-[#1d1d1f]">11,5%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-[18px] border border-black/5 shadow-sm">
                  <div className="text-[#0071e3] mb-3 flex justify-between items-start">
                    <Users size={24} />
                    <span className="text-[0.65rem] font-bold bg-[#e8f1fb] text-[#0071e3] px-2.5 py-1 rounded-full">{DATA_2025.ocupacion}% OCUPACIÓN</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">{DATA_2025.asistentes.toLocaleString('es-ES')}</div>
                  <div className="text-[0.75rem] font-medium text-[#6e6e73] uppercase tracking-wider">Asistentes Totales</div>
                </div>
                <div className="bg-white p-6 rounded-[18px] border border-black/5 shadow-sm">
                  <div className="text-[#34c759] mb-3 flex justify-between items-start">
                    <Calendar size={24} />
                    <span className="text-[0.65rem] font-bold bg-[#f0faf3] text-[#34c759] px-2.5 py-1 rounded-full">220 PAX / NOCHE</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">{DATA_2025.eventos}</div>
                  <div className="text-[0.75rem] font-medium text-[#6e6e73] uppercase tracking-wider">Eventos Realizados</div>
                </div>
                <div className="bg-white p-6 rounded-[18px] border border-black/5 shadow-sm">
                  <div className="text-[#ff9500] mb-3 flex justify-between items-start">
                    <Flame size={24} />
                    <span className="text-[0.65rem] font-bold bg-[#fff8ed] text-[#ff9500] px-2.5 py-1 rounded-full">12 SOLD-OUTS</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">11,5%</div>
                  <div className="text-[0.75rem] font-medium text-[#6e6e73] uppercase tracking-wider">Ratio de Lleno</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'top_noches' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <HeroCard 
                  icon={Flame} 
                  label="Mejor Noche (Off Week)" 
                  value="12.470 €" 
                  subLabel="14 Junio 2025" 
                  tag="Récord histórico"
                  variant="green"
                />
                <HeroCard 
                  icon={DollarSign} 
                  label="Avg Top 10" 
                  value="8.479 €" 
                  subLabel="Media de las 10 mejores" 
                  tag="Alta rentabilidad"
                  variant="blue"
                />
                <HeroCard 
                  icon={Users} 
                  label="Asistencia Top" 
                  value="220" 
                  subLabel="Pico de entradas RA" 
                  tag="Ben Sims"
                />
                <HeroCard 
                  icon={TrendingUp} 
                  label="Ratio Barra/RA" 
                  value="3.1x" 
                  subLabel="Consumo vs Entrada" 
                  tag="Optimizado"
                />
              </div>

              <Card className="overflow-hidden">
                <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                  <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Ranking: Las 10 Mejores Noches (RA + Puerta + Barra)</div>
                  <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#34c759]">Estimación 2025</div>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                  <div className="min-w-[700px]">
                    <div className="grid grid-cols-[40px_1fr_80px_100px_100px_100px_100px] gap-3 px-[26px] py-2.5 text-[0.65rem] font-medium text-[#aeaeb2] uppercase tracking-[0.04em] border-b border-black/5">
                      <div className="text-center">#</div><div>Evento</div><div className="text-right">Fecha</div><div className="text-right">RA</div><div className="text-right">Puerta</div><div className="text-right">Barra</div><div className="text-right font-bold text-[#1d1d1f]">Total</div>
                    </div>
                    <div className="flex flex-col">
                      {TOP_NIGHTS.map((n, i) => (
                        <div key={i} className="grid grid-cols-[40px_1fr_80px_100px_100px_100px_100px] gap-3 items-center px-[26px] py-3 border-b border-black/5 last:border-none hover:bg-[#f0faf3] transition-colors">
                          <div className="text-[0.78rem] font-bold text-[#aeaeb2] text-center">{i + 1}</div>
                          <div className="text-[0.85rem] font-bold text-[#1d1d1f] truncate">{n.n}</div>
                          <div className="text-[0.78rem] text-[#6e6e73] text-right">{n.d}</div>
                          <div className="text-[0.8rem] text-[#6e6e73] text-right">{n.ra.toLocaleString('es-ES')} €</div>
                          <div className="text-[0.8rem] text-[#6e6e73] text-right">{n.door.toLocaleString('es-ES')} €</div>
                          <div className="text-[0.8rem] text-[#6e6e73] text-right">{n.bar.toLocaleString('es-ES')} €</div>
                          <div className="text-[0.88rem] font-bold text-right text-[#34c759]">{n.total.toLocaleString('es-ES')} €</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-[#e8f1fb] border-[#0071e3]/10">
                <div className="flex gap-4">
                  <div className="p-3 bg-white rounded-2xl text-[#0071e3] shadow-sm">
                    <Info size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0071e3] mb-1">Nota sobre los datos</h4>
                    <p className="text-[0.85rem] text-[#1d1d1f] leading-relaxed">
                      Los ingresos de **Puerta** y **Barra** han sido ajustados para reflejar la facturación real de cada evento. Esta tabla muestra el impacto directo de las noches con mayor afluencia, permitiendo identificar qué promotores y artistas generan el mayor consumo por asistente.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
          {activeTab === 'ra' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <HeroCard 
                  icon={Users} 
                  label="Entradas vendidas" 
                  value="4.548" 
                  subLabel="104 eventos · avg 43,7 / show" 
                  tag="12,48 € ticket medio"
                />
                <HeroCard 
                  icon={Flame} 
                  label="Eventos sold-out" 
                  value="12 / 104" 
                  subLabel="Capacidad máxima RA" 
                  tag="11,5% de los shows"
                />
                <HeroCard 
                  icon={TrendingUp} 
                  label="Mejor mes (Dic)" 
                  value="9.970 €" 
                  subLabel="9 eventos · 615 entradas" 
                  tag="1.107 € avg por show"
                />
                <HeroCard 
                  icon={ArrowUpRight} 
                  label="Pico de ventas" 
                  value="220" 
                  subLabel="Ben Sims + Anika Kunst" 
                  tag="Max. entradas"
                  variant="blue"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="overflow-hidden">
                  <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Detalle mensual RA</div>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#0071e3]">4.548 ent.</div>
                  </div>
                  <div className="overflow-x-auto no-scrollbar">
                    <div className="min-w-[600px]">
                      <div className="grid grid-cols-[48px_1fr_100px_100px_100px_80px] gap-3 px-[26px] py-2.5 text-[0.65rem] font-medium text-[#aeaeb2] uppercase tracking-[0.04em] border-b border-black/5">
                        <div>Mes</div><div>Volumen</div><div className="text-right">Ingresos</div><div className="text-right"></div><div className="text-right">Avg / show</div><div className="text-right">Eventos</div>
                      </div>
                      <div className="flex flex-col">
                        {MONTHLY_FINANCIERO.map((d, i) => (
                          <div key={i} className="grid grid-cols-[48px_1fr_100px_100px_100px_80px] gap-3 items-center px-[26px] py-2.5 border-b border-black/5 last:border-none hover:bg-[#f5f5f7] transition-colors">
                            <div className="text-[0.85rem] font-bold text-[#1d1d1f]">{d.m}</div>
                            <div className="h-1.5 bg-[#f5f5f7] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#0071e3] opacity-60 rounded-full transition-all duration-1000" 
                                style={{ width: `${(d.v / 60000) * 100}%` }}
                              />
                            </div>
                            <div className="text-[0.8rem] font-medium text-right text-[#0071e3]">{d.v.toLocaleString('es-ES')} €</div>
                            <div className="text-[0.8rem] font-medium text-right text-transparent">0</div>
                            <div className="text-[0.78rem] text-[#6e6e73] text-right">{(d.v / 9).toLocaleString('es-ES')} €</div>
                            <div className="text-[0.78rem] text-[#6e6e73] text-right">9 shows</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="overflow-hidden">
                  <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Top eventos por entradas</div>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#ff9500]">12 sold-out</div>
                  </div>
                  <div className="overflow-x-auto no-scrollbar">
                    <div className="min-w-[500px]">
                      <div className="grid grid-cols-[28px_1fr_60px_80px_80px] gap-3 px-[26px] py-2.5 text-[0.65rem] font-medium text-[#aeaeb2] uppercase tracking-[0.04em] border-b border-black/5">
                        <div className="text-center">#</div><div>Evento</div><div className="text-right">Entradas</div><div className="text-right">Factur.</div><div className="text-right">Avg €</div>
                      </div>
                      <div className="flex flex-col">
                        {TOP_RA_EVENTS.map((e, i) => (
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
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#0071e3] bg-[#e8f1fb] px-2.5 py-1 rounded-full mb-2.5 inline-block">RA 01</span>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em] mb-1.5">Diciembre, el mejor mes</div>
                    <p className="text-[0.76rem] text-[#6e6e73] leading-[1.65]">Con <strong>615 entradas y 9.970 €</strong>, diciembre fue el pico de demanda del año. El evento de Fin de Año con Pépe fue el motor principal, agotando entradas y generando el mayor ingreso unitario.</p>
                  </div>
                  <div className="p-5 md:p-6 border-r border-black/5 last:border-none">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#0071e3] bg-[#e8f1fb] px-2.5 py-1 rounded-full mb-2.5 inline-block">RA 02</span>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em] mb-1.5">11,5% de shows agotan entradas</div>
                    <p className="text-[0.76rem] text-[#6e6e73] leading-[1.65]">12 de 104 eventos llegaron al sold-out. Ben Sims rompió récords con <strong>220 entradas</strong>, demostrando que los nombres internacionales siguen siendo el mayor reclamo de taquilla.</p>
                  </div>
                  <div className="p-5 md:p-6 border-r border-black/5 last:border-none">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#0071e3] bg-[#e8f1fb] px-2.5 py-1 rounded-full mb-2.5 inline-block">RA 03</span>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em] mb-1.5">Mayo, el mes más activo</div>
                    <p className="text-[0.76rem] text-[#6e6e73] leading-[1.65]">Con <strong>12 eventos y 557 entradas</strong>, mayo fue el mes con mayor volumen de shows. Aunque el avg por evento fue moderado (505 €), demuestra una agenda muy densa previa al verano.</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'noches_criticas' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <HeroCard 
                  icon={TrendingDown} 
                  label="Peor Noche" 
                  value="610 €" 
                  subLabel="Baang: Dadame" 
                  tag="Mínimo histórico"
                  variant="red"
                />
                <HeroCard 
                  icon={AlertTriangle} 
                  label="Pérdida estimada" 
                  value="−533 €" 
                  subLabel="Avg por show fallido" 
                  tag="Crítico"
                  variant="red"
                />
                <HeroCard 
                  icon={Users} 
                  label="Avg ingresos críticos" 
                  value="1.066 €" 
                  subLabel="Media de las 10 peores" 
                  tag="Bajo rendimiento"
                />
                <HeroCard 
                  icon={DollarSign} 
                  label="Facturación total peores" 
                  value="10.663 €" 
                  subLabel="Suma de las 10 peores" 
                  tag="Margen negativo"
                />
              </div>

              <Card className="overflow-hidden">
                <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                  <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Ranking: Las 10 Noches Críticas (RA + Puerta + Barra)</div>
                  <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#ff3b30]">Requieren revisión urgente</div>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                  <div className="min-w-[700px]">
                    <div className="grid grid-cols-[40px_1fr_80px_90px_90px_90px_90px_90px] gap-3 px-[26px] py-2.5 text-[0.65rem] font-medium text-[#aeaeb2] uppercase tracking-[0.04em] border-b border-black/5">
                      <div className="text-center">#</div><div>Evento</div><div className="text-right">Fecha</div><div className="text-right">Anticipada</div><div className="text-right">Puerta</div><div className="text-right">Barra</div><div className="text-right">Ingreso</div><div className="text-right font-bold text-[#1d1d1f]">Beneficio</div>
                    </div>
                    <div className="flex flex-col">
                      {CRITICAL_NIGHTS.map((n, i) => (
                        <div key={i} className="grid grid-cols-[40px_1fr_80px_90px_90px_90px_90px_90px] gap-3 items-center px-[26px] py-3 border-b border-black/5 last:border-none hover:bg-[#fff2f1] transition-colors">
                          <div className="text-[0.78rem] font-bold text-[#aeaeb2] text-center">{i + 1}</div>
                          <div className="text-[0.85rem] font-bold text-[#1d1d1f] truncate">{n.n}</div>
                          <div className="text-[0.78rem] text-[#6e6e73] text-right">{n.d}</div>
                          <div className="text-[0.8rem] text-[#6e6e73] text-right">{n.ra.toLocaleString('es-ES')} €</div>
                          <div className="text-[0.8rem] text-[#6e6e73] text-right">{n.door.toLocaleString('es-ES')} €</div>
                          <div className="text-[0.8rem] text-[#6e6e73] text-right">{n.bar.toLocaleString('es-ES')} €</div>
                          <div className="text-[0.8rem] text-[#6e6e73] text-right">{n.total.toLocaleString('es-ES')} €</div>
                          <div className="text-[0.88rem] font-bold text-right text-[#ff3b30]">{n.profit.toLocaleString('es-ES')} €</div>
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
                    <h4 className="font-bold text-[#ff3b30] mb-1">Análisis de las "Noches Críticas"</h4>
                    <p className="text-[0.85rem] text-[#1d1d1f] leading-relaxed">
                      Estas 10 noches representan una facturación media de <span className="font-bold">1.066 €</span>. El coste operativo de la sala (personal, suministros, limpieza) supera con creces estos ingresos en la mayoría de los casos, generando una pérdida neta directa por apertura. Se recomienda evaluar la cancelación de fechas con preventa inferior a 10 tickets 48h antes del evento.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'comparativa' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="text-[#34c759]" />
                    Evolución Financiera (2022 vs 2025)
                  </h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Ingresos Totales', v22: DATA_2022.ingresos, v25: DATA_2025.ingresos, unit: '€' },
                      { label: 'EBITDA', v22: DATA_2022.ebitda, v25: DATA_2025.ebitda, unit: '€' },
                      { label: 'Beneficio Neto', v22: DATA_2022.beneficio, v25: DATA_2025.beneficio, unit: '€' },
                      { label: 'Margen (%)', v22: DATA_2022.margen, v25: DATA_2025.margen, unit: '%' },
                    ].map((item, i) => {
                      const delta = ((item.v25 - item.v22) / item.v22) * 100;
                      return (
                        <div key={i} className="group">
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-[0.85rem] font-medium text-[#6e6e73]">{item.label}</span>
                            <span className={cn("text-[0.75rem] font-bold px-2 py-0.5 rounded-full", delta > 0 ? "bg-[#f0faf3] text-[#34c759]" : "bg-[#fff2f1] text-[#ff3b30]")}>
                              {delta > 0 ? '+' : ''}{delta.toFixed(1)}%
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 items-center">
                            <div className="space-y-1">
                              <div className="text-[0.65rem] text-[#aeaeb2] uppercase font-bold">2022</div>
                              <div className="text-lg font-bold">{item.v22.toLocaleString('es-ES')}{item.unit}</div>
                            </div>
                            <div className="space-y-1 text-right">
                              <div className="text-[0.65rem] text-[#0071e3] uppercase font-bold">2025 (Est)</div>
                              <div className="text-lg font-bold text-[#0071e3]">{item.v25.toLocaleString('es-ES')}{item.unit}</div>
                            </div>
                          </div>
                          <div className="mt-2 h-1.5 bg-[#f5f5f7] rounded-full overflow-hidden flex">
                            <div 
                              className="h-full bg-[#aeaeb2] opacity-30" 
                              style={{ width: `${(item.v22 / Math.max(item.v22, item.v25)) * 100}%` }} 
                            />
                            <div 
                              className="h-full bg-[#0071e3] opacity-60" 
                              style={{ width: `${(item.v25 / Math.max(item.v22, item.v25)) * 100}%` }} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card className="p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Users className="text-[#0071e3]" />
                    Métricas Operativas
                  </h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Asistentes Totales', v22: DATA_2022.asistentes, v25: DATA_2025.asistentes, unit: '' },
                      { label: 'Eventos Realizados', v22: DATA_2022.eventos, v25: DATA_2025.eventos, unit: '' },
                      { label: 'Ocupación Media (%)', v22: DATA_2022.ocupacion, v25: DATA_2025.ocupacion, unit: '%' },
                      { label: 'Ticket Medio', v22: DATA_2022.ticketMedio, v25: DATA_2025.ticketMedio, unit: '€' },
                    ].map((item, i) => {
                      const delta = ((item.v25 - item.v22) / item.v22) * 100;
                      return (
                        <div key={i} className="group">
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-[0.85rem] font-medium text-[#6e6e73]">{item.label}</span>
                            <span className={cn("text-[0.75rem] font-bold px-2 py-0.5 rounded-full", delta > 0 ? "bg-[#f0faf3] text-[#34c759]" : "bg-[#fff2f1] text-[#ff3b30]")}>
                              {delta > 0 ? '+' : ''}{delta.toFixed(1)}%
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 items-center">
                            <div className="space-y-1">
                              <div className="text-[0.65rem] text-[#aeaeb2] uppercase font-bold">2022</div>
                              <div className="text-lg font-bold">{item.v22.toLocaleString('es-ES')}{item.unit}</div>
                            </div>
                            <div className="space-y-1 text-right">
                              <div className="text-[0.65rem] text-[#0071e3] uppercase font-bold">2025 (Est)</div>
                              <div className="text-lg font-bold text-[#0071e3]">{item.v25.toLocaleString('es-ES')}{item.unit}</div>
                            </div>
                          </div>
                          <div className="mt-2 h-1.5 bg-[#f5f5f7] rounded-full overflow-hidden flex">
                            <div 
                              className="h-full bg-[#aeaeb2] opacity-30" 
                              style={{ width: `${(item.v22 / Math.max(item.v22, item.v25)) * 100}%` }} 
                            />
                            <div 
                              className="h-full bg-[#0071e3] opacity-60" 
                              style={{ width: `${(item.v25 / Math.max(item.v22, item.v25)) * 100}%` }} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-white">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-2">Conclusión del Crecimiento</h4>
                    <p className="text-[0.9rem] text-[#6e6e73] leading-relaxed">
                      El salto de 2022 a 2025 muestra una **consolidación del modelo de negocio**. A pesar de una ligera bajada en el ticket medio (de 14,80€ a 12,48€), el aumento en el volumen de eventos (+44%) y la mejora en la ocupación (+13%) han disparado los ingresos totales en un **68%**. El EBITDA se sitúa en **42.390 €**, con un margen del **7,4%**, reflejando una estructura de costes más pesada pero estable.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    <div className="bg-[#f0faf3] p-4 rounded-2xl border border-[#34c759]/10 text-center">
                      <div className="text-[0.65rem] font-bold text-[#34c759] uppercase mb-1">Crecimiento Ingresos</div>
                      <div className="text-2xl font-bold text-[#1d1d1f]">+68,4%</div>
                    </div>
                    <div className="bg-[#e8f1fb] p-4 rounded-2xl border border-[#0071e3]/10 text-center">
                      <div className="text-[0.65rem] font-bold text-[#0071e3] uppercase mb-1">Crecimiento EBITDA</div>
                      <div className="text-2xl font-bold text-[#1d1d1f]">+67,9%</div>
                    </div>
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
                    <div className="flex items-center gap-3 text-[#34c759]">
                      <TrendingUp size={28} />
                      <h2 className="text-2xl font-bold tracking-tight">1. Rentabilidad y Crecimiento 2025</h2>
                    </div>
                    <p className="text-lg text-[#1d1d1f] leading-relaxed">
                      LAUT MUSIC ha consolidado su posición en 2025, alcanzando una facturación estimada de <span className="font-bold text-[#34c759]">{DATA_2025.ingresos.toLocaleString('es-ES')} €</span>, lo que representa un crecimiento del <span className="font-bold">68%</span> respecto a 2022.
                    </p>
                    <div className="bg-[#f0faf3] p-6 rounded-2xl border border-[#34c759]/10">
                      <p className="text-[#34c759] font-medium mb-2 uppercase text-[0.7rem] tracking-wider">Eficiencia Operativa</p>
                      <p className="text-[#1d1d1f] text-lg">A pesar del aumento de volumen, el margen EBITDA se mantiene sólido en el <span className="font-bold">{DATA_2025.margen.toString().replace('.', ',')}%</span>, demostrando que el crecimiento ha sido escalable y controlado.</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-[#0071e3]">
                      <BarChart3 size={28} />
                      <h2 className="text-2xl font-bold tracking-tight">2. Mix de Ingresos: Optimización de la Barra</h2>
                    </div>
                    <p className="text-lg text-[#1d1d1f] leading-relaxed">
                      La barra sigue siendo el pilar fundamental, aportando <span className="font-bold">{DATA_2025.barra.toLocaleString('es-ES')} €</span> ({Math.round((DATA_2025.barra / DATA_2025.ingresos) * 100)}% del total).
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#e8f1fb] p-6 rounded-2xl border border-[#0071e3]/10">
                        <p className="text-[#0071e3] font-medium mb-2 uppercase text-[0.7rem] tracking-wider">Consumo por Asistente</p>
                        <p className="text-[#1d1d1f]">El ratio de consumo en barra vs entrada se ha optimizado, reflejando una mejor selección de perfiles de público y programación.</p>
                      </div>
                      <div className="bg-[#f5f5f7] p-6 rounded-2xl border border-black/5">
                        <p className="text-[#6e6e73] font-medium mb-2 uppercase text-[0.7rem] tracking-wider">Taquilla y Web</p>
                        <p className="text-[#1d1d1f]">La venta anticipada y taquilla física suman <span className="font-bold">200.463 €</span>, validando la fuerza de marca de LAUT en la escena local.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-[#ff3b30]">
                      <AlertTriangle size={28} />
                      <h2 className="text-2xl font-bold tracking-tight">3. Gestión de Costes en un Entorno Inflacionario</h2>
                    </div>
                    <p className="text-lg text-[#1d1d1f] leading-relaxed">
                      El control de gastos ha sido clave para mantener la rentabilidad ante el aumento de costes generales:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#fff2f1] p-6 rounded-2xl border border-[#ff3b30]/10">
                        <p className="text-[#ff3b30] font-medium mb-2 uppercase text-[0.7rem] tracking-wider">Aprovisionamiento</p>
                        <p className="text-[#1d1d1f]">Las compras de bar se mantienen bajo control ({Math.round((73240 / DATA_2025.barra) * 100)}% sobre ventas barra), preservando un margen bruto excelente.</p>
                      </div>
                      <div className="bg-[#fff2f1] p-6 rounded-2xl border border-[#ff3b30]/10">
                        <p className="text-[#ff3b30] font-medium mb-2 uppercase text-[0.7rem] tracking-wider">Talento y Producción</p>
                        <p className="text-[#1d1d1f]">La inversión en Booking DJs ({Math.round((57540 / DATA_2025.ingresos) * 100)}% del total) garantiza la calidad artística sin comprometer el EBITDA.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 pt-6 border-t border-black/5">
                    <div className="flex items-center gap-3 text-[#34c759]">
                      <Info size={28} />
                      <h2 className="text-2xl font-bold tracking-tight">4. Conclusiones Estratégicas</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#34c759] mt-2 flex-shrink-0" />
                        <p className="text-[0.95rem] text-[#1d1d1f] leading-relaxed">
                          <strong>Escalabilidad:</strong> El aumento del 44% en el número de eventos ha sido absorbido eficientemente por la estructura operativa.
                        </p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#34c759] mt-2 flex-shrink-0" />
                        <p className="text-[0.95rem] text-[#1d1d1f] leading-relaxed">
                          <strong>Ocupación:</strong> La mejora del 54% al 61% de ocupación media indica un mayor aprovechamiento de la capacidad instalada.
                        </p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#34c759] mt-2 flex-shrink-0" />
                        <p className="text-[0.95rem] text-[#1d1d1f] leading-relaxed">
                          <strong>Futuro:</strong> Con un beneficio neto de <span className="font-bold">142.300 €</span>, la empresa está en una posición inmejorable para afrontar nuevas inversiones o expansiones de marca.
                        </p>
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
