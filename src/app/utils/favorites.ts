// Utility functions for managing favorite recipes

export function getFavorites(): string[] {
  try {
    const favorites = localStorage.getItem("favorite-recipes");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
}

export function addFavorite(recipeId: string): void {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(recipeId)) {
      favorites.push(recipeId);
      localStorage.setItem("favorite-recipes", JSON.stringify(favorites));
      // Dispatch event for real-time updates
      window.dispatchEvent(new Event("favorites-updated"));
    }
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
}

export function removeFavorite(recipeId: string): void {
  try {
    const favorites = getFavorites();
    const updated = favorites.filter((id) => id !== recipeId);
    localStorage.setItem("favorite-recipes", JSON.stringify(updated));
    // Dispatch event for real-time updates
    window.dispatchEvent(new Event("favorites-updated"));
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
}

export function isFavorite(recipeId: string): boolean {
  const favorites = getFavorites();
  return favorites.includes(recipeId);
}
