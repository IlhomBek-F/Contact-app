import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, List, message, Popconfirm } from 'antd';
import type { ContactType } from '../core/models/ContactModel';
import { useDispatch, useSelector } from 'react-redux';
import type { StateModel } from '../core/models/StateModel';
import { useEffect } from 'react';
import { AsyncThunkMap, AsyncThunkType } from '../store/slices/contactSlice';



type ContentPropsType = {
    openContactFormDrawer: (payload: ContactType) => void
}

function Content({openContactFormDrawer}: ContentPropsType) {
    const dispatch = useDispatch<any>();
    const  loading = useSelector((state: StateModel) => state.loadingContacts);
    const  contacts = useSelector((state: StateModel) => state.contacts);
    
    const confirm = () => {
      message.info('Clicked on Yes.');
    };

    useEffect(() => {
      dispatch(AsyncThunkMap.get(AsyncThunkType.FETCH_CONTACTS)());
    }, [])

    return (
        <section>
          {loading && <span>Loading...</span> || <List itemLayout="horizontal"
                 dataSource={contacts}
                 renderItem={item => (
                   <List.Item actions={[
                        <Button shape="circle" icon={<EditOutlined />} onClick={() => openContactFormDrawer(item)}/>,
                        <Popconfirm placement="bottomRight"
                                    title='Are you sure to delete this contact?'
                                    onConfirm={confirm}
                                    okText="Yes"
                                    cancelText="No">
                                    <Button shape="circle" danger icon={<DeleteOutlined />}/>
                        </Popconfirm>
                     ]}>
                     <List.Item.Meta
                       avatar={<Avatar className='!text-[#f56a00] !bg-[#fde3cf]'>{item.name && item.name[0]}</Avatar>}
                       title={item.name}
                       description={<div className='flex flex-col'>
                                     <span>{item.email}</span>
                                     <span>{item.phone}</span>
                                   </div>}
                     />
            </List.Item>
        )}/>}
           
        </section>
    )
}

export {Content}