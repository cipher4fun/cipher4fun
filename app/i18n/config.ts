import i18n, { use } from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        visualization: "Visualization",
        course: "Course",
      },
      categories: {
        symmetric: {
          title: "Symmetric Cryptography",
          des: {
            name: "Data Encryption Standard",
            description:
              "56-bit key Feistel network block cipher. Historic NIST standard from 1977.",
            tags: {
              block: "block-cipher",
              legacy: "legacy",
            },
            feistel: {
              title: "Feistel Network Structure",
              description:
                "The Feistel Network is the core structure of DES. Enter values to see how data flows through the network.",
            },
            sbox: {
              title: "S-Box Generation",
              description: "Coming soon...",
            },
          },
        },
        digest: {
          title: "Digest Algorithms",
          sha: {
            name: "Secure Hash Algorithms",
            description:
              "SHA-1/SHA-2/SHA-3 family. Produces fixed-size message digests",
            tags: {
              digest: "digest",
              standard: "standard",
            },
            input: {
              label: "Message to Hash",
              placeholder: "Enter message...",
              calculate: "Calculate Hash",
              result: "Hash Result:",
              steps: "Hashing Steps",
              steps_desc: "Step-by-step visualization coming soon...",
              intro:
                "Secure Hash Algorithms (SHA) is a family of cryptographic hash functions designed to provide fixed-size message digests with collision resistance.",
            },
          },
          md5: {
            name: "MD5",
            description:
              "128-bit hash function. Broken but historically significant",
            tags: {
              digest: "digest",
              deprecated: "deprecated",
            },
          },
        },
        asymmetric: {
          title: "Asymmetric Cryptography",
          rsa: {
            name: "RSA Algorithm",
            description:
              "Public-key crypto based on factoring. Used for encryption & signatures",
            tags: {
              public: "public-key",
              pki: "PKI",
            },
            intro:
              "RSA (Rivest-Shamir-Adleman) is one of the first public-key cryptosystems and is widely used for secure data transmission. The encryption key is public and distinct from the decryption key which is kept secret (private).",
            security:
              "The security of RSA relies on the practical difficulty of factoring the product of two large prime numbers.",
          },
          ecc: {
            name: "Elliptic Curve Cryptography",
            description:
              "Public-key crypto using elliptic curves. Shorter keys than RSA",
            tags: {
              public: "public-key",
              modern: "modern",
            },
          },
        },
      },
    },
  },
  zh: {
    translation: {
      nav: {
        visualization: "可视化",
        course: "课程",
      },
      categories: {
        symmetric: {
          title: "对称密码",
          des: {
            name: "数据加密标准",
            description: "56位密钥Feistel网络分组密码。1977年NIST历史标准。",
            tags: {
              block: "分组密码",
              legacy: "历史",
            },
            feistel: {
              title: "Feistel网络结构",
              description:
                "Feistel网络是DES的核心结构。输入值以查看数据如何在网络中流动。",
            },
            sbox: {
              title: "S-盒生成",
              description: "即将推出...",
            },
          },
        },
        digest: {
          title: "摘要算法",
          sha: {
            name: "安全散列算法",
            description: "SHA-1/SHA-2/SHA-3系列。生成固定长度的消息摘要",
            tags: {
              digest: "摘要",
              standard: "标准",
            },
            input: {
              label: "待哈希消息",
              placeholder: "输入消息...",
              calculate: "计算哈希",
              result: "哈希结果：",
              steps: "哈希步骤",
              steps_desc: "分步骤可视化即将推出...",
              intro:
                "安全散列算法(Secure Hash Algorithms) 是密码散列函数中的一族，用于生成具有抗碰撞性质且长度固定的消息摘要。",
            },
          },
          md5: {
            name: "MD5",
            description: "128位散列函数。已被破解但具有历史意义",
            tags: {
              digest: "摘要",
              deprecated: "废弃",
            },
          },
        },
        asymmetric: {
          title: "非对称密码",
          rsa: {
            name: "RSA算法",
            description: "基于大数分解的公钥密码。用于加密和签名",
            tags: {
              public: "公钥",
              pki: "PKI",
            },
            intro:
              "RSA (Rivest-Shamir-Adleman) 是第一个公钥密码系统，广泛用于安全数据传输。加密密钥是公共的，与保持秘密的解密密钥不同。",
            security: "RSA的安全性依赖于大数分解的实际难度。",
          },
          ecc: {
            name: "椭圆曲线密码",
            description: "基于椭圆曲线的公钥密码。比RSA使用更短的密钥",
            tags: {
              public: "公钥",
              modern: "现代",
            },
          },
        },
      },
    },
  },
};

const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("preferred_language") || "en";
  }
  return "en";
};

if (typeof window !== "undefined") {
  use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
