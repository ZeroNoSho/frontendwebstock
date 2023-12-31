"use client";
import axios from "axios";
import Link from "next/link";
import { Contex } from "@/app/Context/store";
import { useState, useContext, useEffect } from "react";
axios.defaults.withCredentials = true;
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const {
    axiosJWT,
    token,
    jenis,
    toat,
    bahan,
    data,
    setData,
    router,
    bahanvalue,
    setBahanvalue,
  } = useContext(Contex);
  const [jenisvalue, setJenisvalue] = useState(data[2]);
  const [nama, setNama] = useState(data[1]);
  const [stock, setStock] = useState(data[3]);

  useEffect(() => {
    if (data == 0) {
      setTimeout(() => {
        router.push(`/pages/master/databarang`);
      }, 2000);
    }
    if (bahanvalue == 0) {
      setBahanvalue(data[4]);
    }
  }, [bahanvalue, data]);

  const update = async (e) => {
    e.preventDefault();
    axiosJWT
      .patch(
        `http://localhost:5000/Barang/${params.slug}`,
        {
          nama: nama,
          jenis: jenisvalue,
          stok: parseInt(stock),
          bahan: bahanvalue.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toat("edit");
        setStock("");
        setNama("");
        setData("");
        console.log(res.data.msg);
      })
      .catch((error) => {
        if (error.response) {
          const errorMsg = error.response.data.msg; // Anda perlu menyesuaikan dengan struktur respons dari server
        }
      });
  };

  const CheackBox = (e) => {
    const cheak = e.target.value;
    if (Array.isArray(bahanvalue)) {
      const index = bahanvalue.findIndex((item) => item == cheak);
      if (index === -1) {
        setBahanvalue([...bahanvalue, cheak]);
      } else {
        bahanvalue.splice(index, 1);
        setBahanvalue([...bahanvalue]);
      }
    } else {
      setBahanvalue([cheak]);
    }
  };

  return (
    <div className={`mx-15 text-slate-500 pb-20`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-16 text-center">
          Update Barang
        </p>
      </div>

      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <form
          className="w-11/12 mx-auto"
          fdprocessedid="true"
          onSubmit={update}
        >
          <label>
            Nama Barang
            <input
              value={nama || ""}
              type="text"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setNama(e.target.value)}
            />
          </label>

          <label>Jenis Barang</label>
          <select
            className="w-full p-2 my-5 border border-gray-300 rounded-lg"
            onChange={(e) => setJenisvalue(e.target.value)}
            fdprocessedid="true"
            value={jenisvalue}
          >
            <option value={data[2]}>{data[2]}</option>
            {jenis?.map((item) =>
              item.jenis !== data[2] ? (
                <option key={item.id} value={item.jenis}>
                  {item.jenis}
                </option>
              ) : (
                ""
              )
            )}
          </select>

          <div>
            Bahan
            <div className="w-full p-2 my-5 flex fe">
              {bahan?.result.map((item, i) => (
                <label key={item.id}>
                  <input
                    className="cheakboxs"
                    type="checkbox"
                    value={item.nama}
                    onClick={CheackBox}
                  />
                  <span className="blue bg-white text-slate-100 py-2 rounded-lg mr-2 px-10">
                    {item.nama}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <label>
            Stock Barang
            <input
              value={stock || ""}
              type="number"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setStock(e.target.value)}
            />
          </label>

          <button
            className="blue text-slate-100 py-2 rounded-lg mr-2 px-10"
            fdprocessedid="true"
          >
            Save
          </button>
          <Link
            href={"/pages/master/databarang"}
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
