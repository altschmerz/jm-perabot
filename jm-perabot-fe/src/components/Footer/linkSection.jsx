import React from "react";
import { Link } from "react-router-dom";

const LinkSection = ({ sectionTitle, links }) => {
  return (
    <div>
      <div class="footer-section-title mb-2">{sectionTitle}</div>
      <div class="flex flex-col">
        {links.map(({ label, path }) => (
          <Link key={label} to={path} class="footer-section-text mb-1">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LinkSection;
