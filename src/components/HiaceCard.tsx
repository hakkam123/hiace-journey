import { cn } from "@/lib/utils";
import { Users, Wind, Armchair, Usb, Star } from "lucide-react";
import { motion } from "framer-motion";

export interface HiaceType {
  id: string;
  name: string;
  seats: number;
  features: string[];
  price: number;
  badge?: string;
}

interface HiaceCardProps {
  hiace: HiaceType;
  selected: boolean;
  onSelect: (id: string) => void;
}

const featureIcons: Record<string, React.ReactNode> = {
  AC: <Wind className="w-3.5 h-3.5" />,
  "Reclining Seat": <Armchair className="w-3.5 h-3.5" />,
  "Captain Seat": <Armchair className="w-3.5 h-3.5" />,
  "Full AC": <Wind className="w-3.5 h-3.5" />,
  "VIP Seat": <Star className="w-3.5 h-3.5" />,
  "Charger USB": <Usb className="w-3.5 h-3.5" />,
};

const HiaceCard = ({ hiace, selected, onSelect }: HiaceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(hiace.id)}
      className={cn(
        "relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-300",
        selected
          ? "border-primary gradient-primary-soft shadow-glow"
          : "border-border bg-card hover:border-primary/30 hover:shadow-md"
      )}
    >
      {hiace.badge && (
        <span className="absolute -top-2.5 right-3 gradient-primary text-primary-foreground text-xs font-semibold px-3 py-0.5 rounded-full">
          {hiace.badge}
        </span>
      )}
      <h3 className="font-bold text-lg text-foreground">{hiace.name}</h3>
      <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
        <Users className="w-4 h-4" />
        <span className="text-sm">{hiace.seats} Seat</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {hiace.features.map((f) => (
          <span
            key={f}
            className="flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full"
          >
            {featureIcons[f] || null}
            {f}
          </span>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <span className="text-xl font-bold text-gradient">
          Rp{hiace.price.toLocaleString("id-ID")}
        </span>
        <span className="text-xs text-muted-foreground">/kursi</span>
      </div>
    </motion.div>
  );
};

export default HiaceCard;
