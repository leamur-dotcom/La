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
  Download,
  CheckCircle2
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

const CONCIERTOS_MONTHLY = [
  { m: 'Ene', barra: 1622, alquiler: 1200, profit: -176, events: 3 },
  { m: 'Feb', barra: 5148, alquiler: 3110, profit: 1316, events: 8 },
  { m: 'Mar', barra: 5903, alquiler: 3040, profit: 1771, events: 8 },
  { m: 'Abr', barra: 8667, alquiler: 3720, profit: 3502, events: 10 },
  { m: 'May', barra: 6803, alquiler: 3200, profit: 2392, events: 9 },
  { m: 'Jun', barra: 6012, alquiler: 3600, profit: 1564, events: 9 },
  { m: 'Jul', barra: 1062, alquiler: 200, profit: 360, events: 1 },
  { m: 'Sep', barra: 2631, alquiler: 1000, profit: 1036, events: 3 },
  { m: 'Oct', barra: 4923, alquiler: 2926, profit: 1575, events: 8 },
  { m: 'Nov', barra: 11335, alquiler: 4100, profit: 3593, events: 14 },
  { m: 'Dic', barra: 7179, alquiler: 2500, profit: 2599, events: 8 }
];

const TOP_CONCIERTOS = [
  { n: "Paco Pecado", d: "27 Mar", profit: 1028, barra: 1272, alquiler: 980 },
  { n: "Black Devil", d: "01 Nov", profit: 1005, barra: 2020, alquiler: 0 },
  { n: "Los Toros", d: "26 Abr", profit: 896, barra: 1562, alquiler: 400 },
  { n: "Demo: Ezezez", d: "24 Abr", profit: 804, barra: 1447, alquiler: 400 },
  { n: "Hostia Pedagogica", d: "24 Oct", profit: 757, barra: 1309, alquiler: 400 },
  { n: "Saturna", d: "27 Dic", profit: 712, barra: 1581, alquiler: 200 },
  { n: "Los Toros", d: "19 Dic", profit: 700, barra: 1317, alquiler: 400 },
  { n: "La Pestilencia", d: "09 Abr", profit: 700, barra: 1237, alquiler: 400 },
  { n: "Cari Cari", d: "20 Nov", profit: 646, barra: 1419, alquiler: 200 },
  { n: "Delta", d: "07 Feb", profit: 639, barra: 1173, alquiler: 400 }
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
  { n: "Club Aura #2: Lena Willikens, Melina Serser", d: "23 Nov", total: 4420.95, ra: 2400, door: 227.77, bar: 1793.18, profit: -1985.03 },
  { n: "Off Week: Ombra x Legwork", d: "12 Jun", total: 2080.45, ra: 0, door: 500, bar: 1580.45, profit: -519.76 },
  { n: "La Mercè Electro Battle", d: "23 Sep", total: 1802.73, ra: 0, door: 0, bar: 1802.73, profit: -433.44 },
  { n: "Baang: Dadame + Marc Gimeno", d: "04 Jul", total: 2550.00, ra: 10, door: 1254.55, bar: 1285.45, profit: -21.66 },
  { n: "Club Aura #1: Marco Shuttle, Røpe...", d: "18 May", total: 4761.73, ra: 2189, door: 370.91, bar: 2201.82, profit: -15.42 },
  { n: "Luishock + Spacer", d: "14 Nov", total: 2320.09, ra: 66, door: 1370.91, bar: 883.18, profit: 71.24 },
  { n: "Tatie Dee + Pau Roca", d: "21 Nov", total: 2410.37, ra: 418, door: 685.55, bar: 1306.82, profit: 87.80 },
  { n: "Lucient + Lux Lisbon", d: "28 Mar", total: 2587.75, ra: 60, door: 1156.36, bar: 1371.39, profit: 200.30 },
  { n: "Facundo + Martí Cros", d: "01 Nov", total: 2536.91, ra: 66, door: 1230, bar: 1240.91, profit: 219.52 },
  { n: "Tom Morgan + Dafoe", d: "07 Feb", total: 2625.00, ra: 80, door: 1200, bar: 1345, profit: 238.86 }
];

const COMPARATIVE_DATA = [
  { concept: 'INGRESOS NETOS', v24: 578207, v25: 572068, var: -6139, varPct: -1.1, bold: true },
  { concept: '— Taquilla', v24: 179398, v25: 179254, var: -144, varPct: -0.1 },
  { concept: '— Barra', v24: 321044, v25: 311653, var: -9391, varPct: -2.9, icon: '🔴' },
  { concept: '— Ventas Web (anticipadas)', v24: 44404, v25: 51697, var: 7293, varPct: 16.4, icon: '✅' },
  { concept: '— Prestaciones de Servicios', v24: 33360, v25: 29465, var: -3895, varPct: -11.7, icon: '🔴' },
  { concept: 'APROVISIONAMIENTOS', v24: -339673, v25: -306113, var: 33560, varPct: -9.9, bold: true, icon: '✅' },
  { concept: '— Compras Bar', v24: -68324, v25: -61984, var: 6340, varPct: -9.3, icon: '✅' },
  { concept: '— Booking DJs', v24: -87096, v25: -85679, var: 1417, varPct: -1.6 },
  { concept: '— Técnicos y Producción', v24: -60608, v25: -51503, var: 9105, varPct: -15.0, icon: '✅' },
  { concept: '— Comunicación y Marketing', v24: -21903, v25: -11180, var: 10723, varPct: -49.0, icon: '⚠️' },
  { concept: '— Otros Serv. Profesionales', v24: -87393, v25: -75247, var: 12146, varPct: -13.9, icon: '✅' },
  { concept: '— Asesoría Contable/Lab.', v24: -5788, v25: -10866, var: -5078, varPct: 87.7, icon: '🔴' },
  { concept: 'MARGEN BRUTO', v24: 238534, v25: 265955, var: 27421, varPct: 11.5, bold: true, icon: '✅' },
  { concept: 'Margen bruto (%)', v24: 41.3, v25: 46.5, var: 0, varPct: 5.2, italic: true, isPct: true },
  { concept: 'GASTOS DE PERSONAL', v24: -106012, v25: -121461, var: -15449, varPct: 14.6, bold: true, icon: '🔴' },
  { concept: '— Sueldos y Salarios', v24: -80365, v25: -89892, var: -9527, varPct: 11.9, icon: '🔴' },
  { concept: '— Seguridad Social', v24: -25648, v25: -28369, var: -2721, varPct: 10.6 },
  { concept: '— SS Bonificación', v24: 0, v25: -3200, var: -3200, varPct: 0, icon: '🔴' },
  { concept: 'OTROS GASTOS EXPLOTACIÓN', v24: -90665, v25: -116449, var: -25784, varPct: 28.4, bold: true, icon: '🔴' },
  { concept: '— Alquiler', v24: -21053, v25: -21087, var: -34, varPct: 0.2, icon: '✅' },
  { concept: '— Reparaciones', v24: -7151, v25: -14731, var: -7580, varPct: 106, icon: '🚨' },
  { concept: '— Suministros', v24: -44647, v25: -56433, var: -11786, varPct: 26.4, icon: '🔴' },
  { concept: '— Servicios Bancarios', v24: -8322, v25: -10181, var: -1859, varPct: 22.3 },
  { concept: '— Dietas y Hoteles', v24: -6809, v25: -6870, var: -61, varPct: 0.9, icon: '✅' },
  { concept: '— Gastos de Oficina', v24: -2399, v25: -4327, var: -1928, varPct: 80.4, icon: '🔴' },
  { concept: 'AMORTIZACIÓN', v24: -21807, v25: -21734, var: 73, varPct: -0.3, bold: true, icon: '✅' },
  { concept: 'OTROS INGRESOS EXPLOT.', v24: 2310, v25: 10982, var: 8672, varPct: 275, bold: true, icon: '⚠️' },
  { concept: '— Subvenciones', v24: 0, v25: 9382, var: 9382, varPct: 0, icon: 'extraordinario' },
  { concept: '— Arrendamientos', v24: 2310, v25: 1600, var: -710, varPct: -30.7 },
  { concept: 'EBIT', v24: 22367, v25: 20656, var: -1711, varPct: -7.6, bold: true, icon: '🔴' },
  { concept: 'Margen EBIT (%)', v24: 3.9, v25: 3.6, var: 0, varPct: -0.3, italic: true, isPct: true },
  { concept: 'Resultado antes impuestos', v24: 22367, v25: 20669, var: -1698, varPct: -7.6 },
  { concept: 'Impuesto sobre beneficios', v24: -5162, v25: -4534, var: 628, varPct: -12.2 },
  { concept: 'RESULTADO NETO', v24: 17205, v25: 16135, var: -1070, varPct: -6.2, bold: true, icon: '🔴' },
  { concept: 'Margen neto (%)', v24: 2.97, v25: 2.82, var: 0, varPct: -0.15, italic: true, isPct: true },
];

const PROJECTION_2026_DATA = [
  { concept: 'INGRESOS NETOS', v25: 572068, v26: 605000, var: 5.8, bold: true },
  { concept: 'APROVISIONAMIENTOS', v25: -306113, v26: -327000, var: 6.8, bold: true },
  { concept: 'MARGEN BRUTO', v25: 265955, v26: 278000, var: 4.5, bold: true },
  { concept: 'Margen bruto (%)', v25: 46.5, v26: 46.0, var: -0.5, isPct: true, italic: true },
  { concept: 'GASTOS DE PERSONAL', v25: -121461, v26: -130600, var: 7.5, bold: true, icon: '🔴' },
  { concept: '— ratio Personal/Ingresos', v25: 21.2, v26: 21.6, var: 0.4, isPct: true, italic: true },
  { concept: 'OTROS GASTOS EXPLOT.', v25: -116449, v26: -108700, var: -6.6, bold: true, icon: '✅' },
  { concept: 'AMORTIZACIÓN', v25: -21734, v26: -21700, var: 0, bold: true },
  { concept: 'OTROS INGRESOS EXPLOT.', v25: 10982, v26: 13000, var: 18, bold: true, icon: '✅' },
  { concept: 'EBIT', v25: 20656, v26: 30000, var: 45.3, bold: true, icon: '✅' },
  { concept: 'Margen EBIT (%)', v25: 3.6, v26: 5.0, var: 1.4, isPct: true, italic: true },
  { concept: 'Impuesto estimado (~22%)', v25: -4534, v26: -6600, var: 0 },
  { concept: 'RESULTADO NETO', v25: 16135, v26: 23400, var: 45.1, bold: true, icon: '✅' },
  { concept: 'Margen neto (%)', v25: 2.82, v26: 3.9, var: 1.1, isPct: true, italic: true },
];

const PROJECTION_ADJUSTMENTS = [
  { factor: '+5% sueldos y SS', effect: '-5.913€', positive: false },
  { factor: '+2% Booking DJs', effect: '-1.714€', positive: false },
  { factor: '+2% Técnicos', effect: '-1.030€', positive: false },
  { factor: '+5% Marketing', effect: '-559€', positive: false },
  { factor: 'Eliminación bonificación SS', effect: '-3.200€', positive: false },
  { factor: 'Total degradación vs base', effect: '-12.416€', bold: true, positive: false },
];


const TOP_NIGHTS = [
  { n: "Off Week: Nous'klaer Audio", d: "14 Jun", total: 11264, ra: 5220, door: 998, bar: 5045 },
  { n: "LAUT CAP D'ANY w/ Pépe", d: "31 Dic", total: 8584, ra: 5600, door: 220, bar: 2764 },
  { n: "Amberdelic: Sybil + Iro Aka", d: "23 May", total: 6606, ra: 2330, door: 1941, bar: 2335 },
  { n: "Acidnena + Bat + Verushka", d: "09 May", total: 6483, ra: 480, door: 2369, bar: 3634 },
  { n: "Angel Molina B2B Psyk", d: "15 Nov", total: 6160, ra: 935, door: 1821, bar: 3404 },
  { n: "Selectors: Truncate", d: "26 Sep", total: 6137, ra: 1275, door: 1937, bar: 2925 },
  { n: "ExtraMostra: Muted, Josh Hoppen...", d: "15 Feb", total: 6124, ra: 600, door: 2348, bar: 3176 },
  { n: "Selene Series: Shoal, DOC...", d: "08 Feb", total: 6037, ra: 600, door: 2141, bar: 3296 },
  { n: "Aaron J + ABSIS", d: "31 May", total: 5910, ra: 1200, door: 1072, bar: 3638 },
  { n: "Jhort + servei", d: "29 Ago", total: 5850, ra: 580, door: 2001, bar: 3269 }
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
  const [activeTab, setActiveTab] = useState<'financiero' | 'eventos' | 'ra' | 'conciertos' | 'resumen' | 'proyeccion_2026'>('financiero');
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
        {(['financiero', 'eventos', 'ra', 'conciertos', 'resumen', 'proyeccion_2026'] as const).map((tab) => (
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
            {tab === 'ra' ? 'RA' : tab === 'proyeccion_2026' ? 'Proyección 2026' : tab.charAt(0).toUpperCase() + tab.slice(1)}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <div className="bg-white p-6 rounded-[18px] border border-black/5 shadow-sm">
                  <div className="text-[#0071e3] mb-3 flex justify-between items-start">
                    <TrendingUp size={24} />
                    <span className="text-[0.65rem] font-bold bg-[#e8f1fb] text-[#0071e3] px-2.5 py-1 rounded-full">MEJOR NOCHE</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">11.264 €</div>
                  <div className="text-[0.75rem] font-medium text-[#6e6e73] uppercase tracking-wider">Récord de Facturación</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <Card className="lg:col-span-2 overflow-hidden">
                  <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline bg-[#f9f9fb]">
                    <div className="text-[0.88rem] font-bold tracking-[-0.01em]">Top 10 Noches (Rendimiento Total)</div>
                    <div className="text-[0.75rem] text-[#6e6e73] font-medium">RA + Puerta + Barra</div>
                  </div>
                  <div className="flex flex-col">
                    {TOP_NIGHTS.map((n, i) => (
                      <div key={i} className="px-[26px] py-3.5 border-b border-black/5 last:border-none hover:bg-[#f0faf3] transition-colors flex justify-between items-center group">
                        <div className="flex items-center gap-4 overflow-hidden">
                          <span className="text-[0.75rem] font-bold text-[#aeaeb2] w-5 text-center group-hover:text-[#34c759] transition-colors">{i + 1}</span>
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-[0.88rem] font-bold text-[#1d1d1f] truncate">{n.n}</span>
                            <span className="text-[0.7rem] text-[#6e6e73] font-medium">{n.d}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[0.95rem] font-bold text-[#34c759] whitespace-nowrap">
                            {n.total.toLocaleString('es-ES')} €
                          </div>
                          <div className="text-[0.65rem] text-[#aeaeb2] font-bold uppercase tracking-wider">Total Est.</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="flex flex-col gap-5">
                  <Card className="p-6 bg-[#1d1d1f] text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/10 rounded-xl text-white">
                        <Info size={20} />
                      </div>
                      <h4 className="font-bold text-[0.9rem]">Análisis de Top Noches</h4>
                    </div>
                    <p className="text-[0.82rem] text-white/70 leading-relaxed mb-4">
                      Las 10 mejores noches generan una facturación media de <span className="text-white font-bold">8.479 €</span>. 
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-[0.75rem] text-white/50">Ratio Barra/RA</span>
                        <span className="text-[0.85rem] font-bold text-[#34c759]">3.1x</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-[0.75rem] text-white/50">Avg Gasto/Pax</span>
                        <span className="text-[0.85rem] font-bold text-[#34c759]">38,50 €</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-[#f5f5f7] border border-black/5">
                    <h4 className="font-bold text-[0.85rem] mb-3 uppercase tracking-wider text-[#6e6e73]">Estrategia 2026</h4>
                    <p className="text-[0.8rem] text-[#1d1d1f] leading-relaxed">
                      El éxito de las Top Noches se basa en el equilibrio entre nombres internacionales y promotores locales con comunidad fiel. Se recomienda potenciar el ticket medio en estas fechas mediante preventa dinámica.
                    </p>
                  </Card>
                </div>
              </div>

              <div className="mt-8 border-t border-black/5 pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#ff3b30]/10 rounded-xl text-[#ff3b30]">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f]">Noches Críticas (Bajo Rendimiento)</h3>
                    <p className="text-[0.85rem] text-[#6e6e73]">Eventos con margen ajustado o pérdidas netas</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <Card className="lg:col-span-2 overflow-hidden">
                    <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline bg-[#fff2f1]">
                      <div className="text-[0.88rem] font-bold tracking-[-0.01em]">Peores 10 Noches del Año</div>
                      <div className="text-[0.75rem] text-[#ff3b30] font-bold uppercase tracking-wider">Requieren Revisión</div>
                    </div>
                    <div className="flex flex-col">
                      {CRITICAL_NIGHTS.map((n, i) => (
                        <div key={i} className="px-[26px] py-3.5 border-b border-black/5 last:border-none hover:bg-[#fff2f1] transition-colors flex justify-between items-center group">
                          <div className="flex items-center gap-4 overflow-hidden">
                            <span className="text-[0.75rem] font-bold text-[#aeaeb2] w-5 text-center group-hover:text-[#ff3b30] transition-colors">{i + 1}</span>
                            <div className="flex flex-col overflow-hidden">
                              <span className="text-[0.88rem] font-bold text-[#1d1d1f] truncate">{n.n}</span>
                              <span className="text-[0.7rem] text-[#6e6e73] font-medium">{n.d}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={cn("text-[0.95rem] font-bold whitespace-nowrap", n.profit < 0 ? "text-[#ff3b30]" : "text-[#ff9500]")}>
                              {n.profit.toLocaleString('es-ES')} €
                            </div>
                            <div className="text-[0.65rem] text-[#aeaeb2] font-bold uppercase tracking-wider">Beneficio Neto</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <div className="flex flex-col gap-5">
                    <Card className="p-6 bg-[#ff3b30] text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/10 rounded-xl text-white">
                          <TrendingDown size={20} />
                        </div>
                        <h4 className="font-bold text-[0.9rem]">Alerta de Rentabilidad</h4>
                      </div>
                      <p className="text-[0.82rem] text-white/80 leading-relaxed mb-4">
                        Estas 10 noches representan una facturación media de <span className="text-white font-bold">2.810 €</span>. En 5 de estas fechas se produjeron pérdidas netas.
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="text-[0.75rem] text-white/60">Peor Noche</span>
                          <span className="text-[0.85rem] font-bold text-white">−1.985 €</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="text-[0.75rem] text-white/60">Pérdida Media</span>
                          <span className="text-[0.85rem] font-bold text-white">−216 €</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-[#f5f5f7] border border-black/5">
                      <h4 className="font-bold text-[0.85rem] mb-3 uppercase tracking-wider text-[#6e6e73]">Acción Recomendada</h4>
                      <p className="text-[0.8rem] text-[#1d1d1f] leading-relaxed">
                        Revisar la estructura de costes fijos y los fees de artistas en fechas de baja demanda estacional. Se sugiere establecer un umbral de preventa mínimo 48h antes para decidir la viabilidad de la apertura.
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
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

          {activeTab === 'conciertos' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <HeroCard 
                  icon={Users} 
                  label="Conciertos Realizados" 
                  value="81" 
                  subLabel="Total año 2025" 
                  tag="Agenda cultural"
                  variant="blue"
                />
                <HeroCard 
                  icon={DollarSign} 
                  label="Ingresos Barra" 
                  value="61.284 €" 
                  subLabel="Consumo en conciertos" 
                  tag="756 € avg / show"
                  variant="green"
                />
                <HeroCard 
                  icon={Home} 
                  label="Ingresos Alquiler" 
                  value="28.596 €" 
                  subLabel="Fees de sala" 
                  tag="353 € avg / show"
                  variant="green"
                />
                <HeroCard 
                  icon={TrendingUp} 
                  label="Beneficio Neto" 
                  value="19.533 €" 
                  subLabel="Resultado conciertos" 
                  tag="241 € avg / show"
                  variant="blue"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="overflow-hidden">
                  <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Evolución Mensual Conciertos</div>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#0071e3]">81 eventos</div>
                  </div>
                  <div className="overflow-x-auto no-scrollbar">
                    <div className="min-w-[600px]">
                      <div className="grid grid-cols-[48px_1fr_100px_100px_100px_80px] gap-3 px-[26px] py-2.5 text-[0.65rem] font-medium text-[#aeaeb2] uppercase tracking-[0.04em] border-b border-black/5">
                        <div>Mes</div><div>Barra</div><div className="text-right">Alquiler</div><div className="text-right">Profit</div><div className="text-right">Avg Profit</div><div className="text-right">Shows</div>
                      </div>
                      <div className="flex flex-col">
                        {CONCIERTOS_MONTHLY.map((d, i) => (
                          <div key={i} className="grid grid-cols-[48px_1fr_100px_100px_100px_80px] gap-3 items-center px-[26px] py-2.5 border-b border-black/5 last:border-none hover:bg-[#f5f5f7] transition-colors">
                            <div className="text-[0.85rem] font-bold text-[#1d1d1f]">{d.m}</div>
                            <div className="h-1.5 bg-[#f5f5f7] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#34c759] opacity-60 rounded-full transition-all duration-1000" 
                                style={{ width: `${(d.barra / 12000) * 100}%` }}
                              />
                            </div>
                            <div className="text-[0.8rem] font-medium text-right text-[#6e6e73]">{d.alquiler.toLocaleString('es-ES')} €</div>
                            <div className={cn("text-[0.8rem] font-bold text-right", d.profit < 0 ? "text-[#ff3b30]" : "text-[#34c759]")}>
                              {d.profit.toLocaleString('es-ES')} €
                            </div>
                            <div className="text-[0.78rem] text-[#6e6e73] text-right">{(d.profit / d.events).toLocaleString('es-ES', { maximumFractionDigits: 0 })} €</div>
                            <div className="text-[0.78rem] text-[#6e6e73] text-right">{d.events}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="overflow-hidden">
                  <div className="px-[26px] py-4 border-b border-black/5 flex justify-between items-baseline">
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em]">Top 10 Conciertos por Beneficio</div>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#34c759]">Rentabilidad Sala</div>
                  </div>
                  <div className="overflow-x-auto no-scrollbar">
                    <div className="min-w-[500px]">
                      <div className="grid grid-cols-[28px_1fr_80px_80px_80px] gap-3 px-[26px] py-2.5 text-[0.65rem] font-medium text-[#aeaeb2] uppercase tracking-[0.04em] border-b border-black/5">
                        <div className="text-center">#</div><div>Artista</div><div className="text-right">Fecha</div><div className="text-right">Barra</div><div className="text-right">Beneficio</div>
                      </div>
                      <div className="flex flex-col">
                        {TOP_CONCIERTOS.map((e, i) => (
                          <div key={i} className="grid grid-cols-[28px_1fr_80px_80px_80px] gap-3 items-center px-[26px] py-2.5 border-b border-black/5 last:border-none hover:bg-[#f5f5f7] transition-colors">
                            <div className="text-[0.78rem] font-bold text-[#aeaeb2] text-center">{i + 1}</div>
                            <div className="text-[0.8rem] font-bold text-[#1d1d1f] truncate">{e.n}</div>
                            <div className="text-[0.78rem] text-[#6e6e73] text-right">{e.d}</div>
                            <div className="text-[0.8rem] font-medium text-right">{e.barra.toLocaleString('es-ES')} €</div>
                            <div className="text-[0.85rem] font-bold text-right text-[#34c759]">{e.profit.toLocaleString('es-ES')} €</div>
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
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#0071e3] bg-[#e8f1fb] px-2.5 py-1 rounded-full mb-2.5 inline-block">CONC 01</span>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em] mb-1.5">Noviembre, récord de actividad</div>
                    <p className="text-[0.76rem] text-[#6e6e73] leading-[1.65]">Con <strong>14 conciertos y 11.335 €</strong> de barra, noviembre fue el mes más rentable para la programación de directos, impulsado por una agenda densa y variada.</p>
                  </div>
                  <div className="p-5 md:p-6 border-r border-black/5 last:border-none">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#0071e3] bg-[#e8f1fb] px-2.5 py-1 rounded-full mb-2.5 inline-block">CONC 02</span>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em] mb-1.5">Paco Pecado, el más rentable</div>
                    <p className="text-[0.76rem] text-[#6e6e73] leading-[1.65]">El concierto de Paco Pecado en marzo generó un beneficio neto de <strong>1.028 €</strong>, destacando por un alto alquiler y un consumo de barra muy eficiente.</p>
                  </div>
                  <div className="p-5 md:p-6 border-r border-black/5 last:border-none">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#0071e3] bg-[#e8f1fb] px-2.5 py-1 rounded-full mb-2.5 inline-block">CONC 03</span>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.01em] mb-1.5">Estabilidad del Alquiler</div>
                    <p className="text-[0.76rem] text-[#6e6e73] leading-[1.65]">El alquiler de sala aporta una base sólida de <strong>28.596 €</strong> anuales, garantizando la viabilidad de la programación incluso en noches de menor consumo.</p>
                  </div>
                </div>
              </Card>
            </div>
          )}




          {activeTab === 'resumen' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-700">
              <Card className="p-0 overflow-hidden">
                <div className="bg-[#1d1d1f] text-white p-8 md:p-10">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">📊 ANÁLISIS COMPARATIVO 2024 vs 2025</h1>
                  <p className="text-white/60 text-lg">LAUT MUSIC, S.L.U. · Informe de Desempeño y Salud Financiera</p>
                </div>

                <div className="p-6 md:p-10">
                  <div className="overflow-x-auto no-scrollbar mb-12">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-black/10">
                          <th className="py-4 px-4 text-[0.7rem] font-bold uppercase tracking-wider text-[#6e6e73]">Concepto</th>
                          <th className="py-4 px-4 text-[0.7rem] font-bold uppercase tracking-wider text-[#6e6e73] text-right">2024</th>
                          <th className="py-4 px-4 text-[0.7rem] font-bold uppercase tracking-wider text-[#6e6e73] text-right">2025</th>
                          <th className="py-4 px-4 text-[0.7rem] font-bold uppercase tracking-wider text-[#6e6e73] text-right">Var. €</th>
                          <th className="py-4 px-4 text-[0.7rem] font-bold uppercase tracking-wider text-[#6e6e73] text-right">Var. %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {COMPARATIVE_DATA.map((row, i) => (
                          <tr 
                            key={i} 
                            className={cn(
                              "border-b border-black/5 hover:bg-[#f5f5f7] transition-colors",
                              row.bold && "bg-[#f9f9fb] font-bold",
                              row.italic && "italic text-[#6e6e73]"
                            )}
                          >
                            <td className="py-3 px-4 text-[0.85rem] flex items-center gap-2">
                              {row.concept}
                              {row.icon && <span className="text-[0.9rem]">{row.icon}</span>}
                            </td>
                            <td className="py-3 px-4 text-[0.85rem] text-right">
                              {row.isPct ? `${row.v24.toFixed(1)}%` : row.v24.toLocaleString('es-ES')}
                            </td>
                            <td className="py-3 px-4 text-[0.85rem] text-right">
                              {row.isPct ? `${row.v25.toFixed(1)}%` : row.v25.toLocaleString('es-ES')}
                            </td>
                            <td className={cn(
                              "py-3 px-4 text-[0.85rem] text-right font-medium",
                              row.var > 0 ? "text-[#34c759]" : row.var < 0 ? "text-[#ff3b30]" : "text-[#6e6e73]"
                            )}>
                              {row.isPct ? '—' : (row.var > 0 ? '+' : '') + row.var.toLocaleString('es-ES')}
                            </td>
                            <td className={cn(
                              "py-3 px-4 text-[0.85rem] text-right font-bold",
                              row.varPct > 0 ? (row.concept.includes('GASTOS') || row.concept.includes('APROVISIONAMIENTOS') ? "text-[#ff3b30]" : "text-[#34c759]") : 
                              row.varPct < 0 ? (row.concept.includes('GASTOS') || row.concept.includes('APROVISIONAMIENTOS') ? "text-[#34c759]" : "text-[#ff3b30]") : "text-[#6e6e73]"
                            )}>
                              {row.varPct > 0 ? '+' : ''}{row.isPct ? row.varPct.toFixed(1) + ' pp' : row.varPct.toFixed(1) + '%'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-10 max-w-4xl">
                    <section>
                      <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-sm">1</span>
                        El margen bruto mejora, pero los costes fijos se lo engullen íntegro
                      </h2>
                      <p className="text-lg text-[#1d1d1f] leading-relaxed">
                        La empresa consiguió algo positivo en 2025: redujo sus costes variables (aprovisionamientos -9,9%) y recuperó 5,2 puntos de margen bruto, pasando del 41,3% al 46,5%. Esto es una buena señal de gestión operativa. El problema es que esos <span className="font-bold text-[#34c759]">27.421€</span> adicionales de margen bruto ganados con esfuerzo fueron absorbidos completamente por el aumento de costes fijos y semifijos: personal (+15.449€) y otros gastos de explotación (+25.784€). El resultado final es un EBIT que sigue cayendo. La empresa trabaja más eficientemente en la producción de eventos y peor en el control de su estructura.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#ff3b30] text-white flex items-center justify-center text-sm">2</span>
                        Reparaciones y Suministros son la señal de alarma más urgente
                      </h2>
                      <p className="text-lg text-[#1d1d1f] leading-relaxed">
                        Reparaciones se duplica de un año para otro (<span className="font-bold text-[#ff3b30]">+106%</span>, de 7.151€ a 14.731€) y Suministros crece al doble que los ingresos (+26,4%, alcanzando 56.433€). Juntas suman <span className="font-bold">71.164€</span> — el 12,4% de los ingresos totales. No es una fluctuación puntual: los suministros llevan 4 años creciendo de forma ininterrumpida sin correlación con los ingresos. Las reparaciones disparadas sugieren o bien un activo físico deteriorado sin plan de mantenimiento preventivo, o bien obras/mejoras no capitalizadas pasadas directamente a gasto. Si no se interviene, estas dos partidas pueden costar 90.000€ en 2026.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#ff9500] text-white flex items-center justify-center text-sm">3</span>
                        El resultado neto de 16.135€ es en realidad un espejismo contable
                      </h2>
                      <p className="text-lg text-[#1d1d1f] leading-relaxed">
                        El EBIT de 2025 incluye <span className="font-bold">9.382€</span> de subvenciones, un ingreso no recurrente y no garantizado para ejercicios futuros. Eliminando ese efecto, el resultado operativo recurrente sería de apenas <span className="font-bold text-[#ff3b30]">~11.274€</span> sobre 572K€ de facturación — un margen real del <span className="font-bold">1,97%</span>. La empresa no está generando rentabilidad sostenible: está sobreviviendo. Cualquier imprevisto de calado medio (una reparación mayor, un evento cancelado, una subida de tarifa energética) lleva el ejercicio a pérdidas sin ningún colchón de absorción.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#ff3b30] text-white flex items-center justify-center text-sm">4</span>
                        La Barra cede, y eso es el verdadero indicador a vigilar en 2026
                      </h2>
                      <p className="text-lg text-[#1d1d1f] leading-relaxed">
                        La Taquilla está prácticamente plana (-0,1%), lo que confirma que el aforo se mantiene. Pero la Barra retrocede <span className="font-bold text-[#ff3b30]">-2,9%</span> (-9.391€) a pesar de que la gente sigue entrando. Esto significa que el <span className="font-bold">gasto por asistente dentro del local está cayendo</span>. Las causas pueden ser múltiples —precios, experiencia, competencia, mix de eventos— pero la consecuencia es clara: si esta tendencia se mantiene en 2026, la línea de mayor peso en la facturación (54,5% de los ingresos) entra en declive estructural.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#34c759] text-white flex items-center justify-center text-sm">5</span>
                        Las Ventas Web anticipadas son el único activo estratégico real
                      </h2>
                      <p className="text-lg text-[#1d1d1f] leading-relaxed">
                        Crecen un <span className="font-bold text-[#34c759]">+16,4%</span> en 2025 y lo han hecho todos y cada uno de los 5 años analizados. Son ingresos de bajo coste, predecibles, y que reducen el riesgo operativo al confirmar asistencia antes del evento. Representan ya <span className="font-bold">51.697€</span> — el 9% de los ingresos — y tienen margen para doblar. Es la única palanca de crecimiento que la empresa tiene activa y que no genera presión de coste adicional.
                      </p>
                    </section>

                    <div className="mt-12 p-8 bg-[#f5f5f7] rounded-[24px] border border-black/5">
                      <h3 className="text-xl font-bold mb-4">Veredicto 2024→2025</h3>
                      <p className="text-[#1d1d1f] leading-relaxed italic">
                        "Un año técnicamente plano que esconde un deterioro real. Los ingresos aguantan (-1,1%), la eficiencia en aprovisionamientos mejora, pero la estructura de costes crece de forma autónoma y la rentabilidad sigue erosionándose. Con un margen neto real por debajo del 2%, la empresa está operando sin red de seguridad. El ejercicio 2026 será determinante: si personal y gastos de explotación siguen creciendo al ritmo actual sobre ingresos estancados, el resultado neto será negativo."
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
          {activeTab === 'proyeccion_2026' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 gap-4">
                <Card className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#0071e3]/10 rounded-lg text-[#0071e3]">
                      <TrendingUp size={24} />
                    </div>
                    <h3 className="text-[1.3rem] font-bold tracking-tight">Proyección Realista 2026</h3>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-[0.9rem] font-bold text-[#1d1d1f] mb-4 uppercase tracking-wider">Impacto Acumulado de Ajustes sobre Proyección Base</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-black/5">
                            <th className="py-3 px-4 text-[0.75rem] font-bold text-[#6e6e73] uppercase">Ajuste</th>
                            <th className="py-3 px-4 text-[0.75rem] font-bold text-[#6e6e73] uppercase text-right">Impacto en EBIT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {PROJECTION_ADJUSTMENTS.map((adj, idx) => (
                            <tr key={idx} className={cn(
                              "border-b border-black/5 last:border-none hover:bg-[#f5f5f7] transition-colors",
                              adj.bold && "bg-[#f5f5f7]/50 font-bold"
                            )}>
                              <td className="py-4 px-4 text-[0.85rem] font-medium text-[#1d1d1f]">{adj.factor}</td>
                              <td className={cn("py-4 px-4 text-[0.85rem] font-bold text-right", adj.positive ? "text-[#34c759]" : "text-[#ff3b30]")}>
                                {adj.effect}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-[0.9rem] font-bold text-[#1d1d1f] mb-4 uppercase tracking-wider">Resultado Final 2026</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-black/5">
                            <th className="py-3 px-4 text-[0.75rem] font-bold text-[#6e6e73] uppercase">Concepto</th>
                            <th className="py-3 px-4 text-[0.75rem] font-bold text-[#6e6e73] uppercase text-right">2025 Real</th>
                            <th className="py-3 px-4 text-[0.75rem] font-bold text-[#6e6e73] uppercase text-right bg-[#0071e3]/5">2026 Proyección</th>
                            <th className="py-3 px-4 text-[0.75rem] font-bold text-[#6e6e73] uppercase text-right">Var. 25→26</th>
                          </tr>
                        </thead>
                        <tbody>
                          {PROJECTION_2026_DATA.map((row, idx) => (
                            <tr key={idx} className={cn(
                              "border-b border-black/5 last:border-none hover:bg-[#f5f5f7] transition-colors",
                              row.bold && "bg-[#f5f5f7]/50"
                            )}>
                              <td className={cn(
                                "py-3 px-4 text-[0.85rem]",
                                row.bold ? "font-bold text-[#1d1d1f]" : "text-[#1d1d1f]",
                                row.italic && "italic text-[#6e6e73]"
                              )}>
                                <div className="flex items-center gap-2">
                                  {row.concept}
                                  {row.icon && <span>{row.icon}</span>}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-[0.85rem] text-right text-[#6e6e73]">
                                {row.isPct ? `${row.v25.toString().replace('.', ',')}%` : `${row.v25.toLocaleString('es-ES')} €`}
                              </td>
                              <td className="py-3 px-4 text-[0.85rem] text-right font-bold text-[#0071e3] bg-[#0071e3]/5">
                                {row.isPct ? `~${row.v26.toString().replace('.', ',')}%` : `~${row.v26.toLocaleString('es-ES')} €`}
                              </td>
                              <td className={cn(
                                "py-3 px-4 text-[0.85rem] text-right font-bold",
                                row.var > 0 ? (row.concept.includes('GASTOS') || row.concept.includes('APROVISIONAMIENTOS') ? "text-[#ff3b30]" : "text-[#34c759]") : 
                                row.var < 0 ? (row.concept.includes('GASTOS') || row.concept.includes('APROVISIONAMIENTOS') ? "text-[#34c759]" : "text-[#ff3b30]") : 
                                "text-[#6e6e73]"
                              )}>
                                {row.var > 0 ? '+' : ''}{row.var.toString().replace('.', ',')}{row.isPct ? ' pp' : '%'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-[0.9rem] font-bold text-[#1d1d1f] uppercase tracking-wider">Conclusiones Clave</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-[#f5f5f7] rounded-xl border border-black/5">
                          <p className="text-[0.85rem] font-bold text-[#1d1d1f] mb-1">1. El efecto Agosto</p>
                          <p className="text-[0.82rem] text-[#6e6e73] leading-relaxed">
                            La apertura ampliada (5 semanas) es el motor principal del crecimiento de ingresos (+5,8%). El volumen extra de barra y taquilla permite absorber el aumento de costes fijos.
                          </p>
                        </div>
                        <div className="p-4 bg-[#f5f5f7] rounded-xl border border-black/5">
                          <p className="text-[0.85rem] font-bold text-[#1d1d1f] mb-1">2. Eficiencia en Otros Gastos</p>
                          <p className="text-[0.82rem] text-[#6e6e73] leading-relaxed">
                            La reducción del <span className="font-bold text-[#1d1d1f]">-6,6%</span> en otros gastos de explotación (especialmente reparaciones) es clave para mantener el margen operativo.
                          </p>
                        </div>
                        <div className="p-4 bg-[#f5f5f7] rounded-xl border border-black/5">
                          <p className="text-[0.85rem] font-bold text-[#1d1d1f] mb-1">3. Presión Salarial</p>
                          <p className="text-[0.82rem] text-[#6e6e73] leading-relaxed">
                            El gasto de personal crece un +7,5%, elevando la ratio sobre ingresos al <span className="font-bold text-[#ff3b30]">21,6%</span>, el nivel más alto registrado, lo que requiere vigilancia estrecha.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[0.9rem] font-bold text-[#1d1d1f] uppercase tracking-wider">Rentabilidad y Riesgos</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-[#f5f5f7] rounded-xl border border-black/5">
                          <p className="text-[0.85rem] font-bold text-[#1d1d1f] mb-1">4. Independencia de Subvenciones</p>
                          <p className="text-[0.82rem] text-[#6e6e73] leading-relaxed">
                            Incluso sin los 13k€ de subvenciones, el EBIT recurrente sería de <span className="font-bold text-[#1d1d1f]">~17.000€</span>, superando la rentabilidad operativa real de 2025.
                          </p>
                        </div>
                        <div className="p-4 bg-[#f5f5f7] rounded-xl border border-black/5">
                          <p className="text-[0.85rem] font-bold text-[#1d1d1f] mb-1">5. Riesgo de Margen</p>
                          <p className="text-[0.82rem] text-[#6e6e73] leading-relaxed">
                            El incremento del +7,5% en personal es el mayor riesgo. Si los ingresos no alcanzan los 605k€, el margen neto podría verse seriamente comprometido por la rigidez de costes.
                          </p>
                        </div>
                        <div className="p-6 bg-[#34c759]/10 rounded-xl border border-[#34c759]/20">
                          <p className="text-[0.9rem] font-bold text-[#1d1d1f] mb-2 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-[#34c759]" />
                            Veredicto 2026
                          </p>
                          <p className="text-[0.85rem] text-[#1d1d1f] leading-relaxed italic">
                            "2026 proyecta <span className="font-bold">~23.400€ de resultado neto</span> y un EBIT del <span className="font-bold">5,0%</span> — el mejor ejercicio desde 2023 y prácticamente el doble que 2025, sostenido principalmente por las 5 semanas de agosto y el ahorro en reparaciones. El único punto de vigilancia es la ratio de personal, que toca su máximo histórico del 21,6%."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
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
