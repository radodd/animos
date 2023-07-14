import React, { useState } from "react";
import "./LandingPage.css";

function LandingPageNav() {
  return (
    <>
      <div className="container-nav">
        <header className="header">
          <nav className="navbar navbar-expand navbar-light">
            <button
              className="navbar-toggler ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/team">
                    Team
                  </a>
                </li>
                <li className="nav-item-login">
                  <a
                    className="nav-link nav-link-login"
                    aria-current="page"
                    href="/login"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item-signup">
                  <button className="button button4">
                    <a
                      className="nav-link nav-link-signup"
                      aria-current="page"
                      href="/signup"
                    >
                      Sign Up
                    </a>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}

export default LandingPageNav;
