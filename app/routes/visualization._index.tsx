import type { MetaFunction } from "@remix-run/node";
import { Card, CardHeader, Image } from "@nextui-org/react";
import MainLayout from "~/components/MainLayout";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Crypto Visualization" },
    { name: "description", content: "Cryptography Algorithm Visualization" },
  ];
};

const algorithmCategories = [
  {
    id: "symmetric",
    name: "Symmetric Cryptography",
    algorithms: [
      {
        id: "aes",
        name: "Advanced Encryption Standard",
        description:
          "128/192/256-bit key block cipher, successor to DES. Widely used in TLS/SSL",
        stages: 14,
        tags: ["block-cipher", "standard"],
        image: "https://nextui.org/images/card-example-4.jpeg",
      },
      {
        id: "des",
        name: "Data Encryption Standard",
        description:
          "56-bit key Feistel network block cipher. Historic NIST standard from 1977",
        stages: 12,
        tags: ["block-cipher", "legacy"],
        image: "https://nextui.org/images/card-example-4.jpeg",
      },
    ],
  },
  {
    id: "digest",
    name: "Digest Algorithms",
    algorithms: [
      {
        id: "sha",
        name: "Secure Hash Algorithms",
        description:
          "SHA-1/SHA-2/SHA-3 family. Produces fixed-size message digests",
        stages: 10,
        tags: ["digest", "standard"],
        image: "https://nextui.org/images/card-example-4.jpeg",
      },
      {
        id: "md5",
        name: "MD5",
        description:
          "128-bit hash function. Broken but historically significant",
        stages: 8,
        tags: ["digest", "deprecated"],
        image: "https://nextui.org/images/card-example-4.jpeg",
      },
    ],
  },
  {
    id: "asymmetric",
    name: "Asymmetric Cryptography",
    algorithms: [
      {
        id: "rsa",
        name: "RSA Algorithm",
        description:
          "Public-key crypto based on factoring. Used for encryption & signatures",
        stages: 18,
        tags: ["public-key", "PKI"],
        image: "https://nextui.org/images/card-example-4.jpeg",
      },
      {
        id: "ecc",
        name: "Elliptic Curve Cryptography",
        description:
          "Public-key crypto using elliptic curves. Shorter keys than RSA",
        stages: 16,
        tags: ["public-key", "modern"],
        image: "https://nextui.org/images/card-example-4.jpeg",
      },
    ],
  },
];

export default function Visualization() {
  return (
    <MainLayout>
      {/* Categories */}
      <div className="space-y-12">
        {algorithmCategories.map((category) => (
          <div key={category.id} className="space-y-4">
            <h1 className="text-2xl font-bold mb-8 text-white">
              {category.name}
            </h1>

            {/* Algorithm Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.algorithms.map((algo) => (
                <Link
                  key={algo.id}
                  to={`/visualization/${algo.id}`}
                  className="contents"
                >
                  <Card
                    className="h-[400px] border-none bg-[#1A1D24] hover:scale-105 transition-transform"
                    isPressable
                  >
                    <div className="block h-full w-full">
                      <div className="relative w-full h-[60%]">
                        <Image
                          removeWrapper
                          alt={algo.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          src={algo.image}
                        />
                      </div>
                      <CardHeader className="flex flex-col items-start p-3 h-[40%] text-left">
                        <div className="flex flex-wrap gap-1 mb-1 justify-start">
                          {algo.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-violet-500/80 text-xs rounded-full text-white font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-base font-bold text-white">
                          {algo.name}
                        </h3>
                        <p className="text-sm text-white/80 line-clamp-2">
                          {algo.description}
                        </p>
                        <div className="text-xs text-white/60 mt-auto">
                          {algo.stages} stages
                        </div>
                      </CardHeader>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
