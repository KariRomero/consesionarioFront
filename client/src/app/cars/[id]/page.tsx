import CarsDetail from "@/components/Cars/CarsDetail";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return (
    <div className='w-full h-screen'>
      <CarsDetail id={params.id} />
    </div>
  );
}