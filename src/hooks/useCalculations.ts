import { useState } from "react";

export function useCalculations() {
  const [inputCount, setInputCount] = useState(10);
  const [values, setValues] = useState<string[]>(Array(10).fill(""));
  const [errors, setErrors] = useState<boolean[]>(Array(10).fill(false));
  const [media, setMedia] = useState<number | null>(null);
  const [mediana, setMediana] = useState<number | null>(null);
  const [moda, setModa] = useState<number[] | null>(null);

  const updateInputCount = (count: number) => {
    const safeCount = Math.max(1, count); // remove limite máximo
    setInputCount(safeCount);

    setValues((prev) => {
      const updated = [...prev];
      if (safeCount > updated.length) {
        updated.push(...Array(safeCount - updated.length).fill(""));
      }
      return updated.slice(0, safeCount);
    });

    setErrors((prev) => {
      const updated = [...prev];
      if (safeCount > updated.length) {
        updated.push(...Array(safeCount - updated.length).fill(false));
      }
      return updated.slice(0, safeCount);
    });
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
