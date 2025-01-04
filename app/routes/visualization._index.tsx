import type { MetaFunction } from "@remix-run/node";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import MainLayout from "~/components/MainLayout";
import { Link } from "@remix-run/react";
import { useTranslation } from '~/hooks/useTranslation';
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Crypto Visualization" },
    { name: "description", content: "Cryptography Algorithm Visualization" },
  ];
};

export default function Visualization() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const algorithmCategories = [
    {
      id: "symmetric",
      name: mounted
        ? t("categories.symmetric.title")
        : "Symmetric Cryptography",
      algorithms: [
        {
          id: "des",
          name: mounted
            ? t("categories.symmetric.des.name")
            : "Data Encryption Standard",
          description: mounted
            ? t("categories.symmetric.des.description")
            : "56-bit key Feistel network block cipher. Historic NIST standard from 1977.",
          stages: 1,
          tags: mounted
            ? [
                t("categories.symmetric.des.tags.block"),
                t("categories.symmetric.des.tags.legacy"),
              ]
            : ["block-cipher", "legacy"],
          image: "https://nextui.org/images/card-example-4.jpeg",
        },
      ],
    },
    {
      id: "digest",
      name: mounted ? t("categories.digest.title") : "Digest Algorithms",
      algorithms: [
        {
          id: "sha",
          name: mounted
            ? t("categories.digest.sha.name")
            : "Secure Hash Algorithms",
          description: mounted
            ? t("categories.digest.sha.description")
            : "SHA-1/SHA-2/SHA-3 family. Produces fixed-size message digests",
          stages: 5,
          tags: mounted
            ? [
                t("categories.digest.sha.tags.digest"),
                t("categories.digest.sha.tags.standard"),
              ]
            : ["digest", "standard"],
          image: "https://nextui.org/images/card-example-4.jpeg",
        },
        // {
        //   id: "md5",
        //   name: mounted ? t("categories.digest.md5.name") : "MD5",
        //   description: mounted
        //     ? t("categories.digest.md5.description")
        //     : "128-bit hash function. Broken but historically significant",
        //   stages: 8,
        //   tags: mounted
        //     ? [
        //         t("categories.digest.md5.tags.digest"),
        //         t("categories.digest.md5.tags.deprecated"),
        //       ]
        //     : ["digest", "deprecated"],
        //   image: "https://nextui.org/images/card-example-4.jpeg",
        // },
      ],
    },
    {
      id: "asymmetric",
      name: mounted
        ? t("categories.asymmetric.title")
        : "Asymmetric Cryptography",
      algorithms: [
        {
          id: "rsa",
          name: mounted ? t("categories.asymmetric.rsa.name") : "RSA Algorithm",
          description: mounted
            ? t("categories.asymmetric.rsa.description")
            : "Public-key crypto based on factoring. Used for encryption & signatures",
          stages: 5,
          tags: mounted
            ? [
                t("categories.asymmetric.rsa.tags.public"),
                t("categories.asymmetric.rsa.tags.pki"),
              ]
            : ["public-key", "PKI"],
          image: "https://nextui.org/images/card-example-4.jpeg",
        },
        {
          id: "ecc",
          name: mounted
            ? t("categories.asymmetric.ecc.name")
            : "Elliptic Curve Cryptography",
          description: mounted
            ? t("categories.asymmetric.ecc.description")
            : "Public-key crypto using elliptic curves. Shorter keys than RSA",
          stages: 4,
          tags: mounted
            ? [
                t("categories.asymmetric.ecc.tags.public"),
                t("categories.asymmetric.ecc.tags.modern"),
              ]
            : ["public-key", "modern"],
          image: "https://nextui.org/images/card-example-4.jpeg",
        },
      ],
    },
  ];

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
                    className="border-none bg-[#1A1D24] hover:scale-105 transition-transform"
                    isPressable
                  >
                    <CardHeader className="px-5 pt-5 pb-0">
                      <h3 className="text-xl font-bold text-white">
                        {algo.name}
                      </h3>
                    </CardHeader>

                    <CardBody className="px-5 py-3">
                      <p className="text-sm text-white/70 line-clamp-3">
                        {algo.description}
                      </p>
                    </CardBody>

                    <CardFooter className="px-5 pt-1 flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {algo.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-violet-500/20 border border-violet-500/30 text-xs rounded-full text-violet-400 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center text-xs text-white/60 ml-4">
                        {algo.stages} stages
                      </div>
                    </CardFooter>
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
