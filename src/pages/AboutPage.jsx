import Navbar from "../components/Navbar";
import sbLogo from "../img/sbLogo.png";

import certificate1 from "../img/certificatesLogos/1.png";
import certificate2 from "../img/certificatesLogos/2.png";
import certificate3 from "../img/certificatesLogos/3.png";
import certificate4 from "../img/certificatesLogos/4.png";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="about-section">
        <video className="about-video" autoPlay loop muted>
          <source src="/sbAboutVideo1.mp4" type="video/mp4" />
        </video>
        <div className="about-content">
          <img src={sbLogo} alt="Sb teknik logosu" className="about-logo" />
          <div className="about-text-content">
            <h1 className="about-header">SB Teknik;</h1>
            <p className="about-text">
              2015 Yılında İstanbul, Karaköy'de kurulan firmamız 10 yılı aşkın
              süredir hırdavat, inşaat malzemeleri, endüsriyel ürünler, makina
              yedek parçaları başta olmak üzere pek çok sektörde tedarikçi
              olarak hizmet vermektedir. Kuruluşundan bu yana pazardaki payını
              genişletmek için rekabetçi fiyat politikası, hızlı ve doğru
              tedarik prensipleri ile çalışmalarını sürdürmeye devam etmektedir.
            </p>
          </div>
        </div>
      </div>
      <div className="certificates-section">
        <img src={certificate1} alt="tse" />
        <img src={certificate2} alt="iso1002" />
        <img src={certificate3} alt="iso9001" />
        <img src={certificate4} alt="ce" />
      </div>
    </>
  );
};

export default AboutPage;
