import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, List, message, Popconfirm, Space } from 'antd';
import { useState } from 'react';
import { ContactForm, type ContactFormMode } from '../shared/ContactForm';
import type { ContactType } from '../models/ContactModel';

type ContactFormDrawerState = {
  open: boolean;
  mode: ContactFormMode | null;
  payload?: ContactType;
};

const initialContactFormDrawerState: ContactFormDrawerState = {
  open: false,
  mode: null,
  payload: undefined,
};

const data = [
  {
    title: 'John',
  },
  {
    title: 'Doe',
  },
  {
    title: 'Susan',
  },
  {
    title: 'Eric',
  },
];

function Content() {
    const [contactFormDrawerState, setContactFormDrawerState] = useState<ContactFormDrawerState>(initialContactFormDrawerState);
    
    const confirm = () => {
      message.info('Clicked on Yes.');
    };

    const openContactFormDrawer = (mode: ContactFormMode | null, payload?: ContactType) => {
         setContactFormDrawerState({open: true, mode, payload})
    }

    const closeContactFormDrawer = () => {
        setContactFormDrawerState(initialContactFormDrawerState)
    }

    const itemAction = {
    edit: <Button shape="circle" icon={<EditOutlined />} onClick={() => openContactFormDrawer('edit')}/>,
    delete: <Popconfirm
        placement="bottomRight"
        title='Are you sure to delete this contact?'
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button shape="circle" danger icon={<DeleteOutlined />}/>
      </Popconfirm>
}

    return (
        <section className='overflow-hidden relative'>
           <List itemLayout="horizontal"
                 dataSource={data}
                 renderItem={item => (
                   <List.Item actions={[itemAction.edit, itemAction.delete]}>
                     <List.Item.Meta
                       avatar={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{item.title[0]}</Avatar>}
                       title={<a href="https://ant.design">{item.title}</a>}
                       description={<div className='flex flex-col'>
                        <span>example@gmail.com</span>
                        <span>888281211</span>
                       </div>}
                     />
            </List.Item>
        )}/>
        <Drawer
        title="Drawer with extra actions"
        placement='bottom'
        width={500}
        height={250}
        getContainer={false}
        onClose={closeContactFormDrawer}
        style={{ position: 'absolute' }}
        open={contactFormDrawerState.open}
        extra={
          <Space>
            <Button onClick={closeContactFormDrawer}>Cancel</Button>
            <Button type="primary" onClick={closeContactFormDrawer}>
              OK
            </Button>
          </Space>
        }
      >
        <ContactForm mode='add'/>
      </Drawer>
        </section>
    )
}

export {Content}