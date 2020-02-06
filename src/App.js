import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { setCurrentUser } from './redux/user/user.action';
import './App.css';
import { createStructuredSelector } from 'reselect';
import HomePage from './pages/homepage/Homepage';
import CheckOutPage from './pages/checkoutpage/CheckOutPage';
import ShopPage from './pages/shop/ShopPage';
import SignInAndUP from './pages/signinandup/SignInAndUp';
import Header from './components/header/Header';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.action';
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
// import { addCollectionAndDocuments } from './firebase/firebase.util';
// import Collection from './pages/collection/Collection';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/checkout" component={CheckOutPage} />
        <Route
          exact
          path="/signin"
          render={() => (currentUser ? <Redirect to="/" /> : <SignInAndUP />)}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  // collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
