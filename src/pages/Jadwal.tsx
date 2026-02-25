import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Clock, MapPin, ArrowRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const cities = [
  "Semua",
  "Jakarta",
  "Bandung",
  "Semarang",
  "Surabaya",
  "Yogyakarta",
  "Malang",
  "Solo",
  "Cirebon",
];

const scheduleData = [
  { id: 1, from: "Jakarta", to: "Bandung", departure: "06:00", arrival: "09:30", type: "Hiace Commuter", price: "Rp150.000", seats: 14, available: 8 },
  { id: 2, from: "Jakarta", to: "Bandung", departure: "08:00", arrival: "11:30", type: "Hiace Premio", price: "Rp200.000", seats: 12, available: 5 },
  { id: 3, from: "Jakarta", to: "Bandung", departure: "10:00", arrival: "13:30", type: "Hiace Luxury", price: "Rp250.000", seats: 10, available: 3 },
  { id: 4, from: "Jakarta", to: "Semarang", departure: "06:00", arrival: "12:30", type: "Hiace Commuter", price: "Rp250.000", seats: 14, available: 10 },
  { id: 5, from: "Jakarta", to: "Semarang", departure: "14:00", arrival: "20:30", type: "Hiace Premio", price: "Rp300.000", seats: 12, available: 7 },
  { id: 6, from: "Jakarta", to: "Yogyakarta", departure: "08:00", arrival: "15:30", type: "Hiace Luxury", price: "Rp350.000", seats: 10, available: 2 },
  { id: 7, from: "Bandung", to: "Semarang", departure: "06:00", arrival: "11:30", type: "Hiace Commuter", price: "Rp220.000", seats: 14, available: 12 },
  { id: 8, from: "Bandung", to: "Yogyakarta", departure: "08:00", arrival: "14:30", type: "Hiace Premio", price: "Rp250.000", seats: 12, available: 6 },
  { id: 9, from: "Semarang", to: "Surabaya", departure: "06:00", arrival: "10:30", type: "Hiace Commuter", price: "Rp200.000", seats: 14, available: 9 },
  { id: 10, from: "Semarang", to: "Solo", departure: "10:00", arrival: "12:00", type: "Hiace Premio", price: "Rp100.000", seats: 12, available: 4 },
  { id: 11, from: "Surabaya", to: "Malang", departure: "08:00", arrival: "10:00", type: "Hiace Commuter", price: "Rp90.000", seats: 14, available: 11 },
  { id: 12, from: "Surabaya", to: "Malang", departure: "16:00", arrival: "18:00", type: "Hiace Luxury", price: "Rp150.000", seats: 10, available: 5 },
];

const Jadwal = () => {
  const [filterCity, setFilterCity] = useState("Semua");

  const filtered =
    filterCity === "Semua"
      ? scheduleData
      : scheduleData.filter(
          (s) => s.from === filterCity || s.to === filterCity
        );

  return (
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
              Jadwal Keberangkatan
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
              Lihat jadwal dan ketersediaan kursi untuk semua rute.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="container px-4 -mt-6 relative z-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">
              Filter Kota
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setFilterCity(city)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  filterCity === city
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200 border border-gray-200"
                )}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule List */}
      <section className="container px-4 py-8">
        <div className="space-y-4">
          {filtered.map((schedule, i) => {
            const availPercent =
              (schedule.available / schedule.seats) * 100;
            return (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Route & Time */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center gap-1.5 font-semibold text-gray-900">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        {schedule.from}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-300" />
                      <span className="flex items-center gap-1.5 font-semibold text-gray-900">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        {schedule.to}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />{" "}
                        {schedule.departure} → {schedule.arrival}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600">
                        {schedule.type}
                      </span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-5">
                    <div className="text-center">
                      <div className="w-20 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            availPercent > 50
                              ? "bg-emerald-500"
                              : availPercent > 20
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          )}
                          style={{ width: `${availPercent}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {schedule.available}/{schedule.seats} kursi
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {schedule.price}
                      </p>
                      <Link
                        to="/"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Pesan →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              Tidak ada jadwal ditemukan untuk filter ini.
            </p>
          </div>
        )}
      </section>

      <footer className="bg-[hsl(220,15%,12%)] border-t border-white/10 mt-12">
        <div className="container px-4 py-8 text-center text-sm text-white/30">
          © 2026 3RHiace. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Jadwal;
