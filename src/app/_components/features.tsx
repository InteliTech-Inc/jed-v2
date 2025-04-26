import Image from "next/image";
import { BarChart3, ChevronRight, Search } from "lucide-react";
import Pic from "@/assets/images/nom.png";

export default function FashionApp() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="grid max-w-6xl grid-cols-12 gap-4">
        {/* Top Left Card - App Promo */}
        <div className="col-span-12 md:col-span-6 relative overflow-hidden rounded-3xl bg-[#f2f7e5] p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:mr-4">
              <Image src={Pic} alt="Smartphone showing Fento app" width={200} height={400} className="rounded-xl" />
            </div>
            <div className="max-w-xs">
              <h3 className="text-sm font-medium text-gray-700 mb-1">Fento</h3>
              <h2 className="text-2xl font-bold text-gray-800">Wear outfits that get trending every Single time.</h2>
              <div className="mt-4 flex items-center">
                <Image src={Pic} alt="Apple logo" width={20} height={20} className="mr-2" />
                <span className="text-sm text-gray-600">App Store</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Right Card - Model Portrait - Taller than others */}
        <div className="col-span-12 md:col-span-6 md:row-span-2 relative overflow-hidden rounded-3xl bg-[#a8b4b9]">
          <Image src={Pic} alt="Fashion model portrait" fill className="absolute inset-0 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="mb-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <p className="text-white">Rate my outfit from 1 to 10?</p>
            </div>
            <div className="flex items-center justify-end">
              <div className="flex h-10 w-20 items-center justify-center rounded-full bg-teal-500 text-white">
                <span className="mx-1">•</span>
                <span className="mx-1">•</span>
                <span className="mx-1">•</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Left Card - Analytics */}
        <div className="col-span-12 md:col-span-6 relative overflow-hidden rounded-3xl bg-[#faf3ea] p-6">
          <div className="flex flex-col">
            <div className="mb-4 flex items-center">
              <div className="mr-2 h-6 w-6 rounded-full bg-yellow-400"></div>
              <p className="text-xs text-gray-600">You outfit got 128 Likes</p>
            </div>
            <div className="mb-4 flex items-center">
              <div className="mr-2 h-6 w-6 rounded-full bg-gray-300"></div>
              <p className="text-xs text-gray-600">The outfit got 76 Saves</p>
            </div>
            <div className="mt-4 h-32">
              <div className="flex h-full items-end justify-between">
                <div className="w-1/6 h-[40%] bg-[#f0f3e0] rounded-t-md"></div>
                <div className="w-1/6 h-[60%] bg-[#f0f3e0] rounded-t-md"></div>
                <div className="w-1/6 h-[90%] bg-gradient-to-t from-yellow-500 to-green-400 rounded-t-md"></div>
                <div className="w-1/6 h-[70%] bg-[#f0f3e0] rounded-t-md"></div>
                <div className="w-1/6 h-[30%] bg-[#f0f3e0] rounded-t-md"></div>
              </div>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-gray-800">Track which outfit got the most likes, comments, etc</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
