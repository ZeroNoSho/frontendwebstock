"use client";
import axios from "axios";
import Serch from "@/components/serch";
import { Contex } from "@/app/Context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
axios.defaults.withCredentials = true;

export default function page() {
  const { axiosJWT, token, getJenis, jenis, MySwal, toat, col } = useContext(Contex);

  const [jenisValue, setJenisValue] = useState();
  const [msg, setMsg] = useState();
  const [disableds, setDdisableds] = useState();

  const [chkbox1, setChkbox1] = useState(true);
  const [chkbox2, setChkbox2] = useState(true);

  useEffect(() => {
    getJenis();
    setTimeout(() => {
      setMsg("");
    }, 2000);
  }, [msg]);

  const updateinput = (e) => {
    e.preventDefault();
    if (e.target.dataset.key !== undefined) {
      setDdisableds(e.target.dataset.key);
      setJenisValue(e.target.dataset.key2);
    }
  };

  const update = async (e) => {
    if (e.target.dataset.key !== undefined) {
      const id = e.target.dataset.key;
      const response = await axiosJWT.patch(
        `https://backendwebstock.vercel.app/Jenis/${id}`,
        { jenis: jenisValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toat("edit");
      setMsg(response.data.msg);
      setDdisableds("");
    }
  };

  const delet = async (e) => {
    if (e.target.dataset.key !== undefined) {
      const id = e.target.dataset.key;
      const response = await axiosJWT.delete(`https://backendwebstock.vercel.app/Jenis/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMsg(response.data.msg);
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
    <div className={`mx-15 text-slate-500  max-h-full min-h-screen pb-10`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-10 text-center">Jenis Barang</p>
      </div>
      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <Serch halaman={"/pages/master/jenisbarang/add"} get={getJenis} />
        <div className="wrapper">
          <table className=" table-auto text-sm w-11/12 mx-auto text-center">
            <thead className="blue2 text-slate-100">
              <tr>
                <th className={`border border-gray-300 font-medium p-4 pl-8 pb-3 rounded-t-lg  ${!chkbox1 ? "hidden" : ""}`}>Nama Jenis Barang</th>
                <th className={`text-center border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${!chkbox2 ? "hidden" : ""}`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {jenis?.map((item) => (
                <tr key={item.id} className="rounded-b-lg">
                  <td className={`border border-gray-300 p-4 pl-8 text-slate-500  ${!chkbox1 ? "hidden" : ""}`}>
                    <p className={`${disableds == item.id ? "hidden" : ""}`}>{item.jenis}</p>
                    <input
                      value={jenisValue || ""}
                      onChange={(e) => setJenisValue(e.target.value)}
                      type="text"
                      className={`${disableds == item.id ? "" : "hidden"} w-full py-2 bg-transparent border border-gray-300`}
                      placeholder={item.jenis}
                    />
                  </td>
                  <td className={`border border-gray-300 p-4 text-slate-500  ${!chkbox2 ? "hidden" : ""}`}>
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
                      <p className={`basis-1/2 cursor-pointer ${disableds == item.id ? "hidden" : ""}`} data-key={item.id} data-key2={item.jenis} onClick={updateinput}>
                        <FontAwesomeIcon icon={faPencil} data-key={item.id} data-key2={item.jenis} onClick={updateinput} />
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
      <ul className={`max-[800px]:top-[380px] h-fit blue text-slate-100 w-fit absolute top-[340px] postionus rounded-lg ${col == 0 ? "hidden" : ""}`}>
        <li className="w-40 py-5 pb-3 px-5 flex">
          <input type="checkbox" onClick={(e) => setChkbox1(e.target.checked)} defaultChecked />
          <p className="m-auto text-center">nama</p>
        </li>
        <li className="w-30 py-5 pb-5 px-5 flex">
          <input type="checkbox" onClick={(e) => setChkbox2(e.target.checked)} defaultChecked />
          <p className="m-auto text-center">action</p>
        </li>
      </ul>
    </div>
  );
}
