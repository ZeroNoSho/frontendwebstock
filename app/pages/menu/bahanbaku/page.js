"use client";
import axios from "axios";
import Serch from "@/components/serch";
import { Contex } from "@/app/Context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
axios.defaults.withCredentials = true;

export default function Home() {
  const { axiosJWT, token, jenis, bahan, getBahanbakuSrch, col, MySwal, toat } = useContext(Contex);
  const [msg, setMsg] = useState();

  const [nama, setName] = useState("");
  const [stock, setStock] = useState();
  const [harga, setHarga] = useState();
  const [jenisvalue, setJenisvalue] = useState();
  const [disableds, setDdisableds] = useState();

  //col
  const [chkbox1, setChkbox1] = useState(true);
  const [chkbox2, setChkbox2] = useState(true);
  const [chkbox3, setChkbox3] = useState(true);
  const [chkbox4, setChkbox4] = useState(true);
  const [chkbox5, setChkbox5] = useState(true);

  useEffect(() => {
    getBahanbakuSrch();
  }, [disableds, msg]);

  const updateinput = (e) => {
    e.preventDefault();
    setDdisableds(e.target.dataset.key);
    setStock(e.target.dataset.key3);
    setJenisvalue(e.target.dataset.key2);
    setName(e.target.dataset.key1);
    setHarga(e.target.dataset.key4);
  };

  const update = async (e) => {
    const id = e.target.dataset.key;
    const response = await axiosJWT.patch(
      `https://backendwebstock.vercel.app/Bahanbaku/${id}`,
      { nama: nama, jenis: jenisvalue, stok: parseInt(stock), harga: parseInt(harga) },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toat("edit");
    setMsg(response.data.msg);
    setDdisableds("");
  };

  const delet = async (e) => {
    if (e.target.dataset.key !== undefined) {
      const id = e.target.dataset.key;
      const response = await axiosJWT.delete(`https://backendwebstock.vercel.app/Bahanbaku/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMsg(id);
    }
  };
  const delet2 = (e) => {
    MySwal.fire({
      title: "Kamu Yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, hapus ini!",
    }).then((result) => {
      if (result.isConfirmed) {
        delet(e);
        MySwal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="mx-15 text-slate-500 max-h-full min-h-screen pb-10">
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-10 text-center">Bahan Baku</p>
      </div>
      <div className="bg-white py-5 w-11/12 m-auto rounded-lg">
        <Serch halaman={"/pages/menu/bahanbaku/add"} get={getBahanbakuSrch} />
        <div className="wrapper">
          <table className="border-collapse table-auto text-sm w-11/12 mx-auto text-center">
            <thead className="blue2 text-slate-100">
              <tr>
                <th className={`border border-gray-300 font-medium p-4 pl-8 pb-3 rounded-t-lg ${!chkbox1 ? "hidden" : ""}`}>Nama Barang</th>
                <th className={`border border-gray-300 font-medium p-4 pb-3  rounded-t-lg  ${!chkbox2 ? "hidden" : ""}`}>Satuan</th>
                <th className={`border border-gray-300 font-medium p-4 pr-8  pb-3  rounded-t-lg  ${!chkbox3 ? "hidden" : ""}`}>Stok</th>
                <th className={`text-center border border-gray-300 font-medium p-4  pb-3 rounded-t-lg  ${!chkbox4 ? "hidden" : ""}`}>Harga</th>
                <th className={`text-center border border-gray-300 font-medium p-4  pb-3 rounded-t-lg  ${!chkbox5 ? "hidden" : ""}`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {bahan?.result.map((item) => (
                <tr key={item.id}>
                  <td className={`border border-gray-300 p-4 pl-8 text-slate-500  ${!chkbox1 ? "hidden" : ""}`}>
                    <input value={nama || ""} onChange={(e) => setName(e.target.value)} type="text" className={`${disableds == item.id ? "" : "hidden"} w-full py-2 bg-transparent border border-gray-300`} placeholder={item.nama} />
                    <p className={`${disableds == item.id ? "hidden" : ""}`}>{item.nama}</p>
                  </td>
                  <td className={`border border-gray-300 p-4 text-slate-500  ${!chkbox2 ? "hidden" : ""}`}>
                    <select className={`w-full p-2 my-5 border border-gray-300 rounded-lg ${disableds == item.id ? "" : "hidden"}`} onChange={(e) => setJenisvalue(e.target.value)} fdprocessedid="true" value={jenisvalue || item.jenis}>
                      {jenis?.map((item) => (
                        <option key={item.id} value={item.jenis}>
                          {item.jenis}
                        </option>
                      ))}
                    </select>
                    <p className={`${disableds == item.id ? "hidden" : ""}`}> {item.jenis}</p>
                  </td>
                  <td className={`border border-gray-300 p-4 pr-8 text-slate-500  ${!chkbox3 ? "hidden" : ""}`}>
                    <input value={stock || ""} onChange={(e) => setStock(e.target.value)} type="number" className={`${disableds == item.id ? "" : "hidden"} w-full py-2 bg-transparent border border-gray-300`} placeholder={item.stok} />
                    <p className={`${disableds == item.id ? "hidden" : ""}`}>{item.stok}</p>
                  </td>
                  <td className={`border border-gray-300 p-4 pr-8 text-slate-500  ${!chkbox4 ? "hidden" : ""}`}>
                    <input value={harga || ""} onChange={(e) => setHarga(e.target.value)} type="number" className={`${disableds == item.id ? "" : "hidden"} w-full py-2 bg-transparent border border-gray-300`} placeholder={item.harga} />
                    <p className={`${disableds == item.id ? "hidden" : ""}`}>{item.harga}</p>
                  </td>
                  <td className={`border border-gray-300 p-4 text-slate-500 ${!chkbox5 ? "hidden" : ""}`}>
                    <div className="basis-1/12 flex flex-row text-center" data-key={item.id}>
                      <p className={`${disableds == item.id ? "" : "hidden"} basis-1/2 cursor-pointer`} data-key={item.id} onClick={update}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" className="m-auto" data-key={item.id} onClick={update}>
                          <path
                            data-key={item.id}
                            onClick={update}
                            fill="currentColor"
                            d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                          />
                        </svg>
                      </p>
                      <p className={`basis-1/2 cursor-pointer ${disableds == item.id ? "hidden" : ""}`} data-key={item.id} data-key1={item.nama} data-key2={item.jenis} data-key3={item.stok} data-key4={item.harga} onClick={updateinput}>
                        <FontAwesomeIcon icon={faPencil} data-key={item.id} data-key1={item.nama} data-key2={item.jenis} data-key3={item.stok} data-key4={item.harga} onClick={updateinput} />
                      </p>
                      <p className="basis-1/2 cursor-pointer text-center" data-key={item.id} onClick={delet2}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" className="m-auto" data-key={item.id} onClick={delet2}>
                          <path
                            data-key={item.id}
                            onClick={delet2}
                            fill="currentColor"
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                          />
                        </svg>
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ul className={`max-[800px]:top-[380px] h-fit blue text-slate-100 w-fit absolute top-[330px] postionus rounded-lg ${col == 0 ? "hidden" : ""}`}>
        <li className="w-40 py-5  pb-2 px-5 flex">
          <input type="checkbox" defaultChecked value={1} onClick={(e) => setChkbox1(e.target.checked)} />
          <p className="m-auto text-center">nama</p>
        </li>
        <li className="w-30 py-5  pb-2 px-5 flex">
          <input type="checkbox" defaultChecked value={2} onClick={(e) => setChkbox2(e.target.checked)} />
          <p className="m-auto text-center">satuan</p>
        </li>
        <li className="w-30 py-5  pb-2 px-5 flex">
          <input type="checkbox" defaultChecked value={3} onClick={(e) => setChkbox3(e.target.checked)} />
          <p className="m-auto text-center">stock</p>
        </li>
        <li className="w-30 py-5  pb-5 px-5 flex">
          <input type="checkbox" defaultChecked value={4} onClick={(e) => setChkbox4(e.target.checked)} />
          <p className="m-auto text-center">harga</p>
        </li>
        <li className="w-30 py-5  pb-5 px-5 flex">
          <input type="checkbox" defaultChecked value={4} onClick={(e) => setChkbox5(e.target.checked)} />
          <p className="m-auto text-center">action</p>
        </li>
      </ul>
    </div>
  );
}
