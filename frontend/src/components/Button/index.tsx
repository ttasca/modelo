import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// Criar tipagens de objeto de outras tipagem, pois não tenho nada a sobrescrever.
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// o children é para pegar o texto do botão
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  );
};

export default Button;
