import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URLS from '@/config/api-url';
import API_HEADERS_PACKING from '@/config/api-headers';
import USER_INFO_PACKING from '@/config/api-userInfo';
import { normalizeRequestBody } from '../data/normalizer';

// Hook untuk mengambil data packing list
const usePackingDataDetail = () => {
  const [data, setData] = useState<any[]>([]); // State untuk menyimpan data response
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk error

  // Fungsi untuk melakukan fetch data
  const fetchData = async () => {
    const url = API_URLS.packingList; 

    // Body data sesuai spesifikasi
    const body = normalizeRequestBody();

   

    try {
      setLoading(true); // Aktifkan loading
      const response = await axios.post(url, body, { headers: API_HEADERS_PACKING });
      setData(response.data.GetPackingListRegisterResult); // Simpan data response
      setLoading(false); // Matikan loading
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan'); // Tangani error
      setLoading(false); // Matikan loading
    }
  };

  // Panggil fetchData saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default usePackingDataDetail;
