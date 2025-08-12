"use client";

import React, { useState } from "react";
import Button, { ButtonProps } from "@/components/Button";
// import { GiTwirlyFlower } from "react-icons/gi";

const ButtonPage = () => {
  const [variant, setVariant] = useState<ButtonProps["variant"]>("primary");
  const [size, setSize] = useState<ButtonProps["size"]>("md");
  const [rounded, setRounded] = useState<ButtonProps["rounded"]>("md");
  const [outline, setOutline] = useState(false);
  const [state, setState] = useState<ButtonProps["state"]>("default");
  const [label, setLabel] = useState("Click me");

  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      {/* Control Panel */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border p-4 rounded">
        {/* Variant */}
        <div>
          <label className="block font-medium mb-1">Variant</label>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as any)}
            className="w-full border px-2 py-1 rounded bg-gray-700"
          >
            {[
              "primary",
              "secondary",
              "success",
              "danger",
              "warning",
              "info",
              "surface",
              "light",
              "dark",
              "transparent",
            ].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="block font-medium mb-1">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as any)}
            className="w-full border px-2 py-1 rounded bg-gray-700"
          >
            {["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "full"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Rounded */}
        <div>
          <label className="block font-medium mb-1">Rounded</label>
          <select
            value={rounded}
            onChange={(e) => setRounded(e.target.value as any)}
            className="w-full border px-2 py-1 rounded bg-gray-700"
          >
            {["xs", "sm", "md", "lg", "xl", "2xl", "full"].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Outline */}
        <div>
          <label className="block font-medium mb-1">Outline</label>
          <input
            type="checkbox"
            checked={outline}
            onChange={() => setOutline(!outline)}
          />
        </div>

        {/* State */}
        <div>
          <label className="block font-medium mb-1">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value as any)}
            className="w-full border px-2 py-1 rounded bg-gray-700"
          >
            {["default", "loading", "disable"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Label */}
        <div>
          <label className="block font-medium mb-1">Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full border px-2 py-1 rounded bg-gray-700"
          />
        </div>
      </div>

      {/* Rendered Button */}
      <div className="border p-6 rounded flex justify-center">
        <Button
          type="button"
          variant={variant}
          size={size}
          rounded={rounded}
          outline={outline}
          state={state}
          onClick={handleClick}
        >
          {label}
        </Button>
      </div>
    </div>
  );
};

export default ButtonPage;
