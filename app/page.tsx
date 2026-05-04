import FloatingButton from './components/FloatingButton';
import FloatingHearts from './components/FloatingHearts';
import InteractiveLoveUniverse from './components/InteractiveLoveUniverse';
import LetterModal from './components/LetterModal';
import PhotoModal from './components/PhotoModal';
import VideoModal from './components/VideoModal';
import ExperienceShell from './components/ExperienceShell';

export default function Home() {
  return (
    <ExperienceShell>
      <FloatingHearts />
      <InteractiveLoveUniverse />
      <FloatingButton />
      <LetterModal />
      <PhotoModal />
      <VideoModal />
    </ExperienceShell>
  );
}
