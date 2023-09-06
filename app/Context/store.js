"use client";
import Swal from "sweetalert2";
import axios from "axios";
import jwt_decode from "jwt-decode";
import withReactContent from "sweetalert2-react-content";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
axios.defaults.withCredentials = true;
const Contex = createContext(null);

const Provider = ({ children }) => {
  const MySwal = withReactContent(Swal);
  const router = useRouter();

  //nav
  const [navbar, setNavbar] = useState(false);
  const [limit, setLimit] = useState();
  const [col, setCol] = useState(0);

  //api
  const [token, setToken] = useState("");
  const [exp, setExp] = useState("");
  const [name, setName] = useState("");

  //updae state
  const [data, setData] = useState([]);
  const [bahanvalue, setBahanvalue] = useState([]);

  //getJenis
  const [jenis, setJenis] = useState();
  //getJenis
  const [pembelian, setPembelian] = useState();
  //getPersedian
  const [persedian, setPersedian] = useState();
  //getPersedian
  const [bahan, setBahan] = useState();
  //get Data_Barang
  const [databarang, setDatabarang] = useState();
  //get Transaksi
  const [transaksi, setTransaksi] = useState();
  //get Produksi
  const [produksi, setProduksi] = useState();

  useEffect(() => {
    getToken();
  }, []);

  //token
  const getToken = async () => {
    axios
      .get(`https://backendwebstock.vercel.app/token`)
      .then((res) => {
        setToken(res.data.accessToken);
        const decode = jwt_decode(res.data.accessToken);
        setExp(decode.exp);
        setName(decode.name);
        getJenis();
        getBarang();
        rencana_pembelian();
        getBahanbakuSrch();
        getData_Barang();
        getTransaksi();
        getProduksi();
      })
      .catch((err) => {
        if (err.response) {
          router.push(`/`);
        }
      });
  };
  //refreshPage
  const refreshPage = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  //new token
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (exp * 1000 < currentDate.getTime()) {
        const response = await axios.get("https://backendwebstock.vercel.app/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decode = jwt_decode(response.data.accessToken);
        setExp(decode.exp);
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  /* Get API*/

  //(1) jenis
  const getJenis = async (e) => {
    const response = await axiosJWT.get(`https://backendwebstock.vercel.app/Jenis/serch?search_query=${e || ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setJenis(response.data.result);
  };
  //(2) rencana pembelian
  const rencana_pembelian = async (e) => {
    const response = await axiosJWT.get(`https://backendwebstock.vercel.app/Pembelian`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPembelian(response.data);
  };
  //(3) Persedian
  const getBarangexel = () => {
    axiosJWT
      .get(`https://backendwebstock.vercel.app/Pembelian/exel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        router.push("https://backendwebstock.vercel.app/Pembelian/exel");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBarang = async (e) => {
    const response = await axiosJWT.get(`https://backendwebstock.vercel.app/Pembelian/serch?search_query=${e || ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPersedian(response.data);
  };
  //(4) Bahan baku
  const getBahanbakuSrch = async (e) => {
    const response = await axiosJWT.get(`https://backendwebstock.vercel.app/Bahanbaku/serch?search_query=${e || ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBahan(response.data);
  };
  //(5) Data Barang
  const getData_Barang = async (e) => {
    const response = await axiosJWT.get(`https://backendwebstock.vercel.app/Barang/serch?search_query=${e || ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDatabarang(response.data.result);
  };
  //(6) Transaksi
  const getTransaksi = async (serch, page) => {
    const response = await axiosJWT.get(`https://backendwebstock.vercel.app/Transaksi/serch?search_query=${serch || ""}&limit=${limit || 5}&page=${page || ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTransaksi(response.data);
  };
  const getTransaksiexel = () => {
    axiosJWT
      .get(`https://backendwebstock.vercel.app/Transaksi/exel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        router.push("https://backendwebstock.vercel.app/Transaksi/exel");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //(7) Produksi
  const getProduksi = async (serch) => {
    const response = await axiosJWT.get(`https://backendwebstock.vercel.app/Produksi/serch?search_query=${serch || ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProduksi(response.data);
  };

  /* End Get API*/

  /* Toats Sweet Alet*/
  const toat = (e) => {
    const Toast = MySwal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: ` ${e || "add"} data successfully`,
    });
  };

  /* End Toats Sweet Alet*/

  return (
    <Contex.Provider
      value={{
        data,
        setData,
        bahanvalue,
        setBahanvalue,

        router,
        setCol,
        col,
        setNavbar,
        navbar,
        axiosJWT,
        token,
        refreshPage,
        pembelian,
        getBarangexel,
        getBarang,
        persedian,
        getBahanbakuSrch,
        bahan,
        getJenis,
        jenis,
        getData_Barang,
        databarang,
        getTransaksi,
        transaksi,
        getProduksi,
        produksi,
        name,
        setLimit,
        limit,
        getTransaksiexel,
        toat,
        MySwal,
      }}
    >
      {children}
    </Contex.Provider>
  );
};

export { Contex, Provider };
