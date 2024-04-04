import useSWR from 'swr';

const fetcher = (...args) => fetch(...args, {
  credentials:'include'
}).then(res => res.json())

export function getData() {
  const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_API_BASE_URL}/api/movie/fetchData`, fetcher, {
    refreshInterval: 900000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  return {
    data: data,
    isLoading,
    isError: error
  }
}

export function getDataLayout () {
  const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_API_BASE_URL}/api/movie/fetchDataLayout`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  return {
    data: data,
    isLoading,
    isError: error
  }
}

export function getAllUser() {
  const { data ,isLoading } = useSWR(`${import.meta.env.VITE_API_BASE_URL}/api/users/getAllUser`, fetcher)
  
  return {
    data: data,
    isLoading
  }
}