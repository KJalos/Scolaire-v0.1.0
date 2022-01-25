import React, { useEffect, useRef, useState } from "react";
import classes from "./DropdownButton.module.css";

const DropDownButton = (props) => {
  // const { show: showMenu } = useContext(MenuContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [eventAdded, setEventAdded] = useState(false);
  const ref = useRef();
  // console.log(ref.current.id)
  useEffect(() => {
    const listener = (event) => {
      if (event.target)
        if (event.target !== ref.current) {
          setDropdownVisible(() => {
            return false;
          });
        }
    };
    if (!eventAdded) {
      setEventAdded(true);
      console.log("Event added");
      document.addEventListener("click", listener);
    }
    // console.log(listener);

    // return () => {
    //   console.log("Event removed");
    //   document.removeEventListener("click");
    //   eventAdded = false;
    // };
  }, [dropdownVisible, eventAdded]);

  const handleClick = () => {
    setDropdownVisible((curState) => !curState);
  };

  return (
    <button
      onClick={handleClick}
      className={`${classes["drop-btn"]} ${props.className} ${dropdownVisible ? classes['drop-open'] : ''}`}
      ref={ref}
      id={props.id}
    >
      {props.children}
      {dropdownVisible && (
        <div className={classes["dropdown"]}>{props.dropdown}</div>
      )}
      {/* {dropdownVisible && ReactDOM.createPortal(props.dropdown,document)} */}
    </button>
  );
};

export default DropDownButton;
