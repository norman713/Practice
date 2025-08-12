"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-y-4">
      This is all component
      <div className="flex gap-4">
        <Link href="./pages/Input">
          <button className="bg-amber-50 text-amber-700 font-bold px-4 py-2 rounded-xl shadow-md hover:bg-amber-100 active:scale-95 transition duration-200">
            Input
          </button>
        </Link>
        <Link href="./pages/Button">
          <button className="bg-amber-50 text-amber-700 font-bold px-4 py-2 rounded-xl shadow-md hover:bg-amber-100 active:scale-95 transition duration-200">
            Button
          </button>
        </Link>
        <Link href="./pages/Modal">
          <button className="bg-amber-50 text-amber-700 font-bold px-4 py-2 rounded-xl shadow-md hover:bg-amber-100 active:scale-95 transition duration-200">
            Modal
          </button>
        </Link>
        <Link href="./pages/Table">
          <button className="bg-amber-50 text-amber-700 font-bold px-4 py-2 rounded-xl shadow-md hover:bg-amber-100 active:scale-95 transition duration-200">
            Table
          </button>
        </Link>
      </div>
    </div>
  );
}
