import React from "react";

const Categories = () => {
  return (
    <section id="admin__catagories">
      <div className="container my-6 mx-auto px-4 sm:px-0 flex items-center gap-3 flex-wrap">
        <div className="add__btn__cta flex items-center gap-3 text-sm font-Karla py-3 px-4 bg-zinc-900 text-white w-max rounded-md">
          <ion-icon name="add-outline"></ion-icon>
          Add Categories
        </div>
        <div className="cta font-Karla flex items-center gap-3 text-sm font-semibold bg-gray-300 rounded-md px-4 w-max">
          <span>PhotoFrame</span>
          <div className="btns flex items-center">
            <div className="edit__btn flex-center py-4 px-2 cursor-pointer">
              <ion-icon name="create-outline"></ion-icon>
            </div>
            <div className="delte_btn flex-center py-4 px-2 cursor-pointer">
              <ion-icon name="trash-outline"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
