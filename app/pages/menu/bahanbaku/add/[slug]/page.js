"use client";
import axios from "axios";
import Link from "next/link";
import { Contex } from "@/app/Context/store";
import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
axios.defaults.withCredentials = true;

export default function Home() {
  const params = useParams();
  const { axiosJWT, token, jenis, toat, bahanvalue, setBahanvalue, router } =
    useContext(Contex);
  const [msg, setMsg] = useState();
  const [jenisValue, setJenisValue] = useState(bahanvalue[1]);
  const [nama, setNama] = useState(bahanvalue[0]);
  const [stock, setStock] = useState(bahanvalue[2]);
  const [harga, setHarga] = useState(bahanvalue[3]);
  const [biayapesan, setBiayapesan] = useState(bahanvalue[4]);
  const [biayapenyimpanan, setBiayapenyimpanan] = useState(bahanvalue[5]);
  const [ukuran, setUkuran] = useState(bahanvalue[6]);

  if (bahanvalue == 0) {
    setTimeout(() => {
      router.push(`/pages/menu/bahanbaku`);
    }, 2000);
  }

  const update = async (e) => {
    e.preventDefault();
    const response = await axiosJWT.patch(
      `http://localhost:5000/Bahanbaku/${params.slug}`,
      {
        nama: nama,
        jenis: jenisValue,
        stok: parseInt(stock),
        harga: parseInt(harga),
        biayapesan: biayapesan,
        biayapenyimpanan: biayapenyimpanan,
        ukuran: ukuran,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toat("edit");
    setMsg(response.data.msg);
    setHarga("");
    setNama("");
    setStock("");
    setBiayapenyimpanan("");
    setBiayapesan("");
    setUkuran("");
    setBahanvalue([]);
  };

  return (
    <div className={`mx-15 text-slate-500 pb-20`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-16 text-center">
          Update Bahan Baku
        </p>
      </div>

      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <p className="text-center py-1 blue w-2/12 m-auto text-slate-100 rounded-lg">
          {msg}
        </p>
        <form
          className="w-11/12 mx-auto"
          fdprocessedid="true"
          onSubmit={update}
        >
          <label>
            Nama Bahan
            <input
              value={nama || ""}
              type="text"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setNama(e.target.value)}
            />
          </label>

          <label>Jenis Bahan</label>
          <select
            className="w-full p-2 my-5 border border-gray-300 rounded-lg bg-white"
            onChange={(e) => setJenisValue(e.target.value)}
            fdprocessedid="true"
            value={jenisValue}
          >
            <option></option>
            {jenis?.map((item) => (
              <option key={item.id} value={item.jenis}>
                {item.jenis}
              </option>
            ))}
          </select>

          <label>
            Stock Bahan
            <input
              value={stock || ""}
              type="number"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setStock(e.target.value)}
            />
          </label>

          <label>
            Harga
            <input
              value={harga || ""}
              type="number"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setHarga(e.target.value)}
            />
          </label>

          <label>
            Biaya pesan
            <input
              value={biayapesan || ""}
              type="number"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setBiayapesan(e.target.value)}
            />
          </label>

          <label>
            Biaya penyimpanan
            <input
              value={biayapenyimpanan || ""}
              type="number"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setBiayapenyimpanan(e.target.value)}
            />
          </label>

          <label>
            ukuran
            <input
              value={ukuran || ""}
              type="number"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setUkuran(e.target.value)}
            />
          </label>

          <button
            className="blue text-slate-100 py-2 rounded-lg mr-2 px-10"
            fdprocessedid="true"
          >
            Save
          </button>
          <Link
            href={"/pages/menu/bahanbaku"}
            className="color_body text-slate-500 py-2 rounded-lg px-10"
            fdprocessedid="true"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
