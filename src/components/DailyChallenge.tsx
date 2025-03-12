/**
 * אתגר 49 - קומפוננטת האתגר היומי
 * מציגה את האתגר היומי בצורה בולטת ואינטראקטיבית
 */

import React, { useState, useEffect } from 'react';
import { styled } from '@wix/yoshi-flow-bm';
import theme from '../styles/theme';

// טיפוסי נתונים
interface Challenge {
  id: string;
  title: string;
  description: string;
  weekNumber: number; // 1-7
  dayNumber: number; // 1-7
  date: string;
  completed?: boolean;
}

interface DailyChallengeProps {
  challenge?: Challenge;
  onComplete?: (challengeId: string) => void;
  onShare?: () => void;
  loading?: boolean;
  className?: string;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({
  challenge,
  onComplete,
  onShare,
  loading = false,
  className,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    if (challenge) {
      setIsCompleted(challenge.completed || false);
      
      // אנימציה בטעינת האתגר
      setTimeout(() => {
        setAnimateIn(true);
      }, 300);
    }
  }, [challenge]);
  
  // מחשב את צבעי השבוע על פי מספר השבוע
  const getWeekColors = (weekNumber: number) => {
    const weekKey = `week${weekNumber}` as keyof typeof theme.colors.weeks;
    return theme.colors.weeks[weekKey];
  };
  
  const handleComplete = () => {
    if (challenge && onComplete && !isCompleted) {
      setIsCompleted(true);
      onComplete(challenge.id);
    }
  };
  
  if (loading) {
    return <LoadingCard className={className} />;
  }
  
  if (!challenge) {
    return (
      <ErrorCard className={className}>
        <ErrorTitle>אתגר לא נמצא</ErrorTitle>
        <ErrorText>אנחנו לא מצליחים לטעון את האתגר היומי כרגע. אנא נסו שוב מאוחר יותר.</ErrorText>
      </ErrorCard>
    );
  }
  
  const weekColors = getWeekColors(challenge.weekNumber);
  
  return (
    <ChallengeCard 
      className={className} 
      weekColor={weekColors.primary}
      glowColor={weekColors.glow}
      animateIn={animateIn}
      isCompleted={isCompleted}
    >
      <CardHeader weekColor={weekColors.primary}>
        <WeekLabel>שבוע {challenge.weekNumber}</WeekLabel>
        <DayLabel>יום {challenge.dayNumber}</DayLabel>
      </CardHeader>
      
      <CardBody>
        <ChallengeTitle>{challenge.title}</ChallengeTitle>
        <ChallengeDescription>{challenge.description}</ChallengeDescription>
        
        <ButtonsWrapper>
          <CompleteButton 
            onClick={handleComplete}
            weekColor={weekColors.primary}
            isCompleted={isCompleted}
            disabled={isCompleted}
          >
            {isCompleted ? 'הושלם ✓' : 'השלם אתגר'}
          </CompleteButton>
          
          <ShareButton 
            onClick={onShare}
            weekColor={weekColors.primary}
          >
            שתף
          </ShareButton>
        </ButtonsWrapper>
      </CardBody>
      
      {/* אלמנט הניקוד - מוסתר ומופיע בהובר */}
      <NikudElement weekColor={weekColors.primary} />
    </ChallengeCard>
  );
};

// סגנונות עבור קומפוננטת האתגר היומי
const ChallengeCard = styled.div<{
  weekColor: string;
  glowColor: string;
  animateIn: boolean;
  isCompleted: boolean;
}>`
  width: 100%;
  max-width: 500px;
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  background-color: ${theme.colors.base.white};
  box-shadow: ${({ isCompleted, weekColor, glowColor }) => 
    isCompleted 
      ? `0 8px 20px ${glowColor}, 0 0 0 1px ${weekColor}20` 
      : `0 8px 20px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.05)`
  };
  transition: ${theme.animations.transition.default};
  transform: ${({ animateIn }) => animateIn ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)'};
  opacity: ${({ animateIn }) => animateIn ? 1 : 0};
  position: relative;
  
  &:hover {
    box-shadow: ${({ weekColor, glowColor }) => 
      `0 15px 30px ${glowColor}, 0 0 0 1px ${weekColor}30`
    };
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div<{ weekColor: string }>`
  background-color: ${({ weekColor }) => weekColor};
  color: white;
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 10px;
    background: linear-gradient(to bottom, ${({ weekColor }) => weekColor}40, transparent);
  }
`;

const WeekLabel = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
`;

const DayLabel = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.md};
`;

const CardBody = styled.div`
  padding: ${theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

const ChallengeTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.xl};
  margin: 0;
  line-height: ${theme.typography.lineHeight.tight};
`;

const ChallengeDescription = styled.p`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.md};
  margin: 0;
  line-height: ${theme.typography.lineHeight.normal};
  color: ${theme.colors.base.gray[800]};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: ${theme.spacing[3]};
  margin-top: ${theme.spacing[4]};
`;

const CompleteButton = styled.button<{ weekColor: string; isCompleted: boolean }>`
  background-color: ${({ isCompleted, weekColor }) => 
    isCompleted ? `${weekColor}30` : weekColor
  };
  color: ${({ isCompleted }) => 
    isCompleted ? theme.colors.base.gray[800] : theme.colors.base.white
  };
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  font-family: ${theme.typography.fontFamily.secondary};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.md};
  cursor: ${({ isCompleted }) => isCompleted ? 'default' : 'pointer'};
  transition: ${theme.animations.transition.default};
  flex: 2;
  
  &:hover:not(:disabled) {
    background-color: ${({ weekColor }) => `${weekColor}CC`};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.7;
  }
`;

const ShareButton = styled.button<{ weekColor: string }>`
  background-color: transparent;
  color: ${({ weekColor }) => weekColor};
  border: 1px solid ${({ weekColor }) => weekColor};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[3]} ${theme.spacing[5]};
  font-family: ${theme.typography.fontFamily.secondary};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.md};
  cursor: pointer;
  transition: ${theme.animations.transition.default};
  flex: 1;
  
  &:hover {
    background-color: ${({ weekColor }) => `${weekColor}10`};
    transform: translateY(-2px);
  }
`;

// אלמנט הניקוד - יופיע בהובר כאפקט דקורטיבי
const NikudElement = styled.div<{ weekColor: string }>`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 15px;
  left: 15px;
  opacity: 0;
  border-radius: 50%;
  background-color: ${({ weekColor }) => weekColor};
  box-shadow: 0 0 10px ${({ weekColor }) => weekColor}80;
  transition: ${theme.animations.transition.default};
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ weekColor }) => weekColor};
    opacity: 0.7;
  }
  
  &::before {
    top: -12px;
    left: 5px;
  }
  
  &::after {
    bottom: -10px;
    right: 0;
  }
  
  ${ChallengeCard}:hover & {
    opacity: 0.3;
    transform: translateY(5px);
  }
`;

// קומפוננטת טעינה
const LoadingCard = styled.div`
  width: 100%;
  max-width: 500px;
  height: 250px;
  border-radius: ${theme.borderRadius.xl};
  background-color: ${theme.colors.base.gray[100]};
  box-shadow: ${theme.shadows.sm};
  animation: pulse 1.5s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 0.5; }
  }
`;

// קומפוננטות שגיאה
const ErrorCard = styled.div`
  width: 100%;
  max-width: 500px;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[6]};
  background-color: ${theme.colors.base.white};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.ui.error}20;
  text-align: center;
`;

const ErrorTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.primary};
  color: ${theme.colors.ui.error};
  margin: 0 0 ${theme.spacing[4]};
`;

const ErrorText = styled.p`
  font-family: ${theme.typography.fontFamily.secondary};
  color: ${theme.colors.base.gray[700]};
  margin: 0;
`;

export default DailyChallenge;
