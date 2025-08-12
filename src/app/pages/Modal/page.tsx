"use client";

import React, { useState } from "react";
import Modal, { ModalProps } from "@/components/Modal";

const titles = ["Xác nhận", "Thông báo", "Cảnh báo", "Xoá dữ liệu?"];

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalSize, setModalSize] = useState<ModalProps["size"]>("md");
  const [modalTitle, setModalTitle] = useState("Xác nhận");
  const [cancelLabel, setCancelLabel] = useState("Huỷ");
  const [confirmLabel, setConfirmLabel] = useState("Đồng ý");

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">Modal Playground</h1>

      {/* size */}
      <div>
        <label className="block font-medium mb-1">Size</label>
        <select
          value={modalSize}
          onChange={(e) => setModalSize(e.target.value as any)}
          className="w-full border px-2 py-1 rounded bg-gray-700 text-white"
        >
          {["sm", "md", "lg", "xl", "2xl", "full"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* titile */}
      <div>
        <label className="block font-medium mb-1">Title</label>
        <select
          value={modalTitle}
          onChange={(e) => setModalTitle(e.target.value)}
          className="w-full border px-2 py-1 rounded bg-gray-700 text-white"
        >
          {titles.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* title*/}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Cancel Label</label>
          <input
            type="text"
            value={cancelLabel}
            onChange={(e) => setCancelLabel(e.target.value)}
            className="w-full border px-2 py-1 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Confirm Label</label>
          <input
            type="text"
            value={confirmLabel}
            onChange={(e) => setConfirmLabel(e.target.value)}
            className="w-full border px-2 py-1 rounded bg-gray-700 text-white"
          />
        </div>
      </div>

      {/* open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Open Modal
      </button>

      {/* Modal */}
      <Modal
        title={modalTitle}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size={modalSize}
        cancelLabel={cancelLabel}
        confirmLabel={confirmLabel}
        onConfirm={() => {
          alert("Bạn đã xác nhận!");
          setIsOpen(false);
        }}
      >
        <p className="text-sm text-gray-300">
          Time travel took a small step away from science fiction and toward
          science recently when physicists discovered that sub-atomic particles
          known as neutrinos – progeny of the sun’s radioactive debris – can
          exceed the speed of light. The unassuming particle – it is
          electrically neutral, small but with a “non-zero mass” and able to
          penetrate the human form undetected – is on its way to becoming a rock
          star of the scientific world. Researchers from the European
          Organisation for Nuclear Research (CERN) in Geneva sent the neutrinos
          hurtling through an underground corridor toward their colleagues at
          the Oscillation Project with Emulsion-Tracing Apparatus (OPERA) team
          730 kilometres away in Gran Sasso, Italy. The neutrinos arrived
          promptly – so promptly, in fact, that they triggered what scientists
          are calling the unthinkable – that everything they have learnt, known
          or taught stemming from the last one hundred years of the physics
          discipline may need to be reconsidered. The issue at stake is a tiny
          segment of time – precisely sixty nanoseconds (which is sixty
          billionths of a second). This is how much faster than the speed of
          light the neutrinos managed to go in their underground travels and at
          a consistent rate (15,000 neutrinos were sent over three years). Even
          allowing for a margin of error of ten billionths of a second, this
          stands as proof that it is possible to race against light and win. The
          duration of the experiment also accounted for and ruled out any
          possible lunar effects or tidal bulges in the earth’s crust.
          Nevertheless, there’s plenty of reason to remain sceptical. According
          to Harvard University science historian Peter Galison, Einstein’s
          relativity theory has been “pushed harder than any theory in the
          history of the physical sciences”. Yet each prior challenge has come
          to no avail, and relativity has so far refused to buckle. So is time
          travel just around the corner? The prospect has certainly been
          wrenched much closer to the realm of possibility now that a major
          physical hurdle – the speed of light – has been cleared. If particles
          can travel faster than light, in theory travelling back in time is
          possible. How anyone harnesses that to some kind of helpful end is far
          beyond the scope of any modern technologies, however, and will be left
          to future generations to explore.
        </p>
      </Modal>
    </div>
  );
}
