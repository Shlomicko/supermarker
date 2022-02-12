import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  debounceTime,
  exhaustMap,
  filter,
  map,
  of,
  pipe,
} from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { LoginService } from '../../services/login/login.service';
import { Injectable } from '@angular/core';
import { CategoryService } from 'src/app/services/store/product/product.service';
import * as shoppingActions from '../../state/actions/shopping.actions';
import { ProductEditService } from '../../services/store/product-edit/product-edit.service';
import { ShoppingCartService } from '../../services/store/shopping-cart/shopping-cart.service';
import { TrollyProductsService } from 'src/app/services/store/troll-products/trolly-products.service';
import {
  productEditByAdminSuccess,
  fetchCitiesSuccess,
} from '../actions/shopping.actions';
import { CitiesService } from '../../services/store/cities/cities.service';

@Injectable()
export class ShoppingEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly loginService: LoginService,
    private readonly citiesService: CitiesService,
    private readonly categoryService: CategoryService,
    private readonly productEditService: ProductEditService,
    private readonly shoppingCartService: ShoppingCartService,
    private readonly listTrollyProductService: TrollyProductsService
  ) {}

  category$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.fetchCategories),
      exhaustMap(() => {
        return this.categoryService.fetchAllCategory().pipe(
          map((categories) =>
           {
            console.log(categories);
           return   shoppingActions.fetchCategoriesSuccess({ categories })}
          ),
          catchError((error) =>
            of(shoppingActions.fetchCategoriesFailure({ error }))
          )
        );
      })
    );
  });

  fetchCities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.fetchCities),
      exhaustMap(() => {
        return this.citiesService.fetchCitiesApi().pipe(
          map((cities) => {
            return shoppingActions.fetchCitiesSuccess({ cities });
          }),
          catchError((error) =>
            of(shoppingActions.fetchCitiesFailure({ error }))
          )
        );
      })
    );
  });

  productByCategoryId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.fetchProductsInit),
      exhaustMap((action) => {
        return this.categoryService
          .getAllProductByCategoryId(action.categoryId)
          .pipe(
            map((products) =>
              shoppingActions.fetchProductsSuccess({ products })
            ),
            catchError((error) =>
              of(shoppingActions.fetchProductsFailure({ error }))
            )
          );
      })
    );
  });

  productBySearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.fetchSingleProductsBySearch),
      exhaustMap((str) => {
        return this.categoryService.getProductsByName(str.str).pipe(
          map((products) =>
            shoppingActions.fetchSingleProductsBySearchSuccess({ products })
          ),

          catchError((error) =>
            of(shoppingActions.fetchSingleProductsBySearchFailure({ error }))
          )
        );
      })
    );
  });

  productEditByAdmin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.productEditByAdminSuccess),
      exhaustMap(({ product }) => {
        return this.productEditService.editProduct(product).pipe(
          map((product) => {
            return shoppingActions.productEditByAdminSuccess({ product });
          })
        );
      })
    );
  });

  shoppingCartForCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.getAndCheckShoppingCartCustomerInit),
      exhaustMap((result) => {
        console.log(result);

        return this.shoppingCartService
          .getShoppingCartForCustomer(result.customerRef!)
          .pipe(
            map((shoppingCartDetails) => {
              console.log(shoppingCartDetails);

              return shoppingActions.getShoppingCartCustomerSuccess({
                shoppingCartDetails,
              });
            }),
            catchError((error) =>
              of(shoppingActions.getShoppingCartCustomerFailure({ error }))
            )
          );
      })
    );
  });

  fetchAllProductListOfTrollyItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.getAllProductsByIdShoppingCartInit),
      exhaustMap((result) => {
        return this.listTrollyProductService
          .getAllListOfProductByCustomerId(result.cartRef)
          .pipe(
            map((trolleyItemS) => {
              return shoppingActions.getAllProductsByIdShoppingCartSuccess({
                trolleyItemS,
              });
            })
          );
      })
    );
  });

  deleteTrollyItemAndFetch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.deleteProductBy_IdTrollyInit),
      exhaustMap(({ _id }) => {
        return this.listTrollyProductService
          .deleteProductFromShoppingCart(_id)
          .pipe(
            map(() => {
              return shoppingActions.deleteProductBy_IdTrollySuccess({
                trollyId: _id,
              });
            })
          );
      })
    );
  });
  addProductItemToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.addProductToTrollyItemInit),
      exhaustMap(({ trolleyItem }) => {
        return this.listTrollyProductService
          .addProductToTrolleyItem(trolleyItem)
          .pipe(
            map((trolleyProductItem) => {
              return shoppingActions.addProductToTrollyItemSuccess({
                trolleyProductItem,
              });
            })
          );
      })
    );
  });

  deleteAllTrollies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.deleteAllItemFromShoppingCartInit),
      exhaustMap(({ cartRef }) => {
        return this.listTrollyProductService
          .deleteAllItemFromShoppingCartApi(cartRef)
          .pipe(
            map(() => {
              return shoppingActions.deleteAllItemFromShoppingCartSuccess({
                listProducts: [],
              });
            })
          );
      })
    );
  });
  updateAmountTrollyItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.updateAmountTrollyItemInit),
      exhaustMap(({ idTrollyItem, quantity }) => {
        return this.listTrollyProductService
          .updateAmountTrollyItem(idTrollyItem, quantity)
          .pipe(
            map(() => {
              return null;
            })
          );
      })
    );
  });

  indicationOfQuantityOfProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.indicationOfQuantityOfProductsInit),
      exhaustMap(() => {
        return this.categoryService.totalOfProductInDB().pipe(
          map(({ quantityOfProducts }) => {
            console.log(quantityOfProducts);

            return shoppingActions.indicationOfQuantityOfProductsSuccess({
              quantityOfProducts,
            });
          })
        );
      })
    );
  });

  createNewShoppingCartForCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.newShoppingCartInit),
      exhaustMap((action) => {
        return this.shoppingCartService
          .createNewShoppingCartForCustomer(action.customerRef)
          .pipe(
            map((action) => {
              return shoppingActions.newShoppingCartSuccess({
                IShoppingCart: action,
              });
            })
          );
      })
    );
  });
  createNewShoppingCartAndDeleteAllCartItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingActions.initializeCartAndListCartInit),
      exhaustMap((action) => {
        return this.shoppingCartService
          .initializeCartAndListCart(action.cartRef,action.customerRef)
          .pipe(
            map((action) => {
              return shoppingActions.newShoppingCartSuccess({
                IShoppingCart: action,
              });
            })
          );
      })
    );
  });
}
