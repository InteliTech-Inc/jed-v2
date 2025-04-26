import Image from "next/image";
import Awards from "@/assets/images/awards.jpg";
import Pageant from "@/assets/images/pegeant.jpg";
import TvShow from "@/assets/images/tv.jpg";
import School from "@/assets/images/schools.jpg";

export default function WhoItsFor() {
  return (
    <div className="p-6 md:p-12">
      <section className="max-w-screen-md text-center mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Built for event organizers who want more.</h1>
      </section>
      <div className="mx-auto mt-16 max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {/* Awards events */}
          <div
            className={`relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-700 transform 
              "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            h-[26rem]`}
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"></div>
              <Image src={Awards} alt="Background" layout="fill" objectFit="cover" className="z-0" />
            </div>

            <div className="relative z-20 flex flex-col justify-between h-full">
              <div className="mt-auto">
                <h2 className="text-xl font-bold text-white">Awards Events</h2>
                <p className="mt-2 text-white/90">Run smooth and fair award shows with easy nominations, voting, and real-time results.</p>
              </div>
            </div>
          </div>
          {/* Pageants */}
          <div
            className={`relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-700 transform  "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            h-[26rem]`}
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"></div>
              <Image src={Pageant} alt="Background" layout="fill" objectFit="cover" objectPosition="top" className="z-0" />
            </div>

            <div className="relative z-20 flex flex-col justify-between h-full">
              <div className="mt-auto">
                <h2 className="text-xl font-bold text-white">Pageants</h2>
                <p className="mt-2 text-white/90">
                  Manage every part of your pageant—from contestant voting to ticket sales—with one easy-to-use system. Give your audience a smooth and fun
                  experience.
                </p>
              </div>
            </div>
          </div>
          {/* TV shows */}
          <div
            className={`relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-700 transform  "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
             h-[26rem]`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"></div>
              <Image src={TvShow} alt="Background" layout="fill" objectFit="cover" className="z-0" />
            </div>

            <div className="relative z-20 flex flex-col justify-between h-full">
              <div className="mt-auto">
                <h2 className="text-xl font-bold text-white">TV & Reality Shows</h2>
                <p className="mt-2 text-white/90">
                  Let viewers vote and stay engaged with real-time updates. Our platform supports fast voting, clear results, and tools to keep your audience
                  excited and involved.
                </p>
              </div>
            </div>
          </div>
          {/* Schools */}
          <div
            className={`relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-700 transform  "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            h-[26rem]`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"></div>
              <Image src={School} alt="Background" layout="fill" objectFit="cover" className="z-0" />
            </div>

            <div className="relative z-20 flex flex-col justify-between h-full">
              <div className="mt-auto">
                <h2 className="text-xl font-bold text-white">Schools, Churches, Institutions and more...</h2>
                <p className="mt-2 text-white/90">
                  Whether it’s a school election, church awards, or a community contest, our platform makes it easy to manage votes, track results, and sell
                  tickets. It’s simple to use, works on any device, and fits events of all sizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
