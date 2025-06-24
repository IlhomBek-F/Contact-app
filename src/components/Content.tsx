import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Popconfirm, Skeleton } from 'antd';
import type { ContactType } from '../core/models/ContactModel';
import { useDispatch, useSelector } from 'react-redux';
import type { StateModel } from '../core/models/StateModel';
import { useEffect } from 'react';
import { AsyncThunkMap, AsyncThunkType } from '../store/slices/contactSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useMessageProvider } from '../contexts/MessageProvider';

type ContentPropsType = {
    openContactFormDrawer: (payload: ContactType) => void
}

function Content({openContactFormDrawer}: ContentPropsType) {
    const {callAsyncMessage} = useMessageProvider() as any

    const dispatch = useDispatch<any>();
    const loading = useSelector((state: StateModel) => state.loadingContacts);
    const contacts = useSelector((state: StateModel) => state.contacts);
    
    const confirm = (id: number) => {
      const hideMessage = callAsyncMessage("Deleting contact...", "Succees. Contact deleted")
      dispatch(AsyncThunkMap.get(AsyncThunkType.DELETE_CONTACT)(id))
       .then(unwrapResult)
       .then(hideMessage)
    };

    useEffect(() => {
      dispatch(AsyncThunkMap.get(AsyncThunkType.FETCH_CONTACTS)());
    }, [])

    return (
        <section>
          <List itemLayout="horizontal"
                 dataSource={(loading ? [1,2,3,4] : contacts) as ContactType[]}
                 renderItem={item => (
                   <List.Item actions={!loading ? [
                        <Button shape="circle" icon={<EditOutlined />} onClick={() => openContactFormDrawer(item)}/>,
                        <Popconfirm placement="bottomRight"
                                    title='Are you sure to delete this contact?'
                                    okText="Yes"
                                    onConfirm={() => confirm(item.id)}
                                    cancelText="No">
                                    <Button shape="circle" danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                     ] : undefined}>
                     <Skeleton loading={loading} active avatar >
                     <List.Item.Meta avatar={<Avatar className='!text-[#f56a00] !bg-[#fde3cf]'>{item.name && item.name[0]}</Avatar>}
                                     title={item.name}
                                     description={<div className='flex flex-col'>
                                                <span>{item.email}</span>
                                                <span>{item.phone}</span>
                                           </div>}/>
                    </Skeleton>
            </List.Item>
        )}/>
        </section>
    )
}

export {Content}