import React from "react";
import ReactDom from "react-dom";

class App extends React.Component {
  div = document.createElement("div");

  componentWillUnmount() {
    document.body.removeChild(this.div);
  }

  componentDidMount() {
    document.body.appendChild(this.div);
  }

  render() {
    return ReactDom.createPortal(<Foo />, this.div);
  }
}

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  height: 200,
  zIndex: 100,
  background: "rgba(222,222,222,0.4)",
  boxShadow: "5px 5px 5px 5px gray"
};
const Foo = () => {
  return (
    <div onClick={() => console.info("触发点击事件")} style={styles}>
      Portals的使用
    </div>
  );
};

export default () => (
  <div
    style={{ border: "1px solid red" }}
    onClick={() => console.info("点击事件冒泡到其React的虚拟DOM父节点")}
  >
    <p>React虚拟DOM父节点</p>
    <App />
  </div>
);
