import styled from "styled-components";
import { BiCheckCircle } from "react-icons/bi";

const ColorButton = ({ handleClick, color, isClicked, value }) => {
  return (
    <Button onClick={handleClick} color={color} value={value}>
      {isClicked && <BiCheckCircle size={20} />}
    </Button>
  );
};

const Button = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.color};
  margin: 0px;
  box-shadow: 0 0 2px rgb(0, 0, 0, 0.5);
  cursor: pointer;
  transition: 100ms ease-in-out;
  margin: 2px;
  color: ${({ color }) => (color === "black" ? "darkgrey" : "black")};

  &:hover {
    transform: scale(1.1);
    transition: 200ms ease-in-out;
  }
`;

export default ColorButton;
