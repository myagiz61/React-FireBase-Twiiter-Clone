import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithRedirect,
} from "firebase/auth";
import { auth, provider } from "./../firebase/firebaseConfig";
import { toast } from "react-toastify";
const Auth = () => {
  const [signUp, setSignUp] = useState(false);
  const [isError, setIsError] = useState(null);
  const [email, setEmail] = useState("");

  // google ile giriş yapma işlemi
  const handleGoogle = () => {
    signInWithRedirect(auth, provider)
      .then(() => {
        toast.success("Başarıyla Giriş Yapıldı Yönlendiriliyorsunuz");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  // şifre sıfırlama
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        toast.info("Lütfen Mailinizi Kontrol Edin");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  // GİRİŞ YAPMA İŞLEMLERİ
  const handleSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;
    console.log(email, pass);
    if (signUp) {
      // kaydol > kullanıcı oluşturucaz
      createUserWithEmailAndPassword(auth, email, pass).catch(
        (err) => {
          toast.error(err.code);
        }
      );
    } else {
      // giriş yap > varolan hesaba giriş
      signInWithEmailAndPassword(auth, email, pass).catch((err) => {
        toast.error(err.code);
        // şifre hatası varsa state'i güncelle
        if (err.code === "auth/invalid-credential") {
          setIsError(true);
        }
      });
    }
  };

  return (
    <div className="h-[100vh] bg-zinc-800 grid place-items-center">
      <div
        style={{ width: "600px", height: "65vh" }}
        className="bg-black text-white flex flex-col gap-10 py-16 px-32 rounded-lg"
      >
        <div className="flex justify-center">
          <img className="h-[60px]" src="/xlogo.png" alt="" />
        </div>

        <h1 className="text-center font-bold text-xl">
          Twitter'a giriş yap
        </h1>

        <div
          style={{
            padding: "18px",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={handleGoogle}
          className="flex items-center gap-3 bg-white text-black py-2 px-10 rounded-full cursor-pointer hover:bg-gray-200"
        >
          <img className="h-[25px]" src="/google.png" />
          <p
            style={{ fontWeight: "bold", fontSize: "20px" }}
            className="whitespace-nowrap"
          >
            Google ile giriş yap
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded p-2 shadow-lg focus:shadow-[#ffffff48] outline"
            type="email"
          />

          <label className="mt-5">Password</label>
          <input
            className="text-black rounded p-2 shadow-lg focus:shadow-[#ffffff48] outline"
            type="password"
          />

          <button
            className="bg-white text-black mt-10 rounded-full p-3 font-bold transition hover:bg-gray-200"
            type="submit"
          >
            {signUp ? "Kaydol" : "Giriş Yap"}
          </button>

          <p className="text-gray-500 mt-5">
            <span style={{ marginLeft: "10px", fontSize: "19px" }}>
              Hesabınız yok mu?
            </span>
            <button
              style={{ marginLeft: "80px", fontSize: "19px" }}
              onClick={() => setSignUp(!signUp)}
              className="mx-5 text-blue-500"
              type="button"
            >
              {signUp ? "Giriş Yap" : "Kaydol"}
            </button>
          </p>

          {/* kullanıcı giriş yap modundaysa ve hata varsa gözükür */}
          {!signUp && isError && (
            <button
              type="button"
              className="text-red-400 mt-5"
              onClick={handleReset}
            >
              Şifrenimi unuttun?
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
