import { createReducer, on, StateObservable } from '@ngrx/store';
import { Categories } from '../../../../../Share/categories';
import { IProduct } from '../../../../../Share/Products';

import * as ShoppingActions from '../actions/shopping.actions';
import { IUserInformation } from '../../../../../Share/userInformation';
import * as UserInformation from '../actions/user.actions';
import { state } from '@angular/animations';
import { ICities } from '../../../../../Share/Cities';
import { fetchSingleProductsBySearchFailure, initializeCartAndListCartInit } from '../actions/shopping.actions';
import { IShoppingCart } from '../../../../../Share/shoppingCart';

import { IShoppingCartDetails } from '../../../../../Share/shoppingCartDetails';
import { selectListsItemOfProducts } from '../selectors/shopping-selectors';

import { ListItemCart, Product } from '../../../../../Share/Product';
export interface Shopping {
  categories: Categories[] | null;
  products: IProduct[] | null;
  loading: boolean;
  error: any;
  infoLogin: IUserInformation | null;
  isRegistered: boolean | null;
  citiesList: ICities[] | null;
  listProducts: Product[];

  id?: string;
  email?: string;
  password?: string;
  editProduct: IProduct | null;
  shoppingCartDetails: IShoppingCartDetails | null;
  cartRef: string | null;

  updateAmountTrollyItem: {
    idTrollyItem: string;
    quantity: number;
  } | null;
  isAmountTrolly: boolean;
  quantityOfProducts: number;
  errorInRegister:boolean
}

export const initialShoppingState: Shopping = {
  categories: null,
  products: null,
  loading: false,
  error: null,
  infoLogin: null,
  isRegistered: null, //check in register component if user can to continue with registration
  citiesList: null,
  listProducts: [],

  id: '',
  email: '',
  password: '',
  editProduct: null,
  shoppingCartDetails: null,
  cartRef: null,

  updateAmountTrollyItem: null,
  isAmountTrolly: false,
  quantityOfProducts: 0,
    errorInRegister:false
};

export const shoppingReducer = createReducer(
  initialShoppingState,
  on(ShoppingActions.fetchCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false,
  })),
  on(ShoppingActions.fetchCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    errorAlert: error,
  })),
  on(ShoppingActions.fetchProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(ShoppingActions.fetchProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    errorAlert: error,
  })),
  on(
    ShoppingActions.fetchSingleProductsBySearchSuccess,
    (state, { products }) => ({
      ...state,
      products,
      loading: false,
    })
  ),
  on(
    ShoppingActions.fetchSingleProductsBySearchFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      errorAlert: error,
    })
  ),

  on(
    UserInformation.loginInitSuccess,
    UserInformation.registerUserSuccess,
    (state, { infoLogin }) => ({
      ...state,
      infoLogin,
      loading: false,
      errorAlert: null,
    })
  ),
  on(UserInformation.loginInitFailure, (state, { error }) => ({
    ...state,
    errorAlert: error,
    loading: true,
    
  })),
  
  on(UserInformation.checkRegisterInit, (state, action) => ({
    ...state,
    id: action.id,
    loading: false,
  })),
  on(UserInformation.checkRegisterSuccess, (state, { success }) => ({
    ...state,
    isRegistered: success,
    loading: false,
    errorAlert: null,
  })),
  on(UserInformation.checkRegisterFailure, (state, { error }) => ({
    ...state,
    errorAlert: error,
    isRegistered: false,
    loading: false,
  })),
  on(UserInformation.registerUserFailure, (state, { error })=>({
    ...state,
    errorInRegister:error.error.isError
  })),
  on(ShoppingActions.fetchCitiesSuccess, (state, { cities }) => ({
    ...state,
    citiesList: cities,
  })),
  on(ShoppingActions.fetchCitiesFailure, (state, { error }) => ({
    ...state,
    errorAlert: error,
    loading: false,
  })),
  on(ShoppingActions.addProductToListSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(ShoppingActions.addProductToListFailure, (state, { error }) => ({
    ...state,
    errorAlert: error,
    loading: false,
  })),

  on(ShoppingActions.productEditByAdminInit, (state, { product }) => ({
    ...state,
    editProduct: product,
    loading: false,
  })),
  on(ShoppingActions.productEditByAdminSuccess, (state, { product }) => ({
    ...state,
    editProduct: product,
    loading: false,
  })),
  on(
    ShoppingActions.getShoppingCartCustomerSuccess,
    (state, { shoppingCartDetails }) => ({
      ...state,
      shoppingCartDetails,
      loading: false,
    })
  ),
  on(
    ShoppingActions.getAllProductsByIdShoppingCartInit,
    (state, { cartRef }) => ({
      ...state,
      cartRef,
      loading: false,
    })
  ),
  on(
    ShoppingActions.getAllProductsByIdShoppingCartSuccess,

    (state, { trolleyItemS }) => ({
      ...state,
      listProducts: trolleyItemS,
      loading: false,
    })
  ),
  on(
    ShoppingActions.deleteProductBy_IdTrollySuccess,

    (state, { trollyId }) => ({
      ...state,
      listProducts: state.listProducts!.filter(
        (listProduct) => listProduct.id !== trollyId
      ),
      loading: false,
    })
  ),
  on(
    ShoppingActions.addProductToTrollyItemSuccess,
    (state, { trolleyProductItem }) => ({
      ...state,
      listProducts: state.listProducts!.concat(trolleyProductItem),
      loading: false,
    })
  ),
  on(
    ShoppingActions.deleteAllItemFromShoppingCartSuccess,
    (state, { listProducts }) => ({
      ...state,
      listProducts,
      loading: false,
    })
  ),
  on(
    ShoppingActions.updateAmountTrollyItemInit,
    (state, { idTrollyItem, quantity }) => ({
      ...state,
      updateAmountTrollyItem: { idTrollyItem, quantity },
    })
  ),
  on(
    ShoppingActions.updateAmountTrollySuccess,
    (state, { trolleyProductItem }) => ({
      ...state,
      listProducts: state.listProducts.concat(trolleyProductItem),
    })
  ),
  on(
    ShoppingActions.indicationOfQuantityOfProductsSuccess,
    (state, { quantityOfProducts }) => ({
      ...state,
      quantityOfProducts,
    })
  ),on(ShoppingActions.initializeCartAndListCartInit,(state)=>({
    ...state,
    listProducts:[]
  }))
);
