/**
 * אתגר 49 - קומפוננטת Hero
 * מציגה את הכותרת הראשית והמידע המרכזי בראש העמוד
 */

import React, { useEffect, useState } from 'react';
import { styled } from '@wix/yoshi-flow-bm';
import theme from '../styles/theme';

interface HeroProps {
  currentWeek?: number; // 1-7
  currentDay?: number; // 1-7
  participantsCount?: number;
  completedChallengesCount?: number;
  onStartJourney?: () => void;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  currentWeek = 1,
  currentDay = 1,
  participantsCount = 0,
  completedChallengesCount = 0,
  onStartJourney,
  className,
}) => {
  const [animateElements, setAnimateElements] = useState(false);
  
  useEffect(() => {
    // הנפשת האלמנטים אחרי שהקומפוננטה נטענה
    const timer = setTimeout(() => {
      setAnimateElements(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // מחשב את צבעי השבוע הנוכחי
  const getWeekColors = () => {
    const weekKey = `week${currentWeek}` as keyof typeof theme.colors.weeks;
    return theme.colors.weeks[weekKey];
  };
  
  const weekColors = getWeekColors();
  
  return (
    <Container className={className} weekColor={weekColors.primary}>
      <Overlay />
      
      <Content animate={animateElements}>
        <Logo animate={animateElements}>
          <LogoNumber>49</LogoNumber>
          <LogoNikud weekColor={weekColors.primary} animate={animateElements} />
        </Logo>
        
        <MainTitle animate={animateElements}>
          <Span>49 ימים</Span> של צמיחה והתחדשות
        </MainTitle>
        
        <Subtitle animate={animateElements}>
          מסע מפסח לשבועות - יום אחר יום, צעד אחר צעד, לגילוי העומק שבתוכנו
        </Subtitle>
        
        <CTA 
          onClick={onStartJourney}
          weekColor={weekColors.primary}
          animate={animateElements}
        >
          הצטרף למסע
        </CTA>
        
        <Stats animate={animateElements}>
          <StatItem>
            <StatNumber>{participantsCount.toLocaleString()}</StatNumber>
            <StatLabel>משתתפים</StatLabel>
          </StatItem>
          
          <StatDivider />
          
          <StatItem>
            <StatNumber>{completedChallengesCount.toLocaleString()}</StatNumber>
            <StatLabel>אתגרים הושלמו</StatLabel>
          </StatItem>
        </Stats>
      </Content>
      
      {/* אלמנטים דקורטיביים */}
      <NikudElements>
        <NikudElement 
          top="15%" 
          left="10%" 
          delay={0.2} 
          size={12} 
          weekColor={weekColors.primary}
          animate={animateElements}
        />
        <NikudElement 
          top="30%" 
          left="80%" 
          delay={0.5} 
          size={18} 
          weekColor={weekColors.primary}
          animate={animateElements}
        />
        <NikudElement 
          top="75%" 
          left="15%" 
          delay={0.8} 
          size={14} 
          weekColor={weekColors.primary}
          animate={animateElements}
        />
        <NikudElement 
          top="60%" 
          left="90%" 
          delay={1.1} 
          size={10} 
          weekColor={weekColors.primary}
          animate={animateElements}
        />
      </NikudElements>
      
      <WheatElements>
        {Array.from({ length: 5 }).map((_, index) => (
          <WheatStalk 
            key={index}
            index={index}
            weekColor={weekColors.primary}
            position={15 + (index * 20)}
            animate={animateElements}
          />
        ))}
      </WheatElements>
      
      <WeekBadge weekColor={weekColors.primary} animate={animateElements}>
        שבוע {currentWeek} | יום {currentDay}
      </WeekBadge>
    </Container>
  );
};

// סגנונות

const Container = styled.div<{ weekColor: string }>`
  width: 100%;
  min-height: 85vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${theme.colors.base.white};
  
  /* גרדיאנט רקע עם צבע השבוע */
  background-image: ${({ weekColor }) => `
    radial-gradient(
      circle at 70% 30%,
      ${weekColor}05 0%,
      transparent 50%
    ),
    linear-gradient(
      to bottom,
      ${theme.colors.base.cream} 0%,
      ${theme.colors.base.white} 100%
    )
  `};
  
  @media (max-width: 768px) {
    min-height: 70vh;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/grain-texture.png');
  opacity: 0.05;
  pointer-events: none;
`;

const Content = styled.div<{ animate: boolean }>`
  text-align: center;
  max-width: 800px;
  padding: ${theme.spacing[6]};
  position: relative;
  z-index: 2;
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transform: ${({ animate }) => (animate ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.8s ease, transform 0.8s ease;
`;

const Logo = styled.div<{ animate: boolean }>`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: 72px;
  color: ${theme.colors.base.darkBlue};
  margin-bottom: ${theme.spacing[5]};
  position: relative;
  display: inline-block;
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transform: ${({ animate }) => (animate ? 'scale(1)' : 'scale(0.9)')};
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: 0.3s;
`;

const LogoNumber = styled.span`
  position: relative;
  letter-spacing: -0.03em;
`;

const LogoNikud = styled.div<{ weekColor: string; animate: boolean }>`
  position: absolute;
  top: -5px;
  left: 70%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ weekColor }) => weekColor};
  box-shadow: ${({ weekColor }) => `0 0 10px ${weekColor}80`};
  opacity: ${({ animate }) => (animate ? 0.7 : 0)};
  transform: ${({ animate }) => (animate ? 'translateY(0)' : 'translateY(10px)')};
  transition: opacity 0.8s ease, transform 0.8s ease, background-color 0.8s ease;
  transition-delay: 0.5s;
  
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

const MainTitle = styled.h1<{ animate: boolean }>`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['5xl']};
  color: ${theme.colors.base.black};
  margin: 0 0 ${theme.spacing[4]};
  line-height: ${theme.typography.lineHeight.tight};
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transform: ${({ animate }) => (animate ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.4s;
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`;

const Span = styled.span`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    height: 6px;
    background-color: ${theme.colors.base.cream};
    z-index: -1;
  }
`;

const Subtitle = styled.p<{ animate: boolean }>`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.base.gray[700]};
  margin: 0 0 ${theme.spacing[8]};
  line-height: ${theme.typography.lineHeight.normal};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transform: ${({ animate }) => (animate ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.5s;
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

const CTA = styled.button<{ weekColor: string; animate: boolean }>`
  background-color: ${({ weekColor }) => weekColor};
  color: white;
  font-family: ${theme.typography.fontFamily.secondary};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  padding: ${theme.spacing[4]} ${theme.spacing[8]};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  margin-bottom: ${theme.spacing[8]};
  transition: ${theme.animations.transition.default};
  box-shadow: ${({ weekColor }) => `0 4px 15px ${weekColor}40`};
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transform: ${({ animate }) => (animate ? 'translateY(0)' : 'translateY(20px)')};
  transition: background-color 0.3s ease, transform 0.5s ease, opacity 0.5s ease, box-shadow 0.3s ease;
  transition-delay: 0.6s;
  
  &:hover {
    background-color: ${({ weekColor }) => `${weekColor}CC`};
    transform: translateY(-3px);
    box-shadow: ${({ weekColor }) => `0 8px 20px ${weekColor}60`};
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: ${({ weekColor }) => `0 5px 10px ${weekColor}50`};
  }
`;

const Stats = styled.div<{ animate: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing[8]};
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transform: ${({ animate }) => (animate ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.7s;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing[4]};
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['3xl']};
  color: ${theme.colors.base.black};
`;

const StatLabel = styled.div`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.base.gray[600]};
`;

const StatDivider = styled.div`
  width: 1px;
  height: 40px;
  background-color: ${theme.colors.base.gray[300]};
  
  @media (max-width: 768px) {
    width: 40px;
    height: 1px;
  }
`;

// אלמנטים דקורטיביים

const NikudElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

const NikudElement = styled.div<{ 
  top: string;
  left: string;
  delay: number;
  size: number;
  weekColor: string;
  animate: boolean;
}>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ weekColor }) => weekColor};
  box-shadow: ${({ weekColor }) => `0 0 10px ${weekColor}40`};
  opacity: ${({ animate }) => (animate ? 0.3 : 0)};
  transform: ${({ animate }) => (animate ? 'translateY(0)' : 'translateY(10px)')};
  transition: opacity 1s ease, transform 1s ease;
  transition-delay: ${({ delay }) => `${delay}s`};
  
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 3px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${({ weekColor }) => weekColor};
    opacity: 0.5;
  }
`;

const WheatElements = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
  pointer-events: none;
`;

const WheatStalk = styled.div<{ 
  index: number;
  weekColor: string;
  position: number;
  animate: boolean;
}>`
  position: absolute;
  bottom: 0;
  right: ${({ position }) => `${position}%`};
  width: 3px;
  height: ${({ index }) => 60 + (index * 10)}px;
  background-color: ${({ weekColor }) => `${weekColor}70`};
  transform-origin: bottom center;
  transform: ${({ animate, index }) => animate 
    ? `rotate(${-5 + (index * 2)}deg) translateY(0)` 
    : `rotate(0) translateY(30px)`
  };
  opacity: ${({ animate }) => animate ? 0.7 : 0};
  transition: transform 1s ease, opacity 1s ease;
  transition-delay: ${({ index }) => `${0.4 + (index * 0.1)}s`};
  
  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: -4px;
    border-radius: 50% 50% 0 50%;
    width: 12px;
    height: 20px;
    background-color: ${({ weekColor }) => `${weekColor}40`};
    transform: rotate(-30deg);
  }
`;

const WeekBadge = styled.div<{ 
  weekColor: string;
  animate: boolean;
}>`
  position: absolute;
  top: ${theme.spacing[5]};
  left: ${theme.spacing[5]};
  background-color: ${({ weekColor }) => `${weekColor}15`};
  color: ${({ weekColor }) => weekColor};
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.md};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.full};
  border: 1px solid ${({ weekColor }) => `${weekColor}30`};
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transform: ${({ animate }) => (animate ? 'translateX(0)' : 'translateX(-20px)')};
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.7s;
  
  @media (max-width: 768px) {
    left: 50%;
    transform: ${({ animate }) => (animate ? 'translateX(-50%)' : 'translateX(-60%)')};
  }
`;

export default Hero;
