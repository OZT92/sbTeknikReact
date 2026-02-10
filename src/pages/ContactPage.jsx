import { Envelope, NavigationArrow, Phone } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="map-container">
        <iframe
          className="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5165.596398990584!2d28.967621577463504!3d41.025288571348085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9e5e227e5ed%3A0xf3cc07f525fc71d7!2sSb%20Teknik%20Malzeme%20End%C3%BCstriyel%20%C3%9Cr%C3%BCnler!5e1!3m2!1str!2str!4v1769196748365!5m2!1str!2str"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="contact-container">
        <div className="contact-item">
          <NavigationArrow size={32} color="#194d88" />
          <a>Emekyemez Mahallesi, Buğulu Sokak, No:14/A Beyoğlu/İstanbul</a>
        </div>
        <div className="contact-item">
          <Envelope size={32} color="#194d88" />
          <a href="mailto:sbteknik@hotmail.com">sbteknik@hotmail.com</a>
        </div>
        <div className="contact-item">
          <Phone size={32} color="#194d88" />
          <a href="tel:+902122566646">0212 256 66 46</a>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
