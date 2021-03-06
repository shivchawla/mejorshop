import React from 'react';
import {connect} from 'react-redux';
import {merge} from 'lodash';

import {StyleSheet, ScrollView, View, KeyboardAvoidingView} from 'react-native';
import {Header, Divider, Text, ThemedView} from 'src/components';
import Container from 'src/containers/Container';
import Input from 'src/containers/input/Input';
import Button from 'src/containers/Button';
import TextHtml from 'src/containers/TextHtml';
import {TextHeader, IconHeader} from 'src/containers/HeaderComponent';
import SocialMethods from './containers/SocialMethods';

import {rootSwitch, authStack, homeTabs} from 'src/config/navigator';

import {signInWithEmail} from 'src/modules/auth/actions';
import {getCart, addToCart} from 'src/modules/cart/actions';
import {authSelector, isLoginSelector} from 'src/modules/auth/selectors';
import {requiredLoginSelector} from 'src/modules/common/selectors';
import {margin} from 'src/components/config/spacing';

import {changeColor} from 'src/utils/text-html';
import globalConfig from 'src/utils/global';

class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleLogin = () => {
    const {username, password} = this.state;
    this.props.dispatch(signInWithEmail({username, password}));
    // this.props.dispatch(getCart());
  };

  render() {
    const {
      navigation,
      auth: {pending, loginError, isLogin},
      requiredLogin,
      screenProps: {t, theme},
      dispatch,
    } = this.props;

    const {username, password} = this.state;
    const {message, errors} = loginError;

    if(isLogin) {
      const redirect = navigation.getParam('redirect', '');
      const item = navigation.getParam('item', null);

  
      if (redirect == 'addToCart' && item) {
        dispatch(
          addToCart(item,
          (output) => { 
              if (output.success) {
                navigation.navigate(homeTabs.cart);
              } else {
                navigation.navigate(homeTabs.home);
              }
          })
        )
      } else {
        dispatch(getCart());
        navigation.navigate(homeTabs.home);
      }

    }

    return (
      <ThemedView isFullView>
        <Header
          leftComponent={
            !requiredLogin && (
              <IconHeader
                name="x"
                size={24}
                onPress={() => navigation.navigate(rootSwitch.main)}
              />
            )
          }
          centerComponent={<TextHeader title={t('common:text_signin')} />}
        />
        <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
          <ScrollView>
            <Container>
              {message ? (
                <TextHtml
                  value={message}
                  style={merge({div:{marginBottom: margin.large}}, changeColor(theme.colors.error))}
                />
              ) : null}
              <Input
                label={t('auth:text_input_email_address')}
                value={username}
                onChangeText={value => this.setState({username: value})}
                error={errors && errors.username}
              />
              <Input
                label={t('auth:text_input_password')}
                value={password}
                secureTextEntry
                onChangeText={value => this.setState({password: value})}
                error={errors && errors.password}
              />
              <Button
                title={t('common:text_signin')}
                loading={pending}
                onPress={this.handleLogin}
                containerStyle={styles.margin}
              />
              <Text
                onPress={() => navigation.navigate(authStack.forgot)}
                style={styles.textForgot}
                medium>
                {t('auth:text_forgot')}
              </Text>
              <View style={[styles.viewOr, styles.margin]}>
                <Divider style={styles.divOr} />
                <Text style={styles.textOr} colorThird>
                  {t('auth:text_or')}
                </Text>
                <Divider style={styles.divOr} />
              </View>
              <SocialMethods style={styles.viewSocial} />
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
        <Container style={styles.margin}>
          <Text h6 colorThird style={styles.textAccount}>
            {t('auth:text_have_account')}
          </Text>
          <Button
            title={t('auth:text_register')}
            type="outline"
            onPress={() => navigation.navigate(authStack.register)}
          />
        </Container>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  textForgot: {
    textAlign: 'center',
  },
  viewOr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divOr: {
    flex: 1,
  },
  textOr: {
    marginHorizontal: margin.base,
  },
  textAccount: {
    textAlign: 'center',
    marginBottom: margin.base,
  },
  margin: {
    marginVertical: margin.big,
  },
  viewSocial: {
    marginBottom: margin.big,
  },
});

const mapStateToProps = state => {
  return {
    auth: authSelector(state),
    requiredLogin: requiredLoginSelector(state),
    // isLogin: isLoginSelector(state),
  };
};

export default connect(mapStateToProps)(LoginScreen);
