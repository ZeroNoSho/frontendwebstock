"use client";
import axios from "axios";
import { Contex } from "@/app/Context/store";
import { useState, useContext } from "react";
axios.defaults.withCredentials = true;

export default function page() {
  const { axiosJWT, token, persedian, toat } = useContext(Contex);
  const [data, setData] = useState();
  const [stock, setStock] = useState();
  const [ket, setKet] = useState();

  const postData = async (e) => {
    e.preventDefault();
    if (data) {
      const datas = data.split(",");
      const response = await axiosJWT.post(
        `https://backendwebstock.vercel.app/Transaksi/Masuk`,
        {
          nama: datas[0],
          tipe: datas[1],
          jenis: datas[2],
          alur: "masuk",
          stok: stock,
          ket: ket,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toat();
      reset();
    }
  };

  const reset = () => {
    setData("");
    setStock("");
    setKet("");
  };

  return (
    <div className="mx-15 text-slate-500 max-h-full min-h-screen pb-10">
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-10 text-center">Transaksi Masuk</p>
      </div>
      <div className="bg-white py-5 w-11/12 m-auto rounded-lg">
        <form onSubmit={postData}>
          <div id="nama" className="px-10 py-1">
            <p className="font-semibold">Nama Barang</p>
            <select className="w-full rounded-md p-1 border border-gray-300" onChange={(e) => setData(e.target.value.toString())} fdprocessedid="true" value={"" || data}>
              <option value={""}>Pilih Barang</option>
              {persedian?.map((item) => (
                <option key={item.key} value={[item.nama, item.tipe, item.jenis].toString()}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
          <div id="alur" className="px-10 py-1">
            <label className="font-semibold py-2">
              Alur Transaksi <input disabled={true} type="text" value="masuk" className="w-full rounded-md p-1 border border-gray-300" fdprocessedid="true" />
            </label>
          </div>
          <div id="jumlah" className="px-10 py-1">
            <label className="font-semibold py-2">
              Jumlah
              <input value={stock || ""} onChange={(e) => setStock(parseInt(e.target.value))} type="number" placeholder="masukan angka" className="w-full rounded-md p-1 border border-gray-300" fdprocessedid="true" />
            </label>
          </div>
          <div id="Keterangan" className="px-10 py-1">
            <label className="font-semibold py-2">
              Keterangan (Optional)
              <textarea value={ket || ""} onChange={(e) => setKet(e.target.value)} cols="40" rows="5" className="w-full rounded-md border border-gray-300" fdprocessedid="true" />
            </label>
          </div>
          <div className="px-10">
            <button className="mr-5 blue text-slate-100 p-2 rounded-lg w-28" fdprocessedid="true">
              Submit
            </button>
            <button onClick={reset} className="color_body text-slate-500 p-2 rounded-lg w-28" fdprocessedid="false">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
