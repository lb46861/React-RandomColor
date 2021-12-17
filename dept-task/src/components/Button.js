const Button = ({ onClick, btnColor }) => {
  const changeColor = () => {
    const myBtn = document.querySelector(".btn");
    myBtn.style.color = `#${btnColor}`;
  };
  return (
    <div>
      <button
        className="btn"
        onClick={() => {
          onClick();
          changeColor();
        }}
      >
        Color
      </button>
    </div>
  );
};

export default Button;