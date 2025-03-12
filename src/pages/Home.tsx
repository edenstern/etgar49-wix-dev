/**
 * אתגר 49 - עמוד הבית
 * עמוד הבית הראשי של האתר, המחבר את כל הקומפוננטות למבנה אחד
 */

import React, { useEffect, useState } from 'react';
import { styled } from '@wix/yoshi-flow-bm';
import { Page } from '@wix/yoshi-flow-bm';
import { WixDesignSystem } from '@wix/wix-design-system';
import { useDynamicRender, useRemoteService } from '@wix/wix-frontend-lib';

// קומפוננטות
import Hero from '../components/Hero';
import DailyChallenge from '../components/DailyChallenge';
import JourneyProgress from '../components/JourneyProgress';
import Community from '../components/Community';

// סגנונות ותמה
import theme from '../styles/theme';

// מוק דאטה - יוחלף בנתונים אמיתיים מהשרת
import { getDummyData } from '../data/mockData';

const Home: React.FC = () => {
  // מצב דף
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [todayChallenge, setTodayChallenge] = useState<any>(null);
  const [completedDays, setCompletedDays] = useState<any[]>([]);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [completedChallengesCount, setCompletedChallengesCount] = useState(0);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  
  // טעינת נתונים
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // במציאות: לוגיקה להשגת נתונים מהשרת
        // לצורך הדוגמה: נתונים מדומים
        const data = getDummyData();
        
        setCurrentWeek(data.currentWeek);
        setCurrentDay(data.currentDay);
        setTodayChallenge(data.todayChallenge);
        setCompletedDays(data.completedDays);
        setParticipantsCount(data.participantsCount);
        setCompletedChallengesCount(data.completedChallengesCount);
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // טיפול בהשלמת אתגר
  const handleCompleteChallenge = async (challengeId: string) => {
    try {
      // במציאות: שליחת נתונים לשרת
      console.log(`Completing challenge: ${challengeId}`);
      
      // עדכון חזותי מיידי
      setCompletedDays([
        ...completedDays,
        { ...todayChallenge, completed: true }
      ]);
      setCompletedChallengesCount(prev => prev + 1);
    } catch (error) {
      console.error('Error completing challenge:', error);
    }
  };
  
  // טיפול בשיתוף אתגר
  const handleShareChallenge = () => {
    if (navigator.share && todayChallenge) {
      navigator.share({
        title: `אתגר 49 - יום ${currentDay}`,
        text: `היום אני משתתף באתגר היומי של אתגר 49: ${todayChallenge.title}`,
        url: window.location.href,
      });
    } else {
      // פול-בק אם השיתוף לא נתמך
      alert('שיתוף לא נתמך בדפדפן זה. אנא העתק את הקישור ושתף באופן ידני.');
    }
  };
  
  return (
    <Container>
      {/* הירו */}
      <Hero 
        currentWeek={currentWeek}
        currentDay={currentDay}
        participantsCount={participantsCount}
        completedChallengesCount={completedChallengesCount}
        onStartJourney={() => {
          // גלילה לאזור האתגר היומי
          const challengeSection = document.getElementById('daily-challenge');
          if (challengeSection) {
            challengeSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
      
      {/* אתגר היומי */}
      <DailyChallengeSection id="daily-challenge">
        <SectionHeading>
          <HeadingTitle>
            האתגר של <HighlightedDay>היום</HighlightedDay>
          </HeadingTitle>
          <HeadingSubtitle>
            כל יום מציג אתגר חדש לעבודה על המידות שלנו. רק 10 דקות ביום יכולות לשנות את חייך.
          </HeadingSubtitle>
        </SectionHeading>
        
        <DailyChallenge 
          challenge={todayChallenge}
          onComplete={handleCompleteChallenge}
          onShare={handleShareChallenge}
          loading={isLoading}
        />
      </DailyChallengeSection>
      
      {/* מפת המסע */}
      <JourneySection>
        <SectionHeading>
          <HeadingTitle>
            המסע <HighlightedDay>שלך</HighlightedDay>
          </HeadingTitle>
          <HeadingSubtitle>
            עקוב אחרי ההתקדמות שלך לאורך 49 ימי המסע. כל שבוע מייצג מידה אחת, וכל יום הוא הזדמנות לצמיחה.
          </HeadingSubtitle>
        </SectionHeading>
        
        <JourneyProgress 
          currentDay={{
            id: `${currentWeek}-${currentDay}`,
            weekNumber: currentWeek,
            dayNumber: currentDay,
            completed: false,
            active: true,
          }}
          completedDays={completedDays}
          onDayClick={(day) => {
            // פה יכולה להיות לוגיקה לצפיה באתגרים קודמים
            console.log(`Clicked on day: ${day.weekNumber}-${day.dayNumber}`);
          }}
          expanded={false}
        />
      </JourneySection>
      
      {/* איך זה עובד */}
      <HowItWorksSection>
        <SectionHeading>
          <HeadingTitle>
            איך זה <HighlightedDay>עובד?</HighlightedDay>
          </HeadingTitle>
          <HeadingSubtitle>
            אתגר 49 הוא מסע של 7 שבועות, המבוסס על מודל 7 הספירות מהקבלה. כל שבוע מתמקד במידה אחרת.
          </HeadingSubtitle>
        </SectionHeading>
        
        <ProcessSteps>
          <Step>
            <StepNumber weekNumber={1}>1</StepNumber>
            <StepTitle>אתגר יומי</StepTitle>
            <StepDescription>
              בכל יום תקבלו אתגר פשוט הקשור למידה השבועית. רק 10 דקות ביום.
            </StepDescription>
          </Step>
          
          <Step>
            <StepNumber weekNumber={3}>2</StepNumber>
            <StepTitle>7 שבועות</StepTitle>
            <StepDescription>
              כל שבוע מתמקד במידה אחרת: חסד, גבורה, תפארת, נצח, הוד, יסוד ומלכות.
            </StepDescription>
          </Step>
          
          <Step>
            <StepNumber weekNumber={5}>3</StepNumber>
            <StepTitle>צמיחה אישית</StepTitle>
            <StepDescription>
              דרך האתגרים היומיים, תפתחו הרגלים ותכונות חדשות שילוו אתכם גם אחרי 49 הימים.
            </StepDescription>
          </Step>
          
          <Step>
            <StepNumber weekNumber={7}>4</StepNumber>
            <StepTitle>קהילה תומכת</StepTitle>
            <StepDescription>
              אינכם לבד במסע. אלפי אנשים צועדים יחד איתכם ומשתפים את החוויות שלהם.
            </StepDescription>
          </Step>
        </ProcessSteps>
      </HowItWorksSection>
      
      {/* קהילה */}
      <Community 
        testimonials={testimonials}
        participantsCount={participantsCount}
        weekNumber={currentWeek}
      />
      
      {/* קריאה לפעולה תחתונה */}
      <CtaSection>
        <CtaContent weekNumber={currentWeek}>
          <CtaTitle>מוכנים לצאת למסע?</CtaTitle>
          <CtaDescription>
            הצטרפו למסע של 49 ימים שיעזור לכם לגלות מחדש את עצמכם, לפתח הרגלים חדשים ולצמוח.
          </CtaDescription>
          <CtaButton weekNumber={currentWeek}>
            התחילו עכשיו
          </CtaButton>
        </CtaContent>
      </CtaSection>
      
      {/* פוטר */}
      <Footer>
        <FooterContent>
          <FooterLogo>49</FooterLogo>
          <FooterLinks>
            <FooterLink>תנאי שימוש</FooterLink>
            <FooterLink>מדיניות פרטיות</FooterLink>
            <FooterLink>צור קשר</FooterLink>
          </FooterLinks>
          <FooterCopyright>
            © {new Date().getFullYear()} אתגר 49. כל הזכויות שמורות.
          </FooterCopyright>
        </FooterContent>
      </Footer>
    </Container>
  );
};

// סגנונות

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

// סקשן אתגר יומי

const DailyChallengeSection = styled.section`
  padding: ${theme.spacing[16]} ${theme.spacing[6]};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.base.white};
`;

// סקשן מפת המסע

const JourneySection = styled.section`
  padding: ${theme.spacing[16]} ${theme.spacing[6]};
  background-color: ${theme.colors.base.cream};
`;

// סקשן איך זה עובד

const HowItWorksSection = styled.section`
  padding: ${theme.spacing[16]} ${theme.spacing[6]};
  background-color: ${theme.colors.base.white};
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing[8]};
  margin-top: ${theme.spacing[10]};
`;

const Step = styled.div`
  text-align: center;
  padding: ${theme.spacing[6]};
  background-color: ${theme.colors.base.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepNumber = styled.div<{ weekNumber: number }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ weekNumber }) => {
    const weekKey = `week${weekNumber}` as keyof typeof theme.colors.weeks;
    return theme.colors.weeks[weekKey].primary;
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['2xl']};
  margin-bottom: ${theme.spacing[4]};
  box-shadow: ${({ weekNumber }) => {
    const weekKey = `week${weekNumber}` as keyof typeof theme.colors.weeks;
    return `0 4px 15px ${theme.colors.weeks[weekKey].glow}`;
  }};
`;

const StepTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.base.black};
  margin: 0 0 ${theme.spacing[3]};
`;

const StepDescription = styled.p`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.base.gray[700]};
  margin: 0;
  line-height: ${theme.typography.lineHeight.normal};
`;

// כותרות סקשן

const SectionHeading = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing[10]};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const HeadingTitle = styled.h2`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['3xl']};
  color: ${theme.colors.base.black};
  margin: 0 0 ${theme.spacing[4]};
`;

const HighlightedDay = styled.span`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    height: 6px;
    background-color: ${theme.colors.ui.accent}30;
    z-index: -1;
  }
`;

const HeadingSubtitle = styled.p`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.base.gray[700]};
  margin: 0;
  line-height: ${theme.typography.lineHeight.normal};
`;

// קריאה לפעולה תחתונה

const CtaSection = styled.section`
  padding: ${theme.spacing[16]} ${theme.spacing[6]};
  background-color: ${theme.colors.base.cream};
  text-align: center;
`;

const CtaContent = styled.div<{ weekNumber: number }>`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing[10]};
  background-color: ${({ weekNumber }) => {
    const weekKey = `week${weekNumber}` as keyof typeof theme.colors.weeks;
    return `${theme.colors.weeks[weekKey].primary}10`;
  }};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
`;

const CtaTitle = styled.h2`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['3xl']};
  color: ${theme.colors.base.black};
  margin: 0 0 ${theme.spacing[4]};
`;

const CtaDescription = styled.p`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.base.gray[700]};
  margin: 0 0 ${theme.spacing[8]};
  line-height: ${theme.typography.lineHeight.normal};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CtaButton = styled.button<{ weekNumber: number }>`
  background-color: ${({ weekNumber }) => {
    const weekKey = `week${weekNumber}` as keyof typeof theme.colors.weeks;
    return theme.colors.weeks[weekKey].primary;
  }};
  color: white;
  font-family: ${theme.typography.fontFamily.secondary};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  padding: ${theme.spacing[4]} ${theme.spacing[10]};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: ${theme.animations.transition.default};
  box-shadow: ${({ weekNumber }) => {
    const weekKey = `week${weekNumber}` as keyof typeof theme.colors.weeks;
    return `0 4px 15px ${theme.colors.weeks[weekKey].glow}`;
  }};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ weekNumber }) => {
      const weekKey = `week${weekNumber}` as keyof typeof theme.colors.weeks;
      return `0 8px 20px ${theme.colors.weeks[weekKey].glow}`;
    }};
  }
`;

// פוטר

const Footer = styled.footer`
  background-color: ${theme.colors.base.gray[900]};
  color: ${theme.colors.base.white};
  padding: ${theme.spacing[10]} ${theme.spacing[6]};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLogo = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['3xl']};
  margin-bottom: ${theme.spacing[6]};
  position: relative;
  
  &::after {
    content: ':';
    position: absolute;
    top: -5px;
    right: -10px;
    color: ${theme.colors.ui.accent};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[6]};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing[4]};
    align-items: center;
  }
`;

const FooterLink = styled.a`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.base.gray[300]};
  text-decoration: none;
  transition: ${theme.animations.transition.default};
  
  &:hover {
    color: ${theme.colors.base.white};
    text-decoration: underline;
  }
`;

const FooterCopyright = styled.div`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.base.gray[500]};
`;

export default Home;
