import ProductImage from "@/assets/images/mockup.png";
import Image from "next/image";

export default function HeroImage() {
  return (
    <section className="w-full lg:w-[80%] mx-auto px-3 py-6 lg:py-12 ">
      <Image src={ProductImage} width={2000} height={2000} alt="Product Dashboard" className=" w-full h-full object-cover object-center" />
    </section>
  );
}
