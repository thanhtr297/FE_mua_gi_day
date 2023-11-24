import {useState} from "react";

export default function Demo() {
    const [inputList, setInputList] = useState([""]);

    // Xử lý sự kiện thay đổi giá trị đầu vào
    const handleInputChange = (e, index) => {
        const {value} = e.target;
        const list = [...inputList];
        list[index] = value;
        setInputList(list);
    };

    // Xử lý sự kiện nhấp nút Xoá
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // Xử lý sự kiện nhấp nút Thêm
    const handleAddClick = () => {
        setInputList([...inputList, ""]);
    };

    return (
        <div className="container">
            <h3>Tùy chọn</h3>
            <input
                placeholder="Nhập tùy chọn"
            />
                         {inputList.map((value, i) => {
                return (
                    <div className="box" key={i}>
                        <input
                            placeholder="Nhập nội dung"
                            value={value}
                            onChange={(e) => handleInputChange(e, i)}
                        />
                        <div className="btn-box">
                            {inputList.length !== 1 && (
                                <button className="mr10" onClick={() => handleRemoveClick(i)}>
                                    Xoá
                                </button>
                            )}
                            {inputList.length - 1 === i && (
                                <button onClick={handleAddClick}>Thêm</button>
                            )}
                        </div>
                    </div>
                );
            })}
            <div style={{marginTop: 20}}>{JSON.stringify(inputList)}</div>
        </div>
    );
}
