import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormControl } from 'react-bootstrap'; // Import FormControl
import React, { useRef, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

export function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    //https://github.com/clauderic/dnd-kit/issues/117
    const style = {
        width: '100%',
        transform: CSS.Translate.toString(transform), transition,
    };
    const textareaRef = useRef(null); // Create a ref for the textarea

    // Automatically resize the textarea based on its content
    useEffect(() => {
        const adjustHeight = () => {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = '10px'; //'inherit';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        };
        adjustHeight(); // Call when component mounts
        // If you're updating content externally, you may need additional triggers for this effect
    }, [props.inputText]); // Dependency array ensures effect runs when text changes
    return (
        <div ref={setNodeRef} style={style}>
            <div style={{display: 'flex', width: '100%', alignItems: 'center', marginBottom: '10px'}}>
                {/*<Card body className="m-3" style={{ width: 'auto', maxWidth: '500px' }}>*/}
                {/* Draggable part */}
                <div {...listeners} {...attributes} style={{
                    cursor: 'grab',
                    marginTop: '-5px', marginRight: '10px'
                }}>
                    {/* Using SVG as an image */}
                    <img src="../public/drag-handle-icon.svg" alt="Dragger" width="20px"/>
                </div>
                {/* Non-draggable part */}
                <div style={{display: 'inline-block', width: '100%', marginRight: '10px'}}>
                    {/*<h2>{props.id}</h2>*/}
                    {/*<p>{props.desc}</p>*/}
                    <FormControl
                        as="textarea"
                        ref={textareaRef} // Attach the ref
                        value={props.inputText}
                        onChange={(e) => props.onInputChange(props.id, e.target.value)}
                        style={{minHeight: '40px', resize: 'none'}} // Set resize to 'none'
                        placeholder="Enter text"
                    />
                </div>
                <button className="deleteButton" onClick={() => props.deleteCallback(props.id)}>-</button>
                {/*</Card>*/}
            </div>
        </div>
    );
}
