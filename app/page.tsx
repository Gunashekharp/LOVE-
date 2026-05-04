import FloatingButton from './components/FloatingButton';
import InteractiveLoveUniverse from './components/InteractiveLoveUniverse';
import LetterModal from './components/LetterModal';
import ExperienceShell from './components/ExperienceShell';

export default function Home() {
  return (
    <ExperienceShell>
      <InteractiveLoveUniverse />
      <FloatingButton />
      <LetterModal />
    </ExperienceShell>
  );
}
