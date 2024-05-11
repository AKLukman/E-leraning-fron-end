import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "../Modal/zustand";

import AuthContext from "../../Firebase/AuthContext";
import InfoForm from "./InfoForm";
import AddressForm from "./AddressForm";
import PassForm from "./PassForm";
import { useImageController } from "../api/zustand";
const ProfileEdit = () => {
  const [mode, setMode] = useState(1);

  const { userInfo, updateUserInfo, updatePassword } = useContext(AuthContext);
  const {
    isLoading: imageLoading,
    progress,
    imageUrl,
    uploadImage,
    removeImage,
  } = useImageController();
  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    reset: resetInfo,
    formState: { errors: errorsInfo },
  } = useForm();

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    reset: resetPass,
    formState: { errors: errorsPass },
  } = useForm();
  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    setValue,
    watch,
    reset: resetAddress,
    formState: { errors: errosAddress },
  } = useForm({
    defaultValues: {
      presentAddress: {
        country: "",
        city: "",
        street: "",
      },
      permanentAddress: {
        country: "",
        city: "",
        street: "",
      },
    },
  });

  const handleSwitchMode = (mode) => {
    setMode(mode);

    if (mode === 1) {
      resetPass();
      resetAddress();
    } else if (mode === 2) {
      resetInfo();
      resetPass();
    } else if (mode === 3) {
      resetAddress();
      resetInfo();
    }
  };
  const { closeModal } = useModal();
  const onSubmitInfo = async (data) => {
    console.log(Object.keys(data).length);
    if (imageUrl) {
      console.log("nai");
    }
    const body = {
      name: data?.name || userInfo?.name,
      phone: data?.phone || userInfo?.phone,
      image: imageUrl || userInfo?.image,
      email: userInfo?.email,
      role: userInfo?.role,
    };
    if (Object.keys(data).length > 0) {
      await updateUserInfo(userInfo?._id, body);
      closeModal();
      resetInfo();
      useImageController.setState({ imageUrl: null });
    }
  };
  const onSubmitPass = async (data) => {
    const body = {
      newPassword: data?.newPassword,
    };
    await updatePassword(userInfo?._id, body);
    resetPass();
    closeModal();
  };
  const onSubmitAddress = async (data) => {
    const body = {
      address: {
        presentAddress: {
          country:
            data?.presentAddress?.country ||
            userInfo?.address?.presentAddress?.country,
          city:
            data?.presentAddress?.city ||
            userInfo?.address?.presentAddress?.city,
          street:
            data?.presentAddress?.street ||
            userInfo?.address?.presentAddress?.street,
        },
        permanentAddress: {
          country:
            data?.permanentAddress?.country ||
            userInfo?.address?.permanentAddress?.country,
          city:
            data?.permanentAddress?.city ||
            userInfo?.address?.permanentAddress?.city,
          street:
            data?.permanentAddress?.street ||
            userInfo?.address?.permanentAddress?.street,
        },
      },
    };
    await updateUserInfo(userInfo?._id, body);
    resetAddress();
    closeModal();
  };
  return (
    <>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => handleSwitchMode(1)}
          className={`btn  btn-xs ${mode === 1 && "btn-success"}`}
        >
          Info
        </button>
        <button
          onClick={() => handleSwitchMode(2)}
          className={`btn  btn-xs ${mode === 2 && "btn-error"} `}
        >
          Address
        </button>
        <button
          onClick={() => handleSwitchMode(3)}
          className={`btn  btn-xs ${mode === 3 && "btn-accent"} `}
        >
          Pass
        </button>
      </div>
      <div className="overflow-y-auto h-5/6">
        {mode === 1 && (
          <InfoForm
            errorsInfo={errorsInfo}
            handleSubmitInfo={handleSubmitInfo}
            registerInfo={registerInfo}
            onSubmitInfo={onSubmitInfo}
          />
        )}
        {mode === 2 && (
          <AddressForm
            registerAddress={registerAddress}
            errosAddress={errosAddress}
            handleSubmitAddress={handleSubmitAddress}
            setValue={setValue}
            watch={watch}
            onSubmitAddress={onSubmitAddress}
          />
        )}
        {mode === 3 && (
          <PassForm
            errorsPass={errorsPass}
            handleSubmitPass={handleSubmitPass}
            onSubmitPass={onSubmitPass}
            registerPass={registerPass}
          />
        )}
      </div>
    </>
  );
};

export default ProfileEdit;
