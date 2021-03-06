import Actions from './action';
import React from 'react';

interface Iprice {
  mrp: string;
  sp: string;
}

interface Iuser {
  cId: string; // cart id => unique id
  emailId: string;
  uuid: string;
  name: string;
  isExisting: boolean;
  phone: number;
  otp: number;
  defaultAddress: object[]; // array of Objects
  loc: {
    type: string;
    coordinates: [number];
  };
  addresses: string;
  imageLocation: string;
  isBlackListed: string;
}

interface productDetailsProps {
  name: string;
  _id: string;
  units: string;
  price: Iprice;
  quantity: number;
  storeId: string;
  imageList?: string[];
  userId: string;
  maxOrderCount: number;
  minOrderCount: number;
  isAvailable: boolean;
}
interface Icategory {
  name: string;
  _id: string;
}

const initialState = {
  rating: 1,
  userInfo: {} as Iuser,
  userUpdate: false,
  productList: [{} as productDetailsProps],
  cloneProductList: [{} as productDetailsProps],
  shopId: {},
  productDescInfo: {} as productDetailsProps,
  storeId: '' as string,
  category: {} as Icategory,
  showLocatios: false as boolean,
  paymentStatus: false as boolean,
};

const reducer = (state: any, action: any) => {
  switch (action.Type) {
    case Actions.RATING:
      return {...state, rating: action.value};
    case Actions.RESET:
      return {...state, rating: action.value};
    case Actions.PRODUCT_LIST:
      return {...state, productList: action.value};
    default:
      return {...state, ...initialState};
  }
};

export const ApplicationContext = React.createContext(initialState);
ApplicationContext.displayName = 'APP_CONTECT';
export const ApplicationConumer = ApplicationContext.Consumer;
const Provider = (children: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    rating: state.rating,
    item: state.item,
    productList: () => dispatch({type: Actions.PRODUCT_LIST}),
    reset: () => dispatch({type: Actions.RESET}),
  };
  return (
    <ApplicationContext.Provider value={value}>
      {children.children}
    </ApplicationContext.Provider>
  );
};

export default Provider;
