"use client";
import axios from "axios";
import { Contex } from "@/app/Context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import {
  faPencil,
  faRotate,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
axios.defaults.withCredentials = true;

export default function Home() {
  const {
    axiosJWT,
    token,
    refreshPage,
    getTransaksi,
    transaksi,
    setLimit,
    limit,
    getTransaksiexel,
    toat,
    MySwal,
  } = useContext(Contex);
  const [msg, setMsg] = useState();

  const [data, setData] = useState([]);
  const [alur, setAlur] = useState();
  const [stock, setStock] = useState();
  const [ket, setKet] = useState();
  const [disableds, setDdisableds] = useState();

  //col
  const [col, setCol] = useState(0);
  const [chkbox1, setChkbox1] = useState(true);
  const [chkbox2, setChkbox2] = useState(true);
  const [chkbox3, setChkbox3] = useState(true);
  const [chkbox4, setChkbox4] = useState(true);
  const [chkbox5, setChkbox5] = useState(true);
  const [chkbox6, setChkbox6] = useState(true);
  const [chkbox7, setChkbox7] = useState(true);
  const [chkbox8, setChkbox8] = useState(true);

  useEffect(() => {
    getTransaksi();
    setTimeout(() => {
      setMsg("");
    }, 2000);
  }, [msg]);

  const updateinput = (e) => {
    e.preventDefault();
    if (e.target.dataset.key !== undefined) {
      const datas = e.target.dataset.key.split(",");
      setData([datas[1], datas[2], datas[3]]);
      setAlur(datas[4].toString());
      setStock(parseInt(datas[5]));
      setKet(datas[6].toString());
      setDdisableds(parseInt(datas[0]));
    }
  };

  const update = async (e) => {
    const id = e.target.dataset.key;
    const response = await axiosJWT.patch(
      `https://backendwebstock.vercel.app/Transaksi/${id}`,
      {
        nama: data[0],
        tipe: data[1],
        jenis: data[2],
        alur: alur,
        stok: stock,
        ket: ket,
      },
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
      const response = await axiosJWT.delete(
        `http://localhost:5000/Transaksi/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg("del");
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
    <div className="mx-15 text-slate-500  max-h-full min-h-screen pb-10">
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-10 text-center">
          History Transaksi
        </p>
      </div>
      <div className="bg-white pt-8 w-11/12 m-auto rounded-lg">
        <div className="w-11/12 mx-auto">
          <div className="flex max-[600px]:block">
            <p className=" max-[600px]:mb-5 text-xl">
              {" "}
              Data 100 transaksi terakhir
            </p>
            <p
              className=" max-[600px]:mt-5 max-[600px]:text-sm  my-auto ml-auto text-xl flex cursor-pointer"
              onClick={() => getTransaksiexel()}
            >
              Download Excel__
              <svg
                onClick={() => getTransaksiexel()}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="my-auto cursor-pointer"
              >
                <path
                  onClick={() => getTransaksiexel()}
                  fill="currentColor"
                  d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
                />
              </svg>
            </p>
          </div>
          <div className="my-5 pt-5 border-t border-gray-300 flex flex-row max-[830px]:block">
            <div className="basis-1/2 flex">
              <p className="px-2  max-[830px]:px-0 max-[830px]:my-auto">Show</p>
              <select
                className="max-[830px]:mx-3 max-[830px]:w-20 w-1/6 rounded-md p-1 border border-gray-300"
                onChange={(e) => setLimit(e.target.value)}
                fdprocessedid="true"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <p className="px-2 max-[830px]:px-0 max-[830px]:my-auto">Rows</p>
            </div>
            <div className="flex flex-row-reverse basis-1/2 max-[830px]:mt-5">
              <p
                className="p-1 cursor-pointer w-20 text-center "
                onClick={refreshPage}
              >
                <FontAwesomeIcon icon={faRotate} onClick={refreshPage} />
              </p>
              <p
                className="p-1 cursor-pointer w-20 text-center"
                onClick={() => (col == 1 ? setCol(0) : setCol(1))}
              >
                <FontAwesomeIcon icon={faTableCells} />
              </p>
              <input
                onChange={(e) => {
                  getTransaksi(e.target.value);
                }}
                type="text"
                placeholder="Search"
                className="rounded-md p-1 border border-gray-300 max-[830px]:w-full"
                fdprocessedid="true"
              />
            </div>
          </div>
        </div>
        <div
          className={`m-auto ${
            transaksi && transaksi.result.length !== 0 ? "hidden" : ""
          }`}
        >
          <div className="text-center mx-auto my-32">
            Tidak ada data Transaksi
          </div>
        </div>
        <div className="wrapper">
          <table
            className={`border-collapse table-auto text-sm w-11/12 m-auto text-center ${
              transaksi && transaksi.result.length == 0 ? "hidden" : ""
            }`}
          >
            <thead className="blue2 text-slate-100">
              <tr>
                <th
                  className={`border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${
                    !chkbox8 ? "hidden" : ""
                  }`}
                >
                  Tanggal
                </th>
                <th
                  className={`border border-gray-300 font-medium p-4 pl-8 rounded-t-lg ${
                    !chkbox1 ? "hidden" : ""
                  }`}
                >
                  Nama Barang
                </th>
                <th
                  className={`border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${
                    !chkbox2 ? "hidden" : ""
                  }`}
                >
                  Tipe
                </th>
                <th
                  className={`border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${
                    !chkbox3 ? "hidden" : ""
                  }`}
                >
                  Satuan
                </th>
                <th
                  className={`border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${
                    !chkbox4 ? "hidden" : ""
                  }`}
                >
                  Alur
                </th>
                <th
                  className={`border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${
                    !chkbox5 ? "hidden" : ""
                  }`}
                >
                  Jumlah
                </th>
                <th
                  className={`border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${
                    !chkbox6 ? "hidden" : ""
                  }`}
                >
                  Keterangan
                </th>
                <th
                  className={`border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  text-center ${
                    !chkbox7 ? "hidden" : ""
                  }`}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {transaksi?.result.map((item) => (
                <tr key={item.id}>
                  <td
                    className={`border border-gray-300 p-4 pl-8 text-slate-500  ${
                      !chkbox8 ? "hidden" : ""
                    }`}
                  >
                    {item.createdAt.replace(/T/gi, " | ").replace("000Z", " ")}
                  </td>
                  <td
                    className={`border border-gray-300 p-4 pl-8 text-slate-500  ${
                      !chkbox1 ? "hidden" : ""
                    }`}
                  >
                    <p>{item.nama}</p>
                  </td>
                  <td
                    className={`border border-gray-300 p-4 text-slate-500  ${
                      !chkbox2 ? "hidden" : ""
                    }`}
                  >
                    <p> {item.tipe}</p>
                  </td>
                  <td
                    className={`border border-gray-300 p-4 text-slate-500  ${
                      !chkbox3 ? "hidden" : ""
                    }`}
                  >
                    <p> {item.jenis}</p>
                  </td>
                  <td
                    className={`border border-gray-300 p-4 pr-8 text-slate-500  ${
                      !chkbox4 ? "hidden" : ""
                    }`}
                  >
                    <p>{item.alur}</p>
                  </td>
                  <td
                    className={`border border-gray-300 p-4 pr-8 text-slate-500  ${
                      !chkbox5 ? "hidden" : ""
                    }`}
                  >
                    <input
                      value={stock || ""}
                      onChange={(e) => setStock(parseInt(e.target.value))}
                      type="number"
                      className={`${
                        disableds == item.id ? "" : "hidden"
                      } w-full py-2 bg-transparent border border-gray-300`}
                      fdprocessedid="true"
                    />
                    <p className={`${disableds == item.id ? "hidden" : ""}`}>
                      {item.stok}
                    </p>
                  </td>
                  <td
                    className={`border border-gray-300 p-4 pr-8 text-slate-500  ${
                      !chkbox6 ? "hidden" : ""
                    }`}
                  >
                    <textarea
                      value={ket || item.ket}
                      onChange={(e) => setKet(e.target.value)}
                      className={`${
                        disableds == item.id ? "" : "hidden"
                      } w-full py-2 bg-transparent border border-gray-300`}
                      fdprocessedid="true"
                    />
                    <p className={`${disableds == item.id ? "hidden" : ""}`}>
                      {item.ket}
                    </p>
                  </td>
                  <td
                    className={`border border-gray-300 p-4 text-slate-500 ${
                      !chkbox7 ? "hidden" : ""
                    }`}
                  >
                    <div
                      className="basis-1/12 flex flex-row text-center"
                      data-key={item.id}
                    >
                      <p
                        className={`${
                          disableds == item.id ? "" : "hidden"
                        } basis-1/2 cursor-pointer`}
                        data-key={item.id}
                        onClick={update}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 448 512"
                          className="m-auto"
                          data-key={item.id}
                          onClick={update}
                        >
                          <path
                            data-key={item.id}
                            onClick={update}
                            fill="currentColor"
                            d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                          />
                        </svg>
                      </p>
                      <p
                        className={`basis-1/2 cursor-pointer ${
                          disableds == item.id ? "hidden" : ""
                        }`}
                        data-key={[
                          item.id,
                          item.nama,
                          item.tipe,
                          item.jenis,
                          item.alur,
                          item.stok,
                          item.ket,
                        ]}
                        onClick={updateinput}
                      >
                        <FontAwesomeIcon
                          data-key={[
                            item.id,
                            item.nama,
                            item.tipe,
                            item.jenis,
                            item.alur,
                            item.stok,
                            item.ket,
                          ]}
                          icon={faPencil}
                          onClick={updateinput}
                        />
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

        <div className="flex flex-row w-11/12 mx-auto py-8 max-[500px]:py-4 max-[500px]:block max-[500px]:text-center ">
          <p className="basis-1/2">
            Showing 1 to {transaksi?.limit} of {transaksi?.totalRows} rows
          </p>
          <div className="flex basis-1/2 flex-row-reverse flex-row max-[500px]:flex-row max-[500px]:my-5">
            <button
              fdprocessedid="true"
              className="basis-1/12 cursor-pointer max-[500px]:basis-11/12"
              data-match="tam"
              onClick={() =>
                transaksi && transaksi.totalPage - 1 > transaksi.page
                  ? getTransaksi("", transaksi && transaksi.page + 1)
                  : ""
              }
            >
              Next
            </button>
            <p className="basis-2/12 text-center">
              {transaksi && transaksi.page + 1}
            </p>
            <button
              fdprocessedid="true"
              className="basis-1/12 cursor-pointer max-[500px]:basis-11/12"
              data-match="kur"
              onClick={() =>
                transaksi && transaksi.page > 0
                  ? getTransaksi("", transaksi && transaksi.page - 1)
                  : ""
              }
            >
              Previous
            </button>
          </div>
        </div>
      </div>
      <ul
        className={`max-[800px]:top-[440px] h-fit blue text-slate-100 w-fit absolute top-[345px] postionus rounded-lg ${
          col == 0 ? "hidden" : ""
        }`}
      >
        <li className="w-40 py-5 pb-3 px-3 flex">
          <input
            type="checkbox"
            defaultChecked
            value={1}
            onClick={(e) => setChkbox8(e.target.checked)}
          />
          <p className="m-auto text-center">date</p>
        </li>
        <li className="w-40 py-5  pb-3 px-3 flex">
          <input
            type="checkbox"
            defaultChecked
            value={1}
            onClick={(e) => setChkbox1(e.target.checked)}
          />
          <p className="m-auto text-center">nama</p>
        </li>
        <li className="w-30 py-5 pb-3 px-3 flex">
          <input
            type="checkbox"
            defaultChecked
            value={2}
            onClick={(e) => setChkbox2(e.target.checked)}
          />
          <p className="m-auto text-center">tipe</p>
        </li>
        <li className="w-30 py-5 pb-3 px-3 flex">
          <input
            type="checkbox"
            defaultChecked
            value={3}
            onClick={(e) => setChkbox3(e.target.checked)}
          />
          <p className="m-auto text-center">satuan</p>
        </li>
        <li className="w-30 py-5 pb-3 px-3 flex">
          <input
            type="checkbox"
            defaultChecked
            value={4}
            onClick={(e) => setChkbox4(e.target.checked)}
          />
          <p className="m-auto text-center">alur</p>
        </li>
        <li className="w-30 py-5 pb-3 px-3 flex">
          <input
            type="checkbox"
            defaultChecked
            value={4}
            onClick={(e) => setChkbox5(e.target.checked)}
          />
          <p className="m-auto text-center">stock</p>
        </li>
        <li className="w-30 py-5 pb-3 px-3 flex">
          <input
            type="checkbox"
            defaultChecked
            value={4}
            onClick={(e) => setChkbox6(e.target.checked)}
          />
          <p className="m-auto text-center">ket</p>
        </li>
        <li className="w-30 py-5 pb-5 px-3 flex">
          <input
            type="checkbox"
            defaultChecked
            value={4}
            onClick={(e) => setChkbox7(e.target.checked)}
          />
          <p className="m-auto text-center">action</p>
        </li>
      </ul>
    </div>
  );
}
