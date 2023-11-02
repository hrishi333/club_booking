import React from 'react';
import Home from "./Home";
import AdminTableOfClub from "../components/AdminTableOfClub";

function AdminView() {
    return (
        <div className="flex flex-col w-full  h-screen px-20 pt-5">
            <AdminTableOfClub/>
        </div>
    );
}

export default AdminView;