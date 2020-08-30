import React from 'react';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {StyleSheet, View, Platform} from 'react-native';
import {Loading} from 'src/components';
import SocialIcon from 'src/containers/SocialIcon';

import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

import {
  signInWithApple,
  signInWithFacebook,
  signInWithGoogle,
  initiateSocialLogin,
  cancelSocialLogin,
} from 'src/modules/auth/actions';
import {authSelector} from 'src/modules/auth/selectors';

import {authStack} from 'src/config/navigator';

import {margin} from 'src/components/config/spacing';
import {configsSelector} from 'src/modules/common/selectors';
import {GOOGLE_SIGN_IN_CONFIG} from 'src/config/auth';

GoogleSignin.configure(GOOGLE_SIGN_IN_CONFIG);

class SocialMethods extends React.Component {

  loginFacebook = async () => {
    const  network = 'Facebook';
    this.props.dispatch(initiateSocialLogin(network));
     
    try {
      
      const loginFacebook = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (loginFacebook.isCancelled) {
          this.props.dispatch(cancelSocialLogin(network));
      } else {
        let that = this;

        AccessToken.getCurrentAccessToken().then(data => {
          const token = data.accessToken.toString();
          that.props.dispatch(signInWithFacebook(token));
        });
      }
    } catch (e) {
      console.log('Login fail with error: ' + e);
      this.props.dispatch(cancelSocialLogin(network));
    }
  };

  loginGoogle = async () => {
    
    const  network = 'Google';
    this.props.dispatch(initiateSocialLogin(network));

    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      this.props.dispatch(signInWithGoogle(idToken));
    } catch (error) {

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
         this.props.dispatch(cancelSocialLogin(network));
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
         this.props.dispatch(cancelSocialLogin(network));
      } else {
        // some other error happened
         this.props.dispatch(cancelSocialLogin(network));
      }
    }
  };

  onAppleButtonPress = async () => {
    const  network = 'Apple';
    this.props.dispatch(initiateSocialLogin(network));

    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      });
      this.props.dispatch(signInWithApple(appleAuthRequestResponse));
    } catch (e) {
      this.props.dispatch(cancelSocialLogin(network));
      console.log(e);
    }
  };

  render() {
    const {
      style,
      navigation,
      auth: {pendingFacebook, pendingGoogle, pendingApple},
      configs,
    } = this.props;

    const {
      toggleLoginFacebook,
      toggleLoginGoogle,
      toggleLoginSMS,
    } = configs.toJS();

    return (
      <View style={[styles.container, style && style]}>
        <Loading visible={(pendingGoogle || pendingFacebook || pendingApple)} />
        {toggleLoginFacebook ? (
          <SocialIcon
            button
            iconSize={16}
            type="facebook-official"
            raised={false}
            style={styles.socialIconStyle}
            onPress={this.loginFacebook}
          />
        ) : null}
        {toggleLoginGoogle ? (
          <SocialIcon
            button
            iconSize={16}
            raised={false}
            type="google-plus-square"
            style={styles.socialIconStyle}
            onPress={this.loginGoogle}
          />
        ) : null}
        {toggleLoginSMS ? (
          <SocialIcon
            type="commenting"
            iconSize={16}
            button
            raised={false}
            style={styles.socialIconStyle}
            onPress={() => navigation.navigate(authStack.login_mobile)}
            fontStyle={styles.textButtonSocial}
          />
        ) : null}
        {Platform.OS === 'ios' ? (
          <SocialIcon
            type="apple"
            iconSize={16}
            button
            raised={false}
            style={styles.socialIconStyle}
            onPress={this.onAppleButtonPress}
            fontStyle={styles.textButtonSocial}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIconStyle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 0,
    marginHorizontal: margin.large / 2,
    marginVertical: 0,
  },
  textButtonSocial: {
    marginLeft: 0,
  },
});

const mapStateToProps = state => {
  return {
    auth: authSelector(state),
    configs: configsSelector(state),
  };
};
export default connect(mapStateToProps)(withNavigation(SocialMethods));
