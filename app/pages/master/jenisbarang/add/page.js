"use client";
import axios from "axios";
import Link from "next/link";
import { Contex } from "@/app/Context/store";
import { useState, useContext } from "react";
axios.defaults.withCredentials = true;

export default function page() {
  const { axiosJWT, token, toat } = useContext(Contex);
  const [jenisValue, setJenisValue] = useState();

  const postData = async (e) => {
    e.preventDefault();
    const response = await axiosJWT.post(
      `http://localhost:5000/Jenis`,
      { jenis: jenisValue },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setJenisValue("");
    toat();
  };

  return (
    <div className={`mx-15 text-slate-500 h-screen`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-16 text-center">Add Jenis Barang</p>
      </div>

      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <form className="w-11/12 mx-auto" fdprocessedid="true" onSubmit={postData}>
          <label>Nama Jenis Barang</label>
          <input id="jenis" value={jenisValue || ""} type="text" className="w-full p-2 my-5 border border-gray-300 rounded-lg" fdprocessedid="false" onChange={(e) => setJenisValue(e.target.value)} />
          <button className="blue text-slate-100 py-2 rounded-lg mr-2 px-10" fdprocessedid="true">
            Save
          </button>
          <Link href={"/pages/master/jenisbarang"} className="color_body text-slate-500 py-2 rounded-lg px-10" fdprocessedid="true">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
