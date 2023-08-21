import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  margin: 0rem 6rem;
  /*flex-wrap: wrap;
  justify-content: center;*/
  background: var(--lightest-variation);
`;

export default Wrapper;
