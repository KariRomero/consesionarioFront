'use client';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchBrands } from "@/redux/slices/brandsSlice";
import { fetchTipos } from "@/redux/slices/tiposSlice";

export default function StateLoader() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchBrands());
      dispatch(fetchTipos());
    }, [dispatch]);
  
    return null;
}
