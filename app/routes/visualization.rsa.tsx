import type { MetaFunction } from "@remix-run/node";
import AlgorithmLayout from "~/components/AlgorithmLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "RSA Visualization" },
    { name: "description", content: "RSA Algorithm visualization" },
  ];
};

export default function RSAVisualization() {
  return (
    <AlgorithmLayout
      title="RSA Algorithm"
      description="Public-key crypto based on factoring. Used for encryption & signatures"
    >
      <div className="text-white">
        {/* RSA visualization components will go here */}
        <p>RSA visualization coming soon...</p>
      </div>
    </AlgorithmLayout>
  );
}
