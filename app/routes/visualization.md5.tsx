import type { MetaFunction } from "@remix-run/node";
import AlgorithmLayout from "~/components/AlgorithmLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "MD5 Visualization" },
    { name: "description", content: "MD5 hash function visualization" },
  ];
};

export default function MD5Visualization() {
  return (
    <AlgorithmLayout
      title="MD5 (Message Digest Algorithm 5)"
      description="128-bit hash function. Broken but historically significant"
    >
      <div className="text-white">
        {/* MD5 visualization components will go here */}
        <p>MD5 visualization coming soon...</p>
      </div>
    </AlgorithmLayout>
  );
} 