import type { MetaFunction } from "@remix-run/node";
import AlgorithmLayout from "~/components/AlgorithmLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "DES Visualization" },
    { name: "description", content: "Data Encryption Standard (DES) visualization" },
  ];
};

export default function DESVisualization() {
  return (
    <AlgorithmLayout
      title="Data Encryption Standard (DES)"
      description="56-bit key Feistel network block cipher. Historic NIST standard from 1977"
    >
      <div className="text-white">
        {/* DES visualization components will go here */}
        <p>DES visualization coming soon...</p>
      </div>
    </AlgorithmLayout>
  );
} 