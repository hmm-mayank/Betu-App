import React, {useContext, useState} from 'react';
import {LayoutContainer} from '../../Modules/GlobalStyles/GlobalStyle';
import ListProduct from '../../Components/ListProduct/ListProduct';
import MainAppFooter from '../AppFooter/AppFooter';
import {View, AsyncStorage} from 'react-native';
import {ApplicationContext, ApplicationConumer} from '../../Modules/context';

const AppCart = ({navigation}) => {
  let storeData = useContext(ApplicationContext);
  let [appCart, setAppCart] = useState(0);
  // storeData.productList.shift();
  let cartProductsData;
  // try {
  //   let localProducts = await AsyncStorage.getItem("@localCartItem");
  //   cartProductsData = JSON.parse(localProducts);

  // } catch (error) {
  //   cartProductsData = storeData.productList;
  // }
  const isResresh = () => {
    setAppCart(appCart++);
  };

  var cartProducts = storeData.productList.filter(
    (value) => JSON.stringify(value) !== ('{}' || null),
  );
  //
  return (
    <React.Fragment>
      <LayoutContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        marginTop={1}
        style={{paddingBottom: 100}}>
        <View style={{flexDirection: 'column', paddingBottom: 50}}>
          {cartProducts.length > 0 &&
            cartProducts.map((e) => (
              <ListProduct
                navigation={navigation}
                refresh={() => isResresh()}
                elements={e}
              />
            ))}
        </View>
      </LayoutContainer>
      <MainAppFooter
        count={appCart}
        isMain={{isMain: false, navigation: navigation}}
      />
    </React.Fragment>
  );
};

export default AppCart;
