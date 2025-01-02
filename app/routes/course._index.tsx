import type { MetaFunction } from "@remix-run/node";
import { Card, CardHeader, Image } from "@nextui-org/react";
import MainLayout from "~/components/MainLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "Crypto Courses" },
    { name: "description", content: "Cryptography Courses" },
  ];
};

const courses = [
  {
    id: "evm-from-scratch",
    name: "EVM From Scratch",
    description:
      "Learn how the Ethereum Virtual Machine works by building one from scratch",
    lessons: 10,
    tags: ["beginner", "ethereum"],
    image: "https://nextui.org/images/card-example-4.jpeg",
  },
];

export default function Courses() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-8 text-white">
        Cryptography Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="h-[400px] border-none bg-[#1A1D24]"
            isPressable
          >
            <div className="block h-full w-full">
              <div className="relative w-full h-[60%]">
                <Image
                  removeWrapper
                  alt={course.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={course.image}
                />
              </div>
              <CardHeader className="flex flex-col items-start p-3 h-[40%] text-left">
                <div className="flex flex-wrap gap-1 mb-1 justify-start">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-violet-500/80 text-xs rounded-full text-white font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold text-white">
                  {course.name}
                </h3>
                <p className="text-sm text-white/80 line-clamp-2">
                  {course.description}
                </p>
                <div className="text-xs text-white/60 mt-auto">
                  {course.lessons} Lessons
                </div>
              </CardHeader>
            </div>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
