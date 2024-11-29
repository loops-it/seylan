import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  return (
    <>
    <section className="container-fluid p-0 m-0 navbar_background">
    <div className="d-flex flex-row">
      <div className="col-12 col-lg-10">
        <nav className="navbar navbar-expand-lg">

          <div className="container-fluid">
            <Link className="navbar-brand m-0 p-0" href="https://yourvibe.lk/futureyou/">
              <Image src="/vibe logo.png" alt="logo"  className='header-logo-1' width={100} height={40} />
            </Link>
            <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" style={{border: "none !important"}}>
              {/* <span className="bi bi-list toggle-icon-styles text-white" style={{color: "#fff !important"}}></span> */}
              <FiMenu style={{color: "#fff !important", fontWeight:'100'}} />
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto justify-content-lg-end">
                <Link className="nav-link px-4" aria-current="page" href="https://yourvibe.lk/futureyou/">Home</Link>
                {/* <Link className="nav-link px-4 curser-pointer" href="/gallery">Gallery</Link> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="col-12 col-lg-2 d-none d-lg-flex justify-content-center align-items-center">
        <Link className="navbar-combank-brand m-0 p-0" href="https://yourvibe.lk/futureyou/">
          <Image src="/commlogo.png" alt="logo" className='header-logo-2' width={200} height={20} />
        </Link>
      </div>
    </div>
  </section>
    </>
  )
}

export default Navbar