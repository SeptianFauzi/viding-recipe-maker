"use client";
import React, { useRef } from "react";
import {
  addIngredientList,
  addRecipeSteps,
  deleteRecipeIngredientList,
  deleteRecipeSteps,
  updateButtonActionPosition,
  updateRecipeIngredientList,
  updateRecipeName,
  updateRecipeSteps,
} from "@/lib/feature/receiptMaker/recipeListSlice";
import {
  EButtonAction,
  EButtonPosition,
  IButtonActionPosition,
  IIngredientList,
  IRecipeIngredientList,
} from "@/lib/feature/receiptMaker/recipientListSlice.interface";
import { useAppDispatch, useAppSelector } from "@/lib/store";

function RecipeList() {
  const { recipeIngredientList, recipeSteps, buttonActionPosition } =
    useAppSelector((state) => state.recipeList);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdateRecipeIngredientList = (
    RecipeIngredientListData: IRecipeIngredientList
  ) => {
    dispatch(updateRecipeIngredientList(RecipeIngredientListData));
  };

  const handleAddIngredientList = (
    RecipeIngredientListData: IIngredientList
  ) => {
    dispatch(addIngredientList(RecipeIngredientListData));
  };

  const handleAddRecipeSteps = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      e.currentTarget.value &&
      buttonActionPosition.buttonAction === EButtonAction.UPDATE &&
      buttonActionPosition.position === EButtonPosition.STEPS
    ) {
      dispatch(updateRecipeSteps(e.currentTarget.value));
      e.currentTarget.value = "";
    } else if (e.key === "Enter" && e.currentTarget.value) {
      dispatch(addRecipeSteps(e.currentTarget.value));
      e.currentTarget.value = "";
    }
  };

  const handleDeleteRecipeIngredientList = (id: number) => {
    dispatch(deleteRecipeIngredientList(id));
  };
  const handleUpdateRecipeName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(updateRecipeName(e.currentTarget.value));
    }
  };

  const handleUpdateButtonActionPosition = (data: IButtonActionPosition) => {
    dispatch(
      updateButtonActionPosition({
        ...data,
      })
    );
  };

  const handleResetButtonActionPosition = () => {
    dispatch(
      updateButtonActionPosition({
        showButton: false,
        buttonAction: EButtonAction.ADD,
        position: EButtonPosition.INGREDIENT,
        id: 0,
      })
    );
  };

  const handleDeleteRecipeSteps = (id: number) => {
    dispatch(deleteRecipeSteps(id));
  };
  const handleupdateRecipeSteps = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      buttonActionPosition.buttonAction === EButtonAction.UPDATE &&
      buttonActionPosition.position === EButtonPosition.STEPS &&
      e.currentTarget.value
    ) {
      dispatch(updateRecipeSteps(e.currentTarget.value));
      e.currentTarget.value = "";
      handleResetButtonActionPosition();
    }
  };

  return (
    <div className="flex flex-col border rounded-lg border-amber-500 p-4 h-3/4 w-full gap-3 overflow-auto">
      <input
        type="text"
        className="w-full text-center border-amber-500 p-2 border rounded-md focus-visible:outline-amber-700"
        placeholder="Nama Resep"
        onKeyDown={(e) => handleUpdateRecipeName(e)}
      />
      <div className="flex flex-col gap-2">
        <p>Bahan:</p>
        <div>
          <div className="flex flex-col w-full gap-2">
            {recipeIngredientList.length > 0 &&
              recipeIngredientList.map((ingredient) => {
                return (
                  <div
                    key={ingredient.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 w-1/4">
                      {ingredient.showInputAmount ? (
                        <input
                          type="number"
                          inputMode="numeric"
                          defaultValue={ingredient.amount}
                          className="text-center w-14 border-amber-500 p-1 border rounded-md focus-visible:outline-amber-700"
                          onBlur={(e) => {
                            if (
                              buttonActionPosition.buttonAction ===
                                EButtonAction.UPDATE &&
                              buttonActionPosition.position ===
                                EButtonPosition.INGREDIENT
                            ) {
                              handleUpdateRecipeIngredientList({
                                ...ingredient,
                                amount: Number(e.currentTarget.value),
                                showInputAmount: false,
                              });
                            }
                            handleResetButtonActionPosition();
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUpdateRecipeIngredientList({
                                id: ingredient.id,
                                name: ingredient.name,
                                unit: ingredient.unit,
                                amount: Number(e.currentTarget.value),
                                showInputAmount: false,
                              });
                            }
                          }}
                        />
                      ) : (
                        <p>{ingredient.amount}</p>
                      )}
                      <p>{ingredient.unit}</p>
                    </div>
                    <div className="w-auto">
                      <p
                        className="text-center cursor-pointer"
                        onClick={() => {
                          if (
                            !ingredient.showInputAmount &&
                            !recipeIngredientList.some((i) => i.showInputAmount)
                          ) {
                            handleUpdateButtonActionPosition({
                              ...buttonActionPosition,
                              id: ingredient.id,
                              position: EButtonPosition.INGREDIENT,
                              showButton: true,
                            });
                            if (inputRef.current) {
                              inputRef.current.value = "";
                            }
                          }
                        }}
                      >
                        {ingredient.name}
                      </p>
                    </div>
                    <div className="w-1/4">
                      {buttonActionPosition.id === ingredient.id &&
                        buttonActionPosition.position ===
                          EButtonPosition.INGREDIENT &&
                        buttonActionPosition.showButton && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                handleUpdateRecipeIngredientList({
                                  ...ingredient,
                                  showInputAmount: true,
                                });
                                handleUpdateButtonActionPosition({
                                  ...buttonActionPosition,
                                  id: ingredient.id,
                                  showButton: false,
                                  buttonAction: EButtonAction.UPDATE,
                                });
                              }}
                              className=" border-amber-500  bg-amber-500 p-1 border rounded-md text-white text-xs"
                            >
                              Ubah
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteRecipeIngredientList(ingredient.id);
                                handleAddIngredientList({
                                  id: ingredient.id,
                                  name: ingredient.name,
                                  unit: ingredient.unit,
                                });
                                handleResetButtonActionPosition();
                              }}
                              className=" border-red-700 bg-red-700 p-1 border rounded-md text-white text-xs"
                            >
                              Hapus
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <p>Tata Cara: </p>
        <div className="flex flex-col w-full gap-2">
          {recipeSteps.length > 0 &&
            recipeSteps.map((step, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 w-full justify-between"
                >
                  <p
                    key={index}
                    className="hover:cursor-pointer"
                    onClick={() => {
                      handleUpdateButtonActionPosition({
                        ...buttonActionPosition,
                        id: index,
                        position: EButtonPosition.STEPS,
                        showButton: true,
                      });
                    }}
                  >
                    {index + 1}. {step}
                  </p>
                  {buttonActionPosition.id === index &&
                    buttonActionPosition.position === EButtonPosition.STEPS &&
                    buttonActionPosition.showButton && (
                      <div className="flex gap-2">
                        <button
                          className=" border-amber-500  bg-amber-500 p-2 border rounded-md text-white text-xs"
                          onClick={() => {
                            if (inputRef.current) {
                              inputRef.current.value = recipeSteps[index];
                            }
                            handleUpdateButtonActionPosition({
                              ...buttonActionPosition,
                              id: index,
                              showButton: false,
                              buttonAction: EButtonAction.UPDATE,
                              position: EButtonPosition.STEPS,
                            });
                          }}
                        >
                          Ubah
                        </button>
                        <button
                          className=" border-red-700 bg-red-700 p-1 border rounded-md text-white text-xs"
                          onClick={() => {
                            handleDeleteRecipeSteps(index);
                            handleResetButtonActionPosition();
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                </div>
              );
            })}
          <input
            type="text"
            ref={inputRef}
            className="w-full border-amber-500 p-2 border rounded-md focus-visible:outline-amber-700"
            placeholder="Masukan Tata Cara"
            onKeyDown={(e) => handleAddRecipeSteps(e)}
            onBlur={(e) => handleupdateRecipeSteps(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeList;
