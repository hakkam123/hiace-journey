import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl p-8 max-w-md w-full shadow-2xl text-center relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 12 }}
              className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-5"
            >
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            <h2 className="text-2xl font-bold text-foreground mb-2">Booking Berhasil! 🎉</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Booking Anda berhasil dibuat. Silakan cek email Anda untuk instruksi pembayaran.
            </p>

            <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground bg-muted rounded-xl px-4 py-3 mb-6">
              <Mail className="w-4 h-4 text-primary" />
              <span>Instruksi pembayaran dikirim ke email Anda</span>
            </div>

            <Button
              onClick={onClose}
              className="w-full h-12 gradient-primary text-primary-foreground rounded-xl hover:opacity-90"
            >
              Kembali ke Beranda
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
