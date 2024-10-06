import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

export default class CardDetails extends Component {
  render() {
    const {route} = this.props;
    const {character} = route.params;

    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Image source={{uri: character.image}} style={styles.image} />
          <View style={styles.overlay} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{character.name}</Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                {backgroundColor: getStatusColor(character.status)},
              ]}
            />
            <Text style={styles.statusText}>{character.status}</Text>
          </View>
          <InfoItem label="Espécie" value={character.species} />
          <InfoItem label="Gênero" value={character.gender} />
          <InfoItem label="Origem" value={character.origin} />
          <InfoItem label="Última localização" value={character.location} />
          <InfoItem label="Primeiro episódio" value={character.first_seen} />
        </View>
      </ScrollView>
    );
  }
}

const InfoItem = ({label, value}) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const getStatusColor = status => {
  switch (status.toLowerCase()) {
    case 'alive':
      return '#4CAF50';
    case 'dead':
      return '#F44336';
    default:
      return '#FFC107';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
  },
  infoContainer: {
    backgroundColor: '#16213e',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 30,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 18,
    color: '#fff',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: '#bbb',
  },
  infoValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
