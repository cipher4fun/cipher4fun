import type { MetaFunction } from "@remix-run/node";
import AlgorithmLayout from "~/components/AlgorithmLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "SHA Visualization" },
    { name: "description", content: "Secure Hash Algorithms visualization" },
  ];
};

export default function SHAVisualization() {
  return (
    <AlgorithmLayout
      title="Secure Hash Algorithms (SHA)"
      description="SHA-1/SHA-2/SHA-3 family. Produces fixed-size message digests"
    >
      <div className="text-white">
        {/* SHA visualization components will go here */}
        <p>SHA visualization coming soon...</p>
      </div>
    </AlgorithmLayout>
  );
} 