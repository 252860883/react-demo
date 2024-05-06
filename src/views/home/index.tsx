import { Button } from "@arco-design/web-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const person = {
  name: "Gregorio Y. Zara",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function Home() {
  const [status, setStatus] = useState(false);

  return (
    <div>
      <h1>这里是主页</h1>
      <Link to="/user">跳转用户页</Link>
      <p style={person.theme}>{person.name}</p>
      <Button
        type={status ? "primary" : "default"}
        onClick={() => setStatus(!status)}
      >
        按钮状态: {String(status)}
      </Button>
    </div>
  );
}
