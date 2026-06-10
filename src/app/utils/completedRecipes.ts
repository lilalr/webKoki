// Utility functions for managing completed recipes

export function getCompletedRecipes(): string[] {
  try {
    const completed = localStorage.getItem("completed-recipes");
    return completed ? JSON.parse(completed) : [];
  } catch (error) {
    console.error("Error loading completed recipes:", error);
    return [];
  }
}

export function addCompletedRecipe(recipeId: string): void {
  try {
    const completed = getCompletedRecipes();
    if (!completed.includes(recipeId)) {
      completed.push(recipeId);
      localStorage.setItem("completed-recipes", JSON.stringify(completed));
      // Dispatch event for real-time updates
      window.dispatchEvent(new Event("recipes-completed"));
    }
  } catch (error) {
    console.error("Error adding completed recipe:", error);
  }
}

export function isRecipeCompleted(recipeId: string): boolean {
  const completed = getCompletedRecipes();
  return completed.includes(recipeId);
}

// This function is not used anymore, stats are calculated in ProfilScreen
// Keeping it for potential future use
export function isRecipeCompletedInCategory(recipeId: string, category: string): boolean {
  return isRecipeCompleted(recipeId);
}

export function getChefLevel(completedCount: number): { name: string; emoji: string } {
  if (completedCount <= 1) {
    return { name: "Chef Magang", emoji: "🥚" };
  } else if (completedCount <= 4) {
    return { name: "Chef Pemula", emoji: "🌱" };
  } else if (completedCount <= 8) {
    return { name: "Chef Terampil", emoji: "🍳" };
  } else if (completedCount <= 13) {
    return { name: "Chef Profesional", emoji: "👨‍🍳" };
  } else {
    return { name: "Master Chef", emoji: "👑" };
  }
}

