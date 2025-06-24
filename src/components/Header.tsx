import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { AsyncThunkMap, AsyncThunkType } from "../store/slices/contactSlice";
import { useDispatch } from "react-redux";

type HeaderPropsType = {
    addNewContact: () => void
}

const { Search } = Input;

function Header({addNewContact}: HeaderPropsType) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AsyncThunkMap.get(AsyncThunkType.FETCH_CONTACTS)(debouncedSearchTerm));
    }, [debouncedSearchTerm]);

    return (
        <header className="flex justify-between gap-2">
            <Search placeholder="search..." 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    allowClear={true}
                    />
            <Button shape="circle" icon={<PlusCircleOutlined size={40}/>} onClick={() => addNewContact()}/>
        </header>
    )
}

export {Header}