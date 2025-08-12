"use client";
import React, { useState, ChangeEvent } from "react";
import Input, { InputProps } from "@/components/Input";
import { GiTwirlyFlower } from "react-icons/gi";

const InputPage = () => {
  const [type, setType] = useState<InputProps["type"]>("text");
  const [showLabel, setShowLabel] = useState(false);
  const [labelPlacement, setLabelPlacement] =
    useState<InputProps["labelPlacement"]>("row");
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [required, setRequired] = useState(false);
  const [state, setState] = useState<InputProps["state"]>("none");
  const [showIcon, setShowIcon] = useState(false);
  const [iconPlacement, setIconPlacement] =
    useState<InputProps["iconPlacement"]>("end");
  const [size, setSize] = useState<InputProps["size"]>("md");
  const [inputValue, setInputValue] = useState("");

  const selectOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  // Handler functions
  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as InputProps["type"]);
  };

  const handleShowLabelToggle = () => {
    setShowLabel((prev) => !prev);
  };

  const handleLabelPlacementChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLabelPlacement(e.target.value as InputProps["labelPlacement"]);
  };

  const handleShowPlaceholderToggle = () => {
    setShowPlaceholder((prev) => !prev);
  };

  const handleRequiredToggle = () => {
    setRequired((prev) => !prev);
  };

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value as InputProps["state"]);
  };

  const handleShowIconToggle = () => {
    setShowIcon((prev) => !prev);
  };

  const handleIconPlacementChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setIconPlacement(e.target.value as InputProps["iconPlacement"]);
  };

  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value as InputProps["size"]);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputValue(e.target.value);
  };

  const renderTypeOptions = () =>
    ["text", "number", "select"].map((s) => (
      <option key={s} value={s}>
        {s}
      </option>
    ));

  const renderLabelPlacementOptions = () =>
    ["row", "column"].map((s) => (
      <option key={s} value={s}>
        {s}
      </option>
    ));

  const renderStateOptions = () =>
    ["none", "disabled", "readonly", "loading"].map((s) => (
      <option key={s} value={s}>
        {s}
      </option>
    ));

  const renderSizeOptions = () =>
    ["xs", "sm", "md", "lg", "xl"].map((s) => (
      <option key={s} value={s}>
        {s}
      </option>
    ));

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      {/* Control Panel */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border p-4 rounded">
        <div>
          <label className="block font-medium mb-1">Type</label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="w-full border px-2 py-1 rounded bg-gray-700"
          >
            {renderTypeOptions()}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Label</label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showLabel}
              onChange={handleShowLabelToggle}
            />
            {showLabel && (
              <select
                value={labelPlacement}
                onChange={handleLabelPlacementChange}
                className="border rounded px-1 py-0.5 bg-gray-700"
              >
                {renderLabelPlacementOptions()}
              </select>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Placeholder</label>
          <input
            type="checkbox"
            checked={showPlaceholder}
            onChange={handleShowPlaceholderToggle}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Required</label>
          <input
            type="checkbox"
            checked={required}
            onChange={handleRequiredToggle}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">State</label>
          <select
            value={state}
            onChange={handleStateChange}
            className="w-full border px-2 py-1 rounded bg-gray-700"
          >
            {renderStateOptions()}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Icon</label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showIcon}
              onChange={handleShowIconToggle}
            />
            {showIcon && (
              <select
                value={iconPlacement}
                onChange={handleIconPlacementChange}
                className="border rounded px-1 py-0.5 bg-gray-700"
              >
                <option value="start">start</option>
                <option value="end">end</option>
              </select>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Size</label>
          <select
            value={size}
            onChange={handleSizeChange}
            className="w-full border px-2 py-1 rounded bg-gray-700"
          >
            {renderSizeOptions()}
          </select>
        </div>
      </div>

      {/* Rendered Input */}
      <div className="border p-6 rounded">
        <Input
          className="bg-neutral-700"
          type={type}
          label={showLabel ? "Input label" : undefined}
          labelPlacement={labelPlacement}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={showPlaceholder ? "Enter something..." : undefined}
          required={required}
          state={state || undefined}
          icon={
            showIcon ? (
              <GiTwirlyFlower className="h-5 w-5 text-violet-500" />
            ) : undefined
          }
          iconPlacement={iconPlacement}
          size={size}
          options={type === "select" ? selectOptions : []}
        />
      </div>
    </div>
  );
};

export default InputPage;
