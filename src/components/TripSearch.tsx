import { useState } from "react";
import { MapPin, Calendar, Clock, Users, ArrowRight, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import HiaceCard, { HiaceType } from "./HiaceCard";
import { motion } from "framer-motion";

const cities = [
  "Jakarta", "Bandung", "Semarang", "Surabaya", "Yogyakarta",
  "Malang", "Solo", "Cirebon", "Tasikmalaya", "Garut",
];

const schedules = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

const hiaceTypes: HiaceType[] = [
  { id: "commuter", name: "Hiace Commuter", seats: 14, features: ["AC", "Reclining Seat"], price: 150000 },
  { id: "premio", name: "Hiace Premio", seats: 12, features: ["Captain Seat", "Full AC"], price: 200000, badge: "Populer" },
  { id: "luxury", name: "Hiace Luxury", seats: 10, features: ["VIP Seat", "Charger USB", "Full AC"], price: 250000, badge: "Premium" },
];

interface TripSearchProps {
  onNext: (data: {
    origin: string;
    destination: string;
    date: Date;
    time: string;
    passengers: number;
    hiaceType: HiaceType;
  }) => void;
}

const CityDropdown = ({
  value,
  onChange,
  label,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  icon: React.ReactNode;
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = cities.filter((c) => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-3 w-full p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors text-left">
          <div className="w-10 h-10 rounded-lg gradient-primary-soft flex items-center justify-center text-primary">
            {icon}
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className={cn("text-sm font-semibold", value ? "text-foreground" : "text-muted-foreground")}>
              {value || "Pilih kota"}
            </p>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="start">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari kota..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background mb-2 outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div className="max-h-48 overflow-y-auto">
          {filtered.map((city) => (
            <button
              key={city}
              onClick={() => { onChange(city); setOpen(false); setSearch(""); }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                city === value ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              {city}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const TripSearch = ({ onNext }: TripSearchProps) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [selectedHiace, setSelectedHiace] = useState("");
  const [timeOpen, setTimeOpen] = useState(false);

  const swapCities = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const hiace = hiaceTypes.find((h) => h.id === selectedHiace);
  const isValid = origin && destination && date && time && selectedHiace && origin !== destination;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* City Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-center">
        <CityDropdown value={origin} onChange={setOrigin} label="Kota Asal" icon={<MapPin className="w-5 h-5" />} />
        <button
          onClick={swapCities}
          className="w-10 h-10 mx-auto rounded-full border border-border hover:border-primary/40 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>
        <CityDropdown value={destination} onChange={setDestination} label="Kota Tujuan" icon={<MapPin className="w-5 h-5" />} />
      </div>

      {/* Date, Time, Passengers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-3 w-full p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors text-left">
              <div className="w-10 h-10 rounded-lg gradient-primary-soft flex items-center justify-center text-primary">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Tanggal</p>
                <p className={cn("text-sm font-semibold", date ? "text-foreground" : "text-muted-foreground")}>
                  {date ? format(date, "dd MMM yyyy", { locale: id }) : "Pilih tanggal"}
                </p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarUI
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d < new Date()}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <Popover open={timeOpen} onOpenChange={setTimeOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-3 w-full p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors text-left">
              <div className="w-10 h-10 rounded-lg gradient-primary-soft flex items-center justify-center text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Jam</p>
                <p className={cn("text-sm font-semibold", time ? "text-foreground" : "text-muted-foreground")}>
                  {time || "Pilih jam"}
                </p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-44 p-2" align="start">
            <div className="grid grid-cols-2 gap-1">
              {schedules.map((s) => (
                <button
                  key={s}
                  onClick={() => { setTime(s); setTimeOpen(false); }}
                  className={cn(
                    "px-3 py-2 text-sm rounded-lg transition-colors",
                    s === time ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-3 w-full p-4 rounded-xl border border-border bg-card">
          <div className="w-10 h-10 rounded-lg gradient-primary-soft flex items-center justify-center text-primary">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">Penumpang</p>
            <div className="flex items-center gap-3 mt-0.5">
              <button
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-sm font-bold hover:bg-muted transition-colors"
              >
                −
              </button>
              <span className="text-sm font-bold w-4 text-center">{passengers}</span>
              <button
                onClick={() => setPassengers(Math.min(14, passengers + 1))}
                className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-sm font-bold hover:bg-muted transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hiace Type Selection */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-3">Pilih Tipe Hiace</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {hiaceTypes.map((h) => (
            <HiaceCard
              key={h.id}
              hiace={h}
              selected={selectedHiace === h.id}
              onSelect={setSelectedHiace}
            />
          ))}
        </div>
      </div>

      <Button
        onClick={() => isValid && hiace && onNext({ origin, destination, date: date!, time, passengers, hiaceType: hiace })}
        disabled={!isValid}
        className="w-full h-14 text-base font-semibold gradient-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        size="lg"
      >
        Lanjutkan
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </motion.div>
  );
};

export default TripSearch;
