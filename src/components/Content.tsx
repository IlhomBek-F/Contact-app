import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, List, message, Popconfirm } from 'antd';

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

type ContentPropsType = {
    openContactFormDrawer: () => void
}

function Content({openContactFormDrawer}: ContentPropsType) {
    
    const confirm = () => {
      message.info('Clicked on Yes.');
    };

    const itemAction = {
    edit: <Button shape="circle" icon={<EditOutlined />} onClick={openContactFormDrawer}/>,
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
        </section>
    )
}

export {Content}