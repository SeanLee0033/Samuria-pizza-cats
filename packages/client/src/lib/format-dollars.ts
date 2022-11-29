const toDollars = (priceCents: number): string => {
  const dollars = priceCents / 100;
  return dollars.toLocaleString('en-US', { style: 'currency', currency: 'CAD' });
};

export default toDollars;
