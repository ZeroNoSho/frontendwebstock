"use client";
import Serch from "@/components/serch";
import { Contex } from "@/app/Context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";

export default function page() {
  const { axiosJWT, token, produksi, getProduksi, MySwal, router } = useContext(Contex);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    getProduksi();
  }, [msg, msg]);

  const delet = async (e) => {
    const response = await axiosJWT.delete(`https://backendwebstock.vercel.app/Produksi/${e}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getProduksi();
    setMsg(response.data.msg);
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

  const toatUpdate = (id) => {
    MySwal.fire({
      showCancelButton: false,
      showConfirmButton: false,
      html: (
        <div className="w-full flex">
          <button
            className="w-full py-10 border-r border-slate-400 sweetalet"
            onClick={(e) => {
              delet2(id);
              e.preventDefault();
            }}
          >
            <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
              <path
                fill="currentColor"
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              router.push(`/pages/menu/produksi/add/${id}`);
              MySwal.close();
            }}
            className="w-full py-10 sweetalet"
          >
            <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
              />
            </svg>
          </button>
        </div>
      ),
    });
  };

  return (
    <div className="mx-15 text-slate-500 max-h-full min-h-screen pb-10">
      <Serch halaman={"/pages/menu/produksi/add"} hidden={"hidden"} get={getProduksi} />
      {produksi?.result.map((item) => (
        <div key={item.id} className="my-4 bg-white py-5 w-11/12 m-auto rounded-lg flex border-l-4 border-indigo-500">
          <div className="w-11/12 mx-auto">
            <div className="flex mb-5">
              <div className="mr-auto">
                <p className="text-xl font-semibold uppercase">{item.nama}</p>
                <p className="text-sm">
                  Rencana jumlah produksi : {item.jumlah} ({item.jenis})
                </p>
              </div>
              <button
                className="ml-auto my-auto text-center text-xl"
                onClick={() => {
                  toatUpdate(item.id);
                }}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => toatUpdate()} />
              </button>
            </div>
            <div>
              <hr />
              <p className="mt-2">{item.createdAt.replace(/T/gi, " | ").replace("000Z", "").replace(".", "")}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
