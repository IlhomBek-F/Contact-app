import "./App.css";
import { Card } from "antd";
import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { ContactDrawer } from "./components/ContactDrawer";
import { useState } from "react";
import type { ContactType } from "./models/ContactModel";
import type { ContactDrawerState } from "./models/DrawerStateModel";

function App() {
  const [contactFormDrawerState, setContactFormDrawerState] = useState<ContactDrawerState>({open: false, payload: null});

  const openContactFormDrawer = (payload: ContactType | null = null) => {
      setContactFormDrawerState({open: true, payload})
  }

  const closeContactFormDrawer = () => {
      setContactFormDrawerState({open: false, payload: null})
  }

  return (
    <>
      <Card title={<Header addNewContact={openContactFormDrawer}/>} className="w-[600px] relative overflow-hidden">
            <Content openContactFormDrawer={openContactFormDrawer}/>
            <ContactDrawer {...contactFormDrawerState} closeContactFormDrawer={closeContactFormDrawer} />
      </Card>
    </>
  );
}

export default App;
