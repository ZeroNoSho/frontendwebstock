"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { faBoxesStacked, faCashRegister, faChartLine, faChartSimple, faCubesStacked, faLeftLong, faList, faPenToSquare, faPlus, faQrcode, faReceipt, faRightLong, faSeedling, faTag, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Contex } from "@/app/Context/store";

export default function Menu() {
  const { navbar, setNavbar } = useContext(Contex);
  const [nav_menu, setNav_menu] = useState(0);

  const navs = () => {
    setNavbar(false);
  };

  return (
    <div className={`max-[700px]:w-full w-96 fixed h-screen blue text-slate-100 ${navbar == true ? " " : "hidden"}`}>
      <div>
        <div className="flex flex-row  py-5 cursor-default">
          <p className="ui-font-serif font-semibold text-xl text-center basis-1/6">
            <FontAwesomeIcon icon={faChartSimple} />
          </p>
          <h3 className="ui-font-serif font-semibold text-xl basis-4/6">
            <Link href="/pages/dashboard">
              <span className="pr-2">W</span>
              <span className="pr-2">E</span>
              <span className="pr-2">B</span>
              <span className="pr-2">-</span>
              <span className="pr-2">S</span>
              <span className="pr-2">T</span>
              <span className="pr-2">O</span>
              <span className="pr-2">C</span>
              <span className="pr-2">K</span>
            </Link>
          </h3>
          <svg onClick={navs} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="cursor-pointer ui-font-serif font-semibold text-xl text-center basis-1/6 m-auto ">
            <path
              onClick={navs}
              fill="#f1f5f9"
              className="cursor-pointer"
              d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
            />
          </svg>
        </div>

        <hr />

        <div className="py-5 cursor-default">
          <div className="flex flex-row">
            <p className="basis-1/6 text-center">
              <FontAwesomeIcon icon={faList} />
            </p>
            <p className="basis-4/6">Menu</p>
            <p
              className="basis-1/6 text-center cursor-pointer"
              onClick={() => {
                nav_menu == 1 ? setNav_menu(0) : setNav_menu(1);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </p>
          </div>
          <div className={`${nav_menu == 1 ? "" : "hidden"} blue2 mt-5`}>
            <Link href="/pages/menu/bahanbaku">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faCubesStacked} />
                &nbsp; Bahan Baku
              </p>
            </Link>
            <Link href="/pages/menu/persedian">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faBoxesStacked} />
                &nbsp; Persedian
              </p>
            </Link>
            <Link href="/pages/menu/pembelian">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faPenToSquare} />
                &nbsp; Rencana Pembelian
              </p>
            </Link>
            <Link href="/pages/menu/produksi">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faSeedling} />
                &nbsp; Rencana Produksi
              </p>
            </Link>
          </div>
        </div>

        <div className="flex flex-row py-5 cursor-pointer">
          <p className="basis-1/6 text-center">
            <FontAwesomeIcon icon={faChartLine} />
          </p>
          <Link href="/pages/dashboard" className="basis-5/6">
            Dashboard
          </Link>
        </div>

        <div className="py-5 cursor-default">
          <div className="flex flex-row">
            <p className="basis-1/6 text-center">
              <FontAwesomeIcon icon={faCashRegister} />
            </p>
            <p className="basis-4/6">Transaksi</p>
            <p
              className="basis-1/6 text-center cursor-pointer"
              onClick={() => {
                nav_menu == 3 ? setNav_menu(0) : setNav_menu(3);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </p>
          </div>
          <div className={`${nav_menu == 3 ? "" : "hidden"} blue2 mt-5`}>
            <Link href="/pages/transaksi/masuk">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faRightLong} />
                &nbsp; Transaksi Masuk
              </p>
            </Link>
            <Link href="/pages/transaksi/keluar">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faLeftLong} />
                &nbsp; Transaksi Keluar
              </p>
            </Link>
          </div>
        </div>

        <div className="py-5 cursor-default">
          <div className="flex flex-row">
            <p className="basis-1/6 text-center">
              <FontAwesomeIcon icon={faQrcode} />
            </p>
            <p className="basis-4/6">Master</p>
            <p
              className="basis-1/6 text-center cursor-pointer"
              onClick={() => {
                nav_menu == 2 ? setNav_menu(0) : setNav_menu(2);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </p>
          </div>
          <div className={`${nav_menu == 2 ? "" : "hidden"} blue2 mt-5`}>
            <Link href="/pages/master/databarang">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faTags} />
                &nbsp; Data Barang
              </p>
            </Link>
            <Link href="/pages/master/jenisbarang">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faTags} />
                &nbsp; Jenis Barang
              </p>
            </Link>
          </div>
        </div>

        <div className="flex flex-row py-5 cursor-pointer">
          <p className="basis-1/6 text-center">
            <FontAwesomeIcon icon={faReceipt} />
          </p>
          <Link href="/pages/report" className="basis-5/6">
            Report
          </Link>
        </div>
      </div>
    </div>
  );
}
