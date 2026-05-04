import FloatingButton from './components/FloatingButton';
import InteractiveLoveUniverse from './components/InteractiveLoveUniverse';
import LetterModal from './components/LetterModal';
import PhotoModal from './components/PhotoModal';
import VideoModal from './components/VideoModal';
import ExperienceShell from './components/ExperienceShell';

export default function Home() {
  return (
    <ExperienceShell>
      <InteractiveLoveUniverse />
      <FloatingButton />
      <LetterModal />
      <PhotoModal />
      <VideoModal />
    </ExperienceShell>
  );
}
