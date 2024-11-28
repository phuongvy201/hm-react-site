import Home from "../pages/frontend/Home";
import MyAccount from "../pages/frontend/Home/account/MyAccount";
import Cart from "../pages/frontend/order/Cart";
import ProductDetail from "./../pages/frontend/products/ProductDetail";
import MyOrder from "./../pages/frontend/Home/account/MyOrder";
import ChangePassword from "./../pages/frontend/Home/account/ChangePassword";
import ProductCategory from "../pages/frontend/category/ProductCategory";
import BlogList from "../pages/frontend/post/BlogList";
import BlogDetail from "./../pages/frontend/post/BlogDetail";
import PageDetail from "./../pages/frontend/post/PageDetail";
import WishList from "./../pages/frontend/Home/WishList";
import ShopProfile from "../pages/frontend/profileshop/ShopProfile";
import Checkout from "../pages/frontend/order/Checkout";
import TestPayment from "../pages/frontend/TestPayment";
import Products from "./../pages/frontend/products/Products";
import Search from "../pages/frontend/products/Search";
const routerSite = [
  { path: "/", component: Home },
  { path: "/product/:slug", component: ProductDetail },
  { path: "/cart", component: Cart },
  { path: "/myaccount", component: MyAccount },
  { path: "/myorder", component: MyOrder },
  { path: "/changepassword", component: ChangePassword },
  { path: "/category/:slug", component: ProductCategory },
  { path: "/topic/:slug", component: BlogList },
  { path: "/blog/:slug", component: BlogDetail },
  { path: "/page/:slug", component: PageDetail },
  { path: "/wishlist", component: WishList },
  { path: "/shop/:sellerId", component: ShopProfile },
  { path: "/checkout", component: Checkout },
  { path: "/test-payment", component: TestPayment },
  { path: "/products", component: Products },
  { path: "/search", component: Search },
];

export default routerSite;
