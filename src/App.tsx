import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageLoader } from "./components/site/PageLoader.tsx";

const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Catalog = lazy(() => import("./pages/Catalog.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Changelog = lazy(() => import("./pages/Changelog.tsx"));
const Donate = lazy(() => import("./pages/Donate.tsx"));
const Explore = lazy(() => import("./pages/Explore.tsx"));
const Feed = lazy(() => import("./pages/Feed.tsx"));
const Posts = lazy(() => import("./pages/Posts.tsx"));
const PostDetail = lazy(() => import("./pages/PostDetail.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageLoader />
        <Suspense fallback={<PageLoader show />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/intro" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:slug" element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
