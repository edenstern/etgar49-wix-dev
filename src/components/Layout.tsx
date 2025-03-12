/**
 * אתגר 49 - קומפוננטת המבנה (Layout)
 * מציגה את המבנה הבסיסי של האתר, כולל הדר ופוטר
 */

import React, { useState, useEffect } from 'react';
import { Link } from '@wix/yoshi-flow-bm';
import { styled } from '@wix/yoshi-flow-bm';
import theme from '../styles/theme';

interface LayoutProps {
  children: React.ReactNode;
  currentWeek?: number; // 1-7
}

const Layout: React.FC<LayoutProps> = ({ 
  children,
  currentWeek = 1
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // מעקב אחרי גלילת המסך לשינוי מראה ההדר
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // חישוב צבעי השבוע הנוכחי
  const getWeekColors = () => {
    const weekKey = `week${currentWeek}` as keyof typeof theme.colors.weeks;
    return theme.colors.weeks[weekKey];
  };
  
  const weekColors = getWeekColors();
  
  // פתיחה וסגירה של תפריט המובייל
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <Container>
      {/* הדר */}
      <Header isScrolled={isScrolled} weekColor={weekColors.primary}>
        <HeaderContent>
          <Logo isScrolled={isScrolled}>
            <LogoNumber>49</LogoNumber>
            <LogoNikud weekColor={weekColors.primary} />
          </Logo>
          
          <DesktopNav>
            <NavList>
              <NavItem>
                <NavLink href="/" isActive={true}>בית</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about" isActive={false}>מי אנחנו</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/weeks" isActive={false}>7 השבועות</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/community" isActive={false}>קהילה</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/faq" isActive={false}>שאלות נפוצות</NavLink>
              </NavItem>
            </NavList>
          </DesktopNav>
          
          <NavButtons>
            <LoginButton weekColor={weekColors.primary}>התחברות</LoginButton>
            <HamburgerButton 
              onClick={toggleMenu}
              isOpen={isMenuOpen}
              weekColor={weekColors.primary}
            >
              <HamburgerLine />
              <HamburgerLine />
              <HamburgerLine />
            </HamburgerButton>
          </NavButtons>
        </HeaderContent>
      </Header>
      
      {/* תפריט מובייל */}
      <MobileMenu isOpen={isMenuOpen} weekColor={weekColors.primary}>
        <MobileNavList>
          <MobileNavItem>
            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              בית
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>
              מי אנחנו
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink href="/weeks" onClick={() => setIsMenuOpen(false)}>
              7 השבועות
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink href="/community" onClick={() => setIsMenuOpen(false)}>
              קהילה
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink href="/faq" onClick={() => setIsMenuOpen(false)}>
              שאלות נפוצות
            </MobileNavLink>
          </MobileNavItem>
        </MobileNavList>
        
        <MobileLoginButton weekColor={weekColors.primary}>
          התחברות
        </MobileLoginButton>
        
        <CloseButton 
          onClick={() => setIsMenuOpen(false)}
          weekColor={weekColors.primary}
        >
          סגור
        </CloseButton>
      </MobileMenu>
      
      {/* תוכן הדף */}
      <Main>{children}</Main>
      
      {/* פוטר */}
      <Footer>
        <FooterContent>
          <FooterTop>
            <FooterLogo>
              <FooterLogoNumber>49</FooterLogoNumber>
              <FooterLogoNikud weekColor={weekColors.primary} />
            </FooterLogo>
            
            <FooterNav>
              <FooterNavColumn>
                <FooterNavTitle>אתגר 49</FooterNavTitle>
                <FooterNavList>
                  <FooterNavItem>
                    <FooterNavLink href="/about">מי אנחנו</FooterNavLink>
                  </FooterNavItem>
                  <FooterNavItem>
                    <FooterNavLink href="/weeks">7 השבועות</FooterNavLink>
                  </FooterNavItem>
                  <FooterNavItem>
                    <FooterNavLink href="/community">הקהילה שלנו</FooterNavLink>
                  </FooterNavItem>
                </FooterNavList>
              </FooterNavColumn>
              
              <FooterNavColumn>
                <FooterNavTitle>משאבים</FooterNavTitle>
                <FooterNavList>
                  <FooterNavItem>
                    <FooterNavLink href="/guides">מדריכים</FooterNavLink>
                  </FooterNavItem>
                  <FooterNavItem>
                    <FooterNavLink href="/blog">בלוג</FooterNavLink>
                  </FooterNavItem>
                  <FooterNavItem>
                    <FooterNavLink href="/faq">שאלות נפוצות</FooterNavLink>
                  </FooterNavItem>
                </FooterNavList>
              </FooterNavColumn>
              
              <FooterNavColumn>
                <FooterNavTitle>צור קשר</FooterNavTitle>
                <FooterNavList>
                  <FooterNavItem>
                    <FooterNavLink href="/contact">צור קשר</FooterNavLink>
                  </FooterNavItem>
                  <FooterNavItem>
                    <FooterNavLink href="mailto:info@etgar49.com">דוא"ל</FooterNavLink>
                  </FooterNavItem>
                  <FooterNavItem>
                    <FooterNavLink href="tel:+972123456789">טלפון</FooterNavLink>
                  </FooterNavItem>
                </FooterNavList>
              </FooterNavColumn>
            </FooterNav>
          </FooterTop>
          
          <FooterDivider />
          
          <FooterBottom>
            <FooterCopyright>
              © {new Date().getFullYear()} אתגר 49. כל הזכויות שמורות.
            </FooterCopyright>
            
            <FooterLinks>
              <FooterLink href="/terms">תנאי שימוש</FooterLink>
              <FooterLink href="/privacy">מדיניות פרטיות</FooterLink>
              <FooterLink href="/accessibility">נגישות</FooterLink>
            </FooterLinks>
            
            <FooterSocial>
              <SocialLink href="https://facebook.com/etgar49" aria-label="פייסבוק">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </SocialLink>
              
              <SocialLink href="https://instagram.com/etgar49" aria-label="אינסטגרם">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </SocialLink>
              
              <SocialLink href="https://twitter.com/etgar49" aria-label="טוויטר">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71305 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22152 20.9723 6.94396 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </SocialLink>
            </FooterSocial>
          </FooterBottom>
        </FooterContent>
      </Footer>
    </Container>
  );
};

// סגנונות

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// הדר

const Header = styled.header<{ isScrolled: boolean; weekColor: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${({ isScrolled }) => isScrolled ? theme.spacing[3] : theme.spacing[5]};
  background-color: ${({ isScrolled }) => 
    isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'
  };
  box-shadow: ${({ isScrolled }) => 
    isScrolled ? theme.shadows.md : 'none'
  };
  transition: all 0.3s ease;
  backdrop-filter: ${({ isScrolled }) => 
    isScrolled ? 'blur(8px)' : 'none'
  };
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div<{ isScrolled: boolean }>`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${({ isScrolled }) => isScrolled ? '32px' : '40px'};
  color: ${theme.colors.base.darkBlue};
  position: relative;
  transition: font-size 0.3s ease;
`;

const LogoNumber = styled.span`
  position: relative;
  letter-spacing: -0.03em;
`;

const LogoNikud = styled.div<{ weekColor: string }>`
  position: absolute;
  top: -5px;
  left: 70%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ weekColor }) => weekColor};
  box-shadow: ${({ weekColor }) => `0 0 8px ${weekColor}80`};
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${({ weekColor }) => weekColor};
    opacity: 0.5;
  }
  
  &::before {
    top: -8px;
    left: 2px;
  }
  
  &::after {
    bottom: -6px;
    left: -3px;
  }
`;

// ניווט דסקטופ

const DesktopNav = styled.nav`
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: ${theme.spacing[6]};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li``;

const NavLink = styled.a<{ isActive: boolean }>`
  font-family: ${theme.typography.fontFamily.secondary};
  font-weight: ${({ isActive }) => 
    isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium
  };
  font-size: ${theme.typography.fontSize.md};
  color: ${({ isActive }) => 
    isActive ? theme.colors.base.black : theme.colors.base.gray[700]
  };
  text-decoration: none;
  padding: ${theme.spacing[2]} 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: ${({ isActive }) => isActive ? '100%' : '0'};
    height: 2px;
    background-color: ${theme.colors.ui.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

// ניווט כפתורים

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
`;

const LoginButton = styled.button<{ weekColor: string }>`
  background-color: transparent;
  color: ${({ weekColor }) => weekColor};
  font-family: ${theme.typography.fontFamily.secondary};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.md};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border: 1px solid ${({ weekColor }) => weekColor};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.animations.transition.default};
  
  &:hover {
    background-color: ${({ weekColor }) => `${weekColor}10`};
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerButton = styled.button<{ isOpen: boolean; weekColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const HamburgerLine = styled.span`
  width: 100%;
  height: 2px;
  background-color: ${theme.colors.base.black};
  transition: ${theme.animations.transition.default};
`;

// תפריט מובייל

const MobileMenu = styled.div<{ isOpen: boolean; weekColor: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.base.white};
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: ${({ isOpen }) => isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  transition: transform 0.3s ease, opacity 0.3s ease;
  padding: ${theme.spacing[6]};
`;

const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const MobileNavItem = styled.li`
  margin-bottom: ${theme.spacing[4]};
`;

const MobileNavLink = styled.a`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.base.black};
  text-decoration: none;
  display: block;
  padding: ${theme.spacing[3]} 0;
`;

const MobileLoginButton = styled.button<{ weekColor: string }>`
  background-color: ${({ weekColor }) => weekColor};
  color: white;
  font-family: ${theme.typography.fontFamily.secondary};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  padding: ${theme.spacing[3]} ${theme.spacing[8]};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  margin-top: ${theme.spacing[6]};
  transition: ${theme.animations.transition.default};
  
  &:hover {
    background-color: ${({ weekColor }) => `${weekColor}CC`};
  }
`;

const CloseButton = styled.button<{ weekColor: string }>`
  position: absolute;
  top: ${theme.spacing[5]};
  right: ${theme.spacing[5]};
  background-color: transparent;
  color: ${({ weekColor }) => weekColor};
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.md};
  border: none;
  cursor: pointer;
`;

// תוכן הדף

const Main = styled.main`
  flex: 1;
  width: 100%;
  margin-top: 80px; /* גובה ההדר */
`;

// פוטר

const Footer = styled.footer`
  background-color: ${theme.colors.base.gray[100]};
  padding: ${theme.spacing[10]} ${theme.spacing[6]};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[8]};
  margin-bottom: ${theme.spacing[8]};
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterLogo = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: 40px;
  color: ${theme.colors.base.darkBlue};
  position: relative;
  margin-right: ${theme.spacing[10]};
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: ${theme.spacing[6]};
    text-align: center;
  }
`;

const FooterLogoNumber = styled.span`
  position: relative;
  letter-spacing: -0.03em;
`;

const FooterLogoNikud = styled.div<{ weekColor: string }>`
  position: absolute;
  top: -5px;
  left: 70%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ weekColor }) => weekColor};
  box-shadow: ${({ weekColor }) => `0 0 10px ${weekColor}80`};
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ weekColor }) => weekColor};
    opacity: 0.5;
  }
  
  &::before {
    top: -10px;
    left: 2px;
  }
  
  &::after {
    bottom: -8px;
    left: -4px;
  }
`;

const FooterNav = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing[6]};
  }
`;

const FooterNavColumn = styled.div`
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FooterNavTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.base.black};
  margin: 0 0 ${theme.spacing[4]};
`;

const FooterNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const FooterNavItem = styled.li`
  margin-bottom: ${theme.spacing[2]};
`;

const FooterNavLink = styled.a`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.base.gray[700]};
  text-decoration: none;
  transition: ${theme.animations.transition.default};
  
  &:hover {
    color: ${theme.colors.base.black};
  }
`;

const FooterDivider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.base.gray[300]};
  margin: ${theme.spacing[6]} 0;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing[4]};
  }
`;

const FooterCopyright = styled.div`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.base.gray[600]};
  
  @media (max-width: 768px) {
    order: 3;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  
  @media (max-width: 768px) {
    order: 2;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const FooterLink = styled.a`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.base.gray[600]};
  text-decoration: none;
  transition: ${theme.animations.transition.default};
  
  &:hover {
    color: ${theme.colors.base.black};
    text-decoration: underline;
  }
`;

const FooterSocial = styled.div`
  display: flex;
  gap: ${theme.spacing[3]};
  
  @media (max-width: 768px) {
    order: 1;
    margin-bottom: ${theme.spacing[2]};
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: ${theme.colors.base.gray[600]};
  border: 1px solid ${theme.colors.base.gray[300]};
  border-radius: 50%;
  transition: ${theme.animations.transition.default};
  
  &:hover {
    color: ${theme.colors.base.black};
    border-color: ${theme.colors.base.gray[400]};
    transform: translateY(-2px);
  }
`;

export default Layout;
