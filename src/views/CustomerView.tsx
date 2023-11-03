import React from "react";
import Customer from "../components/Customer";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function CustomerView() {
  const router = useNavigate();
  return (
    <div className="flex flex-col   ">
      <div className="px-10">
        <span className="py-10 pl-10">
          <Breadcrumb
            items={[
              {
                href: "",
                title: <HomeOutlined onClick={() => router("/")} />,
              },

              {
                title: "Customer Panel",
              },
            ]}
          />
        </span>

        <h1 className="text-2xl font-bold flex justify-center">
          Customers Panel
        </h1>
      </div>

      <Customer />
    </div>
  );
}

export default CustomerView;
