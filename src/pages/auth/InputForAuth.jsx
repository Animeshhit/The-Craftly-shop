import React from "react";

const InputForAuth = ({
  Id,
  Label,
  Type,
  PlaceHolder,
  Error,
  InputStyles,
  LabelStyles,
  ContainerStyles,
  name,
  Value,
  handleChange,
  disabled,
}) => {
  return (
    <>
      <div className={`${ContainerStyles}`}>
        <label
          className={`font-Karla font-semibold text-sm block ${LabelStyles}`}
          htmlFor={Id}
        >
          {Label}
        </label>
        <input
          name={name}
          value={Value}
          onChange={handleChange}
          className={`mt-2 ${
            Error ? "border-red-500" : ""
          } outline-none border-2 py-3 px-4 focus:border-zinc-600 transition text-sm rounded-md ${InputStyles}`}
          id={Id}
          type={Type}
          placeholder={PlaceHolder}
          disabled={disabled}
        />
        {Error && (
          <small className="text-red-500 font-Karla block px-1">{Error}</small>
        )}
      </div>
    </>
  );
};

export default InputForAuth;
