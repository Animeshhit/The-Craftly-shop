import { Button, buttonVariants } from "@/shadcnui/ui/button";
import { NavLink } from "react-router-dom";

const AltHero = () => {
  return (
    <section id="hero" className="py-12 sm:py-1">
      <div className="conatainer mx-auto px-4 sm:px-0">
        <div className="flex items-center justify-center flex-col-reverse sm:flex-row-reverse gap-10">
          <div className="left__container sm:w-1/2 w-full">
            <h1 className="font-semibold text-2xl ms:text-3xl lg:text-4xl text-center sm:text-left !leading-10 sm:!leading-relaxed">
              "Welcome to The Craftly Shop -{" "}
              <span className="bg-rose-500 px-2 text-white rounded-full">
                Handcrafted & Premium
              </span>{" "}
              Gifts for Every Occasion"
            </h1>
            <p className="max-w-prose text-gray-500 text-center sm:text-left mt-3">
              Discover unique, handcrafted treasures and premium gifts for every
              occasion at The Craftly Shop.
            </p>
            <div className="flex w-full mt-10 items-center sm:justify-start justify-center">
              <a
                href="#featured"
                className={buttonVariants({
                  className:
                    "!rounded-full text-sm flex items-center gap-2 px-6",
                })}
              >
                Explore now
                <div className="flex-center">
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>
              </a>
            </div>
          </div>
          <div className="right__container flex items-center justify-center w-full sm:w-1/2">
            <img
              src="/ProductBanner.svg"
              className="w-full object-center object-contain h-[200px] sm:h-[500px]"
              alt="gifts"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AltHero;
