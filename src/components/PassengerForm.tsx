import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Camera, Upload, User, Mail, Phone, ShieldCheck, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

export interface PassengerData {
  name: string;
  phone: string;
  email: string;
  gender: "male" | "female" | "";
  dob: Date | undefined;
  selfie: string | null;
}

interface PassengerFormProps {
  passengerCount: number;
  onNext: (data: PassengerData[]) => void;
  onBack: () => void;
}

const emptyPassenger = (): PassengerData => ({
  name: "", phone: "", email: "", gender: "", dob: undefined, selfie: null,
});

const SinglePassengerForm = ({
  index,
  total,
  data,
  errors,
  onChange,
  onFileChange,
}: {
  index: number;
  total: number;
  data: PassengerData;
  errors: Record<string, string>;
  onChange: (field: keyof PassengerData, value: any) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const prefix = `p${index}_`;
  const isMain = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold",
          isMain ? "gradient-primary text-primary-foreground" : "gradient-primary-soft text-primary"
        )}>
          {index + 1}
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            {isMain ? (
              <>
                <User className="w-4 h-4 text-primary" />
                Penumpang Utama (Pemesan)
              </>
            ) : (
              <>
                <Users className="w-4 h-4 text-primary" />
                Penumpang {index + 1}
              </>
            )}
          </h3>
          {total > 1 && (
            <p className="text-xs text-muted-foreground">
              {isMain ? "Data ini juga digunakan sebagai pemesan tiket" : "Isi data sesuai identitas penumpang"}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Nama Lengkap (sesuai KTP)</Label>
        <Input
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Masukkan nama lengkap"
          className={cn("mt-1 h-12 rounded-xl", errors[`${prefix}name`] && "border-destructive")}
        />
        {errors[`${prefix}name`] && <p className="text-xs text-destructive mt-1">{errors[`${prefix}name`]}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> Nomor HP
          </Label>
          <Input
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="08xxxxxxxxxx"
            className={cn("mt-1 h-12 rounded-xl", errors[`${prefix}phone`] && "border-destructive")}
          />
          {errors[`${prefix}phone`] && <p className="text-xs text-destructive mt-1">{errors[`${prefix}phone`]}</p>}
        </div>
        <div>
          <Label className="text-sm font-medium flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Email
          </Label>
          <Input
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="email@contoh.com"
            className={cn("mt-1 h-12 rounded-xl", errors[`${prefix}email`] && "border-destructive")}
          />
          {errors[`${prefix}email`] && <p className="text-xs text-destructive mt-1">{errors[`${prefix}email`]}</p>}
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
              onClick={() => onChange("gender", opt.value)}
              className={cn(
                "flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all",
                data.gender === opt.value
                  ? "border-primary gradient-primary-soft text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {errors[`${prefix}gender`] && <p className="text-xs text-destructive mt-1">{errors[`${prefix}gender`]}</p>}
      </div>

      <div>
        <Label className="text-sm font-medium">Tanggal Lahir</Label>
        <Popover>
          <PopoverTrigger asChild>
            <button className={cn(
              "w-full mt-1 h-12 px-4 rounded-xl border text-left text-sm flex items-center",
              data.dob ? "text-foreground" : "text-muted-foreground",
              errors[`${prefix}dob`] ? "border-destructive" : "border-border"
            )}>
              {data.dob ? format(data.dob, "dd MMMM yyyy", { locale: id }) : "Pilih tanggal lahir"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={data.dob}
              onSelect={(d) => onChange("dob", d)}
              disabled={(d) => d > new Date()}
              captionLayout="dropdown-buttons"
              fromYear={1940}
              toYear={2010}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        {errors[`${prefix}dob`] && <p className="text-xs text-destructive mt-1">{errors[`${prefix}dob`]}</p>}
      </div>

      {/* Selfie Verification */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          Verifikasi Identitas
        </h4>
        <p className="text-xs text-muted-foreground">
          Pastikan wajah terlihat jelas, tanpa masker dan pencahayaan cukup.
        </p>

        <input type="file" ref={fileRef} accept="image/*" capture="user" className="hidden" onChange={onFileChange} />

        {data.selfie ? (
          <div className="relative w-28 h-28 mx-auto rounded-xl overflow-hidden border-2 border-primary">
            <img src={data.selfie} alt="Selfie" className="w-full h-full object-cover" />
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
              "w-full py-6 rounded-xl border-2 border-dashed flex flex-col items-center gap-2 transition-colors",
              errors[`${prefix}selfie`] ? "border-destructive" : "border-border hover:border-primary/40"
            )}
          >
            <Upload className="w-7 h-7 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">Upload Foto Selfie</span>
          </button>
        )}
        {errors[`${prefix}selfie`] && <p className="text-xs text-destructive text-center">{errors[`${prefix}selfie`]}</p>}
      </div>
    </motion.div>
  );
};

const PassengerForm = ({ passengerCount, onNext, onBack }: PassengerFormProps) => {
  const [forms, setForms] = useState<PassengerData[]>(
    Array.from({ length: passengerCount }, () => emptyPassenger())
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    forms.forEach((form, i) => {
      const prefix = `p${i}_`;
      if (!form.name.trim()) e[`${prefix}name`] = "Nama lengkap wajib diisi";
      if (!form.phone.match(/^08\d{8,12}$/)) e[`${prefix}phone`] = "Nomor HP tidak valid (08xxxxxxxxxx)";
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e[`${prefix}email`] = "Email tidak valid";
      if (!form.gender) e[`${prefix}gender`] = "Pilih jenis kelamin";
      if (!form.dob) e[`${prefix}dob`] = "Tanggal lahir wajib diisi";
      if (!form.selfie) e[`${prefix}selfie`] = "Foto selfie wajib diupload";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const updateField = (index: number, field: keyof PassengerData, value: any) => {
    setForms((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    const prefix = `p${index}_`;
    setErrors((prev) => ({ ...prev, [`${prefix}${field}`]: "" }));
  };

  const handleFileChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField(index, "selfie", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (validate()) onNext(forms);
  };

  const allValid = forms.every(
    (f) => f.name && f.phone && f.email && f.gender && f.dob && f.selfie
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header info */}
      {passengerCount > 1 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/10">
          <Users className="w-5 h-5 text-primary" />
          <p className="text-sm text-foreground">
            Isi data untuk <span className="font-bold text-primary">{passengerCount} penumpang</span> sesuai jumlah tiket yang dibeli.
          </p>
        </div>
      )}

      {forms.map((form, i) => (
        <div key={i}>
          {i > 0 && (
            <div className="border-t border-border my-6" />
          )}
          <SinglePassengerForm
            index={i}
            total={passengerCount}
            data={form}
            errors={errors}
            onChange={(field, value) => updateField(i, field, value)}
            onFileChange={handleFileChange(i)}
          />
        </div>
      ))}

      <div className="flex gap-3 pt-2">
        <Button onClick={onBack} variant="outline" className="flex-1 h-12 rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!allValid}
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
