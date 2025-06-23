import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

type HeaderPropsType = {
    addNewContact: () => void
}

const { Search } = Input;

function Header({addNewContact}: HeaderPropsType) {
    
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    }

    return (
        <header className="flex justify-between gap-2">
            <Search placeholder="search..." 
                    onChange={onSearch} 
                    allowClear={true}
                    />
            <Button shape="circle" icon={<PlusCircleOutlined size={40}/>} onClick={() => addNewContact()}/>
        </header>
    )
}

export {Header}