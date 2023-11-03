import React, { useState, useEffect } from "react";
import { Button, Table, Space, Modal } from "antd";
import AddClubModal from "./AddClubModal";
import {toast} from "react-toastify";


const AdminTableOfClub: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    time: "",
    location: "",
    facilities: [],
  });

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const handleAdd = (newItemData: any) => {
    setIsModalOpen(false);

    setData([...data, newItemData]);
    toast.success("Your Clud Added Successfully!", {
      position: "top-right",
      autoClose: 3000, // Close the toast after 3 seconds
      theme: "light",
    });
    setNewItem({
      name: "",
      price: "",
      time: "",
      location: "",
      facilities: [],
    });
  };

  useEffect(() => {
    const dataArrayString = JSON.stringify(data);
    if (data.length !== 0) {
      localStorage.setItem("tableData", dataArrayString);
    }
  }, [data]);

  const handleDelete = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    toast.warn("Club Deleted from list", {
      position: "top-right",
      autoClose: 3000, // Close the toast after 3 seconds
      theme: "light",
    })
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

  const columns = [

    {    title: "Image",
      dataIndex: "image",
      key: "image",
      render:(text:string,record:any)=>(
          <div>
            {record.image && (
                <img
                    src={record.image}
                    alt={text}
                    className="object-contain h-20 rounded-md"
                />
            )}
          </div>
      )
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
          <div className="flex text-lg font-medium pt-2">{text}</div>

      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Date",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Facilities",
      dataIndex: "facilities",
      key: "facilities",
      render: (facilities: string[], record: any) => (
          <div>
            {facilities.map((facility, index) => (
                <span key={index} className="mr-2 bg-blue-100 p-2">
            {facility}
          </span>
            ))}
          </div>
      ),

    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any, index: number) => (
        <Space size="middle">
          <button
            onClick={() => handleDelete(index)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className={"flex justify-end "}>
        <Button
          className={"m-4 bg-blue-500"}
          size={"large"}
          type={"primary"}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Club
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.name}
      />

      {isModalOpen && (
        <AddClubModal
          onShow={isModalOpen}
          onSubmit={handleAdd}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default AdminTableOfClub;
