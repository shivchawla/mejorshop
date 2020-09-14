import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Container from 'src/containers/Container';
import {Row, Col} from 'src/containers/Gird';
import Button from 'src/containers/Button';

import {padding, margin} from 'src/components/config/spacing';
import {selectCartList} from 'src/modules/cart/selectors';
import {isLoginSelector} from 'src/modules/auth/selectors';

const FooterProduct = ({
  isAddToCart,
  onPressAddCart,
  onPressViewCart,
  onPressLogin,
  isLogin,
}) => {
  const {t} = useTranslation();
  
  return (
    <Container style={{marginBottom: margin.base, marginTop: margin.base}}>
      <Row>
        {(isLogin && !isAddToCart) && (
            <Col>
              <Button title={t('common:text_add_cart')} onPress={onPressAddCart} />
            </Col>
          )} 
        {(isLogin && isAddToCart) && (
          <Col>
            <Button title={t('common:text_view_cart')} onPress={onPressViewCart}/>
          </Col>
        )}
        
        {!isLogin && (
          <Col>
            <Button title={t('common:text_add_cart')} onPress={onPressLogin}/>
          </Col>
        )}
      </Row>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    line_items: selectCartList(state),
    isLogin: isLoginSelector(state),
  };
};

FooterProduct.defaultProps = {
  isAddToCart: false,
  onPressAddCart: () => {},
  onPressViewCart: () => {},
};

export default connect(mapStateToProps)(FooterProduct);
