import ChatHomeShell from '../../../components/kaizen/ChatHomeShell';
import { KaizenProvider } from '../../../components/kaizen/KaizenContext';

export default function KaizenHomePage() {
  return (
    <KaizenProvider>
      <ChatHomeShell />
    </KaizenProvider>
  );
}
