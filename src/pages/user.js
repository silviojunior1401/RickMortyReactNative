import React, {Component} from 'react';

import {UserContainer, UserForm, Input, Button, ButtonText} from './styles';

export default class User extends Component {
  state = {
    nome_usuario: '',
    telefone: '',
    cpf: '',
    email: '',
    curso: '',
  };

  render() {
    const {nome_usuario, telefone, cpf, email, curso} = this.state;

    return (
      <UserContainer>
        <UserForm>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome"
            value={nome_usuario}
            onChangeText={text => this.setState({nome_usuario: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Telefone"
            value={telefone}
            onChangeText={text => this.setState({telefone: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="CPF"
            value={cpf}
            onChangeText={text => this.setState({cpf: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="E-mail"
            value={email}
            onChangeText={text => this.setState({email: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Curso"
            value={curso}
            onChangeText={text => this.setState({curso: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />

          <Button onPress={() => this.props.navigation.navigate('login')}>
            <ButtonText>Salvar</ButtonText>
          </Button>
        </UserForm>
      </UserContainer>
    );
  }
}
