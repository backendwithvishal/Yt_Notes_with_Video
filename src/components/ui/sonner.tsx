import { Toaster as SonnerToaster } from 'sonner';
import { useThemeStore } from '../../store/useTheme';

function Toaster() {
  const theme = useThemeStore((s) => s.theme);
  return (
    <SonnerToaster
      theme={theme}
      richColors
      closeButton
      position="bottom-right"
    />
  );
}

export { Toaster };
