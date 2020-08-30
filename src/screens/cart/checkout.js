import React from 'react';

import {connect} from 'react-redux';
import {compose} from 'redux';

import {fromJS} from 'immutable';


import {StyleSheet, View, FlatList, Dimensions, KeyboardAvoidingView, Platform} from 'react-native';
import {ThemedView} from 'src/components';
import Steps from 'src/containers/Steps';
import Shipping from './containers/Shipping';
import Payment from './containers/Payment';
import Done from './containers/Done';

import {fetchPaymentGateways, fetchShippingMethodsNotCoveredByZone} from 'src/modules/common/actions';
import {selectShippingAddress} from 'src/modules/cart/selectors';
import {changeData} from 'src/modules/cart/actions';
import {userSelector, shippingAddressSelector} from 'src/modules/auth/selectors';
import {isShippingAddressValid, mergeOnlyEmpty} from 'src/utils/func';

import {cartStack} from 'src/config/navigator';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {margin} from 'src/components/config/spacing';

const contents = {
    Shipping,
    Payment,
    Done,
};

const width = Dimensions.get('window').width;
const steps = [
    {
        component: 'Shipping',
        title: 'Shipping',
        icon: 'map',
        iconType: 'feather',
    },
    {
        component: 'Payment',
        title: 'Payment',
        icon: 'credit-card',
        iconType: 'feather',
    },
    {
        component: 'Done',
        title: 'Done',
        icon: 'check-circle',
        iconType: 'feather',
    },
];

class CheckoutScreen extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: 0,
            visible: false,
            params: {}, // Param share all step
        };
        this.flatListRef = React.createRef();


        //Update shipping with default user email
        //Moved here..so that in Shipping step values are aready populated
        const {dispatch, shippingInit, shipping} = this.props;

        var shippingJS = shipping.toJS();
        var shippingInitJS = shippingInit.toJS();

        let shippingMerged = fromJS(mergeOnlyEmpty(shippingJS, shippingInitJS));
        dispatch(changeData(['shipping'], shippingMerged));    
        
        dispatch(changeData(['shipping', "email"], this.props.user.get("user_email")));

    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchPaymentGateways());
    }

    // Next step checkout
    nextStep = (params = {}) => {
        const {current} = this.state;
        const to = current + 1;
        if (to < steps.length) {
            this.flatListRef.scrollToOffset({
                offset: to * width,
            });
            this.setState({
                current: to,
                params,
            });
        }
    };

    // Back step checkout
    backStep = (params = {}) => {
        const {current} = this.state;
        const {navigation} = this.props;
        if (current > 0) {
            const to = current - 1;
            this.setState({
                current: to,
                params,
            });
            this.flatListRef.scrollToOffset({
                offset: to * width,
            });
        } else {
            navigation.navigate(cartStack.cart);
        }
    };

    renderContent = ({item}) => {
        const {params} = this.state;
        const ContentComponent = contents[item.component];
        return (
            <View style={styles.tabContent}>
                <ContentComponent nextStep={this.nextStep} backStep={this.backStep} params={params}/>
            </View>
        );
    };

    render() {
        const {current, params} = this.state;
        return (
            <ThemedView isFullView style={styles.container}>
                <Steps data={steps} current={current} style={styles.tabBar}/>
                <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} style={styles.keyboard}>
                    <FlatList
                        extraData={params}
                        data={steps}
                        horizontal
                        pagingEnabled
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        ref={ref => {
                            this.flatListRef = ref;
                        }}
                        keyExtractor={item => item.component}
                        renderItem={this.renderContent}
                    />
                </KeyboardAvoidingView>
            </ThemedView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight(),
    },
    tabBar: {
        marginTop: margin.small,
        marginBottom: margin.large,
    },
    keyboard: {
        flex: 1
    },
    tabContent: {
        flex: 1,
        width: width,
    },
});

const mapStateToProps = state => ({
    user: userSelector(state),
    shipping: selectShippingAddress(state),
    shippingInit: shippingAddressSelector(state),
});

export default compose(
  connect(mapStateToProps),
)(CheckoutScreen);

// export default connect()(CheckoutScreen);
