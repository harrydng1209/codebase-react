import { TheLoading } from '@/components/shared/TheLoading';
import { AntConfigProvider } from '@/contexts/AntConfigProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';

import { AppRoutes } from './AppRoutes';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AntConfigProvider>
        <TheLoading />

        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AntConfigProvider>
    </QueryClientProvider>
  );
};
