import React from 'react';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CartIcon from '../cart-icon/CartIcon';
import CartDropDown from '../cart-dropdown/CartDropdown';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';

import { signOutStart } from '../../redux/user/user.action';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionDiv,
  OptionLink
} from './Header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/contact">CONTACT</OptionLink>
      {currentUser ? (
        <OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropDown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
