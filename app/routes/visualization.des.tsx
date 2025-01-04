import type { MetaFunction } from "@remix-run/node";
import AlgorithmLayout from "~/components/AlgorithmLayout";
import FeistelNetwork from "~/components/visualization/FeistelNetwork";
import { useTranslation } from "~/hooks/useTranslation";
import { useEffect, useState } from "react";

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
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AlgorithmLayout
      title={
        mounted
          ? t("categories.symmetric.des.name")
          : "Data Encryption Standard (DES)"
      }
      description={
        mounted
          ? t("categories.symmetric.des.description")
          : "56-bit key Feistel network block cipher. Historic NIST standard from 1977."
      }
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            {mounted
              ? t("categories.symmetric.des.feistel.title")
              : "Feistel Network Structure"}
          </h2>
          <p className="text-white/80 mb-6">
            {mounted
              ? t("categories.symmetric.des.feistel.description")
              : "The Feistel Network is the core structure of DES. Enter values to see how data flows through the network."}
          </p>
          <FeistelNetwork rounds={3} />
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            {mounted
              ? t("categories.symmetric.des.sbox.title")
              : "S-Box Generation"}
          </h2>
          <p className="text-white/80 mb-6">
            {mounted
              ? t("categories.symmetric.des.sbox.description")
              : "Coming soon..."}
          </p>
        </section>
      </div>
    </AlgorithmLayout>
  );
}
