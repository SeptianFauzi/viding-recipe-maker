"use client";
import ReduxProvider from "./ReduxProvider";
import IngredientList from "./components/IngredientList";
import RecipeList from "./components/RecipeList";
export default function Home() {
  return (
    <ReduxProvider>
      <div className="flex justify-between items-center w-3/4 mx-auto my-auto h-screen gap-6">
        <IngredientList />
        <RecipeList />
      </div>
    </ReduxProvider>
  );
}
