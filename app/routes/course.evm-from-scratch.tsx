import type { MetaFunction } from "@remix-run/node";
import AlgorithmLayout from "~/components/AlgorithmLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "EVM From Scratch" },
    {
      name: "description",
      content:
        "Learn how the Ethereum Virtual Machine works by building one from scratch",
    },
  ];
};

export default function EVMFromScratch() {
  return (
    <AlgorithmLayout
      title="EVM From Scratch"
      description="Learn how the Ethereum Virtual Machine works by building one from scratch"
    >
      <div className="text-white">
        {/* Course content will go here */}
        <div className="space-y-6">
          {/* coming soon */}
          <p>Coming soon...</p>
        </div>
      </div>
    </AlgorithmLayout>
  );
}
