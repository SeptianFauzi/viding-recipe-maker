export interface IIngredientList {
  id: number;
  name: string;
  unit: string;
}

export interface IRecipeIngredientList {
  id: number;
  name: string;
  unit: string;
  amount: number;
  showInputAmount: boolean;
}

export interface IButtonActionPosition {
  showButton: boolean;
  buttonAction: EButtonAction;
  position: EButtonPosition;
  id: number;
}

export enum EButtonAction {
  ADD = "add",
  DELETE = "delete",
  UPDATE = "update",
}

export enum EButtonPosition {
  INGREDIENT = "ingredient",
  STEPS = "steps",
}
export interface IRecipeState {
  ingredientList: IIngredientList[];
  recipeName: string;
  recipeIngredientList: IRecipeIngredientList[];
  recipeSteps: string[];
  buttonActionPosition: IButtonActionPosition;
}
