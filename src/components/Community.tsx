/**
 * אתגר 49 - קומפוננטת קהילה
 * מציגה את הקהילה, משתתפים ועדויות
 */

import React, { useState, useEffect } from 'react';
import { styled } from '@wix/yoshi-flow-bm';
import theme from '../styles/theme';

// טיפוסי נתונים
interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  text: string;
  weekCompleted: number;
}

interface CommunityProps {
  testimonials?: Testimonial[];
  participantsCount?: number;
  weekNumber?: number; // 1-7
  className?: string;
}

const Community: React.FC<CommunityProps> = ({
  testimonials = [],
  participantsCount = 0,
  weekNumber = 1,
  className,
}) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animate, setAnimate] = useState(false);
  
  // החלפת עדות כל 7 שניות
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setAnimate(false);
        
        setTimeout(() => {
          setCurrentTestimonial((prev) => 
            prev === testimonials.length - 1 ? 0 : prev + 1
          );
          
          setTimeout(() => {
            setAnimate(true);
          }, 100);
        }, 300);
      }, 7000);
      
      setAnimate(true);
      
      return () => clearInterval(interval);
    } else {
      setAnimate(true);
    }
  }, [testimonials.length]);
  
  // מחשב את צבעי השבוע
  const getWeekColors = () => {
    const weekKey = `week${weekNumber}` as keyof typeof theme.colors.weeks;
    return theme.colors.weeks[weekKey];
  };
  
  const weekColors = getWeekColors();
  
  return (
    <Container className={className}>
      <Title>
        קהילת <Highlight weekColor={weekColors.primary}>אתגר 49</Highlight>
      </Title>
      
      <Subtitle>
        הצטרפו ל-{participantsCount.toLocaleString()} אנשים שכבר בדרך לגרסה הטובה ביותר של עצמם
      </Subtitle>
      
      {testimonials.length > 0 && (
        <TestimonialsSection>
          <TestimonialCard 
            animate={animate} 
            weekColor={weekColors.primary}
            glowColor={weekColors.glow}
          >
            <TestimonialContent>
              <TestimonialText>{testimonials[currentTestimonial].text}</TestimonialText>
              
              <TestimonialAuthor>
                <AuthorInfo>
                  <AuthorName>{testimonials[currentTestimonial].name}</AuthorName>
                  {testimonials[currentTestimonial].role && (
                    <AuthorRole>{testimonials[currentTestimonial].role}</AuthorRole>
                  )}
                </AuthorInfo>
                
                <WeekCompleted weekColor={weekColors.primary}>
                  השלים את שבוע {testimonials[currentTestimonial].weekCompleted}
                </WeekCompleted>
              </TestimonialAuthor>
            </TestimonialContent>
            
            {/* אלמנט ניקוד דקורטיבי */}
            <TestimonialNikud weekColor={weekColors.primary} />
          </TestimonialCard>
          
          {/* אינדיקטורים */}
          {testimonials.length > 1 && (
            <Indicators>
              {testimonials.map((_, index) => (
                <Indicator 
                  key={index}
                  isActive={currentTestimonial === index}
                  weekColor={weekColors.primary}
                  onClick={() => {
                    setAnimate(false);
                    setTimeout(() => {
                      setCurrentTestimonial(index);
                      setTimeout(() => {
                        setAnimate(true);
                      }, 100);
                    }, 300);
                  }}
                />
              ))}
            </Indicators>
          )}
        </TestimonialsSection>
      )}
      
      <JoinSection>
        <JoinHeading>
          רוצים להיות חלק מהמסע?
        </JoinHeading>
        
        <JoinDescription>
          הצטרפו לאלפי אנשים שכבר צועדים את 49 הימים דרך מסע של גילוי עצמי, צמיחה והתפתחות.
        </JoinDescription>
        
        <JoinButton weekColor={weekColors.primary}>
          הצטרפו עכשיו
        </JoinButton>
      </JoinSection>
      
      {/* מרקמים דקורטיביים */}
      <BackgroundElements>
        <CircleElement 
          top="10%" 
          left="5%" 
          size={150} 
          weekColor={weekColors.primary} 
        />
        <CircleElement 
          top="70%" 
          left="85%" 
          size={200} 
          weekColor={weekColors.primary} 
        />
      </BackgroundElements>
    </Container>
  );
};

// סגנונות

const Container = styled.section`
  padding: ${theme.spacing[16]} ${theme.spacing[6]};
  text-align: center;
  position: relative;
  overflow: hidden;
  background-color: ${theme.colors.base.white};
`;

const Title = styled.h2`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['4xl']};
  color: ${theme.colors.base.black};
  margin: 0 0 ${theme.spacing[4]};
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`;

const Highlight = styled.span<{ weekColor: string }>`
  color: ${({ weekColor }) => weekColor};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    height: 6px;
    background-color: ${({ weekColor }) => `${weekColor}20`};
    z-index: -1;
  }
`;

const Subtitle = styled.p`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.base.gray[700]};
  margin: 0 0 ${theme.spacing[12]};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

// סקשן עדויות

const TestimonialsSection = styled.div`
  margin-bottom: ${theme.spacing[16]};
`;

const TestimonialCard = styled.div<{ 
  animate: boolean; 
  weekColor: string;
  glowColor: string;
}>`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing[8]};
  background-color: ${theme.colors.base.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${({ weekColor, glowColor }) => `
    0 10px 30px ${glowColor},
    0 0 0 1px ${weekColor}20
  `};
  position: relative;
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transform: ${({ animate }) => (animate ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)')};
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const TestimonialContent = styled.div`
  position: relative;
  z-index: 2;
`;

const TestimonialText = styled.blockquote`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.base.black};
  line-height: ${theme.typography.lineHeight.loose};
  margin: 0 0 ${theme.spacing[6]};
  font-style: italic;
  text-align: center;
  
  &::before, &::after {
    content: '"';
    font-family: ${theme.typography.fontFamily.primary};
    color: ${theme.colors.base.gray[400]};
    font-size: 1.5em;
  }
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing[3]};
  }
`;

const AuthorInfo = styled.div`
  text-align: right;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const AuthorName = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.base.black};
`;

const AuthorRole = styled.div`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.base.gray[600]};
`;

const WeekCompleted = styled.div<{ weekColor: string }>`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.sm};
  color: ${({ weekColor }) => weekColor};
  background-color: ${({ weekColor }) => `${weekColor}10`};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.full};
  border: 1px solid ${({ weekColor }) => `${weekColor}20`};
`;

const TestimonialNikud = styled.div<{ weekColor: string }>`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ weekColor }) => `${weekColor}40`};
  z-index: 1;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ weekColor }) => `${weekColor}30`};
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

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing[2]};
  margin-top: ${theme.spacing[6]};
`;

const Indicator = styled.button<{ isActive: boolean; weekColor: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isActive, weekColor }) => 
    isActive ? weekColor : theme.colors.base.gray[300]
  };
  border: none;
  padding: 0;
  cursor: pointer;
  transition: ${theme.animations.transition.default};
  
  &:hover {
    background-color: ${({ isActive, weekColor }) => 
      isActive ? weekColor : theme.colors.base.gray[400]
    };
  }
`;

// סקשן הצטרפות

const JoinSection = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: ${theme.spacing[8]};
  background-color: ${theme.colors.base.cream};
  border-radius: ${theme.borderRadius.xl};
`;

const JoinHeading = styled.h3`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.base.black};
  margin: 0 0 ${theme.spacing[4]};
`;

const JoinDescription = styled.p`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.base.gray[700]};
  margin: 0 0 ${theme.spacing[6]};
  line-height: ${theme.typography.lineHeight.normal};
`;

const JoinButton = styled.button<{ weekColor: string }>`
  background-color: ${({ weekColor }) => weekColor};
  color: white;
  font-family: ${theme.typography.fontFamily.secondary};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: ${theme.animations.transition.default};
  box-shadow: ${({ weekColor }) => `0 4px 15px ${weekColor}40`};
  
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

// אלמנטים דקורטיביים

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const CircleElement = styled.div<{ 
  top: string;
  left: string;
  size: number;
  weekColor: string;
}>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ weekColor }) => `${weekColor}05`};
  opacity: 0.6;
`;

export default Community;
