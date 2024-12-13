import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { urlImage } from "../../../../config";
import avatarDefault from "../../../../assets/imgs/—Pngtree—cartoon hand drawn default avatar_7127563.png";
import customerService from "../../../../service/CustomerService";
import Swal from "sweetalert2";
import ProfileSidebar from "../../../../components/ProfileSidebar";

// Thêm các hằng số
export const IMAGE_DIMENSIONS = {
  width: "150px",
  height: "150px",
};

export const EDITOR_CONFIG = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "blockQuote",
    "insertTable",
    "undo",
    "redo",
  ],
};
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});
export default function MyAccount() {
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [cropData, setCropData] = useState("");
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(1);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await customerService.getCurrentCustomer();
        setCustomer(response.data.data); // Giả sử API trả về data trong response.data.data
        setEmail(response.data.data.email);
        setFullName(response.data.data.name);
        setPhoneNumber(response.data.data.phone_number);
        setAddress(response.data.data.address);
        setGender(response.data.data.gender);
        setAvatar(response.data.data.avatar);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);
  // Xử lý khi chọn ảnh

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1]; // Lấy mime type từ chuỗi base64
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    // Sử dụng mime type thực tế của file
    return new File([u8arr], filename, { type: mime });
  };
  // Xử lý khi cắt ảnh
  const getCropData = () => {
    if (cropper) {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      setShowCropper(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const profileData = new FormData();
    if (cropData) {
      const avatarFile = dataURLtoFile(cropData, "avatar.png");
      profileData.append("avatar", avatarFile);
    }

    profileData.append("name", fullName);
    profileData.append("phone_number", phoneNumber);
    profileData.append("address", address);
    profileData.append("gender", 1);

    const response = await customerService.updateCurrentUser(profileData);
    if (response.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Update profile successfully",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message || "Update profile failed",
      });
    }
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <ProfileSidebar />
          <div className="col-lg-9 col-md-9 col-12">
            <div className="profile-container">
              <div className="account-container">
                <div className="account-breadcrumb">
                  <Link href="#"> Home </Link>
                  <i className="fas fa-chevron-right"> </i>
                  <span> User profile </span>
                </div>
                <h4>Profile</h4>
                <hr />
                <form onSubmit={handleUpdateProfile}>
                  <div className="account-form-group">
                    <label htmlFor="email"> Email </label>
                    <input
                      disabled
                      id="email"
                      type="email"
                      defaultValue={email}
                    />
                  </div>
                  <div>
                    <label htmlFor="avatar">Avatar</label>
                    <div>
                      <div className="mb-1">
                        <img
                          src={cropData || urlImage + avatar}
                          alt="cropped"
                          className="img-fluid mt-2"
                          style={{
                            width: IMAGE_DIMENSIONS.width,
                            height: IMAGE_DIMENSIONS.height,
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                      <label
                        style={{ width: "fit-content" }}
                        className="p-2 ms-3 btn btn-info btn-sm text-white my-3"
                        htmlFor="avatar"
                      >
                        <small>CHOOSE AVATAR</small>
                      </label>
                      <input
                        type="file"
                        className="form-control d-none"
                        id="avatar"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>

                    {/* Modal Cropper */}
                    {showCropper && (
                      <div
                        className="modal fade show"
                        style={{
                          display: "block",
                          backgroundColor: "rgba(0,0,0,0.5)",
                        }}
                      >
                        <div className="modal-dialog modal-lg">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Crop Image</h5>
                              <button
                                type="button"
                                className="close"
                                onClick={() => setShowCropper(false)}
                              >
                                <span>&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <Cropper
                                style={{ height: 400, width: "100%" }}
                                initialAspectRatio={1}
                                aspectRatio={1}
                                preview=".img-preview"
                                src={image}
                                viewMode={1}
                                guides={true}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false}
                                onInitialized={(instance) => {
                                  setCropper(instance);
                                }}
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowCropper(false)}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="btn btn-info"
                                onClick={getCropData}
                              >
                                Crop & Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="account-form-group">
                    <label htmlFor="full-name">
                      Full name
                      <span className="required"> * </span>
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="account-form-group">
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                      id="phone_number"
                      type="text"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="account-form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      id="address"
                      type="text"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="account-form-group">
                    <button className="btn" type="submit">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
