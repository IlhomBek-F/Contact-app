import "./App.css";
import { Card } from "antd";
import { Content } from "./components/Content";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Card title={<Header />} style={{ width: 600 }}>
            <Content />
      </Card>
    </>
  );
}

export default App;
