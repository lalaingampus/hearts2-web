// utils/formatDate.ts

export const formatDateID = (date: string | Date) => {
    // Pastikan date adalah objek Date, jika berupa string, ubah menjadi Date
    const dateObj = new Date(date);
    
    // Format ke format Indonesia
    return dateObj.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  