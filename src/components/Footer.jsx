import { Button } from "@/shadcnui/ui/button";
import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="py-12 px-4 bg-gray-300">
      <div className="container mx-auto px-0 sm:px-4">
        <h3 className="font-semibold sm:text-xl">
          Created By{" "}
          <a
            href="https://www.linkedin.com/in/animesh-kumbhakar"
            target="_blank"
            className="text-rose-500"
          >
            Animesh Kumbhakar{" "}
          </a>
          with ❤️
        </h3>
      </div>
    </footer>
  );
};

export default Footer;
