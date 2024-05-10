import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#31363F] mt-12 py-12 fixed bottom-0 left-0 right-0">
        <div className="container mx-auto md:px-0 px-4">
          <div className="footer__container flex items-center justify-between">
            <div className="footer__left__container">
              <div className="footer__logo text-white flex items-center justify-center gap-3 text-2xl">
                <ion-icon name="storefront"></ion-icon>
                <span className="font-Karla font-semibold">
                  The Craftly Shop
                </span>
              </div>
              <p className="text-gray-400 mt-2">©2021. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
