import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Catalog from "./pages/Catalog.tsx";
import Profile from "./pages/Profile.tsx";
import Login from "./pages/Login.tsx";
import Changelog from "./pages/Changelog.tsx";
import Donate from "./pages/Donate.tsx";
import Explore from "./pages/Explore.tsx";
import Feed from "./pages/Feed.tsx";
import Posts from "./pages/Posts.tsx";
import PostDetail from "./pages/PostDetail.tsx";
import { PageLoader } from "./components/site/PageLoader.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/animely-web">
        <PageLoader />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
