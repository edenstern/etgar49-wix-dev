/**
 * אתגר 49 - קומפוננטת מפת המסע
 * מציגה ויזואליזציה של התקדמות המשתמש ב-49 ימי האתגר
 */

import React, { useState, useEffect } from 'react';
import { styled } from '@wix/yoshi-flow-bm';
import theme from '../styles/theme';

// מידות ושבועות
const WEEKS = ['חסד', 'גבורה', 'תפארת', 'נצח', 'הוד', 'יסוד', 'מלכות'];

// טיפוסי נתונים
interface Day {
  id: string;
  weekNumber: number; // 1-7
  dayNumber: number; // 1-7
  completed: boolean;
  active: boolean; // האם זה היום הנוכחי
}

interface JourneyProgressProps {
  currentDay?: Day;
  completedDays?: Day[];
  onDayClick?: (day: Day) => void;
  expanded?: boolean;
  className?: string;
}

const JourneyProgress: React.FC<JourneyProgressProps> = ({
  currentDay,
  completedDays = [],
  onDayClick,
  expanded = false,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  // יוצר מערך של 49 ימים (7 שבועות * 7 ימים)
  const generateDays = (): Day[] => {
    const days: Day[] = [];
    
    for (let week = 1; week <= 7; week++) {
      for (let day = 1; day <= 7; day++) {
        const id = `${week}-${day}`;
        
        // בדיקה האם זה היום הנוכחי
        const isCurrentDay = currentDay?.weekNumber === week && currentDay?.dayNumber === day;
        
        // בדיקה האם היום הושלם
        const isCompleted = completedDays.some(
          completedDay => completedDay.weekNumber === week && completedDay.dayNumber === day
        );
        
        days.push({
          id,
          weekNumber: week,
          dayNumber: day,
          completed: isCompleted,
          active: isCurrentDay,
        });
      }
    }
    
    return days;
  };
  
  const days = generateDays();
  
  // פונקציה להשגת צבעי השבוע לפי מספר השבוע
  const getWeekColors = (weekNumber: number) => {
    const weekKey = `week${weekNumber}` as keyof typeof theme.colors.weeks;
    return theme.colors.weeks[weekKey];
  };
  
  // מחשב כמה ימים הושלמו
  const completedCount = completedDays.length;
  const progressPercentage = Math.round((completedCount / 49) * 100);
  
  // מטפל בלחיצה על יום
  const handleDayClick = (day: Day) => {
    if (onDayClick) {
      onDayClick(day);
    }
  };
  
  return (
    <Container className={className}>
      <Header>
        <Title>מסע 49 הימים</Title>
        <ProgressText>
          {completedCount} מתוך 49 ימים
          <ProgressPercentage>({progressPercentage}%)</ProgressPercentage>
        </ProgressText>
        <ExpandButton 
          onClick={() => setIsExpanded(!isExpanded)}
          isExpanded={isExpanded}
        >
          {isExpanded ? 'צמצם' : 'הרחב'}
        </ExpandButton>
      </Header>
      
      <ProgressBar percentage={progressPercentage} />
      
      <Content isExpanded={isExpanded}>
        {/* תצוגת שבועות */}
        <WeeksContainer>
          {WEEKS.map((weekName, index) => {
            const weekNumber = index + 1;
            const weekColors = getWeekColors(weekNumber);
            
            // מחשב כמה ימים הושלמו בשבוע זה
            const weekCompletedDays = completedDays.filter(day => day.weekNumber === weekNumber).length;
            const weekProgressPercentage = Math.round((weekCompletedDays / 7) * 100);
            
            // בודק אם זה השבוע הנוכחי
            const isCurrentWeek = currentDay?.weekNumber === weekNumber;
            
            return (
              <WeekSection 
                key={weekNumber}
                isCurrentWeek={isCurrentWeek}
                color={weekColors.primary}
                glowColor={weekColors.glow}
              >
                <WeekHeader>
                  <WeekNumber>שבוע {weekNumber}</WeekNumber>
                  <WeekName>{weekName}</WeekName>
                  <WeekProgress>{weekCompletedDays}/7</WeekProgress>
                </WeekHeader>
                
                <WeekDays>
                  {days
                    .filter(day => day.weekNumber === weekNumber)
                    .map(day => (
                      <DayCircle
                        key={day.id}
                        onClick={() => handleDayClick(day)}
                        isCompleted={day.completed}
                        isActive={day.active}
                        color={weekColors.primary}
                        glowColor={weekColors.glow}
                        title={`יום ${day.dayNumber}`}
                      >
                        {day.dayNumber}
                      </DayCircle>
                    ))
                  }
                </WeekDays>
                
                {/* אינדיקטור התקדמות שבוע */}
                <WeekProgressBar 
                  percentage={weekProgressPercentage}
                  color={weekColors.primary}
                />
              </WeekSection>
            );
          })}
        </WeeksContainer>
        
        {/* ויזואליזציית "מסע החיטה" */}
        <WheatVisualization>
          {days.map((day, index) => {
            // חישוב הצבע על פי השבוע
            const weekColors = getWeekColors(day.weekNumber);
            
            return (
              <WheatStalk
                key={day.id}
                isGrown={day.completed}
                isActive={day.active}
                color={weekColors.primary}
                weekNumber={day.weekNumber}
                index={index}
                onClick={() => handleDayClick(day)}
              />
            );
          })}
        </WheatVisualization>
      </Content>
    </Container>
  );
};

// סגנונות

const Container = styled.div`
  width: 100%;
  background-color: ${theme.colors.base.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  transition: ${theme.animations.transition.default};
`;

const Header = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.base.gray[200]};
`;

const Title = styled.h2`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.lg};
  margin: 0;
  color: ${theme.colors.base.gray[900]};
`;

const ProgressText = styled.div`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.base.gray[700]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

const ProgressPercentage = styled.span`
  color: ${theme.colors.base.gray[500]};
  font-size: ${theme.typography.fontSize.sm};
`;

const ExpandButton = styled.button<{ isExpanded: boolean }>`
  background-color: transparent;
  border: none;
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.ui.primary};
  cursor: pointer;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.animations.transition.default};
  
  &:hover {
    background-color: ${theme.colors.ui.primary}10;
  }
  
  &::after {
    content: ${({ isExpanded }) => (isExpanded ? '"▲"' : '"▼"')};
    margin-right: ${theme.spacing[1]};
    font-size: 0.7em;
  }
`;

const ProgressBar = styled.div<{ percentage: number }>`
  height: 6px;
  background-color: ${theme.colors.base.gray[200]};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: ${({ percentage }) => `${percentage}%`};
    background: linear-gradient(to left, 
      ${theme.colors.weeks.week7.primary}, 
      ${theme.colors.weeks.week1.primary}
    );
    transition: width 0.5s ease;
    border-radius: 0 0 0 3px;
  }
`;

const Content = styled.div<{ isExpanded: boolean }>`
  max-height: ${({ isExpanded }) => (isExpanded ? '800px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease;
`;

const WeeksContainer = styled.div`
  padding: ${theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

const WeekSection = styled.div<{ 
  isCurrentWeek: boolean;
  color: string;
  glowColor: string;
}>`
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[4]};
  background-color: ${({ isCurrentWeek, color }) => 
    isCurrentWeek ? `${color}10` : theme.colors.base.gray[100]
  };
  border: 1px solid ${({ isCurrentWeek, color }) => 
    isCurrentWeek ? `${color}30` : 'transparent'
  };
  box-shadow: ${({ isCurrentWeek, glowColor }) => 
    isCurrentWeek ? `0 0 10px ${glowColor}` : 'none'
  };
  transition: ${theme.animations.transition.default};
  
  &:hover {
    background-color: ${({ color }) => `${color}05`};
  }
`;

const WeekHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[3]};
`;

const WeekNumber = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.md};
`;

const WeekName = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.lg};
`;

const WeekProgress = styled.div`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.base.gray[700]};
`;

const WeekDays = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
  justify-content: space-between;
  margin-bottom: ${theme.spacing[3]};
`;

const DayCircle = styled.div<{ 
  isCompleted: boolean;
  isActive: boolean;
  color: string;
  glowColor: string;
}>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.md};
  cursor: pointer;
  transition: ${theme.animations.transition.default};
  
  background-color: ${({ isCompleted, isActive, color }) => {
    if (isActive) return color;
    if (isCompleted) return `${color}30`;
    return 'white';
  }};
  
  color: ${({ isCompleted, isActive }) => {
    if (isActive) return 'white';
    if (isCompleted) return theme.colors.base.gray[900];
    return theme.colors.base.gray[700];
  }};
  
  border: 1px solid ${({ isCompleted, isActive, color }) => {
    if (isActive) return color;
    if (isCompleted) return `${color}60`;
    return theme.colors.base.gray[300];
  }};
  
  box-shadow: ${({ isActive, glowColor }) => 
    isActive ? `0 0 10px ${glowColor}` : 'none'
  };
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* אלמנט הניקוד שמופיע בהובר */
  &::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
    opacity: 0;
    top: -8px;
    right: 15px;
    transition: ${theme.animations.transition.default};
  }
  
  &:hover::before {
    opacity: 0.8;
  }
`;

const WeekProgressBar = styled.div<{ 
  percentage: number;
  color: string;
}>`
  height: 4px;
  background-color: ${theme.colors.base.gray[200]};
  border-radius: ${theme.borderRadius.full};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: ${({ percentage }) => `${percentage}%`};
    background-color: ${({ color }) => color};
    border-radius: ${theme.borderRadius.full};
    transition: width 0.5s ease;
  }
`;

// ויזואליזציית שדה חיטה
const WheatVisualization = styled.div`
  height: 120px;
  padding: ${theme.spacing[4]};
  background-color: ${theme.colors.base.cream};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  position: relative;
  
  /* אפקט רקע שדה */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    background-color: ${theme.colors.weeks.week7.secondary}30;
    z-index: 0;
  }
`;

const WheatStalk = styled.div<{ 
  isGrown: boolean;
  isActive: boolean;
  color: string;
  weekNumber: number;
  index: number;
}>`
  width: 4px;
  background-color: ${({ color, isGrown }) => 
    isGrown ? color : `${color}30`
  };
  height: ${({ isGrown, weekNumber }) => {
    // גבעול גבוה יותר ככל שהשבוע מתקדם
    const baseHeight = 20 + (weekNumber * 5);
    return isGrown ? `${baseHeight}px` : '10px';
  }};
  border-radius: 2px;
  margin: 0 2px;
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: height 0.5s ease, background-color 0.3s ease;
  
  /* זמן כניסה רנדומלי לאנימציה */
  animation-delay: ${({ index }) => `${index * 0.02}s`};
  
  &:hover {
    height: ${({ weekNumber }) => `${20 + (weekNumber * 7)}px`};
    filter: brightness(1.2);
  }
  
  /* "שיבולת" בראש הגבעול */
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    width: ${({ isGrown }) => isGrown ? '10px' : '4px'};
    height: ${({ isGrown }) => isGrown ? '10px' : '4px'};
    border-radius: 50%;
    background-color: ${({ color, isGrown, weekNumber }) => {
      // צבע כהה לשבועות המתקדמים יותר
      if (!isGrown) return `${color}50`;
      switch (weekNumber) {
        case 6: return theme.colors.weeks.week6.primary;
        case 7: return theme.colors.weeks.week7.primary;
        default: return color;
      }
    }};
    transform: translateX(-50%);
    opacity: ${({ isGrown }) => isGrown ? 1 : 0.5};
    transition: all 0.5s ease;
  }
  
  /* אפקט זהירה לגבעול הפעיל */
  ${({ isActive, glowColor }) => isActive && `
    animation: pulse 1.5s infinite;
    
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 5px ${glowColor}; }
      50% { box-shadow: 0 0 15px ${glowColor}; }
    }
  `}
`;

export default JourneyProgress;
