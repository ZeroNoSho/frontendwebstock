"use client";
import { Contex } from "@/app/Context/store";
import { useContext, useEffect } from "react";

export default function page() {
  const { pembelian, getBarang } = useContext(Contex);

  useEffect(() => {
    getBarang();
  }, []);

  return (
    <div className={`mx-15 text-slate-500 max-h-full min-h-screen pb-10`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold mt-10 text-center">Rencana Pembelian</p>
      </div>
      <div>
        {pembelian?.map((item) => (
          <div key={item.id} className="my-4 bg-white py-5 w-11/12 m-auto rounded-lg flex border-l-4 border-indigo-500">
            <div className="w-11/12 mx-auto">
              <p className="uppercase font-semibold text-xl">{item.nama}</p>
              <p>
                Jumlah stock mulai menipis ({item.stok} {item.jenis})
              </p>
              <p>{item.updatedAt.replace(/T/g, " | ").replace(".000Z", "")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
