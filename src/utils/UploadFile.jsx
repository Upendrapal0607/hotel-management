import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineFileImage } from "react-icons/ai";
import axios from "axios";
import { useContextValue } from "../Context/Contect";
import { base_url } from "../api/api";
import { LoadingButton } from "../Element/LoadingBtn";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { setImageUrl } = useContextValue();
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileUpload = async () => {
    setLoading(true);
    if (!file) {
      setLoading(false);
      setUploadStatus("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${base_url}upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("File uploaded successfully");
      setLoading(false);
      setPreview(res?.data?.image_url);
      setImageUrl(res?.data?.image_url);
      setFile(null);
    } catch (error) {
      console.log("Error accurse");

      setLoading(false);
      console.error("Upload error:", error);
      setUploadStatus("Error during file upload");
    }
  };

  return (
    <div className="flex flex-col items-center rounded-lg space-y-4">
      <div className="flex flex-col items-center">
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex  items-center"
        >
          {preview ? (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border"
              />
            </div>
          ) : (
            <div className="text-gray-500 flex flex-col items-center hover:text-blue-500 transition duration-300">
              <AiOutlineFileImage className="text-4xl" />
              <p className={`${file && "text-blue-600"}mt-2 text-lg`}>
                {file ? "selected click on upload" : "select a photo"}
              </p>
            </div>
          )}
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
      </div>
      {loading ? (
        <LoadingButton />
      ) : (
        <button
          onClick={handleFileUpload}
          type="button"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          <FaCloudUploadAlt className="mr-2" />
          Upload
        </button>
      )}

      {/* Upload Status */}
      {uploadStatus && (
        <p
          className={`${
            uploadStatus === "No file selected"
              ? "text-red-500"
              : "text-blue-700"
          } mt-2`}
        >
          {file ? "selected click on upload" : uploadStatus}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
