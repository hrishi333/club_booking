import CardList from "./CardListData";
import { useState, useEffect } from "react";

interface CardItem {
  name: string;
  price: string;
  time: string;
  location: string;
  facilities: string[];
  image: string;
}

const Customer: React.FC = () => {
  const [data, setData] = useState<CardItem[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);
  return (
    <div className="p-4">
      <CardList data={data} />
    </div>
  );
};

export default Customer;
