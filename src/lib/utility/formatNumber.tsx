// utils/formatNumber.ts

export const formatNumber = (value: number | string): string => {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    
    return value.toLocaleString('id-ID', { maximumFractionDigits: 0 });
  };
  