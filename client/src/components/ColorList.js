import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

// const ColorList = ({ colors, updateColors }) => {
const ColorList = (props) => {
  console.log("props to the ColorList component: ", props.colors);

  const { id } = useParams();

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  console.log("colorToEdit: ", colorToEdit);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        //
        //here I am, not doing anything with the res data
        //
        const colorId = res.data;
        console.log("colorId: ", colorId);
        const foundColorId = props.colors.find((clr) => clr.id == colorId.id);
        console.log("foundColorId: ", foundColorId);
        props.setColorList(
          props.colors.map((cl) => {
            if (cl.id === foundColorId.id) {
              return foundColorId;
            }
            return cl;
          })
        );
      })
      .catch((err) => console.log(err.message));
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete("api/colors")
      .then((res) => console.log("res in the delete: ", res.data))
      .catch((err) => console.log(err));
    // make a delete request to delete this color
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {props.colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  color: e.target.value,
                })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
