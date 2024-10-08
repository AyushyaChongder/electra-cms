import {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from "../components/Navbar";
import Header from '../components/Header/Header';
import ProjectRow from '../components/ProjectRow/ProjectRow';
import "./AllProjects.css";
import Connect from "../components/Connect/Connect";
import Footer from "../components/Footer";
import image1601 from '../assets/img/image1601.jpg';
import kia8 from '../assets/img/kia_changaramkulam.jpeg'
import kia7 from '../assets/img/kia7_webimage.webp';
import kia6 from '../assets/img/kia6_webimage.webp';
import kia3 from '../assets/img/kia3_webimage.webp';
import kia2 from '../assets/img/kia2_webimage.webp';
import kia4 from '../assets/img/kia4_webimage.webp';
import kia5 from '../assets/img/kia5_webimage.webp';
import kia1 from '../assets/img/kia1_webimage.webp';
import tata from '../assets/img/tata1.png'
import tata1 from '../assets/img/tata1_webimage.webp';
import tata2 from '../assets/img/tata2_webimage.webp';
import tata3 from '../assets/img/tata3_webimage.webp';
import tata4 from '../assets/img/tata4_webimage.webp';
import tata5 from '../assets/img/tata5_webimage.webp';
import tata6 from '../assets/img/tata6_webimage.webp';
import tata7 from '../assets/img/tata7_webimage.webp';
import toyota from '../assets/img/toyota1.png';
import toyota1 from '../assets/img/nippon_webimage1.webp';
import toyota2 from '../assets/img/nippon_webimage2.webp';
import toyota3 from '../assets/img/nippon_webimage3.webp';
import toyota4 from '../assets/img/nippon_webimage4.webp';
import toyota5 from '../assets/img/nippon_webimage5.webp';
import hhys1 from '../assets/img/hhys1.png';
import hhys2 from '../assets/img/hhys_webimage1.webp';
import hhys4 from '../assets/img/hhys_webimage3.webp';
import hhys6 from '../assets/img/hhys_webimage4.webp';
import hhys7 from '../assets/img/hhys_webimage2.webp';
import app1 from '../assets/img/app1.png';
import app2 from '../assets/img/apartment_webimage1.webp';
import app3 from '../assets/img/apartment_webimage2.webp';
import app4 from '../assets/img/apartment_webimage4.webp';
import app5 from '../assets/img/apartment-webimage6.webp';
import app6 from '../assets/img/apartment_webimage3.webp';
import app7 from '../assets/img/apartment_webimage5.webp';
import ip1 from '../assets/img/ip1.png';
import ip2 from '../assets/img/ip2_webimage.webp';
import ip3 from '../assets/img/ip3_webimage.webp';
import ip5 from '../assets/img/ip5_webimage.webp';
import ip6 from '../assets/img/ip6_webimage.webp';
import ip7 from '../assets/img/ip7_webimage.webp';
import cp1 from '../assets/img/cp1.png';
import cp2 from '../assets/img/cp1_webimage.webp';
import cp3 from '../assets/img/cp2_webimage.webp';
import cp4 from '../assets/img/cp8_webimage.webp';
import cp5 from '../assets/img/cp6_webimage.webp';
import cp6 from '../assets/img/cp10_webimage.webp';
import cp7 from '../assets/img/cp3_webimage.webp';
import cp8 from '../assets/img/cp9_webimage.webp';
import cp9 from '../assets/img/cp4_webimage.webp';
import cp10 from '../assets/img/cp11_webimage.webp';
import cp11 from '../assets/img/cp7_webimage.webp';
import cp12 from '../assets/img/cp5_webimage.webp';
import cp20 from '../assets/img/cp12_webimage.webp';
import cp21 from '../assets/img/cp13_webimage.webp';
import lh1 from '../assets/img/lh1.png';
import lh2 from '../assets/img/lh1_webimage.webp';
import lh3 from '../assets/img/lh2_webimage.webp';
import lh4 from '../assets/img/lh3_webimage.webp';
import lh5 from '../assets/img/lh4_webimage.webp';
import lh6 from '../assets/img/lh5_webimage.webp';
import lh7 from '../assets/img/lh6_webimage.webp';

const data = [
    {
        title: "Incheon Motors Pvt, Ltd ",
        img: image1601,
        images: [  
            {
                title: "Incheon Kia Showroom, Nettoor",
                image_url: kia1,
            },
            {
                title: "Incheon Kia EV Charging Station, Nettoor",
                image_url: kia2,
            },
            {
                title: "Incheon Kia Showroom, Thrissur",
                image_url: kia3,
            },
            {
                title: "Incheon Kia Showroom, Palakkad",
                image_url: kia4,
            },
            {
                title: "Incheon Kia Showroom, Kayamkulam",
                image_url: kia5,
            },
            {
                title: "Incheon Kia Showroom, Vadanappally",
                image_url: kia6,
            },
            {
                title:'Incheon Kia Showroom, Edappally',
                image_url:kia7
            }
        ]
    },
    {
        title: "Luxon Motos Pvt. Ltd.",
        img: tata,
        images: [
            {
                title: "Luxon Tata Showroom, Palarivattom",
                image_url: tata1,
            },
            {
                title: "Luxon Tata Showroom, Irumpanam",
                image_url: tata2,
            },
            {
                title: "Luxon Tata Showroom, Mattanchery",
                image_url: tata3,
            },
            {
                title: "Luxon Tata Showroom, Nedumkandam",
                image_url: tata4,
            },
            {
                title: "Luxon Tata Showroom, Konni",
                image_url: tata5,
            },
            {
                title: "Luxon Tata Showroom, Munduparambu",
                image_url: tata6,
            },
            {
                title: "Luxon Tata Showroom, Areekkode",
                image_url: tata7
            },
            
            {
                title:'Luxon Tata Showroom, Changaramkulam',
                image_url:kia8
            }
        ]
    },
    {
        title: "Nippon Toyota",
        img: toyota,
        images: [
            {
                title: "Nippon Toyota Showroom, Ernakulam",
                image_url: toyota1,
            },
            {
                title: "Nippon Toyota Showroom, Enchakkal",
                image_url: toyota2,
            },
            {
                title: "Nippon Toyota Showroom, Kayamkulam",
                image_url: toyota3,
            },
            {
                title: "Nippon Toyota Showroom, Kazhakkoottam",
                image_url: toyota4,
            },
            {
                title:"Nippon Toyota Showroom, Kochuveli",
                image_url: toyota5
            }

        ]
    },
    {
        title: "HHYS Infamart",
        img: hhys1,
        images: [
            {
                title: "HHYS Inframart Showroom, Prathangamood",
                image_url: hhys2
            },
            {
                title: "HHYS Inframart Showroom, Kayamkulam",
                image_url: hhys7,
            },
            // {
            //     title: "Mukkavala, Kayamkulam",
            //     image_url: hhys3,
            // },
            {
                title: "HHYS Inframart Showroom, Kollam-1",
                image_url: hhys4,
            },
            // {
            //     title: "Nettor",
            //     image_url: hhys5,
            // },
            {
                title: "HHYS Inframart Showroom, Kollam-2",
                image_url: hhys6,
            },
            
            // {
            //     title: "Nettor",
            //     image_url: hhys8,
            // },

        ]
    },
    {
        title: "Appartment",
        img: app1,
        images: [
            {
                title: "RDS Legacy, Panampilly Nagar",
                image_url: app2,
            },
            {
                title: "Napier Horitage, Fortkochi",
                image_url: app3,
            },
            {
                title: "AC Samridhi, Vyttilya",
                image_url: app6,
            },
            {
                title: "Bindu Sen Apartment, Muvattupuzh",
                image_url: app4,
            },
            {
                title: "Tristar Excellency, Kakkanad",
                image_url: app7,
            },
            {
                title: "Tristar Presidency, Panampilly Nagar",
                image_url: app5,
            }           
            


        ]
    },
    {
        title: "Industrial Projects",
        img: ip1,
        images: [
            {
                title: "Eastern Contiments, Kothamanglam",
                image_url: ip3,
            },
            {
                title: "Eastern Contiments, Adimaly",
                image_url: ip2,
            },
            {
                title: "VKL Seasoning, Kuthiyathodu",
                image_url: ip6,
            },
            {
                title: "VKL Seasoning, Alappuzha",
                image_url: ip7,
            },

            
            // {
            //     title: "Nettor",
            //     image_url: ip4,
            // },
            {
                title: "Travancore Coco Tuft, Cherthala",
                image_url: ip5,
            },
            

        ]
    },
    {
        title: "Commercial Projects",
        img: cp1,
        images: [
            {
                title: "St. Joseph Bhavan, Chalakkudy",
                image_url: cp2,
            },
            {
                title: "Ather Showroom, Aluva",
                image_url: cp3,
            },
            {
                title: "Motorspot Showroom, Ernakulam",
                image_url: cp7,
            },
            {
                title: "Prince Square, M.G Road, Ernakulam",
                image_url: cp9,
            },
            {
                title: "Utsav, M.G. Road, Ernakulam",
                image_url: cp12,
            },
            {
                title: "Meigma Portico, Vyttila",
                image_url: cp5,
            },
            {
                title: "St. Mary's Tower, Ernakulam",
                image_url: cp11,
            },
            
            {
                title: "ABS Arcade, Muvattupuzha",
                image_url: cp4,
            },
            {
                title: "PUCBank, Thripunithura",
                image_url: cp8,
            },
            
            {
                title: "Finsyz Vacation Homes, Angamaly",
                image_url: cp6,
            },           

            
            {
                title: "Salafi Masjid, Vyttila",
                image_url: cp10,
            },
            {
                title:'Catholic Syrian Bank, Ernakulam',
                image_url: cp20
            },
            {
                title:'Chungath Jewellery, M.G Road, Ernakulam',
                image_url: cp21
            }

        ]
    },
    {
        title: "Labs and Hospitals",
        img: lh1,
        images: [
            {
                title: "DIY Imaging, Padivattom",
                image_url: lh2,
            },
            {
                title: "Kinder Women Hospital, Ernakulam",
                image_url: lh3,
            },
            {
                title: "Kinder Women Hospital, Chertala",
                image_url: lh4,
            },
            {
                title: "PS Mission Hospital, Maradu",
                image_url: lh5,
            },
            {
                title: "Assisi Mission Hospital, Parappukara",
                image_url: lh6,
            },
            {
                title: "SH Hospital, Thodupuzha",
                image_url: lh7,
            },
        ]
    }
    
]

const AllProjects = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set the initial value
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <>
        <Helmet>
                <title>
                    {isMobile
                        ? "Completed Electrical Projects | Electrapower Engineering, Kerala"
                        : "Completed Electrical Projects | Electrapower Engineering, Kerala"}
                </title>
                <meta
                    name="description"
                    content={
                        isMobile
                            ? "Explore Electrapower's diverse portfolio of completed electrical projects in Kerala. Witness our commitment to quality, innovation & client satisfaction stories."
                            : "Explore Electrapower's diverse portfolio of completed electrical projects in Kerala. Witness our commitment to quality, innovation & client satisfaction stories."
                    }
                />
                <meta 
                    name="keywords"
                    content= "Electrapower Engineering,Electrapower Engineering Kerala ,Electrical Contractors , electrical, contractors ,Electrapower, Engineering, electrapower, engineering, electrapower engineering kerala, electrical projects, electrical, projects, electrical projects kerala, kia, hhys inframart, nippon toyota, luxon, commercial projects, commercial"
                />
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-MGGQC38182"></script>
                <script>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-MGGQC38182');
                `}
                </script>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
        <Navbar />
        <div className="allprojects">
           
            <Header />
            <div className="wrapper">
                <ProjectRow data={data} />
            </div>
            <Connect />
            <Footer />
        </div>
        </>
    );
}

export default AllProjects;


