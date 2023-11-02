import React, { useState, useEffect } from 'react';
import AddClubMdal from "./AddClubModal";
import {Button} from "antd";

const AdminTableOfClub: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        time: '',
        location: '',
        facilities: [],
    });

    useEffect(() => {
        // Load data from local storage on component mount
        const storedData = localStorage.getItem('tableData');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    const handleAdd = (newItemData: any) => {

        setData([...data, newItemData]);

        setNewItem({
            name: '',
            price: '',
            time: '',
            location: '',
            facilities: [],
        });
        // Close the modal
        setIsModalOpen(false);
    };

    useEffect(()=>{
        console.log(data,"datttt");
        const dataArrayString = JSON.stringify(data)
        if(data.length){
            localStorage.setItem('tableData',dataArrayString);
        }
    },[data])

    const handleDelete = (index: number) => {
        const updatedData = [...data];
        updatedData.splice(index, 1);
        setData(updatedData);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    console.log(data,"dataaa");


    return (
        <div>

            <h1 className={"text-3xl flex justify-center font-bold"}>Admin Panel</h1>
            <div className={"flex justify-end "}>

                <Button className={" m-4 bg-blue-500 "} size={"large"} type={"primary"} onClick={() => setIsModalOpen(!isModalOpen)}>Add New Item</Button>
            </div>


            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse shadow-md rounded-md">
                    {/* Table headers */}
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Time</th>
                        <th className="py-3 px-6 text-left">Location</th>
                        <th className="py-3 px-6 text-left">Facilities</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-3 px-6">{item?.name}</td>
                            <td className="py-3 px-6">{item?.price}</td>
                            <td className="py-3 px-6">{item?.time}</td>
                            <td className="py-3 px-6">{item?.location}</td>
                            <td className="py-3 px-6">{item?.facilities}</td>
                            <td className="py-3 px-6">
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>




            {isModalOpen && <AddClubMdal onShow={isModalOpen} onSubmit={handleAdd}  handleCancel={handleCancel}   />}

        </div>
    );
};

export default AdminTableOfClub;
