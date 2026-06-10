import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { SplashScreen } from "./components/SplashScreen";
import { CategoryScreen } from "./components/CategoryScreen";
import { RecipeListScreen } from "./components/RecipeListScreen";
import { RecipeDetail } from "./components/RecipeDetail";
import { CookingScreen } from "./components/CookingScreen";
import { CompletionScreen } from "./components/CompletionScreen";
import { FavoritScreen } from "./components/FavoritScreen";
import { ProfilScreen } from "./components/ProfilScreen";
import { KitchenToolsListScreen } from "./components/KitchenToolsListScreen";
import { KitchenToolsScreen } from "./components/KitchenToolsScreen";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/kategori" element={<CategoryScreen />} />
          <Route path="/kategori/:categoryId" element={<RecipeListScreen />} />
          <Route path="/resep/:recipeId" element={<RecipeDetail />} />
          <Route path="/masak/:recipeId" element={<CookingScreen />} />
          <Route path="/selesai" element={<CompletionScreen />} />
          <Route path="/favorit" element={<FavoritScreen />} />
          <Route path="/profil" element={<ProfilScreen />} />
          <Route path="/alat-dapur" element={<KitchenToolsListScreen />} />
          <Route path="/alat/:toolId" element={<KitchenToolsScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
