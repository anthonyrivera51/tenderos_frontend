import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Category {
  tipoCategoria: string;
  nombreCategoria: string;
  descripcion: string;
}

const CategoriaList: React.FC = () => {
  const [categorias, setCategorias] = useState<Category[]>([]);

  useEffect(() => {
    const storedCategoriaJson = localStorage.getItem('categorias');
    if (storedCategoriaJson) {
      const storedCategorias: Category[] = JSON.parse(storedCategoriaJson);
      setCategorias(storedCategorias);
    }
  }, []);

  const saveCategoriasToLocalStorage = (updateCategorias: Category[]) => {
    localStorage.setItem('categorias', JSON.stringify(updateCategorias));
    console.log('categorias guardadas');
  };

  const handleDeleteCategoria = (nombreCategoria: string) => {
    const updateCategorias = categorias.filter(
      (categoria) => categoria.nombreCategoria !== nombreCategoria,
    );
    setCategorias(updateCategorias);
    saveCategoriasToLocalStorage(updateCategorias);
  };

  return (
    <div>
      <Card className="mb-8 flex flex-col">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Type
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Description
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria, index) => {
              return (
                <tr key={index} className="border-t">
                  <td className="py-3 px-6"> {categoria.tipoCategoria}</td>
                  <td className="py-3 px-6"> {categoria.nombreCategoria}</td>
                  <td className="py-3 px-6"> {categoria.descripcion}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() =>
                        handleDeleteCategoria(categoria.nombreCategoria)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default CategoriaList;
