"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("auth_token");

    router.push("/login");
  };

  return (
    <button
      onClick={logout}
      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl"
    >
      Logout
    </button>
  );
}
