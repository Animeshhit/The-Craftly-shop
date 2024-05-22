const Button = ({ Type, styles, Text, disabled }) => {
  return (
    <>
      <button
        type={Type}
        className={`py-3 px-4 text-sm bg-[#624de2] hover:bg-[#8876fb] transition text-white capitalize ${styles}`}
        disabled={disabled}
      >
        {Text}
      </button>
    </>
  );
};

export default Button;
