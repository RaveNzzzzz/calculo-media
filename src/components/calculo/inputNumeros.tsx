import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

interface Props {
  values: string[];
  errors: boolean[];
  onChange: (index: number, value: string) => void;
}

export function useCalculations() {
  const [inputCount, setInputCount] = useState(10);
  const [values, setValues] = useState<string[]>(Array(10).fill(""));
  const [errors, setErrors] = useState<boolean[]>(Array(10).fill(false));
  const [media, setMedia] = useState<number | null>(null);
  const [mediana, setMediana] = useState<number | null>(null);
  const [moda, setModa] = useState<number[] | null>(null);

  const updateInputCount = (count: number) => {
    const safeCount = Math.max(1, Math.min(count, 100));
    setInputCount(safeCount);
    setValues(Array(safeCount).fill(""));
    setErrors(Array(safeCount).fill(false));
  };

  const handleChange = (index: number, value: string) => {
    const sanitized = value.replace(/,/g, ".").replace(/[^0-9.-]/g, "");
    const newValues = [...values];
    const newErrors = [...errors];
    newValues[index] = sanitized;
    newErrors[index] = false;
    setValues(newValues);
    setErrors(newErrors);
  };

  const calcular = () => {
    const newErrors = values.map((val) => val.trim() === "");
    setErrors(newErrors);

    if (newErrors.includes(true)) {
      return;
    }

    const numbers = values.map((val) => parseFloat(val)).filter((n) => !isNaN(n));
    if (numbers.length === 0) {
      alert("Insira pelo menos um número válido.");
      return;
    }

    const soma = numbers.reduce((acc, val) => acc + val, 0);
    setMedia(soma / numbers.length);

    const sorted = [...numbers].sort((a, b) => a - b);
    const meio = Math.floor(sorted.length / 2);
    const med = sorted.length % 2 === 0
      ? (sorted[meio - 1] + sorted[meio]) / 2
      : sorted[meio];
    setMediana(med);

    const freq: { [key: number]: number } = {};
    let maxFreq = 0;
    sorted.forEach((num) => {
      freq[num] = (freq[num] || 0) + 1;
      if (freq[num] > maxFreq) maxFreq = freq[num];
    });

    const modaFinal = Object.keys(freq)
      .filter((key) => freq[parseFloat(key)] === maxFreq)
      .map((key) => parseFloat(key));

    setModa(modaFinal);
  };

  return {
    values,
    errors,
    media,
    mediana,
    moda,
    inputCount,
    updateInputCount,
    handleChange,
    calcular,
  };
}

export default function NumberInputsGrid({ values, errors, onChange }: Props) {
  return (
    <div className="grid gap-4 w-full max-w-4xl grid-cols-1 sm:grid-cols-5">
      {values.map((val, idx) => (
        <div key={idx} className="flex flex-col">
          <Input
            type="text"
            value={val}
            onChange={(e) => onChange(idx, e.target.value)}
            placeholder={`Valor ${idx + 1}`}
            className={errors[idx] ? "border-red-500" : ""}
          />
          {errors[idx] && (
            <div className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              Este campo está vazio
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
