// src/pages/cars.tsx
'use client';

import Cars from "@/components/Cars/Cars"; 

export default function Page() {
  return (
    <section className="w-full h-screen flex justify-center items-center mt-[600px]"> 
      <Cars /> 
    </section>
  );
}