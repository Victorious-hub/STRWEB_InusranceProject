import React, { useState, useEffect } from "react";
import $api from "../../http/index";
import { useParams } from "react-router-dom";
import Input from '../../components/UI/Inputs/Input';
import Button from '../../components/UI/Button/Button';

const AgentProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    affiliateName: "",
    affiliateAddress: "",
    affiliatePhone: "",
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
    tarriffRate: 0,
    salary: 0,
  });
  const [newProfileImage, setNewProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await $api.get(`/internal/agents/${id}`);
        const { affiliate, user, tarriffRate, salary } = response.data;

        setProfileData(response.data);

        setFormData({
          affiliateName: affiliate?.name || "",
          affiliateAddress: affiliate?.address || "",
          affiliatePhone: affiliate?.phone || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          profileImage: user?.profileImage || "",
          tarriffRate: tarriffRate || 0,
          salary: salary || 0,
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
        affiliate: {
          name: formData.affiliateName,
          address: formData.affiliateAddress,
          phone: formData.affiliatePhone,
        },
        tarriffRate: formData.tarriffRate,
        salary: formData.salary,
        user: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
      };

      const formDataToSend = new FormData();
      formDataToSend.append("firstName", updatedData.user.firstName);
      formDataToSend.append("lastName", updatedData.user.lastName);
      formDataToSend.append("email", updatedData.user.email);
      formDataToSend.append("affiliateName", updatedData.affiliate.name);
      formDataToSend.append("affiliateAddress", updatedData.affiliate.address);
      formDataToSend.append("affiliatePhone", updatedData.affiliate.phone);
      formDataToSend.append("tarriffRate", updatedData.tarriffRate);
      formDataToSend.append("salary", updatedData.salary);

      if (newProfileImage) {
        formDataToSend.append("profileImage", newProfileImage);
      }

      await $api.put(`/internal/agents/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfileData((prev) => ({
        ...prev,
        ...updatedData,
        user: { ...prev.user, ...updatedData.user },
        affiliate: { ...prev.affiliate, ...updatedData.affiliate },
      }));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profileData) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Agent Profile</h2>
      {/* <div style={{ marginBottom: "20px" }}>
        <img
          src={formData.profileImage}
          alt="Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
        {editMode && (
          <div>
            <label>
              Change Profile Image:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        )}
      </div> */}
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
          Affiliate Name:
          <Input
            type="text"
            name="affiliateName"
            value={formData.affiliateName}
            onChange={handleInputChange}
            disabled={!editMode}
            readOnly
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Affiliate Address:
          <Input
            type="text"
            name="affiliateAddress"
            value={formData.affiliateAddress}
            onChange={handleInputChange}
            disabled={!editMode}
            readOnly
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Affiliate Phone:
          <Input
            type="text"
            name="affiliatePhone"
            value={formData.affiliatePhone}
            readOnly
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Tarriff Rate:
          <Input
            type="number"
            name="tarriffRate"
            readOnly
            value={formData.tarriffRate}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Salary:
          <Input
            type="number"
            name="salary"
            readOnly
            value={formData.salary}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </label>
      </div>
      <div>
        {/* {editMode ? (
          <>
            <Button onClick={handleUpdate} style={{ marginRight: "10px" }}>
              Save
            </Button>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </>
        ) : (
          <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
        )} */}
      </div>
    </div>
  );
};

export default AgentProfile;
