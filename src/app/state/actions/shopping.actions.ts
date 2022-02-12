import { createAction, props } from '@ngrx/store';
import { Categories } from '../../../../../Share/categories';
import { IProduct } from '../../../../../Share/Products';
import { ICities } from '../../../../../Share/Cities';
import { IShoppingCart } from '../../../../../Share/shoppingCart';
import { IShoppingCartDetails } from '../../../../../Share/shoppingCartDetails';
import { ITrolleyItem } from '../../../../../Share/trolleyItem';
import { Product } from '../../../../../Share/Product';


export const fetchCategories = createAction('[Categories] fetch Categories');

export const fetchCategoriesSuccess = createAction(
  '[Categories] fetch Categories Success',
  props<{ categories: Categories[] }>()
);

export const fetchCategoriesFailure = createAction(
  '[Categories] fetch Categories Failure',
  props<{ error: any }>()
);
export const fetchProductsInit = createAction(
  '[Products]  fetch Products',
  props<{ categoryId: string }>()
);
export const fetchProductsSuccess = createAction(
  '[Products]  fetch Products Success',
  props<{ products: IProduct[] }>()
);
export const fetchProductsFailure = createAction(
  '[Products]  fetch Products Failure',
  props<{ error: any }>()
);

export const fetchCities = createAction('[Categories] fetch Categories');

export const fetchCitiesSuccess = createAction(
  '[Categories] fetch Cities Success',
  props<{ cities: ICities[] }>()
);
export const fetchCitiesFailure = createAction(
  '[Categories] fetch Categories Failure',
  props<{ error: any }>()
);

export const fetchSingleProductsBySearch = createAction(
  '[Products]  fetch single product by Search ',
  props<{ str: string }>()
);
export const fetchSingleProductsBySearchSuccess = createAction(
  '[Products] fetch single product by Search Success',
  props<{ products: IProduct[] }>()
);
export const fetchSingleProductsBySearchFailure = createAction(
  '[Products]  fetch single product by Search  Failure',
  props<{ error: any }>()
);

export const lodeProductByiD = createAction(
  '[Products]  fetch single product by Search '
);
export const lodeProductByIdSuccess = createAction(
  '[Products]  lode Edit Product By  Success ',
  props<{ products: IProduct[] }>()
);
export const lodeProductByIdFail = createAction(
  '[Products]  lode Edit Product By  failure',
  props<{ error: any }>()
);
export const addProductToListInit = createAction(
  '[Add to list ] Lode Product to the list',
  props<{ ProductId: IProduct }>()
);
export const addProductToListSuccess = createAction(
  '[Add to list ] Lode Product to the list Success',
  props<{ products: IProduct[] }>()
);
export const addProductToListFailure = createAction(
  '[Add to list ] Lode Product to the list Failure',
  props<{ error: any }>()
);
export const productEditByAdminInit = createAction(
  '[Edit product] lode product edit by admin',
  props<{ product: IProduct }>()
);
export const productEditByAdminSuccess = createAction(
  '[Edit product] Success product edit by admin',
  props<{ product: IProduct }>()
);
export const getAndCheckShoppingCartCustomerInit = createAction(
  '[Get shopping cart] lode shopping cart for Customer Id',
  props<{ customerRef?: string }>()
);
export const getShoppingCartCustomerSuccess = createAction(
  '[Get shopping cart  Success] Success shopping cart for Customer Id',
  props<{ shoppingCartDetails: IShoppingCartDetails }>()
);
export const getShoppingCartCustomerFailure = createAction(
  '[Get shopping cart  Success] Failure shopping cart for Customer Id',
  props<{ error: any }>()
);
export const getAllProductsByIdShoppingCartInit = createAction(
  '[init product list from api ] init products list for user',
  props<{ cartRef: string }>()
);
export const getAllProductsByIdShoppingCartSuccess = createAction(
  '[Success product list from api ] Success products list for user',
  props<{ trolleyItemS: Product[] }>()
);
export const deleteProductBy_IdTrollyInit = createAction(
  '[init delete product  from api and fetch back all Trolly Product  ] delete init products list for user',
  props<{ _id: string }>()
);
export const deleteProductBy_IdTrollySuccess = createAction(
  '[Success  delete product  from api and fetch back all Trolly Product  ] delete Success products list 1for user',
  props<{ trollyId: string }>()
);
//need to do it
export const addProductToTrollyItemInit = createAction(
  '[init add Product to Trolly list ] init products list for user',
  props<{ trolleyItem: ITrolleyItem }>()
);
export const addProductToTrollyItemSuccess = createAction(
  '[Success add Product to Trolly list ] Success products list for user',
  props<{ trolleyProductItem: Product }>()
);

export const deleteAllItemFromShoppingCartInit = createAction(
  '[delete all item from shopping cart init] init Delete all items from shopping cart',
  props<{ cartRef: string }>()
);
export const deleteAllItemFromShoppingCartSuccess = createAction(
  '[delete all item from shopping cart Success] Success Delete all items from shopping cart',
  props<{ listProducts: [] }>()
);
export const updateAmountTrollyItemInit = createAction(
  '[Update Amount init]',
  props<{ idTrollyItem: string; quantity: number }>()
);
export const updateAmountTrollySuccess = createAction(
  '[Update Amount Success]',
  props<{ trolleyProductItem: Product }>()
);
export const indicationOfQuantityOfProductsInit = createAction(
  'Indication of quantity of products'
);
export const indicationOfQuantityOfProductsSuccess = createAction(
  'Indication of quantity of products',
  props<{ quantityOfProducts: number }>()
);
export const newShoppingCartInit = createAction(
  'init create new shopping cart for user',
  props<{ customerRef: string}>()
)
export const newShoppingCartSuccess = createAction(
  'Success create new shopping cart for user',
  props<{IShoppingCart:IShoppingCart}>()
)

export const initializeCartAndListCartInit=createAction(
  "[initialize Cart And List Cart Init]",
  props<{cartRef:string,customerRef:string}>()
)
export const initializeCartAndListCartSuccess=createAction(
  "[initialize Cart And List Cart Success]",
  props<{IShoppingCart:IShoppingCart}>()
)