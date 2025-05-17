// // import React, { useEffect, useState } from "react";
// // import { adminCategoryStore } from "../../store/AdminStore/adminCategoryStore.js";
// // import { userCategoryStore } from "../../store/UserStore/userCategoryStore.js";
// // import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
// // import { userStore } from "../../store/UserStore/userAuthStore";
// // const CategoryManagement = () => {
// //   const { currentUser } = userStore();
// //   const userId = currentUser?._id;
// //   const { fetchActiveCategories } = adminCategoryStore();
// //   const { fetchUserCategories, updateUserCategories } = userCategoryStore();

// //   const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);
// //   const [activeCategories, setActiveCategories] = useState([]);
// //   const [userCategories, setUserCategories] = useState([]);
// //   const [isSelecting, setIsSelecting] = useState(false);

// //   // Fetch active categories
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       const fetchedCategories = await fetchActiveCategories();
// //       setActiveCategories(fetchedCategories?.data?.categories || []);
// //     };
// //     fetchCategories();
// //   }, []);

// //   // Fetch user categories
// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       if (userId) {
// //         const fetchedUserCategories = await fetchUserCategories(userId);
// //         setUserCategories(
// //           fetchedUserCategories?.data?.data?.expenseCategories || []
// //         );
// //       }
// //     };
// //     fetchUserData();
// //   }, [userId]);

// //   // Match categories between active and user categories
// //   const getMatchedCategories = (activeCategories, userCategories) => {
// //     const userCategoryIds = new Set(
// //       userCategories.map((uc) => uc.categoryId?._id)
// //     );
// //     const userSubCategoryIds = new Set(
// //       userCategories.flatMap(
// //         (uc) => uc.subcategoryIds?.map((sub) => sub._id) || []
// //       )
// //     );

// //     return activeCategories.map((category) => {
// //       const isSelected = userCategoryIds.has(category._id);
// //       const subcategories = category.subcategories.map((subCat) => ({
// //         ...subCat,
// //         selected: isSelected && userSubCategoryIds.has(subCat._id),
// //       }));

// //       return { ...category, isSelected, subcategories };
// //     });
// //   };

// //   useEffect(() => {
// //     if (activeCategories.length && userCategories.length) {
// //       setCategoriesToDisplay(
// //         getMatchedCategories(activeCategories, userCategories)
// //       );
// //     }
// //   }, [activeCategories, userCategories]);

// //   // Toggle category selection and deselect all subcategories if category is deselected
// //   const toggleCategorySelection = (categoryId) => {
// //     setCategoriesToDisplay((prevCategories) =>
// //       prevCategories.map((category) => {
// //         if (category._id === categoryId) {
// //           const newIsSelected = !category.isSelected;
// //           return {
// //             ...category,
// //             isSelected: newIsSelected,
// //             subcategories: category.subcategories.map((subCat) => ({
// //               ...subCat,
// //               selected: newIsSelected ? subCat.selected : false, // Deselect all subcategories if category is deselected
// //             })),
// //           };
// //         }
// //         return category;
// //       })
// //     );
// //   };

// //   // Toggle subcategory selection
// //   const toggleSubCategorySelection = (categoryId, subCategoryId) => {
// //     setCategoriesToDisplay((prevCategories) =>
// //       prevCategories.map((category) => {
// //         if (category._id === categoryId) {
// //           const updatedSubcategories = category.subcategories.map((subCat) =>
// //             subCat._id === subCategoryId
// //               ? { ...subCat, selected: !subCat.selected }
// //               : subCat
// //           );

// //           const anySubcategorySelected = updatedSubcategories.some(
// //             (subCat) => subCat.selected
// //           );

// //           return {
// //             ...category,
// //             subcategories: updatedSubcategories,
// //             isSelected: anySubcategorySelected, // Automatically update category selection based on subcategories
// //           };
// //         }
// //         return category;
// //       })
// //     );
// //   };

// //   // Save changes with improved validation
// //   const saveChanges = async () => {
// //     setIsSelecting(true);

// //     // Filter categories that have at least one selected subcategory
// //     const selectedCategories = categoriesToDisplay.filter((category) =>
// //       category.subcategories.some((subCat) => subCat.selected)
// //     );

// //     // Check if no categories are selected
// //     if (selectedCategories.length === 0) {
// //       alert("Please select at least one category with subcategories.");
// //       setIsSelecting(false);
// //       return;
// //     }

// //     // Validate: Each selected category must have at least 3 subcategories
// //     const invalidCategories = selectedCategories.filter((category) => {
// //       const selectedSubcategories = category.subcategories.filter(
// //         (subCat) => subCat.selected
// //       );
// //       return selectedSubcategories.length < 3;
// //     });

// //     if (invalidCategories.length > 0) {
// //       alert(
// //         "Each selected category must have at least 3 subcategories selected. Invalid categories: " +
// //           invalidCategories.map((cat) => cat.name).join(", ")
// //       );
// //       setIsSelecting(false);
// //       return;
// //     }

// //     // Prepare data for update (only include selected categories)
// //     const updatedCategories = selectedCategories.map((category) => ({
// //       categoryId: category._id,
// //       subcategoryIds: category.subcategories
// //         .filter((subCat) => subCat.selected)
// //         .map((subCat) => subCat._id),
// //     }));

// //     try {
// //       const response = await updateUserCategories(userId, updatedCategories);

// //       // Update state to reflect the saved changes
// //       setCategoriesToDisplay((prevCategories) =>
// //         prevCategories.map((category) => {
// //           const matchedCategory = updatedCategories.find(
// //             (updatedCategory) => updatedCategory.categoryId === category._id
// //           );
// //           return {
// //             ...category,
// //             isSelected: !!matchedCategory,
// //             subcategories: category.subcategories.map((subCat) => ({
// //               ...subCat,
// //               selected: matchedCategory
// //                 ? matchedCategory.subcategoryIds.includes(subCat._id)
// //                 : false,
// //             })),
// //           };
// //         })
// //       );
// //     } catch (error) {
// //       console.error("Error updating categories:", error);
// //       alert("Failed to update categories. Please try again.");
// //     }

// //     setIsSelecting(false);
// //   };

// //   return (
// //     <div className="flex flex-col gap-6 p-7 m-5 border bg-[#f5f5f5] border-gray-200 rounded-lg">
// //       {categoriesToDisplay.length > 0 ? (
// //         categoriesToDisplay.map((category) => (
// //           <div key={category._id} className="flex flex-col gap-3">
// //             <button
// //               className={`px-7 py-3 text-white text-xs font-medium w-fit rounded-full transition-all duration-300
// //                         ${
// //                           category.isSelected
// //                             ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
// //                             : "bg-gray-500 hover:bg-gray-400"
// //                         }`}
// //               onClick={() => toggleCategorySelection(category._id)}
// //             >
// //               {category.name}
// //               {category.isSelected ? (
// //                 <MinusOutlined className="ml-1 text-xs" />
// //               ) : (
// //                 <PlusOutlined className="ml-1 text-xs" />
// //               )}
// //             </button>

// //             <div className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-3 lg:grid-cols-9 w-fit">
// //               {category.subcategories.map((subCat) => (
// //                 <button
// //                   key={subCat._id}
// //                   className={`p-2 text-black text-sm sm:text-sm font-medium rounded-full transition-all duration-300 w-auto truncate
// //                                 ${
// //                                   subCat.selected
// //                                     ? "bg-gradient-to-r from-blue-400 to-purple-400 hover:from-purple-500 hover:to-blue-500"
// //                                     : "bg-white hover:bg-gray-100"
// //                                 }`}
// //                   onClick={() =>
// //                     toggleSubCategorySelection(category._id, subCat._id)
// //                   }
// //                 >
// //                   {subCat.name}
// //                   {subCat.selected ? (
// //                     <MinusOutlined className="ml-2 text-xs sm:text-sm" />
// //                   ) : (
// //                     <PlusOutlined className="ml-2 text-xs sm:text-sm" />
// //                   )}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         ))
// //       ) : (
// //         <p>No categories available.</p>
// //       )}
// //       <button
// //         className={`mt-5 px-6 py-2 text-white font-medium rounded-md transition-all duration-300 self-center ${
// //           isSelecting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
// //         }`}
// //         onClick={saveChanges}
// //         disabled={isSelecting}
// //       >
// //         {isSelecting ? "Saving..." : "Save Changes"}
// //       </button>
// //     </div>
// //   );
// // };

// // export default CategoryManagement;

// import React, { useEffect, useState } from "react";
// import { adminCategoryStore } from "../../store/AdminStore/adminCategoryStore.js";
// import { userCategoryStore } from "../../store/UserStore/userCategoryStore.js";
// import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
// import { userStore } from "../../store/UserStore/userAuthStore";

// const CategoryManagement = () => {
//   const { currentUser } = userStore();
//   const userId = currentUser?._id;
//   const { fetchActiveCategories } = adminCategoryStore();
//   const { fetchUserCategories, updateUserCategories } = userCategoryStore();

//   const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);
//   const [activeCategories, setActiveCategories] = useState([]);
//   const [userCategories, setUserCategories] = useState([]);
//   const [isSelecting, setIsSelecting] = useState(false);
//   const [loading, setLoading] = useState(true); // Loading state added

//   // Fetch both active and user categories together
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [fetchedActive, fetchedUser] = await Promise.all([
//           fetchActiveCategories(),
//           fetchUserCategories(userId),
//         ]);
//         setActiveCategories(fetchedActive?.data?.categories || []);
//         setUserCategories(fetchedUser?.data?.data?.expenseCategories || []);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       } finally {
//         setLoading(false); // Stop loading after both fetches complete
//       }
//     };

//     if (userId) {
//       fetchData();
//     }
//   }, [userId]);

//   const getMatchedCategories = (activeCategories, userCategories) => {
//     const userCategoryIds = new Set(
//       userCategories.map((uc) => uc.categoryId?._id)
//     );
//     const userSubCategoryIds = new Set(
//       userCategories.flatMap(
//         (uc) => uc.subcategoryIds?.map((sub) => sub._id) || []
//       )
//     );

//     return activeCategories.map((category) => {
//       const isSelected = userCategoryIds.has(category._id);
//       const subcategories = category.subcategories.map((subCat) => ({
//         ...subCat,
//         selected: isSelected && userSubCategoryIds.has(subCat._id),
//       }));

//       return { ...category, isSelected, subcategories };
//     });
//   };

//   useEffect(() => {
//     if (activeCategories.length && userCategories.length) {
//       setCategoriesToDisplay(
//         getMatchedCategories(activeCategories, userCategories)
//       );
//     }
//   }, [activeCategories, userCategories]);

//   const toggleCategorySelection = (categoryId) => {
//     setCategoriesToDisplay((prevCategories) =>
//       prevCategories.map((category) => {
//         if (category._id === categoryId) {
//           const newIsSelected = !category.isSelected;
//           return {
//             ...category,
//             isSelected: newIsSelected,
//             subcategories: category.subcategories.map((subCat) => ({
//               ...subCat,
//               selected: newIsSelected ? subCat.selected : false,
//             })),
//           };
//         }
//         return category;
//       })
//     );
//   };

//   const toggleSubCategorySelection = (categoryId, subCategoryId) => {
//     setCategoriesToDisplay((prevCategories) =>
//       prevCategories.map((category) => {
//         if (category._id === categoryId) {
//           const updatedSubcategories = category.subcategories.map((subCat) =>
//             subCat._id === subCategoryId
//               ? { ...subCat, selected: !subCat.selected }
//               : subCat
//           );

//           const anySubcategorySelected = updatedSubcategories.some(
//             (subCat) => subCat.selected
//           );

//           return {
//             ...category,
//             subcategories: updatedSubcategories,
//             isSelected: anySubcategorySelected,
//           };
//         }
//         return category;
//       })
//     );
//   };

//   const saveChanges = async () => {
//     setIsSelecting(true);

//     const selectedCategories = categoriesToDisplay.filter((category) =>
//       category.subcategories.some((subCat) => subCat.selected)
//     );

//     if (selectedCategories.length === 0) {
//       alert("Please select at least one category with subcategories.");
//       setIsSelecting(false);
//       return;
//     }

//     const invalidCategories = selectedCategories.filter((category) => {
//       const selectedSubcategories = category.subcategories.filter(
//         (subCat) => subCat.selected
//       );
//       return selectedSubcategories.length < 3;
//     });

//     if (invalidCategories.length > 0) {
//       alert(
//         "Each selected category must have at least 3 subcategories selected. Invalid categories: " +
//           invalidCategories.map((cat) => cat.name).join(", ")
//       );
//       setIsSelecting(false);
//       return;
//     }

//     const updatedCategories = selectedCategories.map((category) => ({
//       categoryId: category._id,
//       subcategoryIds: category.subcategories
//         .filter((subCat) => subCat.selected)
//         .map((subCat) => subCat._id),
//     }));

//     try {
//       const response = await updateUserCategories(userId, updatedCategories);

//       setCategoriesToDisplay((prevCategories) =>
//         prevCategories.map((category) => {
//           const matchedCategory = updatedCategories.find(
//             (updatedCategory) => updatedCategory.categoryId === category._id
//           );
//           return {
//             ...category,
//             isSelected: !!matchedCategory,
//             subcategories: category.subcategories.map((subCat) => ({
//               ...subCat,
//               selected: matchedCategory
//                 ? matchedCategory.subcategoryIds.includes(subCat._id)
//                 : false,
//             })),
//           };
//         })
//       );
//     } catch (error) {
//       console.error("Error updating categories:", error);
//       alert("Failed to update categories. Please try again.");
//     }

//     setIsSelecting(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-6 p-7 m-5 border bg-[#f5f5f5] border-gray-200 rounded-lg">
//       {categoriesToDisplay.length > 0 ? (
//         categoriesToDisplay.map((category) => (
//           <div key={category._id} className="flex flex-col gap-3">
//             <button
//               className={`px-7 py-3 text-white text-xs font-medium w-fit rounded-full transition-all duration-300
//                 ${
//                   category.isSelected
//                     ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
//                     : "bg-gray-500 hover:bg-gray-400"
//                 }`}
//               onClick={() => toggleCategorySelection(category._id)}
//             >
//               {category.name}
//               {category.isSelected ? (
//                 <MinusOutlined className="ml-1 text-xs" />
//               ) : (
//                 <PlusOutlined className="ml-1 text-xs" />
//               )}
//             </button>

//             <div className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-3 lg:grid-cols-9 w-fit">
//               {category.subcategories.map((subCat) => (
//                 <button
//                   key={subCat._id}
//                   className={`p-2 text-black text-sm sm:text-sm font-medium rounded-full transition-all duration-300 w-auto truncate
//                     ${
//                       subCat.selected
//                         ? "bg-gradient-to-r from-blue-400 to-purple-400 hover:from-purple-500 hover:to-blue-500"
//                         : "bg-white hover:bg-gray-100"
//                     }`}
//                   onClick={() =>
//                     toggleSubCategorySelection(category._id, subCat._id)
//                   }
//                 >
//                   {subCat.name}
//                   {subCat.selected ? (
//                     <MinusOutlined className="ml-2 text-xs sm:text-sm" />
//                   ) : (
//                     <PlusOutlined className="ml-2 text-xs sm:text-sm" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No categories available.</p>
//       )}
//       <button
//         className={`mt-5 px-6 py-2 text-white font-medium rounded-md transition-all duration-300 self-center ${
//           isSelecting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
//         }`}
//         onClick={saveChanges}
//         disabled={isSelecting}
//       >
//         {isSelecting ? "Saving..." : "Save Changes"}
//       </button>
//     </div>
//   );
// };

// export default CategoryManagement;

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { adminCategoryStore } from "../../store/AdminStore/adminCategoryStore.js";
import { userCategoryStore } from "../../store/UserStore/userCategoryStore.js";
import { userStore } from "../../store/UserStore/userAuthStore";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { message } from "antd"; // For user notifications

const CategoryManagement = () => {
  const { currentUser } = userStore();
  const userId = currentUser?._id;
  const { fetchActiveCategories } = adminCategoryStore();
  const { fetchUserCategories, updateUserCategories } = userCategoryStore();

  const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data with retry logic
  const fetchData = useCallback(
    async (retries = 3, delay = 1000) => {
      setLoading(true);
      setError(null);

      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const [fetchedActive, fetchedUser] = await Promise.all([
            fetchActiveCategories(),
            fetchUserCategories(userId),
          ]);

          setActiveCategories(fetchedActive?.data?.categories || []);
          setUserCategories(fetchedUser?.data?.data?.expenseCategories || []);
          setLoading(false);
          return; // Success, exit retry loop
        } catch (err) {
          console.error(`Attempt ${attempt} failed:`, err);
          if (attempt === retries) {
            setError("Failed to fetch categories. Please try again later.");
            setLoading(false);
            message.error("Failed to load categories.");
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retry
        }
      }
    },
    [userId, fetchActiveCategories, fetchUserCategories]
  );

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId, fetchData]);

  // Memoize matched categories to prevent unnecessary recalculations
  const getMatchedCategories = useCallback((activeCats, userCats) => {
    const userCategoryIds = new Set(userCats.map((uc) => uc.categoryId?._id));
    const userSubCategoryIds = new Set(
      userCats.flatMap((uc) => uc.subcategoryIds?.map((sub) => sub._id) || [])
    );

    return activeCats.map((category) => {
      const isSelected = userCategoryIds.has(category._id);
      const subcategories = category.subcategories.map((subCat) => ({
        ...subCat,
        selected: isSelected && userSubCategoryIds.has(subCat._id),
      }));

      return { ...category, isSelected, subcategories };
    });
  }, []);

  useEffect(() => {
    if (activeCategories.length && userCategories.length) {
      setCategoriesToDisplay(
        getMatchedCategories(activeCategories, userCategories)
      );
    }
  }, [activeCategories, userCategories, getMatchedCategories]);

  const toggleCategorySelection = useCallback((categoryId) => {
    setCategoriesToDisplay((prev) =>
      prev.map((category) => {
        if (category._id === categoryId) {
          const newIsSelected = !category.isSelected;
          return {
            ...category,
            isSelected: newIsSelected,
            subcategories: category.subcategories.map((subCat) => ({
              ...subCat,
              selected: newIsSelected ? subCat.selected : false,
            })),
          };
        }
        return category;
      })
    );
  }, []);

  const toggleSubCategorySelection = useCallback(
    (categoryId, subCategoryId) => {
      setCategoriesToDisplay((prev) =>
        prev.map((category) => {
          if (category._id === categoryId) {
            const updatedSubcategories = category.subcategories.map((subCat) =>
              subCat._id === subCategoryId
                ? { ...subCat, selected: !subCat.selected }
                : subCat
            );
            const anySubcategorySelected = updatedSubcategories.some(
              (subCat) => subCat.selected
            );
            return {
              ...category,
              subcategories: updatedSubcategories,
              isSelected: anySubcategorySelected,
            };
          }
          return category;
        })
      );
    },
    []
  );

  const saveChanges = useCallback(async () => {
    setIsSelecting(true);

    const selectedCategories = categoriesToDisplay.filter((category) =>
      category.subcategories.some((subCat) => subCat.selected)
    );

    if (selectedCategories.length === 0) {
      message.error("Please select at least one category with subcategories.");
      setIsSelecting(false);
      return;
    }

    const invalidCategories = selectedCategories.filter((category) => {
      const selectedSubcategories = category.subcategories.filter(
        (subCat) => subCat.selected
      );
      return selectedSubcategories.length < 3;
    });

    if (invalidCategories.length > 0) {
      message.error(
        `Each selected category must have at least 3 subcategories. Invalid: ${invalidCategories
          .map((cat) => cat.name)
          .join(", ")}`
      );
      setIsSelecting(false);
      return;
    }

    const updatedCategories = selectedCategories.map((category) => ({
      categoryId: category._id,
      subcategoryIds: category.subcategories
        .filter((subCat) => subCat.selected)
        .map((subCat) => subCat._id),
    }));

    try {
      await updateUserCategories(userId, updatedCategories);
      message.success("Categories updated successfully!");
      // Refetch to ensure UI reflects backend state
      await fetchData();
    } catch (error) {
      console.error("Error updating categories:", error);
      message.error("Failed to update categories. Please try again.");
    } finally {
      setIsSelecting(false);
    }
  }, [categoriesToDisplay, userId, updateUserCategories, fetchData]);

  // Memoize the render to prevent unnecessary re-renders
  const categoryList = useMemo(() => {
    return categoriesToDisplay.map((category) => (
      <div key={category._id} className="flex flex-col gap-3">
        <button
          className={`px-7 py-3 text-white text-xs font-medium w-fit rounded-full transition-all duration-300
            ${
              category.isSelected
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
                : "bg-gray-500 hover:bg-gray-400"
            }`}
          onClick={() => toggleCategorySelection(category._id)}
        >
          {category.name}
          {category.isSelected ? (
            <MinusOutlined className="ml-1 text-xs" />
          ) : (
            <PlusOutlined className="ml-1 text-xs" />
          )}
        </button>

        <div className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-3 lg:grid-cols-9 w-fit">
          {category.subcategories.map((subCat) => (
            <button
              key={subCat._id}
              className={`p-2 text-black text-sm sm:text-sm font-medium rounded-full transition-all duration-300 w-auto truncate
                ${
                  subCat.selected
                    ? "bg-gradient-to-r from-blue-400 to-purple-400 hover:from-purple-500 hover:to-blue-500"
                    : "bg-white hover:bg-gray-100"
                }`}
              onClick={() =>
                toggleSubCategorySelection(category._id, subCat._id)
              }
            >
              {subCat.name}
              {subCat.selected ? (
                <MinusOutlined className="ml-2 text-xs sm:text-sm" />
              ) : (
                <PlusOutlined className="ml-2 text-xs sm:text-sm" />
              )}
            </button>
          ))}
        </div>
      </div>
    ));
  }, [
    categoriesToDisplay,
    toggleCategorySelection,
    toggleSubCategorySelection,
  ]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
        <button
          className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={() => fetchData()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-7 m-5 border bg-[#f5f5f5] border-gray-200 rounded-lg">
      {categoriesToDisplay.length > 0 ? (
        categoryList
      ) : (
        <p>No categories available.</p>
      )}
      <button
        className={`mt-5 px-6 py-2 text-white font-medium rounded-md transition-all duration-300 self-center ${
          isSelecting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
        }`}
        onClick={saveChanges}
        disabled={isSelecting}
      >
        {isSelecting ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default CategoryManagement;
