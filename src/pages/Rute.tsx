import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { MapPin, ArrowRight, Clock, Car } from "lucide-react";
import { Link } from "react-router-dom";

const routes = [
  { from: "Jakarta", to: "Bandung", duration: "3-4 jam", distance: "150 km", price: "Rp150.000", popular: true },
  { from: "Jakarta", to: "Semarang", duration: "6-7 jam", distance: "450 km", price: "Rp250.000", popular: true },
  { from: "Jakarta", to: "Surabaya", duration: "10-12 jam", distance: "780 km", price: "Rp350.000", popular: false },
  { from: "Jakarta", to: "Yogyakarta", duration: "7-8 jam", distance: "530 km", price: "Rp280.000", popular: true },
  { from: "Jakarta", to: "Cirebon", duration: "3-4 jam", distance: "230 km", price: "Rp180.000", popular: false },
  { from: "Bandung", to: "Semarang", duration: "5-6 jam", distance: "350 km", price: "Rp220.000", popular: false },
  { from: "Bandung", to: "Yogyakarta", duration: "6-7 jam", distance: "420 km", price: "Rp250.000", popular: false },
  { from: "Bandung", to: "Garut", duration: "1.5-2 jam", distance: "65 km", price: "Rp80.000", popular: true },
  { from: "Semarang", to: "Surabaya", duration: "4-5 jam", distance: "340 km", price: "Rp200.000", popular: false },
  { from: "Semarang", to: "Solo", duration: "1.5-2 jam", distance: "100 km", price: "Rp100.000", popular: true },
  { from: "Yogyakarta", to: "Malang", duration: "5-6 jam", distance: "360 km", price: "Rp230.000", popular: false },
  { from: "Surabaya", to: "Malang", duration: "1.5-2 jam", distance: "90 km", price: "Rp90.000", popular: true },
];

const Rute = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative overflow-hidden bg-[hsl(220,15%,12%)]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent" />
      <div className="relative container px-4 py-16 sm:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Rute Perjalanan
          </h1>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
            Jelajahi semua rute yang tersedia. Pilih perjalanan terbaik untuk
            Anda.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Routes Grid */}
    <section className="container px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {routes.map((route, i) => (
          <motion.div
            key={`${route.from}-${route.to}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-lg transition-all"
          >
            {route.popular && (
              <span className="inline-block text-xs font-bold text-white bg-blue-600 px-2.5 py-0.5 rounded-full mb-3">
                Populer
              </span>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 text-gray-900 font-semibold">
                <MapPin className="w-4 h-4 text-blue-500" />
                {route.from}
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300" />
              <div className="flex items-center gap-2 text-gray-900 font-semibold">
                <MapPin className="w-4 h-4 text-blue-500" />
                {route.to}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {route.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5" /> {route.distance}
              </span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-lg font-bold text-gray-900">
                {route.price}
              </span>
              <Link
                to="/"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Pesan →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <footer className="bg-[hsl(220,15%,12%)] border-t border-white/10 mt-12">
      <div className="container px-4 py-8 text-center text-sm text-white/30">
        © 2026 3RHiace. All Rights Reserved.
      </div>
    </footer>
  </div>
);

export default Rute;
