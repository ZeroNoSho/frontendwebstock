"use client";
import axios from "axios";
import { Contex } from "@/app/Context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
axios.defaults.withCredentials = true;

export default function Home() {
  const { refreshPage, getBarangexel, getBarang, persedian } = useContext(Contex);

  useEffect(() => {
    getBarang();
  }, []);

  const [col, setCol] = useState(0);
  const [chkbox1, setChkbox1] = useState(true);
  const [chkbox2, setChkbox2] = useState(true);
  const [chkbox3, setChkbox3] = useState(true);
  const [chkbox4, setChkbox4] = useState(true);

  return (
    <div className={`mx-15 text-slate-500 max-h-full min-h-screen pb-10`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-10 text-center">Persedian</p>
      </div>
      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <div className="w-11/12 mx-auto">
          <div className="my-5 pt-5">
            <div className="flex flex-row-reverse ">
              <p className="p-1 cursor-pointer w-20 text-center" onClick={refreshPage}>
                <FontAwesomeIcon icon={faRotate} onClick={refreshPage} />
              </p>
              <p className="p-1 cursor-pointer w-20 text-center" onClick={() => (col == 1 ? setCol(0) : setCol(1))}>
                <FontAwesomeIcon icon={faTableCells} />
              </p>
              <input
                onChange={(e) => {
                  getBarang(e.target.value);
                }}
                type="text"
                placeholder="Search"
                className="rounded-md p-1 border border-gray-300"
                fdprocessedid="true"
              />
            </div>
          </div>
        </div>
        <div className="wrapper">
          <table className="border-collapse table-auto text-sm w-11/12 mx-auto text-center">
            <thead className="blue2 text-slate-100">
              <tr>
                <th className={`border border-gray-300 font-medium p-4 pl-8 pb-3 rounded-t-lg ${!chkbox1 ? "hidden" : ""}`}>Nama Barang / Bahan</th>
                <th className={`border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${!chkbox2 ? "hidden" : ""}`}>Tipe</th>
                <th className={`border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${!chkbox4 ? "hidden" : ""}`}>Satuan</th>
                <th className={`border border-gray-300 font-medium p-4 pr-8  pb-3 rounded-t-lg  ${!chkbox3 ? "hidden" : ""}`}>Stok</th>
              </tr>
            </thead>
            <tbody>
              {persedian?.map((item) => (
                <tr key={item.id}>
                  <td className={`border border-gray-300 p-4 pl-8 text-slate-500  ${!chkbox1 ? "hidden" : ""}`}>
                    <p>{item.nama}</p>
                  </td>
                  <td className={`border border-gray-300 p-4 pl-8 text-slate-500  ${!chkbox2 ? "hidden" : ""}`}>
                    <p>{item.tipe}</p>
                  </td>
                  <td className={`border border-gray-300 p-4 text-slate-500  ${!chkbox4 ? "hidden" : ""}`}>
                    <p> {item.jenis}</p>
                  </td>
                  <td className={`border border-gray-300 p-4 pr-8 text-slate-500  ${!chkbox3 ? "hidden" : ""}`}>
                    <p>{item.stok}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-11/12 m-auto pt-10 text-center flex" onClick={() => getBarangexel()}>
          <div className="mx-auto flex">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" onClick={getBarangexel} className="my-auto cursor-pointer">
              <path
                onClick={() => getBarangexel()}
                fill="currentColor"
                d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
              />
            </svg>
            <p onClick={() => getBarangexel()} className="cursor-pointer my-auto">
              Download Excel
            </p>
          </div>
        </div>
      </div>
      <ul className={`h-fit blue text-slate-100 w-fit absolute top-[305px] postionus rounded-lg ${col == 0 ? "hidden" : ""}`}>
        <li className="w-40 py-5  pb-2 px-5 flex">
          <input type="checkbox" defaultChecked value={1} onClick={(e) => setChkbox1(e.target.checked)} />
          <p className="m-auto text-center">nama</p>
        </li>
        <li className="w-30 py-5  pb-2 px-5 flex">
          <input type="checkbox" defaultChecked value={2} onClick={(e) => setChkbox2(e.target.checked)} />
          <p className="m-auto text-center">tipe</p>
        </li>
        <li className="w-30 py-5  pb-2 px-5 flex">
          <input type="checkbox" defaultChecked value={4} onClick={(e) => setChkbox4(e.target.checked)} />
          <p className="m-auto text-center">satuan</p>
        </li>
        <li className="w-30 py-5  pb-5 px-5 flex">
          <input type="checkbox" defaultChecked value={3} onClick={(e) => setChkbox3(e.target.checked)} />
          <p className="m-auto text-center">stock</p>
        </li>
      </ul>
    </div>
  );
}
