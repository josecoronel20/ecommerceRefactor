import { userApi } from '@/lib/api/user';
import { User } from '@/types/auth';
import useSWR from 'swr';

const useGetUser = () => {
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR<User>('user', () => userApi.getMe());

  return { user, isLoading, error, mutate };
};

export default useGetUser;
