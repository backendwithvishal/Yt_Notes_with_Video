import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { Skeleton } from './components/ui/skeleton';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';

const Home = lazy(() => import('./pages/Home'));
const EduNotes = lazy(() => import('./pages/EduNotes'));

function PageSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-8 max-w-7xl mx-auto w-full animate-pulse">
      <Skeleton className="h-10 w-1/3 rounded-lg" />
      <Skeleton className="h-64 w-full rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <TooltipProvider delayDuration={300}>
          {/* Full-height flex column so pages can fill remaining space */}
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar />
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/edunotes" element={<EduNotes />} />
              </Routes>
            </Suspense>
            <Footer />
            <Toaster />
          </div>
        </TooltipProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
