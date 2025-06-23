import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

const { Search } = Input;


function Header() {
    
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    }

    return (
        <header className="flex justify-between gap-2">
            <Search placeholder="search..." 
                    onChange={onSearch} 
                    allowClear={true}
                    />
            <Button shape="circle" icon={<PlusCircleOutlined size={40}/>} />
        </header>
    )
}

export {Header}