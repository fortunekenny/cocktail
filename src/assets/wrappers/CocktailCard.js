import styled from "styled-components";
const Wrapper = styled.article`
  display: grid;
  grid-template-rows: 2fr auto;
  background: var(--white);
  box-shadow: var(--shadow-2);
  /*width: 20.7rem;
  height: 26rem;*/
  margin: 1rem 1rem;
  border-radius: var(--borderRadius);
  :hover {
    box-shadow: var(--shadow-4);
  }
  .img-container {
    overflow: hidden;
    z-index: 1;
    border-radius: 0.25rem 0.25rem 1rem 1rem;
  }
  img {
    height: 15rem;
    transition: all 2s cubic-bezier(0.42, 0, 0.58, 1);
  }
  .img-container:hover img {
    transform: scale(1.1);
  }
  .footer {
    display: grid;
    grid-template-rows: repeat(4, auto);
    padding: 1.5rem;
    h4,
    h5 {
      margin-bottom: 0.5rem;
    }
    h4 {
      font-weight: 400;
    }
    p {
      margin-bottom: 1rem;
      color: var(--dark-variation);
    }
    a {
      text-align: center;
    }
  }
`;

export default Wrapper;
