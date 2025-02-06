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

  // Replace with dynamic values (could come from state or props)
  const packListDocNo = 'SPPC/H/01/25/00005'; // Example, should be passed dynamically
  const companyCode = '102041000'; // Example, should be passed dynamically
  const dealerRepCode = '01030'; // Example, should be passed dynamically

  // Function to fetch data from the API
  const fetchData = async () => {
    if (!packListDocNo || !companyCode || !dealerRepCode) {
      setError('Missing required parameters');
      setLoading(false);
      return;
    }

    const url = API_URLS.packingList;

    // Request body with dynamic values
    const body: RequestBody = normalizeRequestBody(packListDocNo, companyCode, dealerRepCode);

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
  }, []); // Empty dependency array means this runs only once when the component mounts

  return { data, loading, error };
};

export default usePackingDataDetail;
