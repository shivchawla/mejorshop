import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemedView, Text, Avatar, Icon, withTheme} from 'src/components';
import {margin, padding, borderRadius} from 'src/components/config/spacing';
import Rating from 'src/containers/Rating';

const Item = ({item, style, theme}) => {
  const {store_rating: aveRating} = item;
  // console.log(rating);
  // const {rating: aveRating} = rating;
  const numRating = parseFloat(aveRating) ? parseFloat(aveRating) : 0;
  // const valueRating = numRating.toFixed(1);
  return (
    <ThemedView colorSecondary style={[styles.container, style && style]}>
      <Avatar
        source={
          item.vendor_shop_logo
            ? {uri: item.vendor_shop_logo}
            : require('src/assets/images/pDefault.png')
        }
        size={60}
        rounded
        containerStyle={styles.image}
      />

      <Text h5 medium style={styles.name}>{item.vendor_shop_name}</Text>
      <View style={styles.viewRating}>
        {/*<Text h5 colorThird medium style={styles.textRating}>
          {valueRating}
        </Text>
        <Icon
          name="star"
          type="font-awesome"
          color={theme.colors.warning}
          size={13}
        />*/}

        <Rating
          readonly
          startingValue={numRating}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.large,
    width: 135,
    padding: padding.large,
    alignItems: 'center',
  },
  image: {
    marginBottom: margin.small + 1,
  },
  name: {
    marginBottom: 2,
    textAlign: 'center',
  },
  viewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRating: {
    marginRight: 5,
  },
});

export default withTheme(Item);
