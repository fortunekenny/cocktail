import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
//import Wrapper from "../assets/wrappers/CocktailPage";
const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

import { useQuery } from "@tanstack/react-query";

const singleCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };

const Cocktail = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleButton = (index) => {
    setActiveIndex(index);
  };

  const { id } = useLoaderData();

  const { data } = useQuery(singleCocktailQuery(id));
  if (!data) return <Navigate to="/" />;

  const singleDrink = data.drinks[0];
  let navigate = useNavigate();
  let buttonRef = React.useRef < HTMLButtonElement > null;

  const onDismiss = () => {
    navigate(-1);
  };

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: alcohol,
    strGlass: glass,
    strCategory: category,
    strInstructions: instructions,
    dateModified: date,
    strIBA: iba,
  } = singleDrink;

  const cocktailBar = [`${name}`, "ingredients", "instructions"];

  const splitInstruct = (struct) => {
    let leftBrkt = instructions.match(/[(]+/g).toString();
    let leftBrktIndex = struct.indexOf(leftBrkt);
    // console.log(leftBrktIndex);
    let rightBrkt = instructions.match(/[)]+/g).toString();
    let rightBrktIndex = struct.indexOf(rightBrkt);
    // console.log(rightBrktIndex);
    if (rightBrktIndex - leftBrktIndex < 10 || struct.startsWith("(")) {
      return struct.split(".");
    }
    return struct.split("(");
  };
  // console.log(instructions);
  // console.log(splitInstruct(instructions));

  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) =>
        key.startsWith("strIngredient") &&
        singleDrink[key] !== null &&
        singleDrink[key] !== ""
    )
    .map((key) => singleDrink[key]);

  const validMeasurements = Object.keys(singleDrink)
    .filter(
      (key) =>
        key.startsWith("strMeasure") &&
        singleDrink[key] !== null &&
        singleDrink[key] !== ""
    )
    .map((key) => singleDrink[key]);

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={onDismiss}
      initialFocusRef={buttonRef}
    >
      <img src={image} alt={name} className="drink-img" />
      {/* <section className="drink-data"> */}
      <article className="navdatpre">
        <nav className="drink-nav">
          {cocktailBar.map((menus, index) => {
            return (
              <p key={index} onClick={() => toggleButton(index)}>
                {menus}
              </p>
            );
          })}
        </nav>

        <div className="drink">
          <section className="general-info">
            {activeIndex === 0 && (
              <BasicInfo
                category={category}
                alcohol={alcohol}
                glass={glass}
                date={date}
                iba={iba}
              />
            )}
          </section>
          <section className="ing-qty-container">
            {activeIndex === 1 && (
              <IngredientsMeasure
                validIngredients={validIngredients}
                validMeasurements={validMeasurements}
              />
            )}
          </section>
          <section className="mixin">
            {activeIndex === 2 && (
              <Instruction
                instructions={instructions}
                splitInstruct={splitInstruct}
              />
            )}
          </section>
        </div>
        <button
          className="modalButton"
          // ref={buttonRef}
          onClick={onDismiss}
        >
          <LiaTimesSolid />
        </button>
      </article>
      {/* </section> */}
    </Dialog>
    /*
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
    <p>
      <span className="drink-data">category :</span>
      {category}
    </p>
    <p>
      <span className="drink-data">info :</span>
      {info}
    </p>
    <p>
      <span className="drink-data">glass :</span>
      {glass}
    </p>
    <p>
      <span className="drink-data">ingredients :</span>
      {validIngredients.map((item, index) => {
        return (
          <span className="ing" key={item}>
            {item}
            {index < validIngredients.length - 1 ? "," : ""}
          </span>
        );
      })}
    </p>
    <p>
      <span className="drink-data">ingredients :</span>
      {validMeasurements.map((item, index) => {
        return (
          <span className="ing" key={item}>
            {item}
            {index < validMeasurements.length - 1 ? "," : ""}
          </span>
        );
      })}
    </p>
    <p>
      <span className="drink-data">instructions :</span>
      {instructions}
    </p>
    {date ? (
      <p>
        <span className="drink-data">year modified :</span>
        {new Date(date).getFullYear()}
      </p>
    ) : null}
        </div>
      </div>
    </Wrapper>
*/
  );
};

const BasicInfo = ({ category, alcohol, glass, date, iba }) => {
  return (
    <>
      <p>
        category :<span className="drink-data">{category}</span>
      </p>
      <p>
        alcohol :<span className="drink-data">{alcohol}</span>
      </p>
      <p>
        glass :<span className="drink-data">{glass}</span>
      </p>
      {date ? (
        <p>
          year modified :
          <span className="drink-data">{new Date(date).getFullYear()}</span>
        </p>
      ) : null}
      {iba ? (
        <p>
          IBA Category :<span className="drink-data">{iba}</span>
        </p>
      ) : null}
    </>
  );
};

const IngredientsMeasure = ({ validIngredients, validMeasurements }) => {
  return (
    <>
      <div className="ing-qty">
        {validIngredients.map((item, index) => {
          return (
            <div key={index}>
              <p className="ing">{item}</p>
              <p className="qty">{validMeasurements[index]}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

const Instruction = ({ instructions, splitInstruct }) => {
  return (
    <>
      {instructions.includes("(")
        ? splitInstruct(instructions).map((text, index) => {
            return (
              <div className="instruct" key={index}>
                <p>{text}</p>
              </div>
            );
          })
        : instructions
            .trim()
            .split(".")
            .map((text, index) => {
              text = text.trim();
              // console.log(instructions);
              // console.log(text);
              return (
                <div className="instruct" key={index}>
                  <span>{text === "" ? undefined : index + 1 + "."}</span>
                  <div>
                    <p>
                      {text === "1"
                        ? text.replace("1", "")
                        : text.endsWith("2")
                        ? text.replace("2", ".")
                        : text.endsWith("3")
                        ? text.replace("3", ".")
                        : text.endsWith("4")
                        ? text.replace("4", ".")
                        : text.endsWith("5")
                        ? text.replace("5", ".")
                        : text === ""
                        ? undefined
                        : text + "."}
                    </p>
                  </div>
                </div>
              );
            })}
    </>
  );
};

export default Cocktail;
