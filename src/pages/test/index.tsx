import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestPage = () => {
  return (
    <div className="p-8 surface-page min-h-screen">
      <h1 className="t-kpi text-main mb-4">Component Lab</h1>

      <section className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
      </section>
    </div>
  );
};

export default TestPage;
