import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { LandingPage } from '@/pages/LandingPage'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Overview } from '@/pages/dashboard/Overview'
import { AgentBuilder } from '@/pages/dashboard/AgentBuilder'
import { KnowledgeBase } from '@/pages/dashboard/KnowledgeBase'
import { ToolShop } from '@/pages/dashboard/ToolShop'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/overview" replace />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "builder",
        element: <AgentBuilder />,
      },
      {
        path: "workers",
        element: <div className="p-8">Workers integration coming in Phase 3</div>,
      },
      {
        path: "knowledge",
        element: <KnowledgeBase />,
      },
      {
        path: "tools",
        element: <ToolShop />,
      },
      {
        path: "data",
        element: <div className="p-8">Data Pipelines View (Coming Soon)</div>,
      },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)