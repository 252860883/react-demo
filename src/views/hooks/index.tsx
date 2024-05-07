import { useRef } from "react";

export default function Hooks() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleClick() {
    inputRef.current && inputRef.current.focus();
  }

  return (
    <div onClickCapture={() => {}}>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>聚焦输入框</button>
    </div>
  );
}
