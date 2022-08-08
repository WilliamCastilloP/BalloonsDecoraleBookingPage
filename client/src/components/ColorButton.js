import styled from "styled-components";
import { BiCheckCircle } from "react-icons/bi";

const ColorButton = ({ handleClick, color, isClicked, value }) => {
  return (
    <Button onClick={handleClick} color={color} value={value}>
      {isClicked && <BiCheckCircle />}
    </Button>
  );
};

const Button = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.color};
  margin: 0px;
  box-shadow: 0 0 2px rgb(0, 0, 0, 0.5);
  cursor: pointer;
  transition: 100ms ease-in-out;
  margin: 2px;

  &:hover {
    transform: scale(1.1);
    transition: 200ms ease-in-out;
  }
`;

export default ColorButton;
