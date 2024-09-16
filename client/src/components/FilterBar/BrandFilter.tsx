"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/slices/brandsSlice';
import { RootState, AppDispatch } from '../../redux/store'; 

interface BrandFilterProps {
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({ selectedBrand, onBrandChange }) => {
  const dispatch = useDispatch<AppDispatch>(); 
  const { brands, loading, error } = useSelector((state: RootState) => state.brands);  

  useEffect(() => {
    dispatch(fetchBrands());  
  }, [dispatch]);

  if (loading) return <p>Loading brands...</p>;
  if (error) return <p>Error loading brands: {error}</p>;

  return (
    <select
      value={selectedBrand}
      onChange={(e) => onBrandChange(e.target.value)}
      className="border border-gray-300 rounded p-2 mb-4 w-full"
    >
      <option value="">Selecciona Marca</option>
      {brands.map((brand) => (
        <option key={brand} value={brand}>
          {brand}
        </option>
      ))}
    </select>
  );
};

export default BrandFilter;