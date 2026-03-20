function Spinner({ size = "small" }) {
  return (
    <div
      className={`border-2 border-white border-t-transparent rounded-full animate-spin ${
        size === "small" ? "w-4 h-4" : "w-6 h-6"
      }`}
    />
  );
}

export default Spinner;