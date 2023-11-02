import React, { useState } from 'react';
import {Button, Modal} from "antd";

const AddClubMdal: React.FC<{ onShow:boolean,handleCancel:() => void,onSubmit: (data: any) => void; }> = ({ onSubmit,onShow,handleCancel }) => {

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        time: '',
        location: '',
        facilities: [],
    });

    const handleSubmit = () => {
        console.log(formData);
        onSubmit(formData);
        setFormData({
            name: '',
            price: '',
            time: '',
            location: '',
            facilities: [],
        });
        handleCancel();
    };

    const handleFacilitiesChange = (e:any) => {
        const selectedFacilities = e.target.value.split(',').map((facility:string) => facility.trim());
        setFormData({ ...formData, facilities: selectedFacilities });
    };


    return (


            <Modal title="Add Club" footer={false} open={onShow} okText={"submit"} onOk={handleSubmit} onCancel={handleCancel}>
                <div className=" inset-0 flex  w-full justify-center z-50">
                    <div className="bg-white">

                        <label className="text-black mb-2 font-semibold">
                            Club Name
                        </label>
                        <input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            type="text"
                            required
                            placeholder="Club Name"
                            className="w-full px-3 py-2 border border-[#e5e5e5] text-black text-gray-700 bg-[#f7f7f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        />
                        <label className="text-black mb-2 font-semibold">
                           Price
                        </label>
                        <input
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            type="number"
                            required
                            placeholder="Price"
                            className="w-full px-3 py-2 border border-[#e5e5e5] text-black text-gray-700 bg-[#f7f7f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        />

                        <label className="text-black mb-2 font-semibold">
                            Date
                        </label>
                        <input
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            type="date"
                            required
                            placeholder="Select Date"
                            className="w-full px-3 py-2 border border-[#e5e5e5] text-black text-gray-700 bg-[#f7f7f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        />

                        <label className="text-black mb-2 font-semibold">
                            Location
                        </label>
                        <input
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            type="text"
                            required
                            placeholder="Enter Location"
                            className="w-full px-3 py-2 border border-[#e5e5e5] text-black text-gray-700 bg-[#f7f7f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        />

                        <label className="text-black mb-2 font-semibold">Facilities</label>
                        <input
                            value={formData.facilities.join(', ')} // Join the array for display
                            onChange={handleFacilitiesChange}
                            type="text"
                            required
                            placeholder="Enter Facilities (comma-separated)"
                            className="w-full px-3 py-2 border border-[#e5e5e5] text-black text-gray-700 bg-[#f7f7f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        />
                        {/* Repeat similar input fields for other properties */}

                      {/*  <button onClick={handleSubmit}>Submit</button>*/}
                        <div className="flex justify-end m-2 pt-5 ">

                            <Button type={"text"} className={""} onClick={handleCancel}>Cancel</Button>
                            <Button  type={"primary"} className={"bg-blue-500"} onClick={handleSubmit}>Submit</Button>
                        </div>
                    </div>
                </div>
            </Modal>


    );
};

export default AddClubMdal;
