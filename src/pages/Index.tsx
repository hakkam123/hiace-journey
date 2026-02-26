import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import StepProgress from "@/components/StepProgress";
import TripSearch from "@/components/TripSearch";
import SeatMap from "@/components/SeatMap";
import PassengerForm from "@/components/PassengerForm";
import PaymentMethod from "@/components/PaymentMethod";
import BookingSummary from "@/components/BookingSummary";
import SuccessModal from "@/components/SuccessModal";
import { HiaceType } from "@/components/HiaceCard";
import {
  Bus, Shield, Clock, MapPin, Users, ChevronRight,
  Award, Truck, ArrowRight, CheckCircle2, Star,
  ChevronLeft, Phone, Mail, MessageCircle, Send,
  Gauge, Eye, Wrench, UserCheck, Building2,
  MapPinned, Ticket,
} from "lucide-react";

/* ─── Types ─── */
interface BookingData {
  origin: string;
  destination: string;
  date: Date;
  time: string;
  passengers: number;
  hiaceType: HiaceType;
}

/* ─── Section Animation Wrapper ─── */
const FadeInSection = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Data ─── */
const trustIndicators = [
  { value: "50+", label: "Armada Aktif" },
  { value: "100+", label: "Rute Perjalanan" },
  { value: "Real-Time", label: "Monitoring" },
];

const hiaceFleet = [
  {
    name: "Hiace Commuter",
    seats: "14 Seat",
    facilities: ["AC Double Blower", "Reclining Seat", "Bagasi Luas"],
    maintenance: "Service berkala setiap 5.000 km",
    comfort: "Standar kenyamanan tinggi untuk perjalanan harian.",
    icon: Bus,
  },
  {
    name: "Hiace Premio",
    seats: "12 Seat",
    facilities: ["Captain Seat", "Extra Legroom", "Full AC"],
    maintenance: "Inspeksi menyeluruh setiap perjalanan",
    comfort: "Kenyamanan ekstra dengan kursi captain dan ruang kaki luas.",
    icon: Award,
  },
  {
    name: "Hiace Luxury",
    seats: "10 Seat",
    facilities: ["VIP Interior", "Charger USB", "WiFi On-board"],
    maintenance: "Perawatan premium & detail berkala",
    comfort: "Pengalaman VIP dengan interior mewah dan fasilitas kelas atas.",
    icon: Star,
  },
];

const routeStats = [
  { value: "100+", label: "Rute Aktif" },
  { value: "1000+", label: "Penumpang / Bulan" },
  { value: "98%", label: "Kepuasan Pelanggan" },
];

const safetyFeatures = [
  {
    icon: UserCheck,
    title: "Driver Berpengalaman",
    desc: "Semua driver tersertifikasi dan memiliki pengalaman minimal 5 tahun di jalur antar kota.",
  },
  {
    icon: Wrench,
    title: "Armada Terawat",
    desc: "Service berkala, inspeksi pra-perjalanan, dan standar perawatan ketat untuk setiap unit.",
  },
  {
    icon: Eye,
    title: "SOP Ketat",
    desc: "Prosedur operasional standar yang memastikan keamanan dan kenyamanan di setiap perjalanan.",
  },
  {
    icon: Gauge,
    title: "Monitoring Perjalanan",
    desc: "Sistem GPS real-time untuk memantau kecepatan, rute, dan posisi armada secara langsung.",
  },
];

const partnerLogos = [
  "PT Astra International",
  "Sinar Mas Group",
  "Telkom Indonesia",
  "Bank Mandiri",
  "Pertamina",
  "PLN",
];

/* ─── Component ─── */
const Index = () => {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);

  const handleTripNext = (data: BookingData) => {
    setBooking(data);
    setSelectedSeats([]);
    setStep(2);
  };
  const handleSeatNext = () => setStep(3);
  const handlePassengerNext = () => setStep(4);
  const handlePayment = () => setShowSuccess(true);
  const handleClose = () => {
    setShowSuccess(false);
    setStep(0);
    setBooking(null);
    setSelectedSeats([]);
  };
  const startBooking = () => {
    setStep(1);
    setTimeout(
      () =>
        bookingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      100
    );
  };

  const navigateToSection = (sectionId: string) => {
    if (step !== 0) {
      setStep(0);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══ HEADER / NAVBAR ═══ */}
      <header className="sticky top-0 z-50 bg-[hsl(220,15%,12%)]/95 backdrop-blur-xl border-b border-white/10">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/image/3rhiace logo.png"
              alt="3RHiace"
              className="h-9 w-auto"
            />
            <span className="font-bold text-lg text-white/90 group-hover:text-white transition-colors tracking-tight">
              3RHiace
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#tentang" onClick={() => navigateToSection('tentang')} className="hover:text-white transition-colors cursor-pointer">Tentang Kami</a>
            <a href="#armada" onClick={() => navigateToSection('armada')} className="hover:text-white transition-colors cursor-pointer">Armada</a>
            <a href="#rute" onClick={() => navigateToSection('rute')} className="hover:text-white transition-colors cursor-pointer">Rute</a>
            <Link to="/jadwal" className="hover:text-white transition-colors">Jadwal</Link>
            <Link to="/bantuan" className="hover:text-white transition-colors">Bantuan</Link>
            <a href="#kontak" onClick={() => navigateToSection('kontak')} className="hover:text-white transition-colors cursor-pointer">Kontak</a>
          </nav>
        </div>
      </header>

      {step === 0 ? (
        <>
          {/* ═══════════ SECTION 1: HERO ═══════════ */}
          <section className="relative overflow-hidden min-h-[85vh] flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/image/hero-banner.webp"
                alt="Fleet 3RHiace"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative container px-4 py-20 sm:py-28 lg:py-32">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium mb-8 tracking-wide uppercase backdrop-blur-sm">
                    <Truck className="w-3.5 h-3.5" />
                    Reliable Road Transport
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                    3RHiace – Reliable
                    <br />
                    <span className="text-blue-400">
                      Road Transport Solution
                    </span>
                  </h1>
                  <p className="text-white/70 text-lg sm:text-xl mb-10 leading-relaxed max-w-xl">
                    Solusi transportasi Hiace profesional untuk perjalanan antar
                    kota yang aman, nyaman, dan terpercaya.
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12">
                    <button
                      onClick={startBooking}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-base transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                    >
                      Beli Tiket
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href="#armada"
                      className="px-8 py-4 rounded-lg font-semibold text-base text-white/90 border border-white/25 hover:border-white/50 hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
                    >
                      Lihat Armada
                    </a>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap gap-8">
                    {trustIndicators.map((t) => (
                      <div key={t.label} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-400/60" />
                        <span className="text-sm text-white/60">
                          <strong className="text-white/90 font-semibold">{t.value}</strong>{" "}
                          {t.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ═══════════ SECTION 2: TENTANG KAMI ═══════════ */}
          <section id="tentang" className="bg-white">
            <div className="container px-4 py-20 sm:py-28">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <FadeInSection>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4 block">
                    Tentang Kami
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                    Tentang 3RHiace
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    3RHiace adalah perusahaan transportasi yang bergerak di
                    bidang layanan travel Hiace antar kota. Didirikan dengan
                    visi menjadi penyedia transportasi darat terpercaya, kami
                    berkomitmen menghadirkan pengalaman perjalanan yang aman,
                    nyaman, dan profesional.
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Komitmen Pelayanan",
                        desc: "Memberikan layanan terbaik dengan standar hospitality tinggi untuk setiap penumpang.",
                      },
                      {
                        title: "Standar Keamanan",
                        desc: "Mengutamakan keselamatan dengan armada terawat, driver terlatih, dan monitoring real-time.",
                      },
                      {
                        title: "Profesionalisme Tim",
                        desc: "Tim operasional dan customer service yang siap melayani 24/7 dengan respons cepat.",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeInSection>

                <FadeInSection delay={0.2}>
                  <div className="relative">
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src="/image/operasional-hiace.jpg"
                        alt="Operasional 3RHiace"
                        className="w-full aspect-[4/3] object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-blue-200 rounded-2xl -z-10" />
                  </div>
                </FadeInSection>
              </div>
            </div>
          </section>

          {/* ═══════════ SECTION 3: ARMADA KAMI ═══════════ */}
          <section id="armada" className="section-alt">
            <div className="container px-4 py-20 sm:py-28">
              <FadeInSection>
                <div className="text-center mb-16">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4 block">
                    Armada Kami
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Armada Kami
                  </h2>
                  <p className="text-gray-500 mt-3 max-w-lg mx-auto">
                    Pilihan armada Hiace berkualitas tinggi untuk setiap
                    kebutuhan perjalanan Anda.
                  </p>
                </div>
              </FadeInSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hiaceFleet.map((fleet, i) => {
                  const Icon = fleet.icon;
                  return (
                    <FadeInSection key={fleet.name} delay={i * 0.15}>
                      <motion.div
                        whileHover={{ y: -6 }}
                        className="group relative bg-white border border-gray-200 rounded-2xl p-7 transition-all hover:border-blue-300 hover:shadow-xl"
                      >
                        <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                          <Icon className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {fleet.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-5">
                          {fleet.seats}
                        </p>

                        <div className="space-y-4">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                              Fasilitas
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {fleet.facilities.map((f) => (
                                <span
                                  key={f}
                                  className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 border border-gray-200"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                              Perawatan
                            </p>
                            <p className="text-sm text-gray-500">
                              {fleet.maintenance}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                              Kenyamanan
                            </p>
                            <p className="text-sm text-gray-500">
                              {fleet.comfort}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </FadeInSection>
                  );
                })}
              </div>

              <FadeInSection delay={0.3}>
                <div className="text-center mt-12">
                  <button
                    onClick={startBooking}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-600/20"
                  >
                    Pesan Armada Sekarang
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </FadeInSection>
            </div>
          </section>

          {/* ═══════════ SECTION 4: JARINGAN & RUTE ═══════════ */}
          <section id="rute" className="bg-white">
            <div className="container px-4 py-20 sm:py-28">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <FadeInSection>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4 block">
                    Jangkauan Layanan
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                    Jangkauan Layanan
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    3RHiace melayani berbagai jurusan antar kota di seluruh
                    Pulau Jawa. Dengan jaringan rute yang luas, kami siap
                    mengantarkan Anda ke tujuan dengan aman dan tepat waktu.
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      "Jakarta – Bandung – Cirebon",
                      "Semarang – Solo – Yogyakarta",
                      "Surabaya – Malang – Banyuwangi",
                      "Door-to-door service tersedia",
                    ].map((r) => (
                      <div key={r} className="flex items-center gap-3">
                        <MapPinned className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{r}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/rute"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Lihat Semua Rute <ArrowRight className="w-4 h-4" />
                  </Link>
                </FadeInSection>

                <FadeInSection delay={0.2}>
                  {/* Route Map Illustration */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
                    <div className="relative h-72 sm:h-80 bg-gradient-to-br from-blue-50/50 to-gray-50">
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          backgroundImage:
                            "linear-gradient(hsl(220 70% 50% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(220 70% 50% / 0.06) 1px, transparent 1px)",
                          backgroundSize: "40px 40px",
                        }}
                      />
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 400 300"
                        fill="none"
                      >
                        <path
                          d="M60 240 Q120 200 180 160 Q240 120 300 90 Q340 70 360 60"
                          stroke="hsl(220 70% 50%)"
                          strokeWidth="1.5"
                          strokeDasharray="6 4"
                          opacity="0.3"
                        />
                        <path
                          d="M60 240 Q100 220 140 200 Q180 180 240 180 Q300 180 340 160"
                          stroke="hsl(220 70% 50%)"
                          strokeWidth="1.5"
                          strokeDasharray="6 4"
                          opacity="0.2"
                        />
                      </svg>
                      {[
                        { name: "Jakarta", x: "left-10", y: "bottom-10" },
                        { name: "Bandung", x: "left-1/4", y: "bottom-1/3" },
                        { name: "Semarang", x: "left-1/2", y: "top-1/3" },
                        { name: "Surabaya", x: "right-10", y: "top-10" },
                      ].map((city) => (
                        <div
                          key={city.name}
                          className={`absolute ${city.x} ${city.y}`}
                        >
                          <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
                          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-500 whitespace-nowrap">
                            {city.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {routeStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm"
                      >
                        <p className="text-2xl font-extrabold text-gray-900 tracking-tight">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 font-medium">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </FadeInSection>
              </div>
            </div>
          </section>

          {/* ═══════════ SECTION 5: PROFESIONALISME & KEAMANAN ═══════════ */}
          <section className="section-alt">
            <div className="container px-4 py-20 sm:py-28">
              <FadeInSection>
                <div className="text-center mb-16">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4 block">
                    Profesionalisme & Keamanan
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Profesionalisme & Keamanan
                  </h2>
                  <p className="text-gray-500 mt-3 max-w-lg mx-auto">
                    Keselamatan dan kenyamanan penumpang adalah prioritas utama kami.
                  </p>
                </div>
              </FadeInSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {safetyFeatures.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <FadeInSection key={feat.title} delay={i * 0.12}>
                      <div className="group text-center p-6 rounded-2xl border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-lg transition-all">
                        <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-100 transition-colors">
                          <Icon className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          {feat.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </FadeInSection>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════ SECTION 6: KLIEN & KERJASAMA ═══════════ */}
          <section className="bg-white">
            <div className="container px-4 py-20 sm:py-28">
              <FadeInSection>
                <div className="text-center mb-14">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4 block">
                    Partner & Client
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Partner & Client Kami
                  </h2>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.15}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
                  {partnerLogos.map((name) => (
                    <div
                      key={name}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-center justify-center hover:border-blue-300 hover:shadow-md transition-all group"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-100 transition-colors">
                          <Building2 className="w-6 h-6 text-blue-500" />
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium leading-tight">
                          {name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeInSection>
            </div>
          </section>

          {/* ═══════════ SECTION 7: CTA BESAR BELI TIKET ═══════════ */}
          <section className="section-cta">
            <div className="container px-4 py-24 sm:py-32 text-center">
              <FadeInSection>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
                  Siap Melakukan Perjalanan?
                </h2>
                <p className="text-white/60 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
                  Pesan tiket Anda sekarang melalui sistem booking online 3RHiace.
                </p>
                <motion.button
                  onClick={startBooking}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-lg font-bold text-lg transition-all shadow-xl shadow-blue-600/20 inline-flex items-center gap-3"
                >
                  Beli Tiket Sekarang
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </FadeInSection>
            </div>
          </section>

          {/* ═══════════ SECTION 8: HUBUNGI KAMI ═══════════ */}
          <section id="kontak" className="bg-white">
            <div className="container px-4 py-20 sm:py-28">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <FadeInSection>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4 block">
                    Hubungi Kami
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                    Hubungi Kami
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    Butuh informasi lebih lanjut? Tim kami siap membantu Anda.
                  </p>

                  <div className="space-y-5">
                    {[
                      {
                        icon: MapPin,
                        label: "Alamat Kantor",
                        value: "Jl. Raya Transport No. 123, Jakarta Selatan 12345",
                      },
                      {
                        icon: MessageCircle,
                        label: "WhatsApp",
                        value: "0812-3456-7890",
                      },
                      {
                        icon: Mail,
                        label: "Email",
                        value: "info@3rhiace.id",
                      },
                      {
                        icon: Clock,
                        label: "Jam Operasional",
                        value: "Senin – Minggu, 06:00 – 22:00 WIB",
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {item.label}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </FadeInSection>

                {/* Contact Form */}
                <FadeInSection delay={0.2}>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">
                      Kirim Pesan
                    </h3>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">
                          Nama
                        </label>
                        <input
                          type="text"
                          placeholder="Nama lengkap Anda"
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="email@anda.com"
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">
                          Pesan
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Tulis pesan Anda..."
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Kirim Pesan
                      </button>
                    </form>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* ═══════════ BOOKING FLOW ═══════════ */
        <div ref={bookingRef} className="container px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setStep(0)}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Kembali ke Beranda
            </button>
          </div>
          <StepProgress currentStep={step} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mt-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              {step === 1 && <TripSearch onNext={handleTripNext} />}
              {step === 2 && booking && (
                <SeatMap
                  totalSeats={booking.hiaceType.seats}
                  maxSelect={booking.passengers}
                  selectedSeats={selectedSeats}
                  onSelectSeat={setSelectedSeats}
                  onNext={handleSeatNext}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && booking && (
                <PassengerForm
                  passengerCount={booking.passengers}
                  onNext={handlePassengerNext}
                  onBack={() => setStep(2)}
                />
              )}
              {step === 4 && (
                <PaymentMethod
                  onSubmit={handlePayment}
                  onBack={() => setStep(3)}
                />
              )}
            </div>
            <div className="hidden lg:block">
              <BookingSummary
                origin={booking?.origin}
                destination={booking?.destination}
                date={booking?.date}
                time={booking?.time}
                passengers={booking?.passengers}
                hiaceType={booking?.hiaceType}
                selectedSeats={selectedSeats}
                showCountdown={step >= 2}
              />
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-[hsl(220,15%,12%)] border-t border-white/10">
        <div className="container px-4 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/image/3rhiace logo.png"
                  alt="3RHiace"
                  className="h-8 w-auto opacity-80"
                />
                <span className="font-bold text-white/90">3RHiace</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                Solusi transportasi Hiace profesional untuk perjalanan antar
                kota yang aman, nyaman, dan terpercaya.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white/70 mb-4 text-sm uppercase tracking-wider">
                Menu
              </h4>
              <div className="space-y-2.5">
                <a href="#" className="block text-sm text-white/40 hover:text-white/70 transition-colors">Home</a>
                <a href="#tentang" className="block text-sm text-white/40 hover:text-white/70 transition-colors">Tentang Kami</a>
                <a href="#armada" className="block text-sm text-white/40 hover:text-white/70 transition-colors">Armada</a>
                <a href="#rute" className="block text-sm text-white/40 hover:text-white/70 transition-colors">Rute</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white/70 mb-4 text-sm uppercase tracking-wider">
                Layanan
              </h4>
              <div className="space-y-2.5">
                <button onClick={startBooking} className="block text-sm text-white/40 hover:text-white/70 transition-colors">Beli Tiket</button>
                <Link to="/jadwal" className="block text-sm text-white/40 hover:text-white/70 transition-colors">Jadwal</Link>
                <Link to="/rute" className="block text-sm text-white/40 hover:text-white/70 transition-colors">Rute</Link>
                <Link to="/bantuan" className="block text-sm text-white/40 hover:text-white/70 transition-colors">Bantuan</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white/70 mb-4 text-sm uppercase tracking-wider">
                Kontak
              </h4>
              <div className="space-y-2.5 text-sm text-white/40">
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> 0800-123-4567</p>
                <p className="flex items-center gap-2"><MessageCircle className="w-3.5 h-3.5" /> 0812-3456-7890</p>
                <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> info@3rhiace.id</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/30">
            © 2026 3RHiace. All Rights Reserved.
          </div>
        </div>
      </footer>

      <SuccessModal open={showSuccess} onClose={handleClose} />

      {/* Floating Ticket Button */}
      <motion.button
        onClick={startBooking}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center transition-colors"
        aria-label="Beli Tiket"
      >
        <Ticket className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default Index;
