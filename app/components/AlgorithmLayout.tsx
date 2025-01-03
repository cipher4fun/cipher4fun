import MainLayout from "./MainLayout";

interface AlgorithmLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AlgorithmLayout({
  title,
  description,
  children,
}: AlgorithmLayoutProps) {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-white/80 mt-2">{description}</p>
        </div>
        {children}
      </div>
    </MainLayout>
  );
}
