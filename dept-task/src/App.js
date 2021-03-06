import { useState } from "react";
import Button from "./components/Button";
import Color from "./components/Color";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import InputField from "./components/InputField";

function App() {
  const [myRndClrs, setRndClrs] = useState([]);
  const [currColor, setCurrColor] = useState("");
  const [btnText, setBtntext] = useState("");

  // Update Color List
  function updateColorList(color) {
    if (color && !myRndClrs.find((randomColor) => randomColor === color)) {
      setRndClrs([...myRndClrs, color]);
    }
  }

  // Get random color on click
  const getRandom = async () => {
    const newClr = await fetchRandom();
    let newClrHex;
    newClr.colors[0].hex === ""
      ? (newClrHex = "#000")
      : (newClrHex = "#" + newClr.colors[0].hex);
    setCurrColor(newClrHex);
    updateColorList(newClrHex);
    setBtntext(newClrHex);
  };

  // Fetch random color
  const fetchRandom = async () => {
    const res = await fetch("https://www.colr.org/json/color/random", {
      cache: "no-cache",
    });
    const data = await res.json();
    return data;
  };

  // Update List Order
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(myRndClrs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setRndClrs(items);
  }

  // Get color from input
  const handleKeyDown = (event) => {
    setBtntext(event.target.value);

    if (event.key === "Enter") {
      event.preventDefault();
      let inputHex = String(event.target.value);

      if (
        (inputHex.length === 7 || inputHex.length === 4) &&
        inputHex.charAt(0) === "#"
      ) {
        setCurrColor(inputHex);
        updateColorList(inputHex);
      } else {
        alert("Check if first element is # and then enter 3 or 6 signs");
      }
    }
  };

  return (
    <div className="App">
      <h1>Random Color</h1>

      <Button onClick={getRandom} btnColor={currColor} btnText={btnText} />

      <div className="myList">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="myRndClrs">
            {(provided) => (
              <ul
                className="colorList"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {myRndClrs.map((color, index) => {
                  return (
                    <Draggable key={color} draggableId={color} index={index}>
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Color
                            key={index}
                            color={color}
                            currColor={currColor}
                          />
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <InputField onKeyUp={handleKeyDown} />
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
