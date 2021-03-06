import 'react-native-gesture-handler';
import React, { Suspense, useEffect, useState, useRef,useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BackHandler } from "react-native";
import { RowText } from '../../Modules/GlobalStyles/GlobalStyle';
import UserProfile from '../UserProfile/UserProfile';
import PaymentSuccess from '../Payments/PaymentSuccess';
import LocationCheck from "../../misc/locationAccess";
import GateKeeper from '../Gatekeeper/Gatekeeper';
import Products from '../Products/Products';
import SearchStoreLoader from '../../Loaders/SearchStoreLoader';
import AsyncStorage from '@react-native-community/async-storage';
import {ApplicationContext} from '../../Modules/context';
const LocationModal = React.lazy(() => import('../../Loaders/LocationModal'));
const AppHeader = React.lazy(() => import('../AppHeader/AppHeader'));
const AppContent = React.lazy(() => import('../AppContent/AppContent'));
const AppCart = React.lazy(() => import('../AppCart/AppCart'));
const FilterProducts = React.lazy(() => import('../FilterProducts/FilterProducts'));
const PaymentLayout = React.lazy(() => import('../PaymentLayout/PaymentLayout'));
const ProductDetails = React.lazy(() =>
  import('../ProductDetail/ProductDetail'),
);

const Stack = createStackNavigator();


const AppLayout = () => {
  let userToken:any ='false';
  const [isLogin, setLogin] = useState('false');
 
  useEffect(() => {

    // reset state in componentwillUnmount
    
    LocationCheck();
    const bootstrapAsync = async () => {
      try {
        userToken = await AsyncStorage.getItem('@LoginStatus');
        console.log( userToken,"GET INITIAL VALUE");
        let location = await AsyncStorage.getItem('@userHomeLocation');
        setLogin(userToken);
      } catch (e) {
        
        // Restoring token failed
      }
    };
    bootstrapAsync(); 
  });
    let suspense = <><Suspense fallback={<SearchStoreLoader/>}>

        <NavigationContainer>


            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                }}>
                    <Stack.Screen
                        name="Home"
                        component={AppContent}
                        options={{
                            headerShown: true,
                            headerTitle: () => <AppHeader titleName={"Home"}/>,
                        }}
                    />



                    <Stack.Screen
                        name={'Login'}
                        component={GateKeeper}
                        // component={Products}
                        options={{
                            headerShown: false,
                        }}
                    />
                <Stack.Screen
                    name="FilterProducts"
                    component={FilterProducts}
                    options={{
                        headerShown: false,
                        headerTitle: () => <AppHeader titleName={'Products'}/>,
                    }}
                />
                <Stack.Screen
                    name="GateKeeper"
                    component={GateKeeper}
                    options={{
                        headerShown: false,
                        headerTitle: () => <AppHeader titleName={'Get In'}/>,
                    }}
                />
                <Stack.Screen
                    name="PaymentLayout"
                    component={PaymentLayout}
                    options={{
                        headerShown: true,
                        headerTitle: () => <AppHeader titleName={'Payment'}/>,
                    }}
                />

                <Stack.Screen
                    name="Products"
                    component={Products}
                    options={{
                        headerShown: true,
                        headerTitle: () => <AppHeader titleName={'Products'}/>,
                    }}
                />

                <Stack.Screen
                    name="Cart"
                    component={AppCart}
                    options={{
                        headerTitle: () => <RowText fontColor={'black'}>Cart</RowText>,
                    }}
                />
                <Stack.Screen
                    name="ProductDetail"
                    component={ProductDetails}
                    options={{
                        headerTitle: () => <RowText fontColor={'black'}>Product</RowText>,
                    }}
                />
                <Stack.Screen
                    name="UserProfile"
                    component={UserProfile}
                    options={{
                        headerTitle: () => <RowText fontColor={'black'}>Profile</RowText>,
                    }}
                />
                <Stack.Screen
                    name="PaymentSuccess"
                    component={PaymentSuccess}
                    options={{
                        headerShown: false,
                        headerTitle: () => <RowText fontColor={'black'}>Profile</RowText>,
                    }}
                />

                <Stack.Screen
                    name="LocationModal"
                    component={LocationModal}
                    options={{
                        headerShown: true,
                        headerTitle: () => <RowText fontColor={'black'}>Please Press Back Arrow</RowText>,
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    </Suspense></>;
    return suspense;
};

export default AppLayout;
