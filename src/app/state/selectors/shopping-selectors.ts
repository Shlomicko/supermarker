import { state } from '@angular/animations';
import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { Shopping, shoppingReducer } from '../reducers';

export const shoppingSelectorFetcher =
  createFeatureSelector<Shopping>('shoppingFeature');

export const selectLoading = createSelector(
  shoppingSelectorFetcher,
  (state) => state?.loading
);

export const selectProducts = createSelector(
  shoppingSelectorFetcher,
  (state) => state?.products
);
export const selectCategories = createSelector(
  shoppingSelectorFetcher,
  (state) => state?.categories
);
export const selectError = createSelector(
  shoppingSelectorFetcher,
  (state) => state?.error
);
export const selectLoginInformation = createSelector(
  shoppingSelectorFetcher,
  (state) => state?.infoLogin
);
export const selectIsRegistered = createSelector(
  shoppingSelectorFetcher,
  (state) => state?.isRegistered
);
export const selectCities = createSelector(
  shoppingSelectorFetcher,
  (state) => state?.citiesList
);

export const selectInitialRegistrationDetails = createSelector(
  shoppingSelectorFetcher,
  (state) => ({
    id: state?.id,
    email: state?.email,
    password: state?.password,
  })
);
export const errorInRegister = createSelector(
  shoppingSelectorFetcher,
  (state) => ( state?.errorInRegister)
  
)
export const selectIdShoppingCart = createSelector(
  shoppingSelectorFetcher,
  (state) => state?.cartRef
);
export const selectListsItemOfProducts = createSelector(
  shoppingSelectorFetcher,
  (state) => state?.listProducts
);
export const selectProductEditByAdmin = createSelector(
  shoppingSelectorFetcher,
  (state) => state.editProduct
);
export const selectShoppingCartDetails = createSelector(
  shoppingSelectorFetcher,
  (state) => state?.shoppingCartDetails
);
export const selectProductOfTrollyItems = createSelector(
  shoppingSelectorFetcher,
  (state) => state?.listProducts
);
export const isquantity = createSelector(
  shoppingSelectorFetcher,
  (state)=>state?.isAmountTrolly
)
export const quantityOfProducts = createSelector(
  shoppingSelectorFetcher,
  (state) => state?.quantityOfProducts
)