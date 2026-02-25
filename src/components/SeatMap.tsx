import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface SeatMapProps {
  totalSeats: number;
  maxSelect: number;
  selectedSeats: string[];
  onSelectSeat: (seats: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const takenSeats = ["A2", "B1", "C3", "D2"]; // Simulated

const generateLayout = (total: number): string[][] => {
  const rows: string[][] = [];
  const labels = "ABCDEFGHIJ";
  let count = 0;
  for (let r = 0; count < total; r++) {
    const row: string[] = [];
    const cols = r === 0 ? 2 : 3; // First row is driver + 1
    for (let c = 0; c < cols && count < total; c++) {
      row.push(`${labels[r]}${c + 1}`);
      count++;
    }
    rows.push(row);
  }
  return rows;
};

const SeatMap = ({ totalSeats, maxSelect, selectedSeats, onSelectSeat, onNext, onBack }: SeatMapProps) => {
  const layout = generateLayout(totalSeats);

  const handleSeatClick = (seatId: string) => {
    if (takenSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      onSelectSeat(selectedSeats.filter((s) => s !== seatId));
    } else if (selectedSeats.length < maxSelect) {
      onSelectSeat([...selectedSeats, seatId]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        {[
          { label: "Tersedia", className: "bg-success/20 border-success/40" },
          { label: "Terisi", className: "bg-seat-taken/20 border-seat-taken/40" },
          { label: "Dipilih", className: "bg-seat-selected border-seat-selected text-primary-foreground" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={cn("w-6 h-6 rounded-md border-2", item.className)} />
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Seat Layout */}
      <div className="bg-card border border-border rounded-2xl p-6 max-w-sm mx-auto">
        <div className="text-center text-xs text-muted-foreground font-medium mb-4 pb-3 border-b border-border">
          🚐 Depan (Sopir)
        </div>
        <div className="space-y-2">
          {layout.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-2">
              {row.map((seat) => {
                const isTaken = takenSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);
                return (
                  <motion.button
                    key={seat}
                    whileHover={!isTaken ? { scale: 1.1 } : {}}
                    whileTap={!isTaken ? { scale: 0.95 } : {}}
                    onClick={() => handleSeatClick(seat)}
                    disabled={isTaken}
                    className={cn(
                      "w-14 h-12 rounded-lg border-2 text-xs font-bold transition-all duration-200 flex items-center justify-center",
                      isTaken && "bg-seat-taken/20 border-seat-taken/30 text-muted-foreground cursor-not-allowed",
                      isSelected && "bg-seat-selected border-seat-selected text-primary-foreground shadow-glow",
                      !isTaken && !isSelected && "bg-success/10 border-success/30 text-success hover:bg-success/20 cursor-pointer"
                    )}
                  >
                    {seat}
                  </motion.button>
                );
              })}
              {/* Add gap for aisle on rows with 3 seats */}
              {row.length === 2 && ri > 0 && <div className="w-14" />}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Summary */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Seat dipilih:{" "}
          {selectedSeats.length > 0 ? (
            <span className="font-bold text-primary">{selectedSeats.join(", ")}</span>
          ) : (
            <span className="text-muted-foreground">Belum ada</span>
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {selectedSeats.length}/{maxSelect} kursi
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 h-12 rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button
          onClick={onNext}
          disabled={selectedSeats.length !== maxSelect}
          className="flex-1 h-12 gradient-primary text-primary-foreground rounded-xl hover:opacity-90 disabled:opacity-50"
        >
          Lanjutkan
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default SeatMap;
