import useSWR from "swr";
import Cookies from "js-cookie";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";

interface UserInfo {
  userInfo: User | null;
  isLoading: boolean;
  isError: boolean;
  mutate: (data: User, shouldRevalidate?: boolean) => void;
}

export const fetcher = (url: string) => {
  const token = Cookies.get("token");
  if (!token) {
    return Promise.reject(new Error("No token found"));
  }

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const productFetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.products) {
      throw new Error('Invalid data format');
    }
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [] };
  }
};

const useUserInfo = (): UserInfo => {
  const token = Cookies.get("token");

  const {
    data: id,
    isLoading: isLoadingId,
    error: errorId,
  } = useSWR(token ? "/api/auth/me" : null, fetcher);

  const { data, isLoading, error, mutate } = useSWR(
    id ? `/api/auth/users/${id}` : null,
    fetcher
  );

  return {
    userInfo: data as User,
    isLoading: isLoading,
    isError: error,
    mutate: mutate as (data: User, shouldRevalidate?: boolean) => void,
  };
};

export default useUserInfo;
