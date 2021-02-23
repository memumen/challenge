import styled from "styled-components";

import Button from './Button';

const ButtonDanger = styled(Button)`
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
  &:hover {
    color: #fff;
    background-color: #bb2d3b;
    border-color: #b02a37;
  }
  :disabled {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    cursor: not-allowed;
    pointer-events: all !important;
  }
`;

export default ButtonDanger;
