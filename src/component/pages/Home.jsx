import ctaImage from "../../assets/cta.png";
import Navbar from "../NavBar";
import Footer from "./Footer";
import ReadQuran from "./ReadQuran";

function Home() {
  return (
    <>
      <Navbar />

      <div id="home" className="w-screen h-screen bg-gray-950 pt-30 ">
        <section
          className="overflow-hidden  w-full bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${ctaImage})` }}
        >
          <div className="bg-black/25  p-12  lg:px-16 lg:py-24">
            <div className="text-center ltr:sm:text-left rtl:sm:text-right">
              
              <h2 className="text-4xl mb-3 cinzel-decorative-regular font-bold text-white md:text-8xl">
                e-Qur'anul Kareem
              </h2>

              <p className=" gap-8 cormorant-garamond-regular  max-w-2xl text-white/90 md:mt-6  md:text-lg md:leading-relaxed">
                Dari ‘Abdullah ibn Mas‘ud, Rasulullah shallallahu ‘alaihi
                wasallam bersabda,{" "}
                <i>
                  “Siapa saja membaca satu huruf dari Kitabullah (Al-Qur’an),
                  maka dia akan mendapat satu kebaikan. Sedangkan satu kebaikan
                  dilipatkan kepada sepuluh semisalnya. Aku tidak mengatakan
                  alif lâm mîm satu huruf. Akan tetapi, alif satu huruf, lâm
                  satu huruf, dan mîm satu huruf”{" "}
                </i>
                (HR. At-Tirmidzi).
              </p>

              <div className="mt-4 sm:mt-8">
                <a
                  href="#readquran"
                  className="group relative inline-flex items-center overflow-hidden rounded-full bg-gray-200 px-8 py-3 text-gray-950 focus:ring-3 focus:outline-hidden"
                >
                  <span className="absolute -end-full transition-all group-hover:end-4">
                    <svg
                      className="size-5 shadow-sm rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>

                  <span className="text-sm cormorant-garamond font-medium transition-all group-hover:me-4">
                    {" "}
                    Start Reading{" "}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ReadQuran />
      <Footer/>
    </>
  );
}

export default Home;
