import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URLS from '@/config/api-url';
import API_HEADERS_PACKING from '@/config/api-headers';
import { normalizeRequestBody } from '../data/normalizer';
import { RequestBody } from '../data/normalizer'; // Importing the RequestBody type

// Define the expected response structure
interface PackingListResponse {
  GetPackingListRegisterResult: {
    PackingListId: string;
    PackingListName: string;
    Quantity: number;
    // Add other fields based on the API response structure
  }[];
}

// Hook to fetch packing list data
const usePackingDataDetail = () => {
  const [data, setData] = useState<PackingListResponse['GetPackingListRegisterResult']>([]); // State for storing the response data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error

  // Function to fetch data from the API
  const fetchData = async () => {
    const url = API_URLS.packingList;

    // Request body based on RequestBody interface
    const body: RequestBody = normalizeRequestBody();

    try {
      setLoading(true); // Enable loading state
      const response = await axios.post<PackingListResponse>(url, body, { headers: API_HEADERS_PACKING });
      setData(response.data.GetPackingListRegisterResult); // Store the response data
      setLoading(false); // Disable loading state
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Set error message if error is instance of Error
      } else {
        setError('Terjadi kesalahan'); // Handle unknown error
      }
      setLoading(false); // Disable loading state
    }
  };

  // Call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default usePackingDataDetail;
