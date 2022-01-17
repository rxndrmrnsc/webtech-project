import { useEffect, useCallback, useState } from "react";

const ContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState("") 

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
    try{
      var test = event.target.querySelector("span")
      if(test.querySelector("span") != null){
          test = test.querySelector("span")
      }
      setSelectedItem(test.innerHTML);
      // console.log(test.innerHTML)
      // console.log(selectedItem)
    } catch(err){
      console.warn(err)
    }
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    },
    [setShow, setAnchorPoint]
  );

  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });
  return { anchorPoint, show, selectedItem };
};

export default ContextMenu;