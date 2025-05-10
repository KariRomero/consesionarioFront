import Link from "next/link";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import DisplayBrandsTipos from "./DisplayBrandsTipos";

type Props = {
  elementType: 'tipo' | 'brand';
  title: string;
  subtitle: string;
  selector: (state: RootState) => any[];
  fetchFunction: () => any;
  linkHref?: string;
};

const CategoriasSection: React.FC<Props> = ({
  elementType,
  title,
  subtitle,
  selector,
  fetchFunction,
  linkHref = '/cars',
}) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFunction());
  }, [dispatch, fetchFunction]);

  const elementos = useSelector(selector);

  return (
    <section className="w-full">
      <Link href={linkHref}>
        <h1 className="text-center text-3xl font-semibold pb-4 text-primary">{title}</h1>
        <p className="text-center text-lg font-medium pb-8">{subtitle}</p>
      </Link>
      <DisplayBrandsTipos element={elementos} />
    </section>
  );
};

export default CategoriasSection;
