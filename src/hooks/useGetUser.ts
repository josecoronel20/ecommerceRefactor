import { authApi } from '@/lib/api/auth';
import { User } from '@/types/auth';
import useSWR from 'swr';

const useGetUser = () => {
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR<User>('user', () => authApi.getUserLogged());

  return { user, isLoading, error, mutate };
};

export default useGetUser;
