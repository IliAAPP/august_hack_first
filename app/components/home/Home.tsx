import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

const cards = [
  { id: 1, image: require('../../../assets/job1.png'), title: 'Монтажник', location: 'Республика Адыгея, Тахтамукайский район, Шапсугское шоссе, 3', date: '05.08-10.08', time: 'с 8:00 до 17:00' },
  { id: 2, image: require('../../../assets/job2.png'), title: 'Электрик', location: 'Республика Адыгея, Майкопский район, Советская улица, 12', date: '15.08-20.08', time: 'с 9:00 до 18:00' },
];

const App = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const onSwiped = (index) => {
    setCardIndex(index + 1);
    setLike(false);
    setDislike(false);
  };

  const onSwipedRight = () => {
    setLike(true);
  };

  const onSwipedLeft = () => {
    setDislike(true);
  };

  const renderCard = (card, index) => (
    <View style={styles.card}>
      <Image source={card.image} style={styles.image} />
      <View style={styles.cardContent}>
        {index === cardIndex && (
          <View style={styles.iconRow}>
            <Icon name="times-circle" size={40} color={dislike ? 'red' : '#C4C4C4'} />
            <Icon name="heart" size={40} color={like ? '#59A9CC' : '#C4C4C4'} />
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cardIndex < cards.length ? (
        <>
          <Swiper
            cards={cards}
            cardIndex={cardIndex}
            renderCard={renderCard}
            onSwiped={onSwiped}
            onSwipedRight={onSwipedRight}
            onSwipedLeft={onSwipedLeft}
            backgroundColor={'#f0f0f0'}
            stackSize={2}
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: 'red',
                    color: 'white',
                    fontSize: 24,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30,
                  },
                },
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: '#59A9CC',
                    color: 'white',
                    fontSize: 24,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30,
                  },
                },
              },
            }}
          />
        </>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>Новые вакансии появятся совсем скоро!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 0.85,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderColor: '#e3e3e3',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '85%',
    resizeMode: 'contain',
  },
  cardContent: {
    padding: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  distance: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    color: '#777',
  },
});

export default App;
