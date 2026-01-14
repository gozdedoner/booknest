import Input from "../components/Input";
import Button from "../components/Button";
import bookImg from "../assets/book.jpg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen bg-softWhite
        flex items-center justify-center
        px-4 sm:px-6
      "
    >
      {/* GRID */}
      <div
        className="
          w-full max-w-6xl
          grid grid-cols-1 md:grid-cols-2
          gap-8 md:gap-12
          items-center
        "
      >
        {/* LEFT — Book Image */}
        <div className="hidden md:flex justify-center">
          <div
            className="
              relative
              w-[300px] h-[380px]
              lg:w-[420px] lg:h-[520px]
              rounded-3xl overflow-hidden
            "
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-[#C7A491]/30 blur-3xl" />

            {/* Image */}
            <img
              src={bookImg}
              alt="Book"
              className="
                w-full h-full object-cover
                rounded-3xl
                shadow-2xl shadow-black/30
                transition-transform duration-700
                hover:scale-[1.03]
              "
            />

            {/* Glass Reflection */}
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
          </div>
        </div>

        {/* RIGHT — Glass Login Card */}
        <div
          className="
            bg-[#919682]/40
            backdrop-blur-xl
            border border-[#919682]/30
            shadow-xl
            rounded-2xl sm:rounded-3xl
            p-6 sm:p-8 lg:p-10
            w-full max-w-md
            mx-auto
            transition-all duration-500
          "
        >
          {/* Title */}
          <h1
            className="
              text-2xl sm:text-3xl lg:text-4xl
              font-bold text-gray-900
              text-center mb-3
            "
          >
            BookNest
          </h1>

          {/* Underline */}
          <div className="w-20 sm:w-24 h-[3px] bg-[#595E48] mx-auto mb-6 sm:mb-8 rounded-full" />

          {/* Username */}
          <div className="mb-4">
            <label className="text-gray-800 font-medium text-sm sm:text-base">
              Kullanıcı Adı
            </label>
            <Input
              placeholder="kullanici123"
              className="border-[#595E48]/30 focus:border-[#595E48]"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-800 font-medium text-sm sm:text-base">
              Email
            </label>
            <Input
              placeholder="example@mail.com"
              className="border-[#595E48]/30 focus:border-[#595E48]"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-gray-800 font-medium text-sm sm:text-base">
              Şifre
            </label>
            <Input
              type="password"
              placeholder="••••••"
              className="border-[#595E48]/30 focus:border-[#595E48]"
            />
          </div>

          {/* Button */}
          <Button
            text="Giriş Yap"
            onClick={() => navigate("/home")}
            className="
              w-full
              bg-[#919682]
              hover:bg-[#595E48]
              text-white
              py-2.5 sm:py-3
              shadow-inner shadow-black/20
              transition-all duration-300
            "
          />
        </div>
      </div>
    </div>
  );
}
