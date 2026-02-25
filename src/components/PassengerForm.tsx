import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Camera, Upload, User, Mail, Phone, ShieldCheck } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface PassengerData {
  name: string;
  phone: string;
  email: string;
  gender: "male" | "female" | "";
  dob: Date | undefined;
  selfie: string | null;
}

interface PassengerFormProps {
  onNext: (data: PassengerData) => void;
  onBack: () => void;
}

const PassengerForm = ({ onNext, onBack }: PassengerFormProps) => {
  const [form, setForm] = useState<PassengerData>({
    name: "", phone: "", email: "", gender: "", dob: undefined, selfie: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nama lengkap wajib diisi";
    if (!form.phone.match(/^08\d{8,12}$/)) e.phone = "Nomor HP tidak valid (08xxxxxxxxxx)";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Email tidak valid";
    if (!form.gender) e.gender = "Pilih jenis kelamin";
    if (!form.dob) e.dob = "Tanggal lahir wajib diisi";
    if (!form.selfie) e.selfie = "Foto selfie wajib diupload";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, selfie: reader.result as string });
        setErrors({ ...errors, selfie: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (validate()) onNext(form);
  };

  const isValid = form.name && form.phone && form.email && form.gender && form.dob && form.selfie;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Data Penumpang Utama
        </h3>

        <div>
          <Label className="text-sm font-medium">Nama Lengkap (sesuai KTP)</Label>
          <Input
            value={form.name}
            onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
            placeholder="Masukkan nama lengkap"
            className={cn("mt-1 h-12 rounded-xl", errors.name && "border-destructive")}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Nomor HP
            </Label>
            <Input
              value={form.phone}
              onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }}
              placeholder="08xxxxxxxxxx"
              className={cn("mt-1 h-12 rounded-xl", errors.phone && "border-destructive")}
            />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
          </div>
          <div>
            <Label className="text-sm font-medium flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email
            </Label>
            <Input
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
              placeholder="email@contoh.com"
              className={cn("mt-1 h-12 rounded-xl", errors.email && "border-destructive")}
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Jenis Kelamin</Label>
          <div className="flex gap-3 mt-2">
            {[
              { value: "male" as const, label: "Laki-laki" },
              { value: "female" as const, label: "Perempuan" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setForm({ ...form, gender: opt.value }); setErrors({ ...errors, gender: "" }); }}
                className={cn(
                  "flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all",
                  form.gender === opt.value
                    ? "border-primary gradient-primary-soft text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {errors.gender && <p className="text-xs text-destructive mt-1">{errors.gender}</p>}
        </div>

        <div>
          <Label className="text-sm font-medium">Tanggal Lahir</Label>
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(
                "w-full mt-1 h-12 px-4 rounded-xl border text-left text-sm flex items-center",
                form.dob ? "text-foreground" : "text-muted-foreground",
                errors.dob ? "border-destructive" : "border-border"
              )}>
                {form.dob ? format(form.dob, "dd MMMM yyyy", { locale: id }) : "Pilih tanggal lahir"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form.dob}
                onSelect={(d) => { setForm({ ...form, dob: d }); setErrors({ ...errors, dob: "" }); }}
                disabled={(d) => d > new Date()}
                captionLayout="dropdown-buttons"
                fromYear={1940}
                toYear={2010}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          {errors.dob && <p className="text-xs text-destructive mt-1">{errors.dob}</p>}
        </div>
      </div>

      {/* Selfie Verification */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          Verifikasi Identitas
        </h3>
        <p className="text-xs text-muted-foreground">
          Pastikan wajah terlihat jelas, tanpa masker dan pencahayaan cukup.
        </p>

        <input type="file" ref={fileRef} accept="image/*" capture="user" className="hidden" onChange={handleFile} />

        {form.selfie ? (
          <div className="relative w-32 h-32 mx-auto rounded-xl overflow-hidden border-2 border-primary">
            <img src={form.selfie} alt="Selfie" className="w-full h-full object-cover" />
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              <Camera className="w-6 h-6 text-primary-foreground" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className={cn(
              "w-full py-8 rounded-xl border-2 border-dashed flex flex-col items-center gap-2 transition-colors",
              errors.selfie ? "border-destructive" : "border-border hover:border-primary/40"
            )}
          >
            <Upload className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">Upload Foto Selfie</span>
          </button>
        )}
        {errors.selfie && <p className="text-xs text-destructive text-center">{errors.selfie}</p>}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 h-12 rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="flex-1 h-12 gradient-primary text-primary-foreground rounded-xl hover:opacity-90 disabled:opacity-50"
        >
          Lanjutkan
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default PassengerForm;
