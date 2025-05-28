"use client";

import { useCalculations } from "@/hooks/useCalculations";
import NumberInputsGrid from "@/components/calculo/inputNumeros";
import ResultCard from "@/components/calculo/resultado";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const {
    values,
    errors,
    media,
    mediana,
    moda,
    inputCount,
    updateInputCount,
    handleChange,
    calcular,
  } = useCalculations();

  return (
    <div className="min-h-screen overflow-auto p-8 sm:p-20 flex flex-col items-center gap-10 font-[family-name:var(--font-inter)]">
      
      {/* Campo para escolher quantidade de inputs */}
      <div className="w-full max-w-sm flex justify-center flex-col gap-2">
        <label htmlFor="inputCount" className="text-sm font-medium">
          Quantidade de valores
        </label>
        <Input
          id="inputCount"
          type="number"
          value={inputCount}
          min={1}
          max={100}
          onChange={(e) => updateInputCount(Number(e.target.value))}
        />
      </div>

      {/* Grade de inputs + botão */}
      <div className="w-full flex justify-center max-w-6xl">
        <NumberInputsGrid values={values} errors={errors} onChange={handleChange} />
      </div>
      {/* Botão logo abaixo dos inputs, alinhado à direita */}
      <div className="flex justify-center mt-4">
        <Button variant="default" onClick={calcular}>
          Calcular
        </Button>
      </div>

      {/* Resultados */}
      {media !== null && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 w-full max-w-4xl">
          <ResultCard title="Média" value={media.toFixed(2)} bgColor="bg-blue-100" />
          <ResultCard title="Mediana" value={mediana?.toFixed(2) || "-"} bgColor="bg-green-100" />
          <ResultCard
            title="Moda"
            value={moda && moda.length > 0 ? moda.map((n) => n.toFixed(2)).join(", ") : "-"}
            bgColor="bg-yellow-100"
          />
        </div>
      )}

      <div>
        <p>Nomes: Mauricio Zeli Flint, Pedro Marcos Gaudêncio, Jhonattan, Rafael Vinicius Baratta, Murilo Jaoudat da Silva Teixeira</p>
      </div>
    </div>
  );
}
