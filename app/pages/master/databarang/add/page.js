"use client";
import axios from "axios";
import Link from "next/link";
import { Contex } from "@/app/Context/store";
import { useState, useContext } from "react";
axios.defaults.withCredentials = true;

export default function Home() {
  const { axiosJWT, token, jenis, toat, bahan } = useContext(Contex);
  const [jenisvalue, setJenisvalue] = useState();
  const [nama, setNama] = useState();
  const [stock, setStock] = useState();
  const [cheakbox, setCheakbox] = useState([]);
  console.log(cheakbox);
  const postData = async (e) => {
    e.preventDefault();
    const response = await axiosJWT.post(
      `http://localhost:5000/Barang`,
      { nama: nama, jenis: jenisvalue, stok: stock, bahan: cheakbox.toString()},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toat();
    setNama("");
    setStock("");
  };

  const CheackBox = (e) => {
    const cheak = e.target.value;
    const index = cheakbox.findIndex((item) => item == cheak);

    if (index === -1) {
      setCheakbox([...cheakbox, cheak]);
    } else {
      cheakbox.splice(index, 1);
      setCheakbox([...cheakbox]);
    }
  };

  return (
    <div className={`mx-15 text-slate-500 pb-20`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-16 text-center">Add Barang</p>
      </div>

      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <form className="w-11/12 mx-auto" fdprocessedid="true" onSubmit={postData}>
          <label>
            Nama Barang
            <input value={nama || ""} type="text" className="w-full p-2 my-5 border border-gray-300 rounded-lg" fdprocessedid="false" onChange={(e) => setNama(e.target.value)} />
          </label>

          <label>Jenis Barang</label>
          <select className="w-full p-2 my-5 border border-gray-300 rounded-lg" onChange={(e) => setJenisvalue(e.target.value)} fdprocessedid="true" value={jenisvalue}>
            <option></option>
            {jenis?.map((item) => (
              <option key={item.id} value={item.jenis}>
                {item.jenis}
              </option>
            ))}
          </select>

          <div>
            Bahan
            <div className="w-full p-2 my-5 flex fe">
              {bahan?.result.map((item) => (
                <label key={item.id}>
                  <input className="cheakboxs" type="checkbox" value={item.nama} onClick={CheackBox} />
                  <span className="blue bg-white text-slate-100 py-2 rounded-lg mr-2 px-10">{item.nama}</span>
                </label>
              ))}
            </div>
          </div>

          <label>
            Stock Barang
            <input value={stock || ""} type="number" className="w-full p-2 my-5 border border-gray-300 rounded-lg" fdprocessedid="false" onChange={(e) => setStock(e.target.value)} />
          </label>

          <button className="blue text-slate-100 py-2 rounded-lg mr-2 px-10" fdprocessedid="true">
            Save
          </button>
          <Link href={"/pages/master/databarang"} className="color_body text-slate-500 py-2 rounded-lg px-10" fdprocessedid="true">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
