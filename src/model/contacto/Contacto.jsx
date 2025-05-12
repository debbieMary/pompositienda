import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { BsChatSquareText } from 'react-icons/bs';
import PageTitle from '../../ui/PageTitle';

const ContactPage = () => {
  return (
      <div className="container my-auto">
        <div className="row g-0 bg-white rounded-4 shadow-lg overflow-hidden">
          {/* Sección Izquierda - Info + Redes (primera en mobile) */}
          <div className="col-md-8 p-4 p-lg-5 order-2 order-md-1">
            <div className="d-flex align-items-center mb-4">
              <PageTitle label="Contáctanos" Icon={BsChatSquareText} />
            </div>
            
            <ContactItem 
              icon={<FaMapMarkerAlt className="fs-4" />}
              bgColor="var(--pomp-turquesa)"
              title="Dirección"
              text="Calle Carlos Romero #2183"
            />
            
            <ContactItem 
              icon={<FaPhone className="fs-4" />}
              bgColor="var(--pomp-salmon)"
              title="Teléfonos"
              text="Soporte: 79523037"
            />
            
            <ContactItem 
              icon={<FaEnvelope className="fs-4" />}
              bgColor="var(--pomp-turquesa-dark)"
              title="Email"
              text="ventas@pompositienda.com"
            />
            
            <div className="mt-5">
              <h3 className="h4 mb-3" style={{ color: 'var(--pomp-turquesa-dark)' }}>
                Síguenos
              </h3>
              <div className="d-flex flex-wrap gap-2">
                <SocialIcon 
                  icon={<FaFacebook />} 
                  bgColor="var(--pomp-turquesa)" 
                  text="Facebook" 
                  externalLink="https://www.facebook.com/debbie.zuleta"
                />
                <SocialIcon 
                  icon={<FaInstagram />} 
                  bgColor="var(--pomp-salmon)" 
                  text="Instagram" 
                  externalLink="https://www.instagram.com/debbiezuleta/"
                />
                <SocialIcon 
                  icon={<FaTiktok />} 
                  bgColor="var(--pomp-turquesa-dark)" 
                  text="TikTok" 
                  externalLink="https://www.tiktok.com/@debbiezuleta"
                />
              </div>
            </div>
          </div>
          
          {/* Sección Derecha - Horario + Botones (segunda en mobile) */}
          <div className="col-md-4 p-4 p-lg-5 order-1 order-md-2" style={{ 
            backgroundColor: 'var(--pomp-salmon-light)',
          }}>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <FaClock className="fs-1 me-3" style={{ color: 'var(--pomp-salmon-oscuro)' }} />
                <h2 className="h3 mb-0" style={{ color: 'var(--pomp-salmon-oscuro)' }}>
                  Horario
                </h2>
              </div>
              
              <div className="bg-white rounded-3 p-3">
                <ScheduleItem day="Lun-Vier" time="09:00 - 19:00 hrs" />
                <ScheduleItem day="Sab" time="10:00 - 16:00 hrs" />
                <ScheduleItem day="Dom" time="Cerrado" lastItem />
              </div>
            </div>
            
            <div className="d-grid gap-3">
              <ActionButton 
                icon={<FaPhone className="fs-5" />}
                text="Llamar ahora"
                bgColor="var(--pomp-turquesa)"
                hoverColor="var(--pomp-turquesa-dark)"
                href="tel:5512345678"
              />
              <ActionButton 
                icon={<FaEnvelope className="fs-5" />}
                text="Enviar email"
                bgColor="var(--pomp-salmon)"
                hoverColor="var(--pomp-salmon-oscuro)"
                href="mailto:ventas@pompositienda.com"
              />
            </div>
          </div>
        </div>
      </div>
  );
};

// Componentes auxiliares optimizados
const ContactItem = ({ icon, bgColor, title, text }) => (
  <div className="d-flex gap-3 p-2 mb-2 align-items-start">
    <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" 
         style={{ 
           width: '40px', 
           height: '40px', 
           backgroundColor: bgColor, 
           color: 'white'
         }}>
      {icon}
    </div>
    <div className="flex-grow-1" style={{ minWidth: 0 }}>
      <h6 className="mb-0 fw-bold text-truncate" style={{ color: 'var(--pomp-plomo-xoscuro)' }}>
        {title}
      </h6>
      <p className="mb-0 small text-truncate" style={{ color: 'var(--pomp-turquesa-dark)' }}>
        {text}
      </p>
    </div>
  </div>
);

const SocialIcon = ({ icon, bgColor, text, externalLink }) => (
  <a href={externalLink} target="_blank" rel="noopener noreferrer" 
     className="btn d-flex align-items-center gap-2 py-2 px-3 rounded-pill text-white fw-bold" 
     style={{ 
       backgroundColor: bgColor,
       transition: 'transform 0.3s',
       fontSize: '0.9rem'
     }}
     onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
     onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
    {icon}
    <span>{text}</span>
  </a>
);

const ScheduleItem = ({ day, time, lastItem }) => (
  <div className={`d-flex justify-content-between py-2 ${!lastItem ? 'border-bottom' : ''}`} 
       style={{ borderColor: 'var(--pomp-plomo)' }}>
    <span style={{ color: 'var(--pomp-plomo-xoscuro)', fontSize: '0.9rem' }}>{day}</span>
    <strong style={{ 
      color: time === 'Cerrado' ? 'var(--pomp-salmon-oscuro)' : 'var(--pomp-turquesa-dark)',
      fontSize: '0.9rem'
    }}>
      {time}
    </strong>
  </div>
);

const ActionButton = ({ icon, text, bgColor, hoverColor, href }) => (
  <a href={href} 
     className="btn d-flex align-items-center justify-content-center gap-2 py-3 text-white fw-bold border-0"
     style={{
       backgroundColor: bgColor,
       transition: 'background-color 0.3s',
       borderRadius: '12px',
       fontSize: '1rem'
     }}
     onMouseEnter={e => e.currentTarget.style.backgroundColor = hoverColor}
     onMouseLeave={e => e.currentTarget.style.backgroundColor = bgColor}>
    {icon}
    {text}
  </a>
);

export default ContactPage;