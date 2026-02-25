import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
} from "lucide-react";

const faqs = [
  {
    q: "Bagaimana cara memesan tiket di 3RHiace?",
    a: "Pilih kota asal dan tujuan, tentukan tanggal & jam keberangkatan, pilih jumlah penumpang, lalu pilih tipe Hiace. Setelah itu pilih kursi, isi data penumpang, dan lakukan pembayaran. Tiket akan dikirim ke email Anda.",
  },
  {
    q: "Apakah bisa membatalkan atau mengubah jadwal?",
    a: "Ya, pembatalan atau perubahan jadwal bisa dilakukan maksimal 24 jam sebelum keberangkatan. Hubungi customer service kami melalui WhatsApp atau email untuk proses perubahan.",
  },
  {
    q: "Metode pembayaran apa saja yang tersedia?",
    a: "Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, Dana, ShopeePay), dan QRIS. Semua pembayaran diproses secara aman.",
  },
  {
    q: "Bagaimana jika saya ketinggalan Hiace?",
    a: "Jika Anda ketinggalan Hiace, tiket tidak dapat di-refund. Namun, Anda bisa menghubungi CS kami untuk re-schedule ke jadwal berikutnya dengan biaya tambahan (jika kursi tersedia).",
  },
  {
    q: "Apakah ada batasan bagasi?",
    a: "Setiap penumpang diperbolehkan membawa 1 koper besar (maks 20kg) dan 1 tas kabin. Barang berlebih akan dikenakan biaya tambahan Rp25.000 per item.",
  },
  {
    q: "Apakah anak-anak perlu tiket?",
    a: "Anak usia di bawah 3 tahun tidak memerlukan tiket dan duduk di pangkuan orang tua. Usia 3 tahun ke atas harus memiliki tiket dan kursi sendiri.",
  },
  {
    q: "Bagaimana cara memastikan keamanan perjalanan?",
    a: "Semua armada 3RHiace telah diasuransikan, menjalani inspeksi rutin, dan dikemudikan oleh driver berpengalaman. Kami juga menyediakan fitur share trip untuk berbagi lokasi real-time dengan keluarga.",
  },
  {
    q: "Di mana titik penjemputan dan penurunan?",
    a: "Titik penjemputan dan penurunan berada di terminal atau pool yang sudah ditentukan di setiap kota. Detail lokasi akan tertera pada tiket elektronik yang dikirim ke email Anda.",
  },
];

const Bantuan = () => (
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
            Pusat Bantuan
          </h1>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
            Temukan jawaban dari pertanyaan yang sering diajukan atau hubungi
            kami langsung.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="container px-4 py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* FAQ */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="border border-gray-200 rounded-xl px-4 overflow-hidden bg-white"
                >
                  <AccordionTrigger className="text-sm font-semibold text-gray-900 text-left hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-500 pb-4 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        {/* Contact Sidebar */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Hubungi Kami
          </h3>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm"
          >
            {[
              { icon: Phone, label: "Telepon", value: "0800-123-4567" },
              { icon: MessageCircle, label: "WhatsApp", value: "0812-3456-7890" },
              { icon: Mail, label: "Email", value: "info@3rhiace.id" },
              { icon: Clock, label: "Jam Operasional", value: "24/7 — Setiap hari" },
              { icon: MapPin, label: "Kantor Pusat", value: "Jl. Raya Transport No. 123, Jakarta Selatan" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-500">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>

    <footer className="bg-[hsl(220,15%,12%)] border-t border-white/10 mt-12">
      <div className="container px-4 py-8 text-center text-sm text-white/30">
        © 2026 3RHiace. All Rights Reserved.
      </div>
    </footer>
  </div>
);

export default Bantuan;
