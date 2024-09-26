import { ButtonSection } from "@/components/buttonSection";
import { PriceModule } from "@/components/priceModule";
import Image from "next/image";

export default function Home() {
  return (
    <div className="md:p-20 max-md:pt-10 p-4 flex flex-col items-start justify-start overflow-x-hidden">
      <PriceModule/>
      <ButtonSection/>
    </div>
  );
}
