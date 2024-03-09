import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable"
import {SortableItem} from "./SortableItem.jsx";

class Block {
    constructor(title="Title", description="description", inputText="") {
        this.title = title;
        this.description = description;
        this.inputText = inputText;
    }
}
function App() {
    //use array of objects for actual blocks
    const [blocks, setBlocks] = useState([]);
    const [nextId, setNextId] = useState(0);

    return(
        <>
            <div className="col text-center">

            </div>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}  //function callback called when drag finishes, gives event
            >
                <Container fluid className="p-3" align="center">
                    <h3 className={"paddedHeading"}>Dynamic Tasker</h3>
                    <button className="paddedButton" onClick={handleAddButtonClicked}>+ New Entry</button>

                    <SortableContext
                        items={blocks.map(block => block.title)}
                        strategy={verticalListSortingStrategy}
                    >
                        {/* Need components with useSortable hook */}
                        {blocks.map(block =>
                            <SortableItem
                                key={block.title}
                                id={block.title}
                                desc={block.description}
                                inputText={block.inputText}
                                onInputChange={handleInputChange}
                                deleteCallback={handleDeleteButtonClicked}
                            />
                        )}
                    </SortableContext>
                </Container>
            </DndContext>
        </>
    );

    function handleAddButtonClicked() {
        const newBlock = new Block(`${nextId}`);

        //currentBlocks can be called anything
        setBlocks(currentBlocks => [newBlock, ...currentBlocks]);
        setNextId(currentNextId => currentNextId + 1);
    }
    function handleDeleteButtonClicked(blockId) {
        setBlocks(currentBlocks => currentBlocks.filter(block => block.title !== blockId));
    }
    function handleDragEnd(event) {
        console.log("drag end called");

        //active is active Card user is pressing on and over last element in list over
        const {active, over} = event;

        console.log("ACTIVE: " + active.id);
        console.log("OVER: " + over.id)

        if (active.id !== over.id) {
            setBlocks((items) => {
                const activeIndex = items.findIndex(item => item.title === active.id);
                const overIndex = items.findIndex(item => item.title === over.id);
                console.log(arrayMove(items, activeIndex, overIndex));
                return arrayMove(items, activeIndex, overIndex);
                // items: [2, 3, 1] 0 -> 2 [1, 2, 3]
            });
        }
    }
    function handleInputChange(id, newText) {
        setBlocks(blocks => blocks.map(block => {
            if (block.title === id) {
                return new Block(block.title, block.description, newText);
            } else {
                return block;
            }
        }));
    }
}
export default App;
