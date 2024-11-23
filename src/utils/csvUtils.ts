import Papa from 'papaparse';

export interface CSVProduct {
  'Product Name': string;
  'HS Code': string;
  Category: string;
}

export const loadProductsFromCSV = async (): Promise<CSVProduct[]> => {
  try {
    const response = await fetch('/src/data/products.csv');
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          resolve(results.data as CSVProduct[]);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV:', error);
    return [];
  }
};