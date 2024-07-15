import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { update } from 'lodash';

interface Impuesto {
  nameImpuesto: string;
  valor: number;
}

const TaxList: React.FC = () => {
  const [taxes, setTaxes] = useState<Impuesto[]>([]);

  useEffect(() => {
    const storedTaxesJson = localStorage.getItem('taxes');
    if (storedTaxesJson) {
      const storedTaxes: Impuesto[] = JSON.parse(storedTaxesJson);
      setTaxes(storedTaxes);
      console.log('Impuestos cargados', storedTaxes);
    }
  }, []);

  const saveTaxesToLocalStorage = (updateTaxes: Impuesto[]) => {
    localStorage.setItem('taxes', JSON.stringify(updateTaxes));
    console.log('impuestos guardados');
  };

  const handleDeleteTaxes = (nameImpuesto: string) => {
    const updatedTax = taxes.filter((tax) => tax.nameImpuesto !== nameImpuesto);
    setTaxes(updatedTax);
    saveTaxesToLocalStorage(updatedTax);
  };

  return (
    <div>
      <Card className="mb-8 flex flex-col">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Valor
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((tax, index) => {
              return (
                <tr key={index} className="border-t">
                  <td className="py-3 px-6">{tax.nameImpuesto}</td>
                  <td className="py-3 px-3">{tax.valor}</td>
                  <td className="py-3 px-3">
                    {' '}
                    <button
                      onClick={() => handleDeleteTaxes(tax.nameImpuesto)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    > Eliminar</button>
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

export default TaxList;
