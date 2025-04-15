import CarsDetail from "@/components/Cars/CarsDetail";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <CarsDetail id={params.id} />
    </div>
  );
}