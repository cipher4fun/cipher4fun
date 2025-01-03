import type { MetaFunction } from "@remix-run/node";
import AlgorithmLayout from "~/components/AlgorithmLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "ECC Visualization" },
    { name: "description", content: "Elliptic Curve Cryptography visualization" },
  ];
};

export default function ECCVisualization() {
  return (
    <AlgorithmLayout
      title="Elliptic Curve Cryptography (ECC)"
      description="Public-key crypto using elliptic curves. Shorter keys than RSA"
    >
      <div className="text-white">
        {/* ECC visualization components will go here */}
        <p>ECC visualization coming soon...</p>
      </div>
    </AlgorithmLayout>
  );
} 