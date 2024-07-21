import React from "react";
import {
  GrFacebook,
  GrInstagram,
  GrPinterest,
  GrTwitter,
  GrYoutube,
} from "react-icons/gr";
import { Link } from "react-router-dom";
import LinkSection from "./linkSection";

const COMPANY_INFO_LINKS = [{ label: "About UNTITLED", path: "/" }];
const HELP_AND_SUPPORT_LINKS = [
  { label: "Shipping Info", path: "/" },
  { label: "Returns", path: "/" },
];
const CUSTOMER_CARE_LINKS = [{ label: "Contact Us", path: "/" }];

const Footer = () => {
  return (
    <div class="mt-24 px-36 py-10 bg-zinc-100 flex justify-between">
      <div class="flex w-[40%] justify-between">
        <LinkSection sectionTitle="COMPANY INFO" links={COMPANY_INFO_LINKS} />
        <LinkSection
          sectionTitle="HELP & SUPPORT"
          links={HELP_AND_SUPPORT_LINKS}
        />
        <LinkSection sectionTitle="CUSTOMER CARE" links={CUSTOMER_CARE_LINKS} />
      </div>

      <div class="flex w-[50%]">
        <div>
          <div class="footer-section-title mb-5">FIND US ON</div>
          <div class="flex">
            <Link to="/">
              <GrFacebook size={25} class="mr-8" />
            </Link>
            <Link to="/">
              <GrInstagram size={25} class="mr-8" />
            </Link>
            <Link to="/">
              <GrTwitter size={25} class="mr-8" />
            </Link>
            <Link to="/">
              <GrYoutube size={25} class="mr-8" />
            </Link>
            <Link to="/">
              <GrPinterest size={25} class="mr-8" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
