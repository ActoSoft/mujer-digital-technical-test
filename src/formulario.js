import styled, {css} from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const colores = {
    borde: "#0075FF",
    error: "#bb2929",
    exito: "#1ed12d"
}

 const Formulario = styled.form`

    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    `;

const Titulo = styled.p`
    display: block;
      font-weight: 700;
      padding: 10px;
      min-height: 40px;
      cursor: pointer;
`;
  

    const Label = styled.label`
      display: block;
      font-weight: 700;
      padding: 10px;
      min-height: 40px;
      cursor: pointer;
      ${props => props.validoo == 'false' && css`
         color: ${colores.error};
        `}
      `;

    const GrupoInput = styled.div`
     position: relative;
     z-index: 90;
    `;

    const Input = styled.input`
    width: 100%;
    background: #fff;
    border-radius: 3px;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border: 3px solid transparent;

    &:focus {
    border: 3px solid ${colores.borde};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163,163,163, .4);
    }

    ${props => props.valido == 'true' && css`
    border: 3px solid transparent;
    `}

     ${props => props.valido == 'false' && css`
    border: 3px solid ${colores.error} !important ;
    `}
    
        `;

    const LeyendaError = styled.p`
     font-size: 12px;
     margin-bottom: 0;
     color: ${colores.error};
     display: none;

       ${props => props.valido == 'true' && css`
        display: black;
    `}
      

      ${props => props.valido == 'false' && css`
        display: black;
    `}

    `;

    const IconoValidacion = styled(FontAwesomeIcon)`
      position: absolute;
      right: 10px;
      bottom: 14px;
      z-index: 100;
      font-size: 16px;
      Opacity: 0;

    `;

    const ContenedorBoton = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    background: #696969;
    margin: 20px;
    justify-content: center;
    `;

    const Boton = styled.button`
    width: 200%;
    background: #696969;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: .1s ease all;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    justify-content: center;


    &:hover {
    box-shadow: 3px 0px 30px rgba(163,163,163, 1);
        background: #696969;

    }
    `;

    const MensajeExito = styled.p`
     font-size: 14px;
     color: ${colores.exito};
     display:none;
    `;

    const MensajeError = styled.div`
     height: 45px;
     line-height: 45px;
     background: #66060;
     padding: 0px 15px;
     border-radius: 3px;
     grid-column: span2;
     p {
       margin: 0;
     }

     b {
       margin-left: 10px;
     }
    `;
    
    const Seleccion = styled.p`
      display: block;
      font-weight: 700;
      padding: 10px;
      min-height: 40px;
      cursor: pointer;
    `;

    const Multiple = styled.div`
    width: 100;
    border-radius: 3px;

     &:focus {
    border: 3px solid ${colores.borde};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163,163,163, .4);
    }
    
    `;

    const MensajeTotal = styled.div`
     display:flex;
     flex-direction: column;
    `;

   

    const Blanco = styled.input`
    width: 100%;
    background: #fff;
    border-radius: 3px;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border: 3px solid transparent;
    

    &:focus {
    border: 3px solid ${colores.borde};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163,163,163, .4);
    }
    `;


   export {Formulario,
    Titulo,
     Label,
      GrupoInput,
       Input,
        LeyendaError, 
        IconoValidacion,
         ContenedorBoton, 
         Boton,
         MensajeExito,
         MensajeError,
         Multiple,
         MensajeTotal,
         Seleccion,
         Blanco
         };
