import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { SplashScreen } from "./components/SplashScreen";
import { CategoryScreen } from "./components/CategoryScreen";
import { RecipeListScreen } from "./components/RecipeListScreen";
import { RecipeDetail } from "./components/RecipeDetail";
import { ChecklistScreen } from "./components/ChecklistScreen";
import { CompletionScreen } from "./components/CompletionScreen";
import { FavoritScreen } from "./components/FavoritScreen";
import { ProfilScreen } from "./components/ProfilScreen";
import { KitchenToolsListScreen } from "./components/KitchenToolsListScreen";
import { KitchenToolsScreen } from "./components/KitchenToolsScreen";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/kategori" element={<CategoryScreen />} />
          <Route path="/kategori/:categoryId" element={<RecipeListScreen />} />
          <Route path="/resep/:recipeId" element={<RecipeDetail />} />
          <Route path="/checklist/:recipeId" element={<ChecklistScreen />} />
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
