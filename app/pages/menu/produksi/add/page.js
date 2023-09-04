"use client";
import axios from "axios";
import Link from "next/link";
import { Contex } from "@/app/Context/store";
import { useState, useContext } from "react";
axios.defaults.withCredentials = true;

export default function page() {
  const { axiosJWT, token, toat, databarang } = useContext(Contex);
  const [stock, setStock] = useState();
  const [nama, setNama] = useState();

  const post = async (e) => {
    e.preventDefault();
    const namas = nama.split(",");
    const response = await axiosJWT.post(
      `http://localhost:5000/Produksi`,
      {
        nama: namas[0],
        jenis: namas[1],
        jumlah: stock,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toat("edit");
    setNama("");
    setStock("");
  };

  return (
    <div className={`mx-15 text-slate-500 pb-20 max-h-full min-h-screen pb-10`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-16 text-center">add rencana produksi</p>
      </div>
      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <div className="w-full">
          <form onSubmit={post}>
            <div id="nama" className="px-10 py-1">
              <label className="font-semibold py-2">
                Nama
                <select className="w-full rounded-md p-1 border border-gray-300" onChange={(e) => setNama(e.target.value)} fdprocessedid="true" value={nama}>
                  <option value={""}></option>
                  {databarang?.map((item) => (
                    <option key={item.id} value={[item.nama, item.jenis].toString()}>
                      {item.nama}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div id="jumlah" className="px-10 py-1">
              <label className="font-semibold py-2">
                Jumlah
                <input value={stock || ""} onChange={(e) => setStock(e.target.value)} type="number" placeholder="masukan angka" className="w-full rounded-md p-1 border border-gray-300" fdprocessedid="true" />
              </label>
            </div>
            <div className="px-10 mt-10">
              <button className="mr-5 blue text-slate-100 p-2 rounded-lg w-28" fdprocessedid="true">
                Submit
              </button>
              <Link href={"/pages/menu/produksi"} className="color_body text-slate-500 py-2 rounded-lg px-10" fdprocessedid="true">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
