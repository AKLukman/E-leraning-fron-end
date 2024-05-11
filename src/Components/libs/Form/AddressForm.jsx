import React, { useState } from "react";
import { country } from "../Json/Country";

const AddressForm = ({
  registerAddress,
  handleSubmitAddress,
  setValue,
  watch,
  errosAddress,
  onSubmitAddress,
}) => {
  const [isSameAddress, setIsSameAddress] = useState(false);
  const toggleAddress = () => {
    setValue("permanentAddress", watch("presentAddress"));
    setIsSameAddress(!isSameAddress);
  };
  return (
    <>
      <form
        onSubmit={handleSubmitAddress(onSubmitAddress)}
        className=" flex flex-col gap-2 justify-center items-center mt-4 "
      >
        <p>
          <span className=" font-semibold text-white bg-primary p-2 rounded-lg">
            Present Address
          </span>
        </p>
        <div className="">
          <p>
            <span className="text-lg font-semibold">Country</span>
          </p>
          <select
            className="select input-box"
            {...registerAddress("presentAddress.country", { required: true })}
          >
            {country.map((country) => (
              <option value={country.name} key={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        {errosAddress?.presentAddress?.country && (
          <span className="text-red-600">Country is required</span>
        )}
        <div className="">
          <p>
            <span className="text-lg font-semibold">City</span>
          </p>
          <input
            type="text"
            {...registerAddress("presentAddress.city", { required: true })}
            className="input-box"
          />
        </div>
        {errosAddress?.presentAddress?.city && (
          <span className="text-red-600">city is required</span>
        )}
        <div className="">
          <p>
            <span className="text-lg font-semibold">Street</span>
          </p>
          <input
            type="text"
            {...registerAddress("presentAddress.street", { required: true })}
            className="input-box"
          />
        </div>
        {errosAddress?.presentAddress?.street && (
          <span className="text-red-600">Street is required</span>
        )}

        {!isSameAddress && (
          <div>
            <p className="text-center p-3">
              <span className="font-semibold text-white bg-info p-2 rounded-lg">
                Permanent Address
              </span>
            </p>
            <div className="">
              <p>
                <span className="text-lg font-semibold">Country</span>
              </p>
              <select
                className="select input-box"
                {...registerAddress("permanentAddress.country", {
                  required: true,
                })}
              >
                {country.map((country) => (
                  <option value={country.name} key={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {errosAddress?.permanentAddress?.country && (
              <span className="text-red-600">Country is required</span>
            )}
            <div className="">
              <p>
                <span className="text-lg font-semibold">City</span>
              </p>
              <input
                type="text"
                {...registerAddress("permanentAddress.city", {
                  required: true,
                })}
                className="input-box"
              />
            </div>
            {errosAddress?.permanentAddress?.city && (
              <span className="text-red-600">city is required</span>
            )}
            <div className="">
              <p>
                <span className="text-lg font-semibold">Street</span>
              </p>
              <input
                type="text"
                {...registerAddress("permanentAddress.street", {
                  required: true,
                })}
                className="input-box"
              />
            </div>
            {errosAddress?.permanentAddress?.street && (
              <span className="text-red-600">Street is required</span>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={toggleAddress}
          className={`btn btn-sm ${isSameAddress ? "btn-warning" : "btn-info"}`}
        >
          {!isSameAddress
            ? "Set Present Address as Permanent Address"
            : "Use Different Permanent Address"}
        </button>
        <button className="btn btn-neutral">Submit</button>
      </form>
    </>
  );
};

export default AddressForm;
