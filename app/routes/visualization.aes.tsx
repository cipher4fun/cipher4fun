import type { MetaFunction } from "@remix-run/node";
import AlgorithmLayout from "~/components/AlgorithmLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "AES Visualization" },
    {
      name: "description",
      content: "Advanced Encryption Standard (AES) visualization",
    },
  ];
};

export default function AESVisualization() {
  return (
    <AlgorithmLayout
      title="Advanced Encryption Standard (AES)"
      description="128/192/256-bit key block cipher, successor to DES. Widely used in TLS/SSL"
    >
      <div className="text-white">
        {/* AES visualization components will go here */}
        <p>AES visualization coming soon...</p>
      </div>
    </AlgorithmLayout>
  );
}
