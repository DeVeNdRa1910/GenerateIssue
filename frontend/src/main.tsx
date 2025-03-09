import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';
import { Toaster } from "./components/ui/sonner"
import { store } from './store/store.ts'
import { Provider } from 'react-redux'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </QueryClientProvider>,
)
