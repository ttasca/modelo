import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup'; // biblioteca para validar formulários
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}


const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    //async function handleSubmit(data: object): void {
    const handleSubmit = useCallback(
      async (data: SignUpFormData) => {
        try {
          formRef.current?.setErrors({});
            // // digo que o meu Yup é um objeto e o shape é para indicar o formato do objeto.
          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string()
              .email('Digite um e-mail válido')
              .required('E-mail obrigatório'),
            password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          });

          // abortEarly: mudo a configuração do Yup para retornar todos os erros do formulário de uma vez só.
          await schema.validate(data, {
            abortEarly: false,
          });

          await api.post('/users', data);

          history.push('/'); // assim consigo fazer redirecionamento pelo componente sem ser por um link. 

          addToast({
            type: 'success',
            title: 'Cadastro realizado!',
            description: 'Você já pode fazer seu logon no GoBarber!',
          });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

            return;
          }

          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
          });
        }
      },
      [addToast, history],
    );

    return (
      <Container>
        <Background />
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="GoBarber" />

            {// <Form initialData={{name:'Thiago'}} onSubmit={handleSubmit} >  se eu quiser que algum campo começe com algum valor, no caso campo name valor thiago.
                }
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu cadastro</h1>

              <Input name="name" icon={FiUser} placeholder="Nome" />

              <Input name="email" icon={FiMail} placeholder="E-mail" />

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Cadastrar</Button>
            </Form>

            <Link to="/">
              <FiArrowLeft />
              Voltar para logon
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
    );
  };

  export default SignUp;
