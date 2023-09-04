"use client";
import axios from "axios";
import Link from "next/link";
import { Contex } from "@/app/Context/store";
import { useState, useEffect, useContext } from "react";
axios.defaults.withCredentials = true;

export default function page() {
  const { axiosJWT, token, jenis } = useContext(Contex);
  const [msg, setMsg] = useState();
  const [jenisValue, setJenisValue] = useState();
  const [nama, setNama] = useState();
  const [stock, setStock] = useState();
  const [harga, setHarga] = useState();

  useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 2000);
  }, [msg]);

  const postData = async (e) => {
    e.preventDefault();
    const response = await axiosJWT.post(
      `https://backendwebstock.vercel.app/Bahanbaku`,
      { nama: nama, jenis: jenisValue, stok: stock, harga: harga },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMsg(response.data.msg);
    setHarga("");
    setNama("");
    setStock("");
  };

  return (
    <div className={`mx-15 text-slate-500 pb-20`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-16 text-center">Add Bahan Baku</p>
      </div>

      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <p className="text-center py-1 blue w-2/12 m-auto text-slate-100 rounded-lg">{msg}</p>
        <form className="w-11/12 mx-auto" fdprocessedid="true" onSubmit={postData}>
          <label>Nama Bahan</label>
          <input value={nama || ""} type="text" className="w-full p-2 my-5 border border-gray-300 rounded-lg" fdprocessedid="false" onChange={(e) => setNama(e.target.value)} />

          <label>Jenis Bahan</label>
          <select className="w-full p-2 my-5 border border-gray-300 rounded-lg" onChange={(e) => setJenisValue(e.target.value)} fdprocessedid="true" value={jenisValue}>
            <option></option>
            {jenis?.map((item) => (
              <option key={item.id} value={item.jenis}>
                {item.jenis}
              </option>
            ))}
          </select>

          <label>Stock Bahan</label>
          <input value={stock || ""} type="number" className="w-full p-2 my-5 border border-gray-300 rounded-lg" fdprocessedid="false" onChange={(e) => setStock(e.target.value)} />

          <label>Harga Perbahan</label>
          <input value={harga || ""} type="number" className="w-full p-2 my-5 border border-gray-300 rounded-lg" fdprocessedid="false" onChange={(e) => setHarga(e.target.value)} />

          <button className="blue text-slate-100 py-2 rounded-lg mr-2 px-10" fdprocessedid="true">
            Save
          </button>
          <Link href={"/pages/menu/bahanbaku"} className="color_body text-slate-500 py-2 rounded-lg px-10" fdprocessedid="true">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
