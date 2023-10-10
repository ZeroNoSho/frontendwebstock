"use client";
import axios from "axios";
import Serch from "@/components/serch";
import { Contex } from "@/app/Context/store";
import { useState, useEffect, useContext } from "react";
axios.defaults.withCredentials = true;

export default function Home() {
  const {
    axiosJWT,
    token,
    jenis,
    databarang,
    getData_Barang,
    col,
    MySwal,
    setBahanvalue,
    setData,
    router,
  } = useContext(Contex);
  const [nama, setName] = useState("");
  const [bahan, setBahan] = useState("");
  const [stock, setStock] = useState();
  const [jenisvalue, setJenisvalue] = useState();
  const [msg, setMsg] = useState();
  const [disableds, setDdisableds] = useState();

  const [chkbox1, setChkbox1] = useState(true);
  const [chkbox2, setChkbox2] = useState(true);
  const [chkbox3, setChkbox3] = useState(true);
  const [chkbox4, setChkbox4] = useState(true);
  const [chkbox5, setChkbox5] = useState(true);

  useEffect(() => {
    getData_Barang("");
    setTimeout(() => {
      setMsg("");
    }, 2000);
  }, [msg]);

  const updateinput = (e) => {
    e.preventDefault();
    const datas = e.target.dataset.key.split(",");
    const datas2 = e.target.dataset.key2;
    setData(datas);
    setBahanvalue(datas2);
    router.push(`/pages/master/databarang/add/${datas[0]}`);
  };

  const delet = async (e) => {
    if (e.target.dataset.key !== undefined) {
      const id = e.target.dataset.key;
      const response = await axiosJWT.delete(
        `http://localhost:5000/Barang/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    <div className={`mx-15 text-slate-500 max-h-full min-h-screen pb-10`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-10 text-center">Data Barang</p>
      </div>
      <div className={`bg-white py-5 w-11/12 m-auto rounded-lg `}>
        <Serch halaman={"/pages/master/databarang/add"} get={getData_Barang} />
        <div className="wrapper">
          <table className="border-collapse table-auto text-sm w-11/12 mx-auto text-center">
            <thead className="blue2 text-slate-100">
              <tr>
                <th
                  className={`border border-gray-300 font-medium p-4 pl-8 pb-3 rounded-t-lg ${
                    !chkbox1 ? "hidden" : ""
                  }`}
                >
                  Nama Barang
                </th>
                <th
                  className={`border border-gray-300 font-medium p-4 pl-8 pb-3 rounded-t-lg  ${
                    !chkbox2 ? "hidden" : ""
                  }`}
                >
                  Satuan
                </th>
                <th
                  className={`border border-gray-300 font-medium p-4 pl-8 pb-3 rounded-t-lg  ${
                    !chkbox3 ? "hidden" : ""
                  }`}
                >
                  Bahan
                </th>
                <th
                  className={`border border-gray-300 font-medium p-4 pl-8 pb-3 rounded-t-lg  ${
                    !chkbox4 ? "hidden" : ""
                  }`}
                >
                  Stock
                </th>
                <th
                  className={`border border-gray-300 font-medium p-4 pl-8 pb-3 rounded-t-lg  ${
                    !chkbox5 ? "hidden" : ""
                  }`}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {databarang?.map((item) => (
                <tr key={item.id}>
                  <td
                    className={`border border-gray-300 p-4 pl-8 text-slate-500  ${
                      !chkbox1 ? "hidden" : ""
                    }`}
                  >
                    <input
                      value={nama || ""}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className={`${
                        disableds == item.id ? "" : "hidden"
                      } w-full py-2 bg-transparent border border-gray-300`}
                      placeholder={item.nama}
                    />
                    <p className={`${disableds == item.id ? "hidden" : ""}`}>
                      {item.nama}
                    </p>
                  </td>
                  <td
                    className={`border border-gray-300 p-4 pl-8 text-slate-500  ${
                      !chkbox2 ? "hidden" : ""
                    }`}
                  >
                    <select
                      className={`w-full p-2 my-5 border border-gray-300 rounded-lg ${
                        disableds == item.id ? "" : "hidden"
                      }`}
                      onChange={(e) => setJenisvalue(e.target.value)}
                      fdprocessedid="true"
                      value={jenisvalue || ""}
                    >
                      {jenis?.map((item) => (
                        <option key={item.id} value={item.jenis}>
                          {item.jenis}
                        </option>
                      ))}
                    </select>
                    <p className={`${disableds == item.id ? "hidden" : ""}`}>
                      {" "}
                      {item.jenis}
                    </p>
                  </td>
                  <td
                    className={`border border-gray-300 p-4 pl-8 text-slate-500  ${
                      !chkbox3 ? "hidden" : ""
                    }`}
                  >
                    <input
                      value={bahan || ""}
                      onChange={(e) => setBahan(e.target.value)}
                      type="text"
                      className={`${
                        disableds == item.id ? "" : "hidden"
                      } w-full py-2 bg-transparent border border-gray-300`}
                      placeholder={item.bahan.replace("[", "").replace("]", "")}
                    />
                    <p className={`${disableds == item.id ? "hidden" : ""}`}>
                      {item.bahan.replace("[", "").replace("]", "")}
                    </p>
                  </td>
                  <td
                    className={`border border-gray-300 p-4 pl-8 text-slate-500  ${
                      !chkbox4 ? "hidden" : ""
                    }`}
                  >
                    <input
                      value={stock || ""}
                      onChange={(e) => setStock(e.target.value)}
                      type="number"
                      className={`${
                        disableds == item.id ? "" : "hidden"
                      } w-full py-2 bg-transparent border border-gray-300`}
                      placeholder={item.stok}
                    />
                    <p className={`${disableds == item.id ? "hidden" : ""}`}>
                      {item.stok}
                    </p>
                  </td>
                  <td
                    className={`border border-gray-300 p-4 pl-8 text-slate-500 ${
                      !chkbox5 ? "hidden" : ""
                    }`}
                  >
                    <div className="basis-1/12 flex flex-row text-center">
                      <p
                        className={`basis-1/2 cursor-pointer text-center`}
                        data-key2={item.bahan}
                        data-key={[
                          item.id,
                          item.nama,
                          item.jenis,
                          item.stok,
                          item.bahan,
                        ]}
                        onClick={updateinput}
                      >
                        <svg
                          className="m-auto"
                          data-key={[
                            item.id,
                            item.nama,
                            item.jenis,
                            item.stok,
                            item.bahan,
                          ]}
                          data-key2={item.bahan}
                          onClick={updateinput}
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                          fill="currentColor"
                        >
                          <path
                            data-key={[
                              item.id,
                              item.nama,
                              item.jenis,
                              item.stok,
                              item.bahan,
                            ]}
                            data-key2={item.bahan}
                            onClick={updateinput}
                            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                          />
                        </svg>
                      </p>
                      <p
                        className="basis-1/2 cursor-pointer text-center"
                        data-key={item.id}
                        onClick={delet2}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 448 512"
                          className="m-auto"
                          data-key={item.id}
                          onClick={delet2}
                        >
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
      <ul
        className={`max-[800px]:top-[380px] h-fit blue text-slate-100 w-fit absolute top-[340px] postionus rounded-lg ${
          col == 0 ? "hidden" : ""
        }`}
      >
        <li className="w-40 py-5 pb-3 px-5 flex">
          <input
            type="checkbox"
            defaultChecked
            value={1}
            onClick={(e) => setChkbox1(e.target.checked)}
          />
          <p className="m-auto text-center">nama</p>
        </li>
        <li className="w-30 py-5 pb-3 px-5 flex">
          <input
            type="checkbox"
            defaultChecked
            value={2}
            onClick={(e) => setChkbox2(e.target.checked)}
          />
          <p className="m-auto text-center">satuan</p>
        </li>
        <li className="w-30 py-5 pb-3 px-5 flex">
          <input
            type="checkbox"
            defaultChecked
            value={3}
            onClick={(e) => setChkbox3(e.target.checked)}
          />
          <p className="m-auto text-center">bahan</p>
        </li>
        <li className="w-30 py-5 pb-3 px-5 flex">
          <input
            type="checkbox"
            defaultChecked
            value={3}
            onClick={(e) => setChkbox4(e.target.checked)}
          />
          <p className="m-auto text-center">stock</p>
        </li>
        <li className="w-30 py-5 pb-5 px-5 flex">
          <input
            type="checkbox"
            defaultChecked
            value={4}
            onClick={(e) => setChkbox5(e.target.checked)}
          />
          <p className="m-auto text-center">action</p>
        </li>
      </ul>
    </div>
  );
}
