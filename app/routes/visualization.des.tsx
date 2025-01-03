import type { MetaFunction } from "@remix-run/node";
import AlgorithmLayout from "~/components/AlgorithmLayout";
import FeistelNetwork from "~/components/visualization/FeistelNetwork";

export const meta: MetaFunction = () => {
  return [
    { title: "DES Visualization" },
    {
      name: "description",
      content: "Data Encryption Standard (DES) visualization",
    },
  ];
};

export default function DESVisualization() {
  return (
    <AlgorithmLayout
      title="Data Encryption Standard (DES)"
      description="56-bit key Feistel network block cipher. Historic NIST standard from 1977"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Feistel Network Structure
          </h2>
          <p className="text-white/80 mb-6">
            The Feistel Network is the core structure of DES. Enter values to
            see how data flows through the network.
          </p>
          <FeistelNetwork rounds={3} />
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            S-Box Generation
          </h2>
          <p className="text-white/80 mb-6">Coming soon...</p>
        </section>
      </div>
    </AlgorithmLayout>
  );
}
