import React, { useEffect, useState } from "react";
import { OwnerForm } from "./OwnerDetails";
import { HotelDetails } from "./HotelDetails";
import AddressForm from "./HotelAddressForm";
import { useContextValue } from "../../Context/Contect";
import { addHotel, updateHotel } from "../../api-service/HotelServices";
import { AlertToastMessage } from "../../Element/Alert";
import { useForm } from "react-hook-form";
import _ from "lodash";
const hotelEnfoObj = {
  hotel_name: "",
  hotel_type: "",
  hotel_category: "",
  hotel_image: "",
  type_of_room: [],
  description: "Hello Upendra pALK",
  is_verified: true,
};

const hotleAddresObj = {
  city: "",
  state: "",
  country: "",
  zipcode: "",
  locality: "",
  type: "",
  landmark: "",
};

const ownerInfoObj = {
  full_name: "",
  gender: "male",
  email: "",
  contact_number: "",
};
export const HotelForm = ({ onClose, hotel = {} }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const isEdit = _.size(hotel);
  const hotelInformationsObj = {
    hotel_name: hotel?.hotel_name || "",
    hotel_type: hotel?.hotel_type || "",
    hotel_category: hotel?.hotel_category || "",
    hotel_image: hotel?.hotel_image || "",
    type_of_room: hotel?.type_of_room || "",
    description: hotel?.description || "",
    is_verified: hotel?.is_verified || true,
  };
  const { imageUrl, GetHoletList } = useContextValue();
  const [errorMessage, setErrorMessage] = useState("");
  const [formTypeList] = useState([
    "hotel_details",
    "address",
    "owner_details",
  ]);
  const [activeForm, setActiveForm] = useState(0);
  const [hotelInfo, setHotelInfo] = useState(
    hotelInformationsObj || hotelEnfoObj
  );

  // Address form states
  const [hotelAddress, setHotelAddress] = useState(
    hotel?.hotel_address || hotleAddresObj
  );

  // Owner form states
  const [ownerInfo, setOwnerInfo] = useState(hotel?.owner_info || ownerInfoObj);

  const { showToast } = AlertToastMessage();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const completeHotelDetails = {
      ...hotelInfo,
      hotel_image: imageUrl,
      owner_info: ownerInfo,
      hotel_address: hotelAddress,
    };

    try {
      const result = await addHotel(completeHotelDetails);
      if (result.status === true || result.status === 200) {
        showToast(
          "New Hotel Added",
          `Hotel Added successfully`,
          "success",
          "top"
        );
        onClose();
        GetHoletList();
      } else {
        showToast(
          "Failed to add hotel",
          `Failed to add hotel try again some time`,
          "error",
          "top"
        );
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const HandelEditHotel = async () => {
    try {
      const completeHotelDetails = {
        ...hotelInfo,
        owner_info: ownerInfo,
        hotel_address: hotelAddress,
      };
      const data = await updateHotel(completeHotelDetails, hotel?._id);

      if (data?.data?.status && data?.status == 200) {
        showToast(
          "Hotel updated success",
          `Hotel has been updated successfully`,
          "success",
          "top"
        );
        GetHoletList();
        onClose();
      } else {
        showToast(
          "Hotel updated failed",
          "hotel edit error check you token",
          "error",
          "top"
        );
      }
    } catch (error) {
      console.log("error in hotelfor", error);
      showToast("Hotel updated failed", error?.data?.message, "error", "top");
    }
  };

  const validateForm = () => {
    let message = "";
    if (activeForm === 0) {
      if (
        hotelInfo.hotel_name &&
        hotelInfo.hotel_type &&
        hotelInfo.hotel_category
      )
        message = "Please fill the following required fields";
    }
    if (activeForm === 1) {
      if (
        hotelAddress.city &&
        hotelAddress.state &&
        hotelAddress.country &&
        hotelAddress.zipcode
      )
        message = "Please fill the following required fields";
    }

    if (activeForm === 2) {
      if (ownerInfo.full_name && ownerInfo.email && ownerInfo.contact_number)
        message = "Please fill the following required fields";
    }
    setErrorMessage(message);
    return message.length == 0 ? false : true;
  };

  const handleNextForm = (data) => {
    if (!validateForm()) {
      showToast(
        "Validation alert",
        "Please fill the following required fields",
        "error",
        "top"
      );
    }
    if (validateForm() && activeForm < formTypeList.length - 1) {
      setActiveForm((prev) => prev + 1);
    }
  };

  const handlePrevForm = () => {
    console.log({
      ...hotelInfo,
      hotel_image: imageUrl,
      owner_info: ownerInfo,
      hotel_address: hotelAddress,
    });

    if (activeForm > 0) {
      setActiveForm((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-4">
      <form
        onSubmit={handleSubmitForm}
        className="rounded-lg w-full space-y-6 p-6 bg-white shadow-lg"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {activeForm == 0
            ? "Add hotel details"
            : activeForm == 1
            ? "Add Address"
            : "Add owner details"}
        </h1>

        <div className="grid lg:grid-cols-1 gap-6">
          {activeForm === 0 && (
            <div className="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-md">
              <HotelDetails
                hotelInfo={hotelInfo}
                setHotelInfo={setHotelInfo}
                register={register}
                errors={errors}
              />
            </div>
          )}

          {activeForm === 1 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <AddressForm
                setAddress={setHotelAddress}
                address={hotelAddress}
              />
            </div>
          )}

          {activeForm === 2 && (
            <div className="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Owner Details
              </h2>
              <OwnerForm setOwnerInfo={setOwnerInfo} ownerInfo={ownerInfo} />
            </div>
          )}

          <div className="flex gap-4">
            {activeForm > 0 && (
              <button
                onClick={handlePrevForm}
                type="button"
                className="w-[100px] bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
              >
                Prev
              </button>
            )}

            {activeForm < formTypeList.length - 1 ? (
              <button
                onClick={handleSubmit(handleNextForm)}
                type="button"
                className={`w-[100px] bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold`}
              >
                Next
              </button>
            ) : isEdit ? (
              <button
                type="button"
                onClick={HandelEditHotel}
                className="w-[100px] bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
              >
                Save
              </button>
            ) : (
              <button
                type="submit"
                className="w-[100px] bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
