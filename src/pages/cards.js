import React, {Component} from 'react';
import {
  Keyboard,
  ActivityIndicator,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  List,
  Card,
  Container,
  Form,
  ImageCard,
  Input,
  StatusCard,
  SubmitButton,
  InfoText,
  TitleCard,
  ProfileButton,
  ProfileButtonText,
  InfoView,
  StatusView,
  StatusDot,
  InfoLabel,
} from './styles';

import api from '../services/api';

export default class Cards extends Component {
  state = {
    newCharacter: '',
    characters: [],
  };

  async componentDidMount() {
    const characters = await AsyncStorage.getItem('characters');
    if (characters) {
      this.setState({characters: JSON.parse(characters)});
    }
  }

  async componentDidUpdate(_, prevState) {
    const {characters} = this.state;
    if (prevState.characters !== characters) {
      await AsyncStorage.setItem('characters', JSON.stringify(characters));
    }
  }

  handleAddUser = async () => {
    try {
      const {characters, newCharacter} = this.state;
      this.setState({loading: true});

      const response = await api.get('character', {
        params: {
          name: newCharacter,
        },
      });

      if (
        characters.find(
          character => character.name === response.data.results[0].name,
        )
      ) {
        alert('Personagem já adicionado!');
        this.setState({
          loading: false,
        });
        return;
      }

      const episodeData = await api.get(response.data.results[0].episode[0], {
        baseURL: '',
      });

      const data = {
        ...response.data.results[0],
        name: response.data.results[0].name,
        image: response.data.results[0].image,
        status: response.data.results[0].status,
        species: response.data.results[0].species,
        location: response.data.results[0].location.name,
        origin: response.data.results[0].origin.name,
        first_seen: episodeData.data.name,
      };

      this.setState({
        characters: [...characters, data],
        newCharacter: '',
        loading: false,
      });

      Keyboard.dismiss();
    } catch (error) {
      alert('Personagem não encontrado!');
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {characters, newCharacter, loading} = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome do Personagem"
            value={newCharacter}
            onChangeText={text => this.setState({newCharacter: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />

          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={22} color="#fff" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={characters}
          keyExtractor={character => character.name}
          renderItem={({item}) => (
            <Card>
              <ImageCard source={{uri: item.image}} />
              <InfoView style={{width: '60%'}}>
                <TitleCard>{item.name}</TitleCard>
                <StatusView>
                  <StatusDot
                    style={{
                      backgroundColor:
                        item.status === 'Alive' ? '#55CC44' : '#D63D2E',
                    }}></StatusDot>
                  <StatusCard>
                    {item.status} - {item.species}
                  </StatusCard>
                </StatusView>

                <InfoLabel>Última localização:</InfoLabel>
                <InfoText>{item.location}</InfoText>
                <InfoLabel>Primeiro episódio:</InfoLabel>
                <InfoText>{item.first_seen}</InfoText>
                <ProfileButton
                  onPress={() => {
                    this.props.navigation.navigate('card_details', {
                      character: item,
                    });
                  }}>
                  <ProfileButtonText>Ver mais Detalhes</ProfileButtonText>
                </ProfileButton>
                <ProfileButton
                  onPress={() => {
                    this.setState({
                      characters: characters.filter(
                        character => character.name !== item.name,
                      ),
                    });
                  }}
                  style={{backgroundColor: '#f00'}}>
                  <ProfileButtonText>Excluir</ProfileButtonText>
                </ProfileButton>
              </InfoView>
            </Card>
          )}
        />
      </Container>
    );
  }
}
