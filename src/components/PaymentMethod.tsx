import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Wallet, QrCode, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const methods = [
  {
    id: "bank",
    label: "Transfer Bank",
    desc: "BCA, BNI, BRI, Mandiri",
    icon: Building2,
  },
  {
    id: "ewallet",
    label: "E-Wallet",
    desc: "GoPay, OVO, DANA, ShopeePay",
    icon: Wallet,
  },
  {
    id: "qris",
    label: "QRIS",
    desc: "Scan QR dari aplikasi apapun",
    icon: QrCode,
  },
];

interface PaymentMethodProps {
  onSubmit: (method: string) => void;
  onBack: () => void;
}

const PaymentMethod = ({ onSubmit, onBack }: PaymentMethodProps) => {
  const [selected, setSelected] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-bold text-foreground">Pilih Metode Pembayaran</h3>

      <div className="space-y-3">
        {methods.map((m) => {
          const Icon = m.icon;
          return (
            <motion.button
              key={m.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(m.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                selected === m.id
                  ? "border-primary gradient-primary-soft shadow-glow"
                  : "border-border bg-card hover:border-primary/30"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                selected === m.id ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.desc}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-start gap-2.5 p-4 rounded-xl bg-primary/5 border border-primary/10">
        <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">
          Instruksi pembayaran akan dikirim ke email setelah Anda menekan tombol <strong>Pesan Tiket</strong>.
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 h-12 rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button
          onClick={() => selected && onSubmit(selected)}
          disabled={!selected}
          className="flex-1 h-14 text-base font-bold gradient-primary text-primary-foreground rounded-xl hover:opacity-90 disabled:opacity-50"
        >
          🎫 Pesan Tiket
        </Button>
      </div>
    </motion.div>
  );
};

export default PaymentMethod;
