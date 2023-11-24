import { useEffect } from 'react';
import './footer.css'
import { MdOutlineLocationOn } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import { AiOutlineMail ,AiOutlineInstagram} from 'react-icons/ai';
import { CiFacebook} from 'react-icons/ci';
import { BsWhatsapp} from 'react-icons/bs';
import logoFooter from './img/logo.png'

const footer = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    const animacion = document.getElementById('contactanos');
    
  
  
    const Animacion = (entradas )=>{
        entradas.forEach((entrada)=>{
          if(entrada.isIntersecting){
            entrada.target.classList.add('visible');
          }else{
            entrada.target.classList.remove('visible');
          }
        });
    }
  
    const observador = new IntersectionObserver(Animacion,{
      root:null,
      rootMargin:'100px 0px 0px 0px',
      threshold:0.2
    });
  
    observador.observe(animacion);
  
  })
  


  return (
    <div>
        <footer className="footer" id='contactanos'>
            <div className="footer__section1 seccion-footer">
                <h2 className="footer__h2">ACERCA DE NOSOTROS</h2>
                <p className="footer__p">Somos una licorera con más de 10 años en el mercado</p>
            </div>
            <div className="footer__section2 seccion-footer">
                <div className="footer__datos">
                  <MdOutlineLocationOn className="fa-solid fa-location-dot"/>
               
                <p className="datos__p"><span className="datos-span">ITAGUI</span>-ANTIOQUIA</p>
                </div>
                <div className="footer__datos">
                  <BsTelephone  className="fa-solid fa-phone"/>
                <p className="datos__p">313<span className="datos-span">249</span>6990</p>
                </div>
                <div className="footer__datos">
                  <AiOutlineMail className="fa-solid fa-envelope"/>
                <p className="datos__p">salsamentariala<span className="datos-span">69</span>@hotmail.com</p>
                </div>
            </div>
            <div className="footer__section3 seccion-footer">
                <img className="footer__logo navbar__logo--img" src={logoFooter} alt="" />
                <div className="footer__redes">
                  <AiOutlineInstagram  className="fa-brands fa-instagram redes-footer"/>
                  <CiFacebook className="fa-brands fa-facebook redes-footer"/>
                  <BsWhatsapp className="fa-brands fa-whatsapp redes-footer"/>
                </div>
            </div>
            </footer>
    </div>
  )
}

export default footer