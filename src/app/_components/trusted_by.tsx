import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";
import Knust from "@/assets/images/knust.png";
import UG from "@/assets/images/ug_logo.png";
import KTT from "@/assets/images/ttu_logo.png";
import Cheesa from "@/assets/images/cheesa logo.png";
import Gaesa from "@/assets/images/gaesa.jpeg";
import apces from "@/assets/images/apces.jpg";
import linggsa from "@/assets/images/linggsa.jpg";

export default function TrustedBy() {
  return (
    <div className="max-w-7xl mx-auto mt-20">
      <section className=" max-w-screen-sm text-center mx-auto mb-10">
        <h1 className=" font-bold uppercase">Trusted by event organizers at</h1>
      </section>
      <Marquee className="" reverse>
        <Image src={Knust} alt="Knust" width={100} height={100} />
        <Image src={UG} alt="UG" width={100} height={100} />
        <Image src={KTT} alt="KTT" width={100} height={100} />
        <Image src={Cheesa} alt="Cheesa" width={100} height={100} />
        <Image src={Gaesa} alt="Gaesa" width={100} height={100} />
        <Image src={apces} alt="apces" width={100} height={100} />
        <Image src={linggsa} alt="linggsa" width={100} height={100} />
      </Marquee>
    </div>
  );
}
