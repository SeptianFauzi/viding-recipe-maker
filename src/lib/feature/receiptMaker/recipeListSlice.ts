import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  EButtonAction,
  EButtonPosition,
  IButtonActionPosition,
  IIngredientList,
  IRecipeIngredientList,
  IRecipeState,
} from "./recipientListSlice.interface";

const initialState: IRecipeState = {
  ingredientList: [
    {
      id: 1,
      name: "Daging",
      unit: "kg",
    },
    {
      id: 2,
      name: "Garam",
      unit: "sdm",
    },
    {
      id: 3,
      name: "Mecin",
      unit: "sdt",
    },
    {
      id: 4,
      name: "Air",
      unit: "ml",
    },
    {
      id: 5,
      name: "Telur",
      unit: "butir",
    },
    {
      id: 6,
      name: "Gula",
      unit: "sdt",
    },
    {
      id: 7,
      name: "Minyak",
      unit: "ml",
    },
    {
      id: 8,
      name: "Tepung",
      unit: "gram",
    },
    {
      id: 9,
      name: "Garam",
      unit: "sdt",
    },
    {
      id: 10,
      name: "Beras",
      unit: "gram",
    },
    {
      id: 11,
      name: "Bawang Putih",
      unit: "siung",
    },
    {
      id: 12,
      name: "Bawang Merah",
      unit: "butir",
    },
    {
      id: 13,
      name: "Lada",
      unit: "gram",
    },
    {
      id: 14,
      name: "Kecap",
      unit: "ml",
    },
    {
      id: 15,
      name: "Susu",
      unit: "ml",
    },
    {
      id: 16,
      name: "Wortel",
      unit: "buah",
    },
    {
      id: 17,
      name: "Kentang",
      unit: "gram",
    },
    {
      id: 18,
      name: "Tahu",
      unit: "gram",
    },
    {
      id: 19,
      name: "Kacang Hijau",
      unit: "gram",
    },
    {
      id: 20,
      name: "Cabe Merah",
      unit: "buah",
    },
    {
      id: 21,
      name: "Terigu",
      unit: "gram",
    },
    {
      id: 22,
      name: "Saus Tomat",
      unit: "ml",
    },
    {
      id: 23,
      name: "Lemak",
      unit: "gram",
    },
    {
      id: 24,
      name: "Santan",
      unit: "ml",
    },
    {
      id: 25,
      name: "Sereh",
      unit: "batang",
    },
    {
      id: 26,
      name: "Daun Salam",
      unit: "lembar",
    },
    {
      id: 27,
      name: "Serai",
      unit: "batang",
    },
    {
      id: 28,
      name: "Jahe",
      unit: "gram",
    },
    {
      id: 29,
      name: "Kayu Manis",
      unit: "gram",
    },
    {
      id: 30,
      name: "Mentega",
      unit: "gram",
    },
  ],
  recipeName: "",
  recipeIngredientList: [],
  recipeSteps: [],
  buttonActionPosition: {
    buttonAction: EButtonAction.ADD,
    showButton: false,
    position: EButtonPosition.INGREDIENT,
    id: 0,
  },
};

export const recipeListSlice = createSlice({
  name: "recipeList",
  initialState,
  reducers: {
    addRecipeName: (state, action) => {
      state.recipeName = action.payload;
    },
    addRecipeIngredientList: (
      state,
      action: PayloadAction<IRecipeIngredientList>
    ) => {
      state.recipeIngredientList = [
        ...state.recipeIngredientList,
        action.payload,
      ];
    },
    addIngredientList: (state, action: PayloadAction<IIngredientList>) => {
      state.ingredientList = [...state.ingredientList, action.payload].sort(
        (a, b) => a.id - b.id
      );
    },
    addRecipeSteps: (state, action: PayloadAction<string>) => {
      state.recipeSteps = [...state.recipeSteps, action.payload];
    },
    updateRecipeName: (state, action: PayloadAction<string>) => {
      state.recipeName = action.payload;
    },
    updateRecipeIngredientList: (
      state,
      action: PayloadAction<IRecipeIngredientList>
    ) => {
      const index = state.recipeIngredientList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.recipeIngredientList[index] = action.payload;
      } else {
        state.recipeIngredientList = [
          ...state.recipeIngredientList,
          action.payload,
        ];
      }
    },
    deleteIngredientList: (state, action: PayloadAction<number>) => {
      state.ingredientList = state.ingredientList.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    deleteRecipeIngredientList: (state, action: PayloadAction<number>) => {
      state.recipeIngredientList = state.recipeIngredientList.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    deleteRecipeSteps: (state, action: PayloadAction<number>) => {
      state.recipeSteps = state.recipeSteps.filter(
        (_, index) => index !== action.payload
      );
    },
    updateButtonActionPosition: (
      state,
      action: PayloadAction<IButtonActionPosition>
    ) => {
      state.buttonActionPosition = action.payload;
    },
    updateRecipeSteps: (state, action: PayloadAction<string>) => {
      state.recipeSteps[state.buttonActionPosition.id] = action.payload;
    },
  },
});

export const {
  addRecipeName,
  addRecipeSteps,
  addRecipeIngredientList,
  addIngredientList,
  updateRecipeName,
  deleteIngredientList,
  deleteRecipeIngredientList,
  updateRecipeIngredientList,
  updateButtonActionPosition,
  deleteRecipeSteps,
  updateRecipeSteps,
} = recipeListSlice.actions;

export default recipeListSlice.reducer;
