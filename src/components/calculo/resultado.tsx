import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  value: string;
  bgColor: string;
}

export default function ResultCard({ title, value, bgColor }: Props) {
  return (
    <Card className={bgColor}>
      <CardContent className="p-6 text-center">
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
