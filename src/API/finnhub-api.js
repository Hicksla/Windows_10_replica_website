const basepath = "https://finnhub.io/api/v1";

export const searchSymbols = async (query) => {
  const url = `${basepath}/search?q=${query}&token=ce8d9j2ad3i1ljtns8u0ce8d9j2ad3i1ljtns8ug`;
  const response = await fetch(url);
  if (!response.ok) {
    const message = `An error has occured.`;
    throw new Error(message);
  }
  return await response.json();
};

export const fetchStockDetails = async (stockSymbol) => {
  const url = `${basepath}/stock/profile2?symbol=${stockSymbol}`;
  const response = await fetch(url);
};
