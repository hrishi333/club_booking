import React, {useState} from "react";
import {Button, Modal, Upload, message} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";

const AddClubMdal: React.FC<{
    onShow: boolean;
    handleCancel: () => void;
    onSubmit: (data: any) => void;
}> = ({onSubmit, onShow, handleCancel}) => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        time: "",
        location: "",
        facilities: [],
        image: null as string | ArrayBuffer | null,
    });

    const [errors, setErrors] = useState({
        name: "",
        price: "",
        time: "",
        location: "",

    });

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];

        // Check if a file is selected
        if (selectedFile) {
            // Check file type
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (allowedTypes.includes(selectedFile.type)) {
                // Check file size (500KB limit)
                if (selectedFile.size <= 500 * 1024) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        if (e.target) {
                            // e.target.result contains the base64 data URL of the image
                            const imageDataUrl = e.target.result;
                            setFormData({...formData, image: imageDataUrl});
                            setImage(imageDataUrl);
                        }
                    };

                    reader.readAsDataURL(selectedFile);
                } else {
                    toast.error("Image size should be less than 500KB", {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "light",
                    })
                }
            } else {
                toast.error("Unsupported file type. Please select a JPEG, PNG, or GIF image.", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light",
                })
            }
        }
    };

    const handleSubmit = () => {
        console.log(formData, "data");

        const validationErrors = {
            name: "",
            price: "",
            time: "",
            location: "",

        };

        if (!formData.name) {
            validationErrors.name = 'name is required';
        }

        if (!formData.price) {
            validationErrors.price = 'price is required';
        }
        if (!formData.time) {
            validationErrors.time = 'time is required';
        }
        if (!formData.location) {
            validationErrors.location = 'location is required';
        }

        setErrors(validationErrors);
        console.log(validationErrors,"list err");
        console.log(Object.values(validationErrors).every((error) => !error),"check")
        if (Object.values(validationErrors).every((error) => !error)) {
            onSubmit(formData);
            setFormData({
                name: "",
                price: "",
                time: "",
                location: "",
                facilities: [],
                image: null,
            });
            handleCancel();
        }
    };

    const handleFacilitiesChange = (e: any) => {
        const inputValue = e.target.value;
        // Split the input by commas and trim any extra spaces
        const facilitiesArray = inputValue.split(',').map((facility: string) => facility.trim());
        // Update the formData with the new array
        setFormData({...formData, facilities: facilitiesArray});
    };

    return (
        <Modal
            title="Add Club"
            footer={false}
            visible={onShow}
            okText={"Submit"}
            onOk={handleSubmit}
            onCancel={handleCancel}
        >
            <div className="inset-0 flex w-full  z-50">
                <div className="bg-white w-full">
                    <div className="flex flex-col gap-y-2  w-full">
            <span className="w-full">
              <label className="text-black mb-2 font-semibold">Club Name</label>
              <input
                  value={formData.name}
                  onChange={(e) =>
                      setFormData({...formData, name: e.target.value})
                  }
                  type="text"
                  required
                  placeholder="Club Name"
                  className="w-full px-3 py-2 border border-[#e5e5e5] text-black text-gray-700 bg-[#f7f7f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
            </span>
                        {errors.name && <p className='text-red-500'>{errors.name}</p>}


                        <span>
              <label className="text-black mb-2 font-semibold">Price</label>
              <input
                  value={formData.price}
                  onChange={(e) =>
                      setFormData({...formData, price: e.target.value})
                  }
                  type="number"
                  required
                  placeholder="Price"
                  className="w-full px-3 py-2 border border-[#e5e5e5] text-black text-gray-700 bg-[#f7f7f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
            </span>
                        {errors.price && <p className='text-red-500'>{errors.price}</p>}


                        <span>
              <label className="text-black mb-2 font-semibold">Date</label>
              <input
                  value={formData.time}
                  onChange={(e) =>
                      setFormData({...formData, time: e.target.value})
                  }
                  type="date"
                  required
                  placeholder="Select Date"
                  className="w-full px-3 py-2 border border-[#e5e5e5] text-black text-gray-700 bg-[#f7f7f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
            </span>
                        {errors.time && <p className='text-red-500'>{errors.time}</p>}

                        <span>
              <label className="text-black mb-2 font-semibold">Location</label>
              <input
                  value={formData.location}
                  onChange={(e) =>
                      setFormData({...formData, location: e.target.value})
                  }
                  type="text"
                  required
                  placeholder="Enter Location"
                  className="w-full px-3 py-2 border border-[#e5e5e5] text-black text-gray-700 bg-[#f7f7f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
            </span>
                        {errors.location && <p className='text-red-500'>{errors.location}</p>}

                        <span>
              <label className="text-black mb-2 font-semibold">
                Facilities
              </label>
              <input
                  value={formData.facilities.join(", ")} // Join the array for display
                  onChange={handleFacilitiesChange}
                  type="text"
                  required
                  placeholder="Enter Facilities (comma-separated)"
                  className="w-full px-3 py-2 border border-[#e5e5e5] text-black text-gray-700 bg-[#f7f7f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
            </span>
                        <span className="flex flex-col">
              <label className="text-black mb-2 font-semibold">
                Upload Image
              </label>
              <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border border-gray-300 p-2 rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:border-blue-500"
              />
              <span className="pt-5">
                {image && (
                    <img
                        src={image as string | undefined}
                        className="object-contain h-20 "
                        alt={"Iname"}
                    />
                )}
              </span>
            </span>
                    </div>

                    <div className="flex justify-end m-2 pt-5 ">
                        <Button type={"text"} className={""} onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            type={"primary"}
                            className={"bg-blue-500"}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AddClubMdal;
