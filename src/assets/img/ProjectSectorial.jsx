import {useState, useEffect} from 'react';
import "./ProjectSectorial.css";
import Navbar from '../components/Navbar';
import ProjectInfo from '../components/ProjectInfo/ProjectInfo';
import Footer from "../components/Footer";
import { Helmet } from 'react-helmet-async';

import kia1 from '../assets/img/kia/kia1.webp';
import kia2 from '../assets/img/kia/kia2.webp';
import kia3 from '../assets/img/kia/kia3.webp';

import hhys1 from '../assets/img/hhys/hhys1.webp';
import hhys2 from '../assets/img/hhys/hhys2.webp';
import hhys3 from '../assets/img/hhys/hhys3.webp';
import hhys4 from '../assets/img/hhys/hhys4.webp';

import app1 from '../assets/img/appartment/app1.webp';
import app2 from '../assets/img/appartment/app2.webp';
import app3 from '../assets/img/appartment/app3.webp';

import hos1 from '../assets/img/hospital/hos1.webp';
import hos2 from '../assets/img/hospital/hos2.webp';
import hos3 from '../assets/img/hospital/hos3.webp';

import coco1 from '../assets/img/cocotuft/coco1.webp';
import coco2 from '../assets/img/cocotuft/coco2.webp';
import coco3 from '../assets/img/cocotuft/coco3.webp';

import ec1 from '../assets/img/condiments/ec1.webp';
import ec2 from '../assets/img/condiments/ec2.webp';
import ec3 from '../assets/img/condiments/ec3.webp';

import napier1 from '../assets/img/east_napier/napier1.webp';
import napier2 from '../assets/img/east_napier/napier2.webp';
import napier3 from '../assets/img/east_napier/napier3.webp';

import tata1 from '../assets/img/tata/tata1.webp';
// import tata2 from '../assets/img/tata/tata2.webp';

import kiaLogo from '../assets/img/logo/kia_logo.svg';
import hhysLogo from '../assets/img/logo/hhys_logo.svg';
import appLogo from '../assets/img/logo/app_logo.svg';
import hosLogo from '../assets/img/logo/hos_logo.svg';
import cocoLogo from '../assets/img/logo/coco_logo.svg';
import ecLogo from '../assets/img/logo/ec_logo.svg';
import napierLogo from '../assets/img/logo/napier_logo.svg';
import tataLogo from '../assets/img/logo/tata_logo.svg';


const data = [
    {
        title: "Kerala's largest Kia showroom and workshop by Incheon Motors, featuring India's largest EV charging station",
        images: [
            { url: kia1, alt:"India's largest EV charging station by Kia, powered by Electrapower Engineering, promoting sustainable mobility in Nettoor, Kerala" }, 
            { url: kia2, alt:"Bright, modern Kia showroom  interior at Nettoor with cars on display, showcasing Electrapower Engineering's electrical work" }, 
            { url: kia3, alt:"Exterior view of a modern Kia car dealership with prominent signage at Nettoor, Kerala, highlighting Electrapower Engineering's electrical project contribution." }
        ],
        description_one: "Electra Power Engineering partnered with Incheon Motors Pvt. Ltd., the largest Kia dealer in Kerala, to electrify the future of automotive retail. We spearheaded the comprehensive electrical design and installation for their flagship showroom and workshop in Nettoor, Kerala, a facility that proudly houses India's largest EV charging station by Incheon Kia.",

        description_two: "This project exemplifies our commitment to sustainable infrastructure and cutting-edge technology. Our team not only ensured the showroom and workshop's seamless operation with robust power systems but also played a crucial role in promoting the adoption of electric vehicles through the installation of state-of-the-art charging infrastructure.",

        highlights: [
            {
                heading: "High-Capacity Power Infrastructure",
                info: "Successfully installed and integrated  a 400 kVA transformer and a 250 kVA transformer, along with a 250 kVA DG set, to provide ample power for the showroom, workshop, and EV charging station."
            },
            {
                heading: "India's Largest Kia EV Charging Station",
                info: "Installed and commissioned a 240 kW EV charging station, the largest of its kind in India, to cater to the growing demand for electric vehicles."
            },
            {
                heading: "Sustainable Energy Integration",
                info: "Installed a 115.2 kWp solar power system, contributing to the facility's energy efficiency and reducing its carbon footprint."
            },
            {
                heading: "Rapid Charging Infrastructure Deployment",
                info: "Demonstrated exceptional project management and execution capabilities by completing the fast-charging station approval, installation, and commissioning within a mere 30 days."
            },
            {
                heading: "Exceptional Project Delivery",
                info: "Successfully completed the entire project, from initial approvals to final commissioning, in just 90 days, showcasing our agility and commitment to exceeding client expectations."
            },
            
        ],
        testimonial_logo: kiaLogo,
        testimonial_logo_alt:"Kia Motors Logo",
        testimonial_head: "Mr. Reji, VP Operations, Incheon Motors Pvt. Ltd",
        testimonial_info: "Electra Power Engineering's team surpassed our expectations in every aspect of this project. Their technical expertise, dedication to quality, and ability to deliver within challenging timelines were truly remarkable. The EV charging station they installed has become a major attraction for our customers, and we are confident that it will play a significant role in driving EV adoption in Kerala."
    },
    {
        title: "Revolutionising hardware trading with scalable electrical solutions for HHYS Inframart",
        images: [
            { url: hhys1, alt:"HHYS inframart Kollam Showroom exterior electrified by Electrapower Engineeing" },
            { url: hhys2, alt:"HHYS inframart Kayamkulam Showroom exterior electrified by Electrapower Engineeing" },
            { url: hhys3, alt:"HHYS inframart Kollam2 Showroom exterior electrified by Electrapower Engineeing" },
            { url: hhys4, alt:"HHYS inframart Kayamkulam2 Showroom exterior electrified by Electrapower Engineeing" }
        ],
        description_one: "Electra Power Engineering, a trusted name in electrical contracting and engineering, partnered with HHYS Inframart, one of Kerala's largest hardware trading companies, to elevate their electrical infrastructure. Recognizing the need for a robust and scalable power solution to support their expanding operations, HHYS Inframart entrusted Electra Power Engineering with a turnkey project to modernise their electrical systems.",

        description_two: "Our team delivered a comprehensive solution that addressed HHYS Inframart's growing energy demands while ensuring reliability and efficiency. The project exemplifies our expertise in designing, installing, and commissioning complex electrical systems for large-scale commercial establishments. By seamlessly integrating state-of-the-art equipment and advanced technology, we empowered HHYS Inframart to optimise their operations and meet the evolving needs of their business.",

        highlights: [
            {
                heading: "Turnkey Project",
                info: "Electra Power Engineering handled the entire project from start to finish, providing a hassle-free experience for HHYS Inframart. Our scope included design, procurement, installation, testing, liaising, and commissioning of the electrical infrastructure."
            },
            {
                heading: "Multi-Level Power Enhancement",
                info: "Successfully installed and integrated multiple power sources, including:  A 250 kVA transformer and a 250 kVA DG set for office area. A 400 kVA transformer & 250 kVA DG set for new hardware area 250 kVA transformer and 250 kVA DG set for Tile showroom 82.5 kVA DG set for low segment tile showroom."
            },
            {
                heading: "Enhanced Reliability and Efficiency",
                info: "The upgraded electrical infrastructure significantly improved HHYS Inframart's power reliability, eliminating downtime risks and ensuring consistent operation of their critical systems."
            },
            {
                heading: "Scalability for Future Growth",
                info: "The new system is designed to accommodate future expansion and increased power demands, providing a flexible and adaptable solution for HHYS Inframart's long-term growth plans."
            },
        ],
        testimonial_logo: hhysLogo,
        testimonial_logo_alt:"HHYS inframart Logo",
        testimonial_head: "Mr. Yaseen, GM, HHYS Inframart.",
        testimonial_info: "Electra Power Engineering proved to be a reliable and efficient partner throughout the entire project. Their expertise in electrical engineering, coupled with their commitment to quality and timely delivery, exceeded our expectations. We are highly satisfied with the results and confident that our upgraded electrical infrastructure will support our growth for years to come."
    },
    {
        title: "Luxury living redefined through reliable electrical innovations with RDS Legacy Apartments",
        images: [
            { url: app1, alt:"Modern high-rise apartment building, RDS Legacy, showcasing Electrapower Engineering's electrical project expertise." },
            { url: app2, alt:"Elegant rooftop terrace at RDS Legacy apartments with illuminated pergola and landscaped greenery, highlighting Electrapower Engineering's electrical solutions." },
            { url: app3, alt:"Rooftop pool and lounge area at RDS Legacy apartments with stylish lighting, showcasing Electrapower Engineering's electrical installations." }
        ],
        description_one: "Electra Power Engineering has partnered with RDS Realties Ltd., a renowned builder in Kerala, to illuminate their prestigious RDS Legacy Apartments project in Kochi. Recognized for their commitment to quality and luxury, RDS Realities entrusted Electra Power with the turnkey electrical design and installation for this landmark residential development.",

        description_two: "Our team's expertise ensured that RDS Legacy Apartments residents enjoy uninterrupted power supply, state-of-the-art electrical amenities, and a seamless living experience. The project demonstrates our ability to deliver comprehensive electrical solutions for high-end residential projects, aligning perfectly with the builder's vision of luxury and comfort.",

        highlights: [
            {
                heading: "Turnkey Project",
                info: "Electra Power Engineering handled the complete electrical scope, from initial design and planning to procurement, installation, testing, and commissioning, ensuring a streamlined and efficient project execution."
            },
            {
                heading: "High-Capacity Power Infrastructure",
                info: "Installed and integrated a 500 kVA transformer to meet the high energy demands of the luxury apartment complex."
            },
            {
                heading: "Backup Power Solution:",
                info: "Implemented a 160 kVA DG set to provide reliable backup power, guaranteeing uninterrupted essential services for residents in case of power outages."
            },
            {
                heading: "Efficient Project Execution",
                info: "Completed the entire project within minimum time frame, adhering to the builder's strict schedule and ensuring timely handover of the apartments."
            },
            {
                heading: "Seamless Integration",
                info: "Worked closely with RDS Realities to seamlessly integrate the electrical systems with the building's architecture and other amenities, maintaining the aesthetic appeal while ensuring functionality."
            },
        ],
        testimonial_logo: appLogo,
        testimonial_logo_alt:"RDS Realties logo",
        testimonial_head: "- Mr. Abraham Mampally, GM, RDS Realties Ltd.",
        testimonial_info: "Electra Power Engineering's team displayed exceptional professionalism and technical expertise throughout the project. Their attention to detail and commitment to quality were evident in every aspect of their work. The electrical systems they installed are not only reliable but also seamlessly integrated with the building's design. We are extremely pleased with their contribution to RDS Legacy Apartments."
    },
    {
        title: "Empowering healthcare with cutting-edge electrical infrastructure for Kerala's First Nuclear Medicine Center",
        images: [
            { url: hos1, alt:"Exterior view of Imaging Lily, Kerala's first nuclear medicine center, highlighting Electrapower Engineering's electrical project contribution." },
            { url: hos2, alt:"Advanced medical imaging equipment in a bright, modern room at Kerala's first nuclear medicine center, showcasing Electrapower Engineering's electrical work." },
            { url: hos3, alt:"Clean, well-lit reception area of Kerala's first nuclear medicine center, showcasing Electrapower Engineering's electrical installations." }
        ],
        description_one: "Electra Power Engineering, a  pioneer in electrical contracting and engineering, partnered with Imaging Lily Pvt. Ltd. to illuminate the future of healthcare in Kerala. We were entrusted with the turnkey electrical design and installation for Kerala's first all-inclusive nuclear medicine and radiology centre, located in the heart of Kochi.",

        description_two: "Imaging Lily is a pioneering institution dedicated to providing comprehensive diagnostic and treatment services for a wide range of medical conditions. Electrapower's role was instrumental in creating a safe, reliable, and efficient electrical infrastructure that supports the centre's critical operations and advanced medical equipment. This project exemplifies our expertise in designing and implementing electrical solutions for healthcare facilities, where precision, reliability, and safety are paramount.",

        highlights: [
            {
                heading: "Turnkey Electrical Solution",
                info: "Electra Power Engineering provided a complete turnkey solution, handling all aspects of the electrical project, from initial design and planning to procurement, installation, testing, and commissioning. This streamlined approach ensured a seamless and efficient project execution, minimising disruptions to Imaging Lily's operations."
            },
            {
                heading: "Critical Power Infrastructure",
                info: "Successfully installed and integrated a 250 kVA transformer and a 200 kVA DG set to provide a robust and reliable power supply for the centre's sophisticated medical equipment, ensuring uninterrupted operation and patient safety."
            },
            {
                heading: "Specialized Medical Electrical Systems:",
                info: "Designed and implemented specialised electrical systems to meet the unique requirements of a nuclear medicine and radiology facility, including grounding, shielding, and isolation systems for sensitive medical equipment."
            },
            {
                heading: "Rapid Project Delivery",
                info: "Completed the entire project within a tight 90-day timeframe, demonstrating our agility and commitment to meeting the client's urgent needs. Our efficient project management ensured that the center could commence operations without delay."
            },
        ],
        testimonial_logo: hosLogo,
        testimonial_logo_alt:"Imaging Lily Logo",
        testimonial_head: "Dr. Dennis Idikula Y, MD, Imaging Lily Pvt. Ltd.",
        testimonial_info: "Electra Power Engineering's team went above and beyond to understand the specific electrical needs of our nuclear medicine and radiology centre. Their meticulous attention to detail, adherence to safety regulations, and timely project delivery were instrumental in getting our facility up and running smoothly. We are highly impressed with their expertise and professionalism."
    },
    {
        title: "Transforming mat manufacturing with advanced electrical upgrades for Travancore Cocotuft",
        images: [
            { url: coco1, alt:"Exterior of Travancore Cocotuft factory building with loading docks, showcasing Electrapower Engineering's electrical project involvement." },
            { url: coco2, alt:"Large factory interior with machinery and rolls of material, showcasing Electrapower Engineering's electrical work at Travancore Cocotuft." },
            { url: coco3, alt:"Travancore Cocotuft entrance with company logo and lush greenery, showcasing Electrapower Engineering's electrical project contribution." }
        ],
        description_one: "Electra Power Engineering collaborated with Travancore Cocotuft (P) Ltd., the world's largest doormat manufacturer and exporter, to upgrade their electrical infrastructure. Acknowledging the necessity for a robust and sustainable power solution to support their extensive manufacturing operations, Travancore Cocotuft relied on Electra Power to design, install, and commission a state-of-the-art electrical system.",

        description_two: "Our team delivered a comprehensive solution that addressed Travancore Cocotuft's increasing energy demands while prioritising environmental sustainability. This project exemplifies our expertise in designing and implementing scalable electrical systems for large-scale manufacturing facilities, incorporating renewable energy sources and energy-efficient technologies.",

        highlights: [
            {
                heading: "High-Capacity Power Generation",
                info: "Installed and integrated a 400 kVA DG set and a 250 kVA generator, ensuring uninterrupted power supply for critical manufacturing processes and minimising downtime risks."
            },
            {
                heading: "Sustainable Energy Integration",
                info: "Installed a 230.16 kWp solar power system, significantly reducing Travancore Cocotuft's reliance on conventional energy sources and minimising their carbon footprint."
            },
            {
                heading: "Continuous Project Support:",
                info: "Provided ongoing support and maintenance to ensure the optimal performance and longevity of the installed electrical systems, maximising uptime and minimising disruptions to production."
            },
            {
                heading: "Energy Efficiency Optimization:",
                info: "Conducted a comprehensive energy audit to identify areas for improvement and implemented energy-efficient solutions resulting in significant cost savings and reduced environmental impact."
            },
        ],
        testimonial_logo: cocoLogo,
        testimonial_logo_alt:"Travancore Cocotuft logo", 
        testimonial_head: "Mr. Vishnu, GM, Travancore Cocotuft (P) Ltd.",
        testimonial_info: "Electra Power Engineering's team demonstrated exceptional technical knowledge and professionalism throughout the project. Their ability to understand our specific manufacturing requirements and deliver a customised solution was outstanding. The new electrical system has significantly improved our operational efficiency and reduced our energy costs. We are grateful for their partnership and highly recommend their services."
    },
    {
        title: "Spicing up production with enhanced electrical infrastructure for Eastern Condiments",
        images: [
            { url: ec1, alt:"Exterior view of Eastern Condiments factory complex with administrative building and landscaped driveway, highlighting Electrapower Engineering's electrical project contribution." },
            { url: ec3, alt:"Exterior view of Eastern Condiments factory complex with overhead pipes, safety markings, and a parked car, showcasing Electrapower Engineering's electrical work." },
            { url: ec2, alt:"Large industrial building of Eastern Condiments with loading docks and safety markings, showcasing Electrapower Engineering's electrical project contribution." }
        ],
        description_one: "Electra Power Engineering, a trusted leader in electrical contracting and engineering, partnered with Eastern Condiments, India's largest spice exporter and a major player in the food industry, to enhance their electrical infrastructure. As a renowned brand backed by Orkla, Eastern Condiments sought a robust and efficient electrical system to support their expanding production lines for Masala and Roaster products.",

        description_two: "Recognizing the critical role of reliable power in maintaining production efficiency and product quality, Eastern Condiments entrusted Electra Power with the electrification of their Masala plant and Roaster. This project demonstrates our expertise in designing and implementing electrical solutions for large-scale manufacturing facilities, ensuring uninterrupted operations and adherence to industry standards.",

        highlights: [
            {
                heading: "High-Capacity Power Generation:",
                info: "Successfully designed, installed, and commissioned electrical systems of capacity 685 kW, ensuring optimal power supply for the efficient production of spices and masalas."
            },
            {
                heading: "Specialized Electrical Solutions:",
                info: "Implemented specialised electrical systems tailored to the unique needs of the food processing industry, including hygienic wiring, explosion-proof lighting, and safety interlocks to protect equipment and personnel."
            },
            {
                heading: "Rapid Project Execution:",
                info: "Completed the entire electrification project within a tight three-month timeframe, minimising disruptions to Eastern Condiments' production schedule and ensuring a timely launch of the new production lines."
            },
            {
                heading: "Enhanced Efficiency and Productivity:",
                info: "The upgraded electrical infrastructure significantly improved the efficiency and productivity of the Masala Plant and Roaster, enabling Eastern Condiments to meet growing demand for their products."
            },
        ],
        testimonial_logo: ecLogo,
        testimonial_logo_alt: "Eastern Condiments Logo",
        testimonial_head: "Mr. Salam, Plant Manager, Eastern Condiments.",
        testimonial_info: "Electra Power Engineering's team exhibited exceptional professionalism and technical expertise throughout the project. Their ability to understand our specific manufacturing requirements and deliver a customised solution within a tight schedule was commendable. The upgraded electrical infrastructure has significantly enhanced our production capabilities and overall efficiency."
    },
    {
        title: "Preserving heritage with electrifying solutions at Chungath Group's luxury resort, Napier Heritage",
        images: [
            { url: napier1, alt:"Colonial-style building with a red tiled roof and wooden accents, showcasing Electrapower Engineering's electrical work at Napier Heritage." },
            { url: napier2, alt:"Tranquil poolside scene at Napier Heritage hotel with illuminated colonial architecture, showcasing Electrapower Engineering's electrical solutions." },
            { url: napier3, alt:"Courtyard of Napier Heritage hotel with illuminated walkways and traditional architecture, showcasing Electrapower Engineering's electrical solutions." }
        ],
        description_one: "We partnered with Napier Heritage, a prestigious heritage resort owned by the renowned Chungath business group, to enhance its electrical infrastructure. Located in the heart of historic Fort Kochi, Napier Heritage seamlessly blends exquisite Dutch-Portuguese grandeur with modern comforts.",

        description_two: "Electra Power Engineering was entrusted with the turnkey electrical design and installation for this iconic property. Our team's expertise ensured that the resort's historical charm was preserved while providing a state-of-the-art electrical system that met the demands of a modern luxury hotel. This project exemplifies our ability to deliver tailored electrical solutions for hospitality establishments, where aesthetics, functionality, and reliability are paramount.",

        highlights: [
            {
                heading: "Turnkey Electrical Solution",
                info: "Electra Power Engineering provided a complete turnkey solution, overseeing all aspects of the electrical project, from design and planning to procurement, installation, testing, and commissioning. This comprehensive approach ensured a seamless and efficient project execution, minimising disruptions to the resort's operations."
            },
            {
                heading: "Reliable Backup Power",
                info: "Installed a 62.5 kVA DG set to provide reliable backup power, ensuring uninterrupted guest services and comfort even during power outages."
            },
            {
                heading: "Aesthetically Integrated Electrical Systems",
                info: "Designed and installed electrical systems that seamlessly blend with the heritage architecture of the resort, maintaining its historical charm while providing modern amenities."
            },
            {
                heading: "Efficient Project Management",
                info: "Completed the entire project within a six-month time frame, adhering to the client's schedule and ensuring the timely opening of the resort."
            },
            {
                heading: "Enhanced Guest Experience",
                info: "The upgraded electrical infrastructure contributes to a seamless and enjoyable guest experience, providing ample power for lighting, air conditioning, entertainment systems, and other modern amenities."
            },
        ],
        testimonial_logo: napierLogo,
        testimonial_logo_alt: "Chungath Jewellery Logo",
        testimonial_head: "Mr. Rajeev Poal, MD (Chungath Group).",
        testimonial_info: "Electra Power Engineering's team demonstrated exceptional professionalism and technical expertise throughout the project. They understood the unique challenges of working with a heritage property and delivered a customised electrical solution that met our specific needs. The result is a beautifully illuminated and functional resort that exceeds our guests' expectations."
    },
    {
        title: "Driving Kerala forward with TATA Motors' first exclusive EV showroom with Luxon Motors pvt Ltd",
        images: [
            { url: tata1, alt:"Illuminated Tata Motors showroom at night, showcasing Electrapower Engineering's electrical project for Luxon Motors." },
        ],
        description_one: "Electra Power Engineering, pioneers in electrical contracting and engineering, partnered with Luxon Motos Pvt. Ltd., the largest Tata Motors dealer in Kerala, to illuminate the future of mobility. We were entrusted with the electrical design and installation of Kerala's first exclusive TATA Motors EV showroom in Palarivattom, Kochi.",

        description_two: "This state-of-the-art facility represents Tata Motors' commitment to sustainable transportation and showcases a wide range of electric vehicles (EVs). Electrapower's role was pivotal in creating an environment that is both functional and visually appealing, ensuring a seamless customer experience while promoting the adoption of eco-friendly vehicles.",

        highlights: [
            {
                heading: "Robust Power Infrastructure",
                info: "Successfully installed and integrated a 250 kVA transformer and a 250 kVA DG set to provide a reliable and uninterrupted power supply for the showroom's diverse needs, from vehicle charging stations to sophisticated lighting systems."
            },
            {
                heading: "Rapid Project Execution",
                info: "Demonstrated exceptional project management and execution skills by completing the entire electrical installation within a remarkable 90-day timeframe, exceeding the client's expectations and ensuring the timely launch of the showroom."
            },
            {
                heading: "Client-Centric Approach",
                info: "Worked closely with Luxon Motos to understand their unique requirements and tailored our solutions to meet their specific needs, ensuring a fully customised and functional electrical system."
            },
            {
                heading: "Quality and Safety",
                info: "Adhered to the highest industry standards for electrical installations, prioritising safety and reliability throughout the project. We ensured that all electrical components and systems were thoroughly tested and certified before commissioning."
            },
        ],
        testimonial_logo: tataLogo,
        testimonial_logo_alt: "Luxon Tata Logo",
        testimonial_head: "Mr. Shaji, Project Manager, Luxon Motos Pvt. Ltd.",
        testimonial_info: "Electra Power Engineering's team displayed remarkable professionalism, technical expertise, and a deep understanding of our vision for the EV showroom. Their commitment to delivering a world-class electrical solution within an ambitious timeline was truly impressive. We are extremely satisfied with their work and highly recommend their services."
    },
]
const ProjectSectorial = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <>
        <Helmet>
                <title>
                    {isMobile
                        ? "Electrical Projects Showcase | Kerala's Top Contractor"
                        : "Electrical Projects Showcase | Kerala's Top Contractor"}
                </title>
                <meta
                    name="description"
                    content={
                        isMobile
                            ? "Electrapower Engineering powers Kerala's businesses. Our portfolio showcases successful projects across various industries, including India's largest Kia EV charging station."
                            : "Electrapower Engineering powers Kerala's businesses. Our portfolio showcases successful projects across various industries, including India's largest Kia EV charging station."
                    }
                />
                <meta 
                    name="keywords"
                    content= "Electrapower Engineering,Electrapower Engineering Kerala ,Electrical Contractors , electrical, contractors ,Electrapower, Engineering, electrapower, engineering, electrapower engineering kerala, electrical projects, electrical, projects, electrical projects kerala, kia, hhys inframart, nippon toyota, luxon, commercial projects, commercial, rds "
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
        <div className="project-sectorial">
            <ProjectInfo data={data} />
            <Footer />
        </div>
        </>

    );
}

export default ProjectSectorial;
