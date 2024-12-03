import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  return (
    <>
      <section className="container-fluid p-0 m-0 navbar_background">
        <div className="d-flex flex-row" style={{ backgroundColor: "#fff" }}>
          <div className="col-12 col-lg-10">
            <nav className="navbar navbar-expand-lg">

              <div className="container-fluid" >
                <Link className="navbar-brand m-0 p-0" href="/">
                  <Image src="/seylan/seylan_logo.png" alt="logo" className='header-logo-1' width={202} height={114} />
                </Link>
                <button
                  className="navbar-toggler text-white d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <FiMenu style={{ color: "#000" }} />
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav mobile-nav">
                      <li className="nav-item">
                        <Link className="nav-link" href="/">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/gallery">Gallery</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="col-12 col-lg-2 d-none d-lg-flex justify-content-center align-items-center">
            <Link className="nav-link me-3" aria-current="page" href="/">Home</Link>
            <Link className="nav-link me-5 curser-pointer" href="/gallery">Gallery</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Navbar