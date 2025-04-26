import Mockup from "@/assets/images/mockup.png";
import Image from "next/image";
export default function WhyWorkWithUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 mt-4 lg:mt-20 lg:px-8">
      {/* Header Section */}
      <div className="text-center max-w-screen-sm mx-auto mb-12">
        <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold">Why choose JED?</h1>
        <p className=" text-lg md:text-xl mt-6">
          The best of design, user experience and more important features for the <span className="text-secondary/70"> success of your online event.</span>{" "}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* USSD support */}
        <div className="bg-[#f2f7e5] rounded-xl p-6">
          <h3 className="font-bold text-gray-900 text-xl">USSD Support</h3>
          <p className="text-sm text-gray-600 mb-6">Let people vote or buy tickets using a short code on any phone—no internet needed.</p>

          <div className="bg-white rounded-xl mt-3 p-4 relative">
            <div className="flex justify-center items-center h-24">
              <span className="text-6xl font-bold">*USSD#</span>
            </div>
          </div>
          <div className="mt-8">
            <p className=" text-sm">
              With our USSD feature, people can vote, or buy tickets from any phone even without internet. They just dial a short code and follow simple
              prompts.
            </p>
          </div>
        </div>

        {/* Real time results*/}
        <div className="bg-[#f2f7e5] rounded-xl p-6">
          <h3 className="font-bold text-gray-900 text-xl">Real-time results</h3>
          <p className="text-sm text-gray-600 mb-6">See votes and ticket sales update instantly as they happen.</p>

          <div className="bg-white rounded-xl p-4 relative">
            <div className="flex items-center mb-4">
              <div className="w-2 aspect-square bg-accent rounded-full mr-2"></div>
              <span className="text-xs text-gray-500">Live</span>
              <div className="ml-auto px-3 flex items-center py-1 bg-gray-800 rounded-full">
                <span className="text-xs text-white">Export results</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-xs text-gray-500 w-16">CHEESA</span>
                <div className="flex-1 h-6 bg-gray-100 rounded"></div>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 w-16">APCES</span>
                <div className="flex-1 h-6 bg-gray-100 rounded flex items-center">
                  <div className="w-6 h-4 bg-blue-100 rounded ml-2"></div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 w-16">GESA</span>
                <div className="flex-1 h-6 bg-gray-100 rounded flex items-center">
                  <div className="w-6 h-4 bg-red-100 rounded ml-2"></div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 w-16">SOCIOSO</span>
                <div className="flex-1 h-6 bg-gray-100 rounded"></div>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 w-16">HESA</span>
                <div className="flex-1 h-6 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-[#f2f7e5] rounded-xl p-6">
          <h3 className="font-bold text-xl ">Performance & Reliability</h3>
          <p className="text-sm text-gray-600 mb-6">The platform stays fast and works smoothly, even during peak times.</p>

          <div className="flex justify-center items-center h-48">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-accent"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                  transform: "rotate(10deg)",
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-accent font-bold text-xl">Uptime</span>
                <span className="text-accent font-bold text-sm">99%</span>
              </div>
            </div>
          </div>
          <section>
            <p className=" text-sm">
              Whether you're handling hundreds or thousands of users, the platform stays fast and stable. It’s built to perform well even during high-traffic
              moments like voting deadlines.
            </p>
          </section>
        </div>

        {/* Revenue*/}
        <div className="bg-[#f2f7e5] rounded-xl p-6 md:col-span-2 lg:col-span-1">
          <h3 className="font-bold text-gray-900 text-xl">Revenue Tracker</h3>
          <p className="text-sm text-gray-600 mb-6">Track all the money from votes and tickets in one place</p>

          <div className="flex justify-center">
            <div className="relative w-64 bg-black rounded-3xl p-2 overflow-hidden">
              <div className="bg-accent rounded-2xl p-4">
                <div className="text-3xl font-bold text-white text-center my-2">14:23</div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="bg-gray-800 rounded-lg p-2 flex items-center">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold mr-2">S</div>
                  <div className="text-xs text-white">
                    <p className=" text-gray-200 text-sm">Paystack</p>
                    <p className="text-gray-400 text-xs">Payment Received</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 flex items-center">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold mr-2">S</div>
                  <div className="text-xs text-white">
                    <p className=" text-gray-200 text-sm">Paystack</p>
                    <p className="text-gray-400 text-xs">Payment Received</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 flex items-center">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold mr-2">S</div>
                  <div className="text-xs text-white">
                    <p className=" text-gray-200 text-sm">Paystack</p>
                    <p className="text-gray-400 text-xs">Payment Received</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 flex items-center">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold mr-2">S</div>
                  <div className="text-xs text-white">
                    <p className=" text-gray-200 text-sm">Paystack</p>
                    <p className="text-gray-400 text-xs">Payment Received</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-[#f2f7e5] rounded-xl p-6 lg:col-span-2">
          <div>
            <h3 className="font-bold text-gray-900 text-xl">Analytics</h3>
            <p className="text-sm text-gray-600 mb-6">Get simple charts and insights to help you understand your audience and improve your event.</p>
          </div>
          <section>
            <Image src={Mockup} alt="Analytics data" />
          </section>
        </div>
      </div>
    </div>
  );
}
