
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Image from "next/image";
import MyApp from './pages/myapp'

const queryClient = new QueryClient();

export default function Home({ Component, pageProps }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       Hi VIKASH 😄
      <MyApp />
    </main>
  );
}
