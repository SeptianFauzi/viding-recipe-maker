"use client";
import {
  addRecipeIngredientList,
  deleteIngredientList,
} from "@/lib/feature/receiptMaker/recipeListSlice";
import { IRecipeIngredientList } from "@/lib/feature/receiptMaker/recipientListSlice.interface";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import React from "react";

function IngredientList() {
  const { ingredientList } = useAppSelector((state) => state.recipeList);
  const dispatch = useAppDispatch();
  const handleAddRecipeIngredientList = (
    RecipeIngredientListData: IRecipeIngredientList
  ) => {
    dispatch(addRecipeIngredientList(RecipeIngredientListData));
  };

  const handleDeleteIngredient = (id: number) => {
    dispatch(deleteIngredientList(id));
  };
  return (
    <div className="border rounded-lg border-amber-500 h-3/4 p-4 w-full overflow-auto">
      <div className="text-center">
        <h1 className="text-xl">Ingredient List</h1>
        <div className="text-md">
          {ingredientList.length > 0 &&
            ingredientList.map((ingredient) => {
              return (
                <p
                  className="hover:cursor-pointer"
                  onClick={() => {
                    handleAddRecipeIngredientList({
                      id: ingredient.id,
                      name: ingredient.name,
                      unit: ingredient.unit,
                      amount: 0,
                      showInputAmount: true,
                    });
                    handleDeleteIngredient(ingredient.id);
                  }}
                  key={ingredient.id}
                >
                  {ingredient.name}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default IngredientList;
