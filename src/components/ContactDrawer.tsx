import { Button, Drawer, Space } from "antd";
import { ContactForm } from "../shared/ContactForm";
import type { ContactType } from "../core/models/ContactModel";

type ContactDrawerPropsType = {
    open: boolean,
    payload: ContactType | null,
    closeContactFormDrawer: () => void
}

function ContactDrawer({open, payload, closeContactFormDrawer}: ContactDrawerPropsType) {
    return (
         <Drawer title={payload ? 'Edit contact' : 'Add contact'}
                 placement='bottom'
                 width={500}
                 height={285}
                 getContainer={false}
                 onClose={closeContactFormDrawer}
                 open={open}
                 extra={
                   <Space>
                     <Button onClick={closeContactFormDrawer}>Cancel</Button>
                     <Button type="primary" onClick={closeContactFormDrawer}>Save</Button>
                   </Space>
                 }
          >
          <ContactForm payload={payload}/>
        </Drawer>
    )
}

export {ContactDrawer}