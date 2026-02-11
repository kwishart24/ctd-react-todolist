import styled from 'styled-components';

export const StyledTodoForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    text-align: center;
  }
    
  button:disabled {
    font-style: italic;
  }
`;
