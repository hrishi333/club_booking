import React, { useState, useEffect } from "react";
import {Card, Button, Modal} from "antd";
import {toast} from "react-toastify";

const { Meta } = Card;

interface CardItem {
  name: string;
  price: string;
  time: string;
  location: string;
  facilities: string[];
  image: string;
}

interface CardListProps {
  data: CardItem[];
}

const CardListData: React.FC<CardListProps> = ({ data }) => {
  const [bookings, setBookings] = useState<CardItem[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));

  }, [bookings]);

  const addBooking = (item: CardItem) => {
    if (!bookings.some((booking) => booking.name === item.name)) {
      setBookings([...bookings, item]);
      toast.success("Your Booking Saved Successfully!", {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        theme: "light",
      });
    }
  };

  const removeBooking = (item: CardItem) => {
    setBookings(bookings.filter((booking) => booking.name !== item.name));
    toast.warn("Booking Canceled", {
      position: "top-right",
      autoClose: 3000, // Close the toast after 3 seconds
      theme: "light",
    })

  };

  const getTotalCount = () => bookings.length;

  const getTotalPrice = () =>
    bookings.reduce((total, booking) => total + parseInt(booking.price, 10), 0);

  return (
    <div>
      <div className="pb-10 flex gap-x-5 items-center">
        <span className="font-medium text-gray-500 text-xl flex gap-x-2">
          Total Bookings: <p className="text-black">{getTotalCount()}</p>
        </span>
        <span className="font-medium text-gray-500 text-xl flex gap-x-2">
          Total Price: <p className="text-black ">{getTotalPrice()}</p>
        </span>
        <span className="font-medium text-gray-500 text-xl flex gap-x-2">
           <Button
               className={"m-4 bg-blue-500"}
               size={"large"}
               type={"primary"}
               onClick={() => setVisible(!visible)}
           >
         View Bookings
        </Button>
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <Card
            key={index}
            hoverable
            cover={<img className="h-60" alt={item.name} src={item.image} />}
            style={{ marginBottom: "20px" }}
          >
            <Meta
              title={item.name}
              description={`Booking Date: ${item.time}`}
            />
            <div className="pt-5 flex gap-x-4">
              <Button
                type="primary"
                className="bg-blue-500"
                onClick={() => addBooking(item)}
                disabled={bookings.some(
                  (booking) => booking.name === item.name
                )}
              >
                Add Booking
              </Button>
              <Button onClick={() => removeBooking(item)}>
                Remove Booking
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
          title="Current Booking Status"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
      >
       <div>
         {
          bookings.length? bookings.map((item,index)=>(
           <Card className="border border-[#898989] my-2">
             <Meta
                 title={item.name}
                 description={`Booking Date: ${item.time}`}

             />
             <p className="py-2">Price:{item.price}</p>
             <p className="py-2">Location:{item.location}</p>
             <p className="py-2 flex items-center">Facilities:{item.facilities.map((item)=>(<p className="p-2 border border-1 bg-blue-100 m-1">{item}</p>))}</p>
           </Card>
         )):<h1 className="text-xl">No Current Booking Found. </h1>

         }
       </div>
      </Modal>
    </div>
  );
};

export default CardListData;
