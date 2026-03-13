import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { OrderProvider } from "@/contexts/OrderContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import AdminLayout from "@/components/layout/AdminLayout";
import Index from "@/pages/Index";
import Catalogue from "@/pages/Catalogue";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Drops from "@/pages/Drops";
import OrderTracking from "@/pages/OrderTracking";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <Routes>
                {/* Client Pages */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/catalogue" element={<Catalogue />} />
                  <Route path="/produit/:id" element={<ProductDetail />} />
                  <Route path="/panier" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/drops" element={<Drops />} />
                  <Route path="/commandes" element={<OrderTracking />} />
                </Route>

                {/* Login Page */}
                <Route path="/login" element={<Login />} />

                {/* Admin Pages (Protected) */}
                <Route element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route path="/admin" element={<Admin />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
