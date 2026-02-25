import { MapPin, Calendar, Clock, Users, Armchair, Timer } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { HiaceType } from "./HiaceCard";
import { useEffect, useState } from "react";

interface BookingSummaryProps {
  origin?: string;
  destination?: string;
  date?: Date;
  time?: string;
  passengers?: number;
  hiaceType?: HiaceType;
  selectedSeats?: string[];
  showCountdown?: boolean;
}

const BookingSummary = ({
  origin, destination, date, time, passengers, hiaceType, selectedSeats, showCountdown,
}: BookingSummaryProps) => {
  const [countdown, setCountdown] = useState(15 * 60);

  useEffect(() => {
    if (!showCountdown) return;
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [showCountdown]);

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;
  const total = hiaceType && passengers ? hiaceType.price * passengers : 0;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-4 sticky top-24">
      <h3 className="font-bold text-foreground text-base">Ringkasan Booking</h3>

      {showCountdown && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-warning/10 border border-warning/20">
          <Timer className="w-4 h-4 text-warning" />
          <span className="text-sm font-semibold text-warning">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground">sisa waktu</span>
        </div>
      )}

      <div className="space-y-3 text-sm">
        {origin && destination && (
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">{origin} → {destination}</p>
              <p className="text-xs text-muted-foreground">Rute perjalanan</p>
            </div>
          </div>
        )}
        {date && (
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">{format(date, "EEEE, dd MMMM yyyy", { locale: id })}</p>
              <p className="text-xs text-muted-foreground">Tanggal keberangkatan</p>
            </div>
          </div>
        )}
        {time && (
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-primary mt-0.5" />
            <p className="font-medium text-foreground">{time} WIB</p>
          </div>
        )}
        {hiaceType && (
          <div className="flex items-start gap-3">
            <Armchair className="w-4 h-4 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">{hiaceType.name}</p>
              <p className="text-xs text-muted-foreground">Rp{hiaceType.price.toLocaleString("id-ID")}/kursi</p>
            </div>
          </div>
        )}
        {passengers && (
          <div className="flex items-start gap-3">
            <Users className="w-4 h-4 text-primary mt-0.5" />
            <p className="font-medium text-foreground">{passengers} penumpang</p>
          </div>
        )}
        {selectedSeats && selectedSeats.length > 0 && (
          <div className="flex items-start gap-3">
            <Armchair className="w-4 h-4 text-primary mt-0.5" />
            <p className="font-medium text-foreground">Kursi: {selectedSeats.join(", ")}</p>
          </div>
        )}
      </div>

      {total > 0 && (
        <div className="pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-xl font-bold text-gradient">
              Rp{total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
