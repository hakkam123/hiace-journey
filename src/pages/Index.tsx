import { useState } from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-hiace.webp";
import StepProgress from "@/components/StepProgress";
import TripSearch from "@/components/TripSearch";
import SeatMap from "@/components/SeatMap";
import PassengerForm from "@/components/PassengerForm";
import PaymentMethod from "@/components/PaymentMethod";
import BookingSummary from "@/components/BookingSummary";
import SuccessModal from "@/components/SuccessModal";
import { HiaceType } from "@/components/HiaceCard";
import { Bus, Shield, Clock, Headphones } from "lucide-react";

interface BookingData {
  origin: string;
  destination: string;
  date: Date;
  time: string;
  passengers: number;
  hiaceType: HiaceType;
}

const features = [
  { icon: Bus, title: "Armada Modern", desc: "Hiace terbaru dengan fasilitas lengkap" },
  { icon: Shield, title: "Aman & Nyaman", desc: "Driver profesional & asuransi perjalanan" },
  { icon: Clock, title: "Tepat Waktu", desc: "Jadwal keberangkatan yang pasti" },
  { icon: Headphones, title: "CS 24/7", desc: "Layanan pelanggan siap membantu" },
];

const Index = () => {
  const [step, setStep] = useState(0); // 0 = hero, 1-4 = booking steps
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTripNext = (data: BookingData) => {
    setBooking(data);
    setSelectedSeats([]);
    setStep(2);
  };

  const handleSeatNext = () => setStep(3);
  const handlePassengerNext = () => setStep(4);
  const handlePayment = () => {
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    setStep(0);
    setBooking(null);
    setSelectedSeats([]);
  };

  const startBooking = () => setStep(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <Bus className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">HiaceGo</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Rute</a>
            <a href="#" className="hover:text-foreground transition-colors">Jadwal</a>
            <a href="#" className="hover:text-foreground transition-colors">Bantuan</a>
          </nav>
        </div>
      </header>

      {step === 0 ? (
        <>
          {/* Hero Section */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={heroImage}
                alt="Hiace travel modern di jalan Indonesia"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
            </div>
            <div className="relative container px-4 py-20 sm:py-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-xl"
              >
                <h1 className="text-3xl sm:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
                  Pesan Tiket Hiace{" "}
                  <span className="text-gradient">Mudah & Cepat</span>
                </h1>
                <p className="text-primary-foreground/80 text-base sm:text-lg mb-8 leading-relaxed">
                  Pilih jurusan, pilih kursi, bayar, dan tiket langsung dikirim ke email Anda.
                </p>
                <button
                  onClick={startBooking}
                  className="gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-base hover:opacity-90 transition-opacity shadow-glow"
                >
                  Pesan Sekarang →
                </button>
              </motion.div>
            </div>
          </section>

          {/* Features */}
          <section className="container px-4 py-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-card border border-border rounded-xl p-5 text-center hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 gradient-primary-soft rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground">{f.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Quick Booking Form */}
          <section className="container px-4 pb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground text-center mb-8">
                Cari Perjalanan
              </h2>
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
                <TripSearch onNext={handleTripNext} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="container px-4 py-6">
          <StepProgress currentStep={step} />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mt-6">
            {/* Main Content */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
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
              {step === 3 && (
                <PassengerForm
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

            {/* Sidebar Summary */}
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

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container px-4 py-8 text-center text-sm text-muted-foreground">
          © 2026 HiaceGo. Semua hak dilindungi.
        </div>
      </footer>

      <SuccessModal open={showSuccess} onClose={handleClose} />
    </div>
  );
};

export default Index;
