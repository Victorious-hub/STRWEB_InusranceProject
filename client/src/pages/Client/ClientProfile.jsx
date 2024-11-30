import React, { useState, useEffect } from "react";
import axios from "axios";
import $api from "../../http/index";
import { useParams } from "react-router-dom";
import Input from '../../components/UI/Inputs/Input';
import Button from '../../components/UI/Button/Button';

const ClientProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
    createdAt: "",
    updatedAt: "",
  });
  const [newProfileImage, setNewProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await $api.get(`/public/clients/${id}`);

        let imageUrl;
        try {
            if (!response.data.user.profileImage) {
              response.data.user.profileImage = "/uploads/download.png";
            }
            else{
              response.data.user.profileImage = response.data.user.profileImage.replace("/api/v1/", "");
            }
            const imageResponse = await $api.get(response.data.user.profileImage, { responseType: "blob" });
            imageUrl = URL.createObjectURL(imageResponse.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Profile image not found, using default image.");
                imageUrl = "/path/to/default-image.jpg";
            } else {
                throw error;
            }
        }

        setProfileData(response.data);
        setFormData({
          address: response.data.address,
          phoneNumber: response.data.phoneNumber,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          createdAt: response.data.user.createdAt,
          updatedAt: response.data.user.updatedAt,
          profileImage: imageUrl,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profileImage: previewUrl }));
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        user: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          profileImage: newProfileImage,
        },
      };

      const formDataToSend = new FormData();
      formDataToSend.append("firstName", updatedData.user.firstName);
      formDataToSend.append("lastName", updatedData.user.lastName);
      formDataToSend.append("email", updatedData.user.email);
      formDataToSend.append("address", updatedData.address);
      formDataToSend.append("phoneNumber", updatedData.phoneNumber);
      if (newProfileImage) {
        formDataToSend.append("profileImage", newProfileImage);
      }

      await $api.put(`/public/clients/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });


      setProfileData((prev) => ({
        ...prev,
        ...updatedData,
        user: { ...prev.user, ...updatedData.user },
      }));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profileData) return <p>Loading...</p>;
  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Client Profile</h2>
      <div style={{ marginBottom: "20px" }}>
        <img
          src={formData.profileImage}
          alt="Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
        {/* {editMode && (
          <div>
            <label>
              Change Profile Image:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        )} */}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          First Name:
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Last Name:
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Email:
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Address:
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Phone Number:
          <Input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Created At:
          <Input
            type="string"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleInputChange}
            disabled={!editMode}
            readOnly
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Updated At:
          <Input
            type="string"
            name="updatedAt"
            value={formData.updatedAt}
            onChange={handleInputChange}
            disabled={!editMode}
            readOnly
          />
        </label>
      </div>
      <div>
        {editMode ? (
          <>
            <Button onClick={handleUpdate} style={{ marginRight: "10px" }}>
              Save
            </Button>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </>
        ) : (
          <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
        )}
      </div>
    </div>
  );
};

export default ClientProfile;
