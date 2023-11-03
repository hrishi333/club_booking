import React from "react";
import Home from "./Home";
import AdminTableOfClub from "../components/AdminTableOfClub";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function AdminView() {
  const router = useNavigate();
  return (
    <div className="flex flex-col w-full  h-screen px-20 pt-5">
      <div className="">
        <span className="py-10 pl-10">
          <Breadcrumb
            items={[
              {
                href: "",
                title: <HomeOutlined onClick={() => router("/")} />,
              },

              {
                title: "Admin Panel",
              },
            ]}
          />
        </span>

        <h1 className="text-2xl font-bold flex justify-center">Admin Panel</h1>
      </div>
      <AdminTableOfClub />
    </div>
  );
}

export default AdminView;
