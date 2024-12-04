import Image from "next/image";
import Link from "next/link";


export default function Footer() {

  return (
    <>
      <div className="container-fluid p-0 m-0 footer_background">
        <div className="d-flex flex-column flex-lg-row justify-content-between px-5 align-items-center w-100"
          style={{ height: "100%" }}>
          <div className="d-flex flex-row text-center icon_wrapper py-3 py-lg-1">
            <Link href={"https://www.facebook.com/SeylanBank"}>
              <Image width={30} height={30} src="/seylan/logo/fb.png" className="mx-2 border-radious-50 footer-icons" alt="" />
            </Link>
            <Link href={"https://www.instagram.com/seylanbanklk/"}><Image width={30} height={30} src="/seylan/logo/instagramm.png" className="mx-2 border-radious-50 footer-icons" alt="" /></Link>
            <Link href={"https://www.youtube.com/@seylanmedia"}><Image width={30} height={30} src="/seylan/logo/Youtube.png" className="mx-2 border-radious-50 footer-icons" alt="" /></Link>
            <Link href={"https://www.tiktok.com/@seylanbank"}><Image width={30} height={30} src="/seylan/logo/tiktok.png" className="mx-2 border-radious-50 footer-icons" alt="" /></Link>
            <Link href={"https://www.linkedin.com/company/seylanbankplc"}><Image width={30} height={30} src="/seylan/logo/linkedin.png" className="mx-2 border-radious-50 footer-icons" alt="" /></Link>

          </div>
          {/* <div className="d-flex text-white flex-row text-center icon_wrapper py-3 pb-lg-1">
      <p className="mb-0 me-2" style={{width: "105px !important"}}>Solution by</p>
          <Link href={"https://loopsintegrated.com/"} target="_blank" className="text-white mb-0" style={{textDecoration: "none",fontSize: "18px", width: "max-content !important"}}>
           <Image src="/loopslogo.png" alt="logo"  className='' width={50} height={30} style={{width: "80px !important", height: "30px !important"}}/>
          </Link>
      </div> */}
          <div className="d-flex flex-row text-center icon_wrapper pb-lg-1" style={{ textDecoration: 'underline', textDecorationColor: 'white' }}>
            {/* <a href="#"> */}
            {/* <p className="text-white mb-0" style={{fontSize: "18px"}}> */}
            <Link href={"/terms-and-conditions"} className="text-white mb-0 " style={{ fontSize: "18px" }}>Terms and Conditions</Link>
            {/* </p> */}
            {/* </a> */}
          </div>
        </div>
      </div>

    </>
  );
}
