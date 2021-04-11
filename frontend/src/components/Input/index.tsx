import React, {
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
    useCallback,
  } from 'react';

  import { IconBaseProps } from 'react-icons';
  import { FiAlertCircle } from 'react-icons/fi';
  import { useField } from '@unform/core';

  import { Container, Error } from './styles';

// Estou extendendo as propriades que um imput do HTML tem. por isso o extends abaixo.
  interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string; // sobrescri colocando obrigatorio.
    icon?: React.ComponentType<IconBaseProps>; // isso quando quero receber um componente como uma propriedade ai uso o ComponentType do react. O IconBaseProps é para ue o react enteder que é do tipo icone.
  }

  const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => { // icon: Icon tenho que converter para Icon com letra maiuscula para o react entender que é um componente.
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const { fieldName, defaultValue, error, registerField } = useField(name);

    // uso o useCallback no lugar de criar uma function para que o React não fique coloando em memória a função para todo componente criado. Assim é criado apenas uma vez a função.
    // Sempre que for criar uma função em um componente uso useCallback por conta do motivo acima. Abaixo uma herofunciton
    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
      // transformando o inputRef em boleano !!
      // o sinal de ? depois do current verifico se tem algum valor se tiver eu pego o value
      setIsFilled(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    }, [fieldName, registerField]);

    return (
      <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
        {Icon && <Icon size={20} />}
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}

        />
        {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
      </Container>
    );
  };

  export default Input;
